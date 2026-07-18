#!/usr/bin/env python3
"""
Build shareable MeshCore region GeoJSON from official Census state/county
boundaries.

Run build_census_boundaries.py first. This script intentionally keeps regions
overlapping because MeshCore devices may participate in multiple regions.
"""

from __future__ import annotations

import json
from pathlib import Path

import geopandas as gpd
import pandas as pd
from shapely.geometry import Polygon, box


ROOT = Path(__file__).resolve().parent
OUT = ROOT.parent / "static" / "regions"
OUT.mkdir(parents=True, exist_ok=True)
SOURCES = ROOT / "sources"
ADIRONDACK_RAW = SOURCES / "adirondack_park_boundary_raw.geojson"
ADIRONDACK_EXCLUSION = SOURCES / "adirondack_park_exclusion.geojson"

NE_STATES = {"CT", "RI", "MA", "VT", "NH", "ME"}
OFFICIAL_NEW_ENGLAND_REGION_IDS = {"me", "nh", "vt", "bos", "pv", "wma", "ct", "ct-rv", "ri"}
POLITICAL_BOUNDARY_REGION_IDS = {"east", "northeast", "adk"}
PROPOSED_REGION_IDS = {"brk"}
COORDINATED_EXTERNAL_REGION_IDS = {"nyc", "alb", "mv", "hv"}


def coordination_status_for(region_id: str) -> str:
    if region_id in OFFICIAL_NEW_ENGLAND_REGION_IDS:
        return "official_new_england"
    if region_id in POLITICAL_BOUNDARY_REGION_IDS:
        return "political_boundaries"
    if region_id in PROPOSED_REGION_IDS:
        return "proposed"
    if region_id in COORDINATED_EXTERNAL_REGION_IDS:
        return "coordinated_external"
    return "extrapolated_external"


def coordination_label_for(status: str) -> str:
    return {
        "official_new_england": "Official New England Mesh Region",
        "political_boundaries": "Political Boundaries",
        "proposed": "Proposed Region",
        "coordinated_external": "Coordinated External Region",
        "extrapolated_external": "Suggested External Region",
    }[status]


def coordination_notes_for(status: str) -> str:
    return {
        "official_new_england": "This region is within New England and has been voted on by New England Mesh. Boundaries may be adjusted as the group evolves.",
        "political_boundaries": "This region follows an established political or public administrative boundary rather than a New England Mesh-defined boundary.",
        "proposed": "This region is proposed for coordinator review and has not been voted into the official New England Mesh region set.",
        "coordinated_external": "This external region has been coordinated with people operating in that area.",
        "extrapolated_external": "This is a suggested coordination area, not a boundary defined by New England Mesh.",
    }[status]

