import appConfig from '../app.json'

export const ROOT_URL =
  process.env.GATSBY_ROOT_URL || appConfig.env.GATSBY_ROOT_URL.value
