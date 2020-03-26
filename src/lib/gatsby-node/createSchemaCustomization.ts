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
      name: 'Video',
      interfaces: ['Node'],
      fields: {
        ownedBy: {
          type: 'Book',
          resolve: relateBookByField('ownedBy'),
        },
        relatedBooks: {
          type: '[Book]',
          resolve: addRelatedBooksToVideo,
        },
      },
    }),
    schema.buildObjectType({
      name: 'VideoTimestamps',
      fields: {
        text: {
          type: 'String!',
          resolve: getTimestampTextFromBook,
        },
        book: {
          type: 'Book',
          resolve: relateBookByField('book'),
        },
      },
    }),
    schema.buildObjectType({
      name: 'Book',
      interfaces: ['Node'],
      fields: {
        video: {
          type: 'Video',
          resolve: relateVideoToBook,
        },
        relatedBooks: {
          type: '[Book]',
          resolve: addRelatedBooksToBook,
        },
      },
    }),
  ]
  createTypes(typeDefs)

  return true
}
