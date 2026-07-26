# Region Tools

This directory contains the source data and Python tools used to generate the
MeshCore region GeoJSON served by the website. Generated region files are
written directly to `static/regions/`; they are not duplicated here.

## Contents

- `build_census_boundaries.py` downloads the Census state and county inputs.
- `build_meshcore_regions.py` builds the region GeoJSON and its manifest.
- `region_manifest.json` provides non-derived map settings such as the title,
  initial layer visibility, and coordinator strings; the builder writes the
  coordinator strings to region GeoJSON properties.
- `census_*.geojson` are local Census-derived inputs used by the builder.
- `sources/` contains source geometry that is not provided by Census inputs.
- `requirements.txt` lists the Python dependencies.
- `DEPLOY.md` describes the website data layout and refresh workflow.

Region definitions are maintained in the `REGIONS` list in
`build_meshcore_regions.py`. Edit those definitions, then rebuild the generated
website data.

## Generated Schema

Each generated GeoJSON feature includes these properties:

- `id`, `name`, and `short_name` identify the region.
- `kind` and `region_type` describe the boundary category.
- `boundary_basis` and `notes` record how the boundary was derived.
- `coordinator` is Discord username, email address, or callsign.
- `draft` and `source` record publication state and boundary data provenance.

Coordination status is intentionally kept only in `static/regions/index.json`.
The manifest is authoritative for the public status shown by the viewer. GeoJSON
files supply boundaries, descriptive/provenance fields, and coordinator data.

`coordination_status` uses these stable values:

- `official_new_england` for New England Mesh regions adopted through a vote.
- `political_boundaries` for regions based on established public or political
  boundaries.
- `coordinated_external` for external regions developed with local operators.
- `proposed` for regions still in planning.
- `extrapolated_external` for suggested external regions. The public UI labels
  this status as "Suggested External."

## Rebuild

Create the local environment once:

```bash
cd region-tools
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Refresh Census inputs when source boundaries need updating:

```bash
python build_census_boundaries.py
```

Generate the website region data after changing a region definition:

```bash
python build_meshcore_regions.py
```

The builder writes GeoJSON and `index.json` to `static/regions/` and writes a
local coverage report to `region-tools/validation_report.md`. The report is a
tooling artifact and is ignored by Git.

## Website

The public landing page is `src/pages/regions.tsx`, and the Leaflet map is
`static/regions/map.html`. From the repository root, run the Docusaurus site
and open `/regions/` for the landing page or `/regions/map.html` for the map.
