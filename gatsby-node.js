require('ts-node').register()
const path = require('path')

exports.createPagesStatefully = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const activity = reporter.activityTimer(`createPage /test`)
  activity.start()
  createPage({
    path: '/test',
    component: path.resolve('./src/Test.tsx'),
  })
  activity.end()
}
