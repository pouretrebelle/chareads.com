import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import qs from 'qs'

interface Param {
  key: string
  value: any
  setter: React.Dispatch<any>
  isArray: boolean
}

const getArrayFromValue = (value: undefined | string | string[]): string[] => {
  if (!value) return []
  if (typeof value === 'string') return [value]
  return value
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
    params.forEach(({ setter, isArray, key }) => {
      setter(isArray ? getArrayFromValue(query[key]) : query[key])
    })
    setIsInitialising(false)
  }, [])

  // update values to match query
  useEffect(() => {
    params.forEach(({ key, value, setter, isArray }) => {
      if (isArray) {
        if (
          (query[key] && query[key].length !== value.length) ||
          (!query[key] && value.length)
        ) {
          setter(getArrayFromValue(query[key]))
        }
      } else {
        if (query[key] !== value) {
          setter(query[key])
        }
      }
    })
  }, [searchString])

  // update query to match values
  useEffect(
    () => {
      // only after initialisation so it doesn't reset query before initial filtering
      if (!isInitialising) {
        const newQuery = {}
        params.forEach(({ key, value, isArray }) => {
          newQuery[key] = isArray ? (value.length ? value : undefined) : value
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
