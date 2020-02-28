import React, { useState, createRef } from 'react'

import useScrollPosition from 'utils/hooks/useScrollPosition'

const SCROLL_BUFFER = 300
const INITIAL_COUNT = 16
const INCREMENT = 8

const isBrowser = typeof window !== `undefined`

interface Props {
  items: object[]
  renderItem: (item: object) => React.ReactNode
}

const InfiniteScroll: React.FC<Props> = ({ items, renderItem }) => {
  const anchorRef = createRef()
  const [itemsToShow, setItemsToShow] = useState(INITIAL_COUNT)

  useScrollPosition(
    (pos) => {
      if (pos < 400 && itemsToShow < items.length)
        setItemsToShow(itemsToShow + INCREMENT)
    },
    SCROLL_BUFFER,
    [itemsToShow],
    anchorRef
  )

  return (
    <>
      {items.slice(0, isBrowser ? itemsToShow : items.length).map(renderItem)}
      <span ref={anchorRef as React.LegacyRef<HTMLSpanElement>} />
    </>
  )
}

export default InfiniteScroll
