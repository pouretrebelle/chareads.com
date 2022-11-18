import React from 'react'
import Helmet from 'react-helmet'

const YouTubeWidget: React.FC = () => (
  <>
    <Helmet>
      <script src="https://apis.google.com/js/platform.js"></script>
    </Helmet>

    <div
      className="g-ytsubscribe"
      data-channelid="UCgxfnNXGCEPmcon9aGLviRQ"
      data-layout="full"
      data-count="default"
    />
  </>
)

export default YouTubeWidget
