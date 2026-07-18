# Deploying the Region Viewer

The deployed viewer is static HTML plus GeoJSON under `static/regions/`.
The explanatory landing page is a Docusaurus page at `src/pages/regions.tsx`.

## Source Layout

In this project:

- `static/regions/map.html` fetches `static/regions/index.json` when served as
  `/regions/map.html`.
- `static/regions/index.json` lists the generated region GeoJSON files.
- `static/regions/*.geojson` are generated directly by
  `region-tools/build_meshcore_regions.py` and shown by the viewer.

## Regenerating Website Data

After changing region definitions, regenerate the website copy directly:

```bash
cd region-tools
source .venv/bin/activate
python build_meshcore_regions.py
```

The validation report is written to `region-tools/validation_report.md`; it is
a tooling artifact and is not published by the website.

## GitHub Pages

If deploying through GitHub Pages and the site is plain static HTML, add a
`.nojekyll` file at the Pages root so GitHub Pages does not run Jekyll:

```bash
touch .nojekyll
git add .nojekyll
git commit -m "Disable Jekyll for GitHub Pages"
```

This avoids Jekyll/GitHub metadata build failures and serves the HTML/GeoJSON
directly.

## Viewer Behavior

- OpenStreetMap is used as the base map.
- Region files are discovered through `index.json`, not hardcoded.
- Clicking a map point lists every MeshCore region containing that coordinate.
- The popup also reverse-geocodes the point through OpenStreetMap Nominatim.
- Region codes are displayed lowercase in inline-code styling.
- Region rows show whether a region is Official New England, Political
  Boundaries, Proposed, Coordinated External, or Suggested External.
- Suggested External regions use dashed borders.
- The upper-right layer control includes a `Deselect all` button.
- The layer selector and legend can be collapsed; on small screens they start
  collapsed so the map remains usable.
