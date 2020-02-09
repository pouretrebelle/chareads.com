import { resolve } from 'path'

export const createPagesStatefully = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const activity = reporter.activityTimer(`createPage test`)
  activity.start()
  createPage({
    path: '/test',
    component: resolve(`./src/Test.js`),
  })
  activity.end()
}
