import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import qs from 'qs'

interface Param {
  key: string
  value?: string
  setter: React.Dispatch<string>
}

const useQueryParamSync = (
  pagePath: string,
  searchString: string,
  params: Param[]
): [boolean] => {
  const [isInitialising, setIsInitialising] = useState(true)

  const query = qs.parse(searchString, {
    ignoreQueryPrefix: true,
    comma: true,
  })

  useEffect(() => {
    params.forEach(({ setter, key }) => {
      setter(query[key] as string)
    })
    setIsInitialising(false)
  }, [])

  // update values to match query
  useEffect(() => {
    params.forEach(({ key, value, setter }) => {
      if (query[key] !== value) {
        setter(query[key] as string)
      }
    })
  }, [searchString])

  // update query to match values
  useEffect(
    () => {
      // only after initialisation so it doesn't reset query before initial filtering
      if (!isInitialising) {
        const newQuery = {}
        params.forEach(({ key, value }) => {
          newQuery[key] = value
        })

        const newQueryString = qs.stringify(newQuery, {
          addQueryPrefix: true,
          arrayFormat: 'comma',
          encode: false,
        })

        if (newQueryString !== searchString) {
          navigate(`${pagePath}${newQueryString}`)
        }
      }
    },
    params.map(({ value }) => value)
  )

  return [isInitialising]
}

export default useQueryParamSync
