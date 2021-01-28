const testPaths = [
  '',
  'about',
  'books',
  'books/wild-cheryl-strayed',
  'videos',
  'videos/2019-07-my-all-time-favourite-books',
]
const snapshotFiles = testPaths.map((p) => `${p}/index.html`).join(',')

module.exports = {
  version: 1,
  snapshot: {
    widths: [480, 800, 1500],
  },
  'percy-css': `
    iframe {
      visibility: hidden;
    }
  `,
  'static-snapshots': {
    path: 'public/',
    'snapshot-files': snapshotFiles,
    'ignore-files': 'node_modules/**/*.html',
  },
}
