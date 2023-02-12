'use strict'

const Vibrant = require('node-vibrant')

const Color = require('color')

const defaultOptions = {
  extensions: ['jpg', 'png'],
}

const getHex = (rgb) => {
  return Color({
    r: rgb[0],
    g: rgb[1],
    b: rgb[2],
  }).hex()
}

exports.onCreateNode = async (
  { node, actions, reporter, createContentDigest },
  pluginOptions
) => {
  const options = Object.assign({}, { ...defaultOptions, ...pluginOptions })

  if (!options.extensions || !options.extensions.includes(node.extension)) {
    return
  }

  try {
    const palette = await Vibrant.from(node.absolutePath).getPalette(
      (err, palette) => {
        if (err) {
          throw new Error(err)
        }

        return palette
      }
    )
    const colors = {
      vibrant: getHex(palette.Vibrant._rgb),
      darkVibrant: getHex(palette.DarkVibrant._rgb),
      lightVibrant: getHex(palette.LightVibrant._rgb),
      muted: getHex(palette.Muted._rgb),
      darkMuted: getHex(palette.DarkMuted._rgb),
      lightMuted: getHex(palette.LightMuted._rgb),
    }
    const imageColorsNode = {
      ...colors,
      id: `${node.id}-colors`,
      parent: node.id,
      internal: {
        type: 'ImageColors',
        contentDigest: createContentDigest(node),
      },
    }
    actions.createNode(imageColorsNode)
    actions.createParentChildLink({
      parent: node,
      child: imageColorsNode,
    })
  } catch (err) {
    reporter.panicOnBuild(`Error processing image colours in ${
      node.absolutePath ? `file ${node.absolutePath}` : `node ${node.id}`
    }:\n
      ${err.message}`)
  }
}
