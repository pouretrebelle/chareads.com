import {
  relateBookByField,
  getTimestampTextFromBook,
  relateVideoToBook,
} from 'lib/gatsby-node/utils/schema'
import {
  addRelatedBooksToBook,
  addRelatedBooksToVideo,
} from './utils/relatedBooks'

export const createSchemaCustomization = async ({
  actions,
  schema,
}): Promise<boolean> => {
  const { createTypes } = actions
  const typeDefs = [
    schema.buildObjectType({
      name: 'Videos',
      interfaces: ['Node'],
      fields: {
        ownedBy: {
          type: 'MarkdownRemark',
          resolve: relateBookByField('ownedBy'),
        },
        relatedBooks: {
          type: '[MarkdownRemark]',
          resolve: addRelatedBooksToVideo,
        },
      },
    }),
    schema.buildObjectType({
      name: 'VideosTimestamps',
      fields: {
        text: {
          type: 'String!',
          resolve: getTimestampTextFromBook,
        },
        book: {
          type: 'MarkdownRemark',
          resolve: relateBookByField('book'),
        },
      },
    }),
    schema.buildObjectType({
      name: 'MarkdownRemark',
      fields: {
        video: {
          type: 'Videos',
          resolve: relateVideoToBook,
        },
        relatedBooks: {
          type: '[MarkdownRemark]',
          resolve: addRelatedBooksToBook,
        },
      },
    }),
  ]
  createTypes(typeDefs)

  return true
}
