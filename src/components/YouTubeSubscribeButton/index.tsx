import React from 'react'
import Helmet from 'react-helmet'

const YouTubeWidget: React.FC = () => (
  <>
    <Helmet>
      <script src="https://apis.google.com/js/platform.js"></script>
    </Helmet>

    <div
      className="g-ytsubscribe"
      data-channel="chareadzard"
      data-layout="full"
      data-count="default"
    ></div>
  </>
)

export default YouTubeWidget
