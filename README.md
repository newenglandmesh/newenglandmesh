# New England Mesh website

This repository contains the New England Mesh documentation site. It is built
with [Docusaurus](https://docusaurus.io/) and intended to deploy on Cloudflare
Pages.

## Installation

```bash
npm install
```

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment targets

Cloudflare Pages should be connected to this GitHub repository with:

- Production branch: `main`
- Preview branch: `staging`
- Build command: `npm run build`
- Build output directory: `build`
- Root directory: repository root
- Node.js: `>=20`

Custom domains in Cloudflare Pages:

- `newenglandme.sh` for the production deployment from `main`
- `staging.newenglandme.sh` for the preview deployment from `staging`

Cloudflare Pages automatically sets `CF_PAGES_BRANCH`; the Docusaurus config
uses it to set the canonical site URL for production or staging.

You can also force a local build for either deployment target:

```bash
npm run build:production
npm run build:staging
```
