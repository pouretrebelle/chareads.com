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
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets`,
        name: 'assets',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-smartypants`],
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 100,
      },
    },
    `gatsby-transformer-sharp`,
    'gatsby-plugin-styled-components',
    'gatsby-plugin-extract-image-colors',
  ],
}
