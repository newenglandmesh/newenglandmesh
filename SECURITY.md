# Security Policy

## Supported versions

This repository contains the New England Mesh website, documentation, and its
build and deployment tooling. Security fixes are developed and verified on
`staging` before being promoted to `main`, which is the production source.

Only the current production revision and the active staging branch are
maintained. Older commits and separately maintained community services or
third-party firmware are not supported versions of this repository. Report
issues in those projects through their own security reporting channels.

## Reporting a vulnerability

Use GitHub's private vulnerability reporting:

[Report a vulnerability privately](https://github.com/newenglandmesh/newenglandmesh/security/advisories/new)

Do **not** publish an unpatched vulnerability, exploit details, credentials, or
personal information in a public issue, pull request, or community chat.

Include as much of the following as is available:

- The affected page, component, dependency, or commit.
- A description of the issue and its potential impact.
- Minimal reproduction steps or a proof of concept.
- Any relevant dependency advisory or CVE identifier.
- A suggested mitigation or fix, if known.

Use test data and redact secrets, private keys, tokens, and personal information.
Do not access other users' data, disrupt live services, or perform denial-of-service
testing against deployed infrastructure.

## Coordinated disclosure

Maintainers will review private reports and coordinate remediation and public
disclosure with the reporter. Please keep the details private while a fix is
being assessed and prepared. This is a community-maintained project; no fixed
response time or security support service-level agreement is guaranteed.

Non-security bugs, documentation corrections, and feature requests belong in
[public issues](https://github.com/newenglandmesh/newenglandmesh/issues).