REGIONS = [
    {
        "id": "east",
        "name": "East Coast Region",
        "short_name": "EAST",
        "kind": "east_coast_region",
        "region_type": "East Coast Region",
        "basis": "Existing political boundaries represented by U.S. Census state and district boundaries",
        "states": ["CT", "DE", "FL", "GA", "ME", "MD", "MA", "NH", "NJ", "NY", "NC", "RI", "SC", "VA", "PA", "VT", "WV", "DC"],
        "notes": "Umbrella region following the generally understood East Coast of the United States: Atlantic-bordering states CT, DE, FL, GA, ME, MD, MA, NH, NJ, NY, NC, RI, SC, and VA, plus PA, VT, WV, and DC. This intentionally excludes OH, KY, and TN.",
    },
    {
        "id": "northeast",
        "name": "Northeast Region",
        "short_name": "NORTHEAST",
        "kind": "northeast_region",
        "region_type": "Northeast Region",
        "basis": "Existing U.S. Census Bureau Northeast region boundary represented by Census state boundaries",
        "states": ["PA", "NJ", "NY", "CT", "RI", "MA", "VT", "NH", "ME"],
        "notes": "Umbrella region following the Census-defined Northeastern United States: Pennsylvania, New Jersey, New York, and New England. This intentionally excludes Delaware, Maryland, Virginia, and Ohio.",
    },
    {
        "id": "me",
        "name": "Maine",
        "short_name": "ME",
        "kind": "state_region",
        "basis": "Existing political boundary represented by a U.S. Census state boundary",
        "states": ["ME"],
        "notes": "Covers all terrestrial Maine.",
    },
    {
        "id": "nh",
        "name": "New Hampshire",
        "short_name": "NH",
        "kind": "state_region",
        "basis": "Existing political boundary represented by a U.S. Census state boundary",
        "states": ["NH"],
        "notes": "Covers all terrestrial New Hampshire.",
    },
    {
        "id": "vt",
        "name": "Vermont",
        "short_name": "VT",
        "kind": "state_region",
        "basis": "Existing political boundary represented by a U.S. Census state boundary",
        "states": ["VT"],
        "notes": "Covers all terrestrial Vermont.",
    },
    {
        "id": "bos",
        "name": "Boston / Eastern Massachusetts",
        "short_name": "BOS",
        "kind": "metro_region",
        "basis": "Community consensus boundary represented by U.S. Census county boundaries",
        "counties": {
            "MA": ["Barnstable", "Bristol", "Dukes", "Essex", "Middlesex", "Nantucket", "Norfolk", "Plymouth", "Suffolk", "Worcester"],
            "NH": ["Hillsborough", "Merrimack", "Rockingham", "Strafford"],
        },
        "notes": "Eastern Massachusetts plus southern/eastern New Hampshire; overlaps WMA, NH, RI, and CT-RV.",
    },
    {
        "id": "pv",
        "name": "Pioneer Valley",
        "short_name": "PV",
        "kind": "regional",
        "basis": "Community consensus boundary represented by U.S. Census county boundaries",
        "counties": {
            "MA": ["Franklin", "Hampden", "Hampshire"],
        },
        "notes": "Pioneer Valley region.",
    },
    {
        "id": "wma",
        "name": "Western Massachusetts",
        "short_name": "WMA",
        "kind": "regional",
        "basis": "Community consensus boundary represented by a U.S. Census county boundary",
        "counties": {
            "MA": ["Berkshire"],
        },
        "notes": "Western Massachusetts west of the Pioneer Valley.",
    },
    {
        "id": "brk",
        "name": "Berkshires / Western Massachusetts Proposal",
        "short_name": "BRK",
        "kind": "proposed_region",
        "region_type": "Proposed Region",
        "basis": "Community proposal to rename the existing WMA boundary, represented by a U.S. Census county boundary",
        "counties": {
            "MA": ["Berkshire"],
        },
        "notes": "Proposed rename of the existing WMA region. The boundary remains Berkshire County and does not include Pioneer Valley counties.",
    },
    {
        "id": "ct",
        "name": "Connecticut",
        "short_name": "CT",
        "kind": "state_region",
        "basis": "Existing political boundary represented by U.S. Census planning-region boundaries",
        "states": ["CT"],
        "notes": "Covers all terrestrial Connecticut.",
    },
    {
        "id": "ct-rv",
        "name": "Connecticut River Valley",
        "short_name": "CT-RV",
        "kind": "corridor",
        "basis": "Community consensus boundary represented by U.S. Census county and planning-region boundaries",
        "counties": {
            "CT": ["Capitol", "Lower Connecticut River Valley", "South Central Connecticut"],
            "MA": ["Franklin", "Hampden", "Hampshire"],
            "NH": ["Cheshire", "Grafton", "Sullivan"],
            "VT": ["Orange", "Windham", "Windsor"],
        },
        "notes": "North-south overlap along the Connecticut River corridor.",
    },
    {
        "id": "ri",
        "name": "Rhode Island",
        "short_name": "RI",
        "kind": "state_region",
        "basis": "Existing political boundary represented by a U.S. Census state boundary",
        "states": ["RI"],
        "notes": "Covers all terrestrial Rhode Island.",
    },
    {
        "id": "msv",
        "name": "Sullivan County / MSV",
        "short_name": "MSV",
        "kind": "adjacent_county",
        "region_type": "Adjacent Region - County",
        "basis": "Community consensus boundary represented by a U.S. Census county boundary",
        "counties": {
            "NY": ["Sullivan"],
        },
        "notes": "Sullivan County has an active ARES group and is expected to coordinate its own emcomm region.",
    },
    {
        "id": "hud",
        "name": "Hudson River Valley",
        "short_name": "HUD",
        "kind": "adjacent_corridor",
        "region_type": "Adjacent Region - Corridor",
        "basis": "Community consensus umbrella region formed from ALB, HV, and NYC, with a 15-mile lower-Hudson Long Island cutoff",
        "include_regions": ["alb", "hv", "nyc"],
        "clip_max_longitude_in_counties": {
            "max_longitude": -73.72,
            "counties": {"NY": ["Kings", "Nassau", "Queens", "Suffolk"]},
        },
        "notes": "Umbrella Hudson River Valley region defined as the union of the Albany / Capital Region, Hudson Valley, and New York City / Lower Hudson regions. Only the Long Island portion is clipped at the straight north-south line -73.72, approximately 15 miles east of the lower Hudson at Manhattan.",
    },
    {
        "id": "adk",
        "name": "Adirondacks",
        "short_name": "ADK",
        "kind": "adjacent_region",
        "region_type": "Adjacent Region - Park Boundary",
        "basis": "Existing public boundary published by the NYS Adirondack Park Agency",
        "adirondack_park": True,
        "notes": "Official Adirondack Park boundary normalized to the exterior ring so inholdings do not create holes.",
    },
    {
        "id": "erie",
        "name": "Erie Canal Corridor",
        "short_name": "ERIE",
        "kind": "adjacent_corridor",
        "region_type": "Adjacent Region - Corridor",
        "basis": "Community consensus corridor represented by U.S. Census county boundaries and the ALB region",
        "counties": {
            "NY": [
                "Albany", "Cayuga", "Erie", "Fulton", "Herkimer", "Madison",
                "Monroe", "Montgomery", "Niagara", "Oneida", "Onondaga",
                "Orleans", "Saratoga", "Schenectady", "Wayne",
            ],
        },
        "include_regions": ["alb"],
        "exclude_adirondack_park": True,
        "notes": "Canal corridor from Buffalo/Niagara east through the Mohawk Valley and Albany / Capital Region. It includes Fulton County up to the Adirondack boundary and excludes Adirondack Park.",
    },
    {
        "id": "nyc",
        "name": "New York City / Lower Hudson",
        "short_name": "NYC",
        "kind": "adjacent_metro",
        "region_type": "Adjacent Region - Metro",
        "basis": "Community consensus boundary represented by U.S. Census county boundaries",
        "counties": {
            "NY": [
                "Bronx", "Kings", "Nassau", "New York",
                "Queens", "Richmond", "Rockland",
                "Suffolk", "Westchester",
            ],
            "NJ": ["Bergen", "Essex", "Hudson", "Middlesex", "Monmouth", "Morris", "Passaic", "Union"],
        },
        "notes": "NYC and lower Hudson region near HUD. Dutchess, Orange, and Putnam are left to HV.",
    },
    {
        "id": "hv",
        "name": "Hudson Valley",
        "short_name": "HV",
        "kind": "adjacent_corridor",
        "region_type": "Adjacent Region - Corridor",
        "basis": "Community consensus boundary represented by U.S. Census county boundaries",
        "counties": {
            "NY": ["Columbia", "Dutchess", "Greene", "Orange", "Putnam", "Sullivan", "Ulster"],
        },
        "subtract_regions": ["msv"],
        "notes": "Hudson Valley region inside HUD, excluding MSV and Westchester.",
    },
    {
        "id": "alb",
        "name": "Albany / Capital Region",
        "short_name": "ALB",
        "kind": "adjacent_metro",
        "region_type": "Adjacent Region - Metro",
        "basis": "Community consensus boundary represented by U.S. Census county boundaries",
        "counties": {
            "NY": [
                "Albany", "Columbia", "Fulton", "Greene", "Montgomery",
                "Rensselaer", "Saratoga", "Schenectady", "Schoharie",
                "Warren", "Washington",
            ],
        },
        "exclude_adirondack_park": True,
        "notes": "Capital Region / Albany region inside HUD, excluding Adirondack Park.",
    },
    {
        "id": "mv",
        "name": "Mohawk Valley",
        "short_name": "MV",
        "kind": "adjacent_corridor",
        "region_type": "Adjacent Region - Corridor",
        "basis": "Community consensus boundary represented by U.S. Census county boundaries",
        "counties": {
            "NY": ["Fulton", "Hamilton", "Herkimer", "Madison", "Montgomery", "Oneida", "Otsego"],
        },
        "exclude_adirondack_park": True,
        "notes": "Mohawk Valley adjacent region, excluding Adirondack Park.",
    },
]


