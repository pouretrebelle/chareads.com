const dotenv = require('dotenv') // eslint-disable-line
const path = require('path') // eslint-disable-line

dotenv.config()

module.exports = {
  pathPrefix: '/chareads.com',
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
    },
    {
      resolve: 'gatsby-plugin-resolve-src',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/books`,
        name: 'books',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/videos`,
        name: 'videos',
      },
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: `Videos`, // a fixed string
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-smartypants`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
