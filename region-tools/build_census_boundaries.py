#!/usr/bin/env python3
"""
Download official U.S. Census cartographic state/county boundaries and build
editable GeoJSON subsets for the MeshCore EAST scope.

Requires:
    python -m pip install geopandas requests pyogrio shapely
"""

from pathlib import Path
import io
import tempfile
import zipfile
import requests
import geopandas as gpd

YEAR = 2024
RESOLUTION = "5m"  # use "20m" for smaller files or "500k" for much more detail
OUT = Path(__file__).resolve().parent

STATE_URL = f"https://www2.census.gov/geo/tiger/GENZ{YEAR}/shp/cb_{YEAR}_us_state_{RESOLUTION}.zip"
COUNTY_URL = f"https://www2.census.gov/geo/tiger/GENZ{YEAR}/shp/cb_{YEAR}_us_county_{RESOLUTION}.zip"

# Coastal EAST scope, Florida through Maine.
EAST_CORE = {
    "Florida", "Georgia", "South Carolina", "North Carolina", "Virginia",
    "Maryland", "Delaware", "District of Columbia", "New Jersey",
    "New York", "Connecticut", "Rhode Island", "Massachusetts",
    "Vermont", "New Hampshire", "Maine"
}

# Editable inland extension. Add/remove states based on actual network scope.
EAST_EXTENDED = EAST_CORE | {
    "Pennsylvania", "West Virginia", "Ohio", "Kentucky", "Tennessee"
}

NORTHEAST_WORK_AREA = {
    "Maine", "New Hampshire", "Vermont", "Massachusetts", "Rhode Island",
    "Connecticut", "New York", "New Jersey", "Pennsylvania"
}

STATE_FIPS = {
    "Maine":"23", "New Hampshire":"33", "Vermont":"50", "Massachusetts":"25",
    "Rhode Island":"44", "Connecticut":"09", "New York":"36",
    "New Jersey":"34", "Pennsylvania":"42"
}

def download_and_extract(url: str, destination: Path) -> Path:
    response = requests.get(url, timeout=120)
    response.raise_for_status()
    with zipfile.ZipFile(io.BytesIO(response.content)) as zf:
        zf.extractall(destination)
    shp = next(destination.glob("*.shp"))
    return shp

temp_dir = tempfile.TemporaryDirectory()
source_root = Path(temp_dir.name)
state_dir = source_root / "state_source"
county_dir = source_root / "county_source"
state_dir.mkdir()
county_dir.mkdir()

state_shp = download_and_extract(STATE_URL, state_dir)
county_shp = download_and_extract(COUNTY_URL, county_dir)

states = gpd.read_file(state_shp).to_crs(4326)
counties = gpd.read_file(county_shp).to_crs(4326)

# Keep only useful columns plus geometry.
state_cols = [c for c in ["STATEFP", "STUSPS", "NAME", "GEOID", "geometry"] if c in states.columns]
county_cols = [c for c in ["STATEFP", "COUNTYFP", "NAME", "NAMELSAD", "GEOID", "geometry"] if c in counties.columns]

states[states["NAME"].isin(EAST_CORE)][state_cols].to_file(
    OUT / "census_east_core_states.geojson", driver="GeoJSON"
)
states[states["NAME"].isin(EAST_EXTENDED)][state_cols].to_file(
    OUT / "census_east_extended_states.geojson", driver="GeoJSON"
)

# Dissolved umbrella polygons, useful as a faint outline layer.
states[states["NAME"].isin(EAST_CORE)].dissolve().to_file(
    OUT / "census_east_core_dissolved.geojson", driver="GeoJSON"
)
states[states["NAME"].isin(EAST_EXTENDED)].dissolve().to_file(
    OUT / "census_east_extended_dissolved.geojson", driver="GeoJSON"
)

northeast_fips = set(STATE_FIPS.values())
counties[counties["STATEFP"].isin(northeast_fips)][county_cols].to_file(
    OUT / "census_northeast_counties.geojson", driver="GeoJSON"
)

states[states["NAME"].isin(NORTHEAST_WORK_AREA)][state_cols].to_file(
    OUT / "census_northeast_states.geojson", driver="GeoJSON"
)

print(f"Wrote GeoJSON files to {OUT.resolve()}")