def read_inputs() -> tuple[gpd.GeoDataFrame, gpd.GeoDataFrame, gpd.GeoDataFrame]:
    states = gpd.read_file(ROOT / "census_east_extended_states.geojson").to_crs(4326)
    ne_states = gpd.read_file(ROOT / "census_northeast_states.geojson").to_crs(4326)
    counties = gpd.read_file(ROOT / "census_northeast_counties.geojson").to_crs(4326)
    return states, ne_states, counties


def normalize_adirondack_exclusion() -> gpd.GeoDataFrame:
    if not ADIRONDACK_RAW.exists():
        raise FileNotFoundError(
            f"Missing {ADIRONDACK_RAW}. Download the APA BluelinePolygon GeoJSON before building."
        )

    raw = gpd.read_file(ADIRONDACK_RAW).to_crs(4326)
    geom = raw.geometry.union_all()
    if geom.geom_type == "MultiPolygon":
        geom = max(geom.geoms, key=lambda part: part.area)
    if geom.geom_type != "Polygon":
        raise ValueError(f"Expected Adirondack Park polygon, got {geom.geom_type}")

    # Use only the exterior ring so inholdings/parcels do not create holes.
    exclusion = gpd.GeoDataFrame(
        {
            "id": ["adirondack-park-exclusion"],
            "name": ["Adirondack Park Exclusion"],
            "source": ["NYS Adirondack Park Agency BluelinePolygon FeatureServer"],
        },
        geometry=[Polygon(geom.exterior)],
        crs=4326,
    )
    SOURCES.mkdir(exist_ok=True)
    exclusion.to_file(ADIRONDACK_EXCLUSION, driver="GeoJSON")
    return exclusion


