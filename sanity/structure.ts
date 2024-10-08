import {singletonDocumentListItems, filteredDocumentListItems} from 'sanity-plugin-singleton-tools'
import {StructureBuilder, StructureResolverContext} from 'sanity/structure'

const structure = (S: StructureBuilder, context: StructureResolverContext) =>
  S.list()
    .title('Content')
    .items([
      ...singletonDocumentListItems({S, context}),
      S.divider(),
      ...filteredDocumentListItems({S, context}),
    ])

export default structure
