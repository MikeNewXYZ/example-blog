import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {singletonTools} from 'sanity-plugin-singleton-tools'
import structure from './structure'
import schemas from './schema'

export default defineConfig({
  name: 'default',
  title: 'Example Blog',

  projectId: 'enxovju5',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
    singletonTools(),
  ],

  schema: {
    types: schemas,
  },
})
