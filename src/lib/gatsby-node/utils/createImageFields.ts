import Vibrant from 'node-vibrant'

export const createImageFields = async ({ node, actions, reporter, createContentDigest }) => {
  try {
    const palette = await Vibrant.from(node.absolutePath).getPalette(
      (err, palette) => {
        if (err) {
          throw err
        }
        return palette
      }
    )

    const colors = {
      vibrant: palette.Vibrant.hex,
      darkVibrant: palette.DarkVibrant.hex,
      lightVibrant: palette.LightVibrant.hex,
      muted: palette.Muted.hex,
      darkMuted: palette.DarkMuted.hex,
      lightMuted: palette.LightMuted.hex,
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
    actions.createParentChildLink({ parent: node, child: imageColorsNode })
  } catch (err) {
    reporter.panicOnBuild(
      `Error processing image colors in ${node.absolutePath ? `file ${node.absolutePath}` : `node ${node.id}`
      }:\n
      ${err.message}`
    )
  }
}