def select_region_geometry(
    definition: dict,
    states: gpd.GeoDataFrame,
    counties: gpd.GeoDataFrame,
    built_regions: dict[str, gpd.GeoDataFrame],
    adirondack_exclusion: gpd.GeoDataFrame,
) -> gpd.GeoDataFrame:
    selected = []

    if definition.get("adirondack_park"):
        selected.append(adirondack_exclusion[["geometry"]])

    if "states" in definition:
        selected.append(states[states["STUSPS"].isin(definition["states"])][["geometry"]])

    for included_region_id in definition.get("include_regions", []):
        if included_region_id not in built_regions:
            raise ValueError(
                f"{definition['id']} includes {included_region_id}, but it has not been built yet"
            )
        selected.append(built_regions[included_region_id][["geometry"]])

    if "clipped_states_east_of_ohio" in definition:
        ohio = states[states["STUSPS"] == "OH"]
        if ohio.empty:
            raise ValueError("Cannot clip east region because Ohio is not available")
        cutoff_lon = ohio.total_bounds[0]
        eastern_clip = box(cutoff_lon, -90, -60, 60)
        clipped = states[
            states["STUSPS"].isin(definition["clipped_states_east_of_ohio"])
        ][["geometry"]].copy()
        clipped["geometry"] = clipped.geometry.intersection(eastern_clip)
        selected.append(clipped[~clipped.geometry.is_empty])

    if "counties" in definition:
        for state_abbr, county_names in definition["counties"].items():
            statefp = states.loc[states["STUSPS"] == state_abbr, "STATEFP"]
            if statefp.empty:
                raise ValueError(f"State {state_abbr} is not available in generated boundaries")
            county_subset = counties[
                (counties["STATEFP"] == statefp.iloc[0])
                & (counties["NAME"].isin(county_names))
            ][["geometry"]]
            missing = set(county_names) - set(
                counties.loc[counties["STATEFP"] == statefp.iloc[0], "NAME"]
            )
            if missing:
                raise ValueError(f"{definition['id']} references missing {state_abbr} counties: {sorted(missing)}")
            selected.append(county_subset)

    if not selected:
        raise ValueError(f"{definition['id']} has no state or county selector")

    rows = pd.concat(selected, ignore_index=True)
    if rows.empty:
        raise ValueError(f"{definition['id']} selected no geometry")

    dissolved = gpd.GeoDataFrame(geometry=[rows.geometry.union_all()], crs=4326)
    for subtract_region_id in definition.get("subtract_regions", []):
        if subtract_region_id not in built_regions:
            raise ValueError(
                f"{definition['id']} subtracts {subtract_region_id}, but it has not been built yet"
            )
        dissolved["geometry"] = dissolved.geometry.difference(
            built_regions[subtract_region_id].geometry.union_all()
        )

    if definition.get("exclude_adirondack_park"):
        dissolved["geometry"] = dissolved.geometry.difference(
            adirondack_exclusion.geometry.union_all()
        )

    if "clip_max_longitude_in_counties" in definition:
        clip_definition = definition["clip_max_longitude_in_counties"]
        clip_counties = []
        for state_abbr, county_names in clip_definition["counties"].items():
            statefp = states.loc[states["STUSPS"] == state_abbr, "STATEFP"]
            if statefp.empty:
                raise ValueError(f"State {state_abbr} is not available in generated boundaries")
            county_subset = counties[
                (counties["STATEFP"] == statefp.iloc[0])
                & (counties["NAME"].isin(county_names))
            ][["geometry"]]
            missing = set(county_names) - set(
                counties.loc[counties["STATEFP"] == statefp.iloc[0], "NAME"]
            )
            if missing:
                raise ValueError(f"{definition['id']} references missing {state_abbr} counties: {sorted(missing)}")
            clip_counties.append(county_subset)
        island_geometry = pd.concat(clip_counties, ignore_index=True).geometry.union_all()
        east_of_cutoff = box(clip_definition["max_longitude"], -90, 180, 90)
        dissolved["geometry"] = dissolved.geometry.difference(
            island_geometry.intersection(east_of_cutoff)
        )
        dissolved["geometry"] = dissolved.geometry.buffer(0)

    dissolved["id"] = definition["id"]
    dissolved["name"] = definition["name"]
    dissolved["short_name"] = definition["short_name"]
    dissolved["kind"] = definition["kind"]
    dissolved["region_type"] = definition.get(
        "region_type",
        definition["kind"].replace("_", " ").title(),
    )
    dissolved["boundary_basis"] = definition["basis"]
    dissolved["notes"] = definition["notes"]
    coordination_status = definition.get("coordination_status", coordination_status_for(definition["id"]))
    dissolved["coordination_status"] = coordination_status
    dissolved["coordination_label"] = coordination_label_for(coordination_status)
    dissolved["coordination_notes"] = coordination_notes_for(coordination_status)
    dissolved["draft"] = False
    dissolved["source"] = "U.S. Census Bureau 2024 cartographic boundary files"
    return dissolved[
        [
            "id",
            "name",
            "short_name",
            "kind",
            "region_type",
            "boundary_basis",
            "notes",
            "coordination_status",
            "coordination_label",
            "coordination_notes",
            "draft",
            "source",
            "geometry",
        ]
    ]


