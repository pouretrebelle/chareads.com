import { createImageFields } from './utils/createImageFields'
import { createBookNode, createVideoNode } from './utils/createNodes'

export const onCreateNode = async ({ node, actions, reporter, createContentDigest }): Promise<void> => {
  const { createNode } = actions

  if (node.internal.type === 'MarkdownRemark') {
    if (node.fileAbsolutePath.match(/content\/books\//)) {
      createBookNode({ node, createNode })
    } else if (node.fileAbsolutePath.match(/content\/videos\//)) {
      createVideoNode({ node, createNode })
    }
  }

  if (node.internal.type === 'File' && ['jpg', 'png'].includes(node.extension)) {
    await createImageFields({ node, actions, reporter, createContentDigest })
  }
}
