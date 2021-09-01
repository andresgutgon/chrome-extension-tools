import { stubIdForNoScriptChromeExtensions } from '$src/manifest-input/fileNames'
import { getRollupOutput } from '$test/helpers/getRollupOutput'
import { byFileName } from '$test/helpers/utils'
import { OutputAsset } from 'rollup'

const outputPromise = getRollupOutput(
  __dirname,
  'rollup.config.js',
)

test('Handles extension with no scripts at all', async () => {
  const { output } = await outputPromise

  const stubChunk = output.find(
    byFileName(stubIdForNoScriptChromeExtensions),
  )
  expect(stubChunk).toBeUndefined()

  const manifestAsset = output.find(
    byFileName('manifest.json'),
  ) as OutputAsset
  const manifestSource = manifestAsset.source as string
  const manifest = JSON.parse(
    manifestSource,
  ) as chrome.runtime.Manifest

  expect(manifest).toBeDefined()
  expect(manifest.content_scripts).toBeUndefined()
  expect(manifest.web_accessible_resources).toBeUndefined()
  expect(manifest.background).toBeUndefined()
})