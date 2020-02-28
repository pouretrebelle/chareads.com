import React from 'react'

import { PageProps } from 'types/page'
import Layout from 'Layout'

const NotFoundPage: React.FC<PageProps> = ({ location }) => {
  return (
    <Layout location={location}>
      <h1>404 Not Found</h1>
    </Layout>
  )
}

export default NotFoundPage
