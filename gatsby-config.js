const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        allExtensions: true,
      },
    },
  ],
}