def write_geojson(gdf: gpd.GeoDataFrame, path: Path) -> None:
    gdf.to_file(path, driver="GeoJSON")


def validate_new_england_coverage(
    regions: gpd.GeoDataFrame,
    ne_states: gpd.GeoDataFrame,
) -> list[str]:
    projected_crs = "EPSG:5070"
    non_east = regions[regions["id"] != "east"].to_crs(projected_crs)
    non_east["geometry"] = non_east.geometry.make_valid()
    ne = ne_states[ne_states["STUSPS"].isin(NE_STATES)].to_crs(projected_crs)
    coverage = non_east.geometry.union_all()

    lines = [
        "# MeshCore region validation",
        "",
        "All area values are calculated in EPSG:5070 and reported in square kilometers.",
        "",
        "| State | Area sq km | Uncovered by non-east regions sq km | Coverage |",
        "| --- | ---: | ---: | ---: |",
    ]
    failures = []

    for row in ne.sort_values("STUSPS").itertuples():
        state_area = row.geometry.area / 1_000_000
        uncovered = row.geometry.difference(coverage)
        uncovered_area = uncovered.area / 1_000_000
        pct = 100 if state_area == 0 else (1 - uncovered_area / state_area) * 100
        lines.append(
            f"| {row.STUSPS} | {state_area:.2f} | {uncovered_area:.6f} | {pct:.6f}% |"
        )
        if uncovered_area > 0.01:
            failures.append(f"{row.STUSPS}: {uncovered_area:.6f} sq km uncovered")

    lines.extend(
        [
            "",
            "Adjacent-region continuity choices:",
            "- HUD covers the Hudson River Valley corridor from NYC through the Hudson Valley and Capital Region.",
            "- NYC, HV, and ALB are more specific overlapping regions near or inside HUD.",
            "- MSV is Sullivan County and is subtracted from HUD and HV.",
            "- ADK uses the official NYS Adirondack Park Agency BluelinePolygon exterior boundary.",
            "- ERIE follows the Erie Canal system by county and excludes Adirondack Park.",
            "",
        ]
    )

    if failures:
        lines.append("Coverage check failed:")
        lines.extend(f"- {failure}" for failure in failures)
        raise RuntimeError("\n".join(lines))

    lines.append("Coverage check passed: every New England state is fully covered by at least one non-east MeshCore region.")
    return lines


