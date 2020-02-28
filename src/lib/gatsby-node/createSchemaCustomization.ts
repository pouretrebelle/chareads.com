import {
  relateBookByField,
  getTimestampTextFromBook,
  relateVideoToBook,
} from 'lib/gatsby-node/utils/schema'

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
      },
    }),
  ]
  createTypes(typeDefs)

  return true
}
