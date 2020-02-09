import { resolve } from 'path'
import { GatsbyCreatePages } from './types'

export const createPages: GatsbyCreatePages = async ({
  graphql,
  boundActionCreators,
}) => {
  const { createPage } = boundActionCreators

  createPage({
    path: '/test',
    component: resolve('./src/Test.tsx'),
  })
}
