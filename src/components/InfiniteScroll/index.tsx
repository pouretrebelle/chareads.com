import React, { useState, createRef } from 'react'

import useScrollPosition from 'utils/hooks/useScrollPosition'

const isBrowser = typeof window !== `undefined`

interface Props {
  items: object[]
  renderItem: (item: object) => React.ReactNode
}

const InfiniteScroll: React.FC<Props> = ({ items, renderItem }) => {
  const anchorRef = createRef()
  const [postsToShow, setPostsToShow] = useState(16)

  useScrollPosition(
    (pos) => {
      if (pos < 400 && postsToShow < items.length)
        setPostsToShow(postsToShow + 12)
    },
    300,
    [postsToShow],
    anchorRef
  )

  return (
    <>
      {items.slice(0, isBrowser ? postsToShow : items.length).map(renderItem)}
      <span ref={anchorRef} />
    </>
  )
}

export default InfiniteScroll
