import { createBookNode, createVideoNode } from './utils/createNodes'

export const onCreateNode = ({ node, actions }): void => {
  const { createNode } = actions

  if (node.internal.type === 'MarkdownRemark') {
    if (node.fileAbsolutePath.match(/content\/books\//)) {
      createBookNode({ node, createNode })
    } else if (node.fileAbsolutePath.match(/content\/videos\//)) {
      createVideoNode({ node, createNode })
    }
  }
}
