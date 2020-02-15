import qs from 'qs'

const getQueryParameters = (): { [key: string]: string | number } => {
  if (!window.location.search) {
    return {}
  }

  return qs.parse(window.location.search, { ignoreQueryPrefix: true })
}

export default getQueryParameters
