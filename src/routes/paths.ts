import PAGES from '.'

type PathsType = {
  [key: string]: string
}

const PATHS: PathsType = {}

Object.entries(PAGES).forEach(([PAGE, { PATH }]) => {
  PATHS[PAGE] = PATH
})

export default PATHS
