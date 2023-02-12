import fs from 'fs'
import path from 'path'
import Vibrant from 'node-vibrant'

import { getImageSlug } from 'utils/urls/slugs'

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

  try {
    const slug = getImageSlug(node)
    const staticPath = `/static/${slug}.${node.extension}`
    actions.createNodeField({
      node,
      name: 'staticPath',
      value: staticPath,
    })

    const newPath = path.join(
      process.cwd(),
      'public',
      staticPath,
    );

    fs.copyFile(node.absolutePath, newPath, err => {
      if (err) {
        throw err
      }
    });
  } catch (err) {
    reporter.panicOnBuild(
      `Error making static copy of ${node.absolutePath ? `file ${node.absolutePath}` : `node ${node.id}`
      }:\n
      ${err.message}`
    )
  }
}
