const testPaths = [
  '',
  'about',
  'books',
  'books/wild-cheryl-strayed',
  'videos',
  'videos/2019-07-my-all-time-favourite-books',
]
const snapshotFiles = testPaths.map((p) =>
  `/${p}/index.html`.replace(/\/\//, '/')
)

module.exports = {
  version: 2,
  static: {
    include: snapshotFiles,
  },
  snapshot: {
    widths: [480, 800, 1500],
  },
}
