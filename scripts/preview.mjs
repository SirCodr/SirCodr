import { spawn, spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const astroCli = fileURLToPath(new URL('../node_modules/astro/bin/astro.mjs', import.meta.url))
const env = { ...process.env, ASTRO_LOCAL_PREVIEW: '1' }

const build = spawnSync(process.execPath, [astroCli, 'build'], {
  cwd: projectRoot,
  env,
  stdio: 'inherit',
})

if (build.error) throw build.error
if (build.status !== 0) process.exit(build.status ?? 1)

const preview = spawn(process.execPath, [astroCli, 'preview', '--host', '127.0.0.1', '--port', '4321'], {
  cwd: projectRoot,
  env,
  stdio: 'inherit',
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => preview.kill(signal))
}

preview.once('error', (error) => {
  console.error(error)
  process.exitCode = 1
})
preview.once('exit', (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0)
})
