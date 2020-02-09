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
    {
      resolve: 'gatsby-plugin-root-import',
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