def main() -> None:
    states, ne_states, counties = read_inputs()
    adirondack_exclusion = normalize_adirondack_exclusion()
    for old_output in OUT.glob("*.geojson"):
        old_output.unlink()

    built_regions = {}
    pending_definitions = list(REGIONS)
    while pending_definitions:
        built_this_pass = False
        for definition in pending_definitions[:]:
            dependencies = set(definition.get("include_regions", [])) | set(
                definition.get("subtract_regions", [])
            )
            if not dependencies.issubset(built_regions):
                continue
            region = select_region_geometry(
                definition,
                states,
                counties,
                built_regions,
                adirondack_exclusion,
            )
            built_regions[definition["id"]] = region
            pending_definitions.remove(definition)
            built_this_pass = True
        if not built_this_pass:
            unresolved = ", ".join(definition["id"] for definition in pending_definitions)
            raise ValueError(f"Could not resolve region dependencies for: {unresolved}")

    region_layers = [built_regions[definition["id"]] for definition in REGIONS]
    regions = gpd.GeoDataFrame(pd.concat(region_layers, ignore_index=True), crs=4326)

    write_geojson(regions, OUT / "meshcore_regions.geojson")
    index = []
    for region_id, row in regions.set_index("id").iterrows():
        filename = f"{region_id}.geojson"
        write_geojson(regions[regions["id"] == region_id].copy(), OUT / filename)
        index.append(
            {
                "id": region_id,
                "name": row["name"],
                "short_name": row["short_name"],
                "region_type": row["region_type"],
                "coordination_status": row["coordination_status"],
                "coordination_label": row["coordination_label"],
                "file": filename,
            }
        )

    report = validate_new_england_coverage(regions, ne_states)
    (ROOT / "validation_report.md").write_text("\n".join(report) + "\n", encoding="utf-8")
    (OUT / "index.json").write_text(json.dumps(index, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(regions)} region files to {OUT}")


if __name__ == "__main__":
    main()
