import path from 'path'
import { createFilePath } from 'gatsby-source-filesystem'

// import { normalizeArray } from 'utils/graphql/normalize'

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPagesStatefully = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const { data } = await graphql(`
    query {
      allVideos {
        edges {
          node {
            title
            timestamps
            ownedBy
            id
          }
        }
      }
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              author
            }
            id
          }
        }
      }
    }
  `)

  console.log(data)
}
