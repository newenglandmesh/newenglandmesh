import {mkdtempSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

// Cloudflare's shared build-home cache can fail SWC's native-cache safety checks.
// Use an owned, private temporary directory without weakening those checks.
const cache = mkdtempSync(join(tmpdir(), 'newenglandmesh-swc-'));
const cli = fileURLToPath(
  new URL('../node_modules/@docusaurus/core/bin/docusaurus.mjs', import.meta.url),
);

try {
  const result = spawnSync(process.execPath, [cli, 'build', ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: {...process.env, SWC_NATIVE_BINDING_CACHE: cache},
  });
  if (result.error) {
    throw result.error;
  }
  process.exitCode = result.status ?? 1;
} finally {
  rmSync(cache, {recursive: true, force: true});
}
