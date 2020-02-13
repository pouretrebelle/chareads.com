// require('source-map-support').install()
require('ts-node').register()

// typescript files
exports.createPagesStatefully = require('lib/gatsby-node/createPagesStatefully').createPagesStatefully
exports.onCreateNode = require('lib/gatsby-node/onCreateNode').onCreateNode
exports.createSchemaCustomization = require('lib/gatsby-node/createSchemaCustomization').createSchemaCustomization
