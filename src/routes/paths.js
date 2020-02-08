import PAGES from '.'

const PATHS = {}
Object.entries(PAGES).forEach(([PAGE, { PATH }]) => {
  PATHS[PAGE] = PATH
})

export default PATHS
