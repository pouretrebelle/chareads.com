'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutPropertiesLoose')
)

const Remark = require(`remark`)

const select = require(`unist-util-select`)

const sanitizeHTML = require(`sanitize-html`)

const _ = require(`lodash`)

const visit = require(`unist-util-visit`)

const toHAST = require(`mdast-util-to-hast`)

const hastToHTML = require(`hast-util-to-html`)

const mdastToToc = require(`mdast-util-toc`)

const mdastToString = require(`mdast-util-to-string`)

const Promise = require(`bluebird`)

const unified = require(`unified`)

const parse = require(`remark-parse`)

const stringify = require(`remark-stringify`)

const english = require(`retext-english`)

const remark2retext = require(`remark-retext`)

const stripPosition = require(`unist-util-remove-position`)

const hastReparseRaw = require(`hast-util-raw`)

const prune = require(`underscore.string/prune`)

const {
  getConcatenatedValue,
  cloneTreeUntil,
  findLastTextNode,
} = require(`./hast-processing`)

const codeHandler = require(`./code-handler`)

let fileNodes
let pluginsCacheStr = ``
let pathPrefixCacheStr = ``

const astCacheKey = (node) =>
  `transformer-remark-markdown-ast-${node.internal.contentDigest}-${pluginsCacheStr}-${pathPrefixCacheStr}`

const htmlCacheKey = (node) =>
  `transformer-remark-markdown-html-${node.internal.contentDigest}-${pluginsCacheStr}-${pathPrefixCacheStr}`

const htmlAstCacheKey = (node) =>
  `transformer-remark-markdown-html-ast-${node.internal.contentDigest}-${pluginsCacheStr}-${pathPrefixCacheStr}`

const headingsCacheKey = (node) =>
  `transformer-remark-markdown-headings-${node.internal.contentDigest}-${pluginsCacheStr}-${pathPrefixCacheStr}`

const tableOfContentsCacheKey = (node, appliedTocOptions) =>
  `transformer-remark-markdown-toc-${
    node.internal.contentDigest
  }-${pluginsCacheStr}-${JSON.stringify(
    appliedTocOptions
  )}-${pathPrefixCacheStr}` // ensure only one `/` in new url

const withPathPrefix = (url, pathPrefix) =>
  (pathPrefix + url).replace(/\/\//, `/`) // TODO: remove this check with next major release

const safeGetCache = ({ getCache, cache }) => (id) => {
  if (!getCache) {
    return cache
  }

  return getCache(id)
}
/**
 * Map that keeps track of generation of AST to not generate it multiple
 * times in parallel.
 *
 * @type {Map<string,Promise>}
 */

const ASTPromiseMap = new Map()
/**
 * Set of all Markdown node types which, when encountered, generate an extra to
 * separate text.
 *
 * @type {Set<string>}
 */

const SpaceMarkdownNodeTypesSet = new Set([
  `paragraph`,
  `heading`,
  `tableCell`,
  `break`,
])
const headingLevels = [...Array(6).keys()].reduce((acc, i) => {
  acc[`h${i}`] = i
  return acc
}, {})

module.exports = (_ref, pluginOptions) => {
  let {
      type,
      basePath,
      getNode,
      getNodesByType,
      cache,
      getCache: possibleGetCache,
      reporter,
    } = _ref,
    rest = (0, _objectWithoutPropertiesLoose2.default)(_ref, [
      'type',
      'basePath',
      'getNode',
      'getNodesByType',
      'cache',
      'getCache',
      'reporter',
    ])

  const allowedTypes = ['MarkdownRemark', 'Book', 'Video']
  if (!allowedTypes.includes(type.name)) {
    return {}
  }

  pluginsCacheStr = pluginOptions.plugins.map((p) => p.name).join(``)
  pathPrefixCacheStr = basePath || ``
  const getCache = safeGetCache({
    cache,
    getCache: possibleGetCache,
  })
  return new Promise((resolve, reject) => {
    // Setup Remark.
    const {
      blocks,
      commonmark = true,
      footnotes = true,
      gfm = true,
      pedantic = true,
      tableOfContents = {
        heading: null,
        maxDepth: 6,
      },
    } = pluginOptions
    const tocOptions = tableOfContents
    const remarkOptions = {
      commonmark,
      footnotes,
      gfm,
      pedantic,
    }

    if (_.isArray(blocks)) {
      remarkOptions.blocks = blocks
    }

    let remark = new Remark().data(`settings`, remarkOptions)

    for (let plugin of pluginOptions.plugins) {
      const requiredPlugin = require(plugin.resolve)

      if (_.isFunction(requiredPlugin.setParserPlugins)) {
        for (let parserPlugin of requiredPlugin.setParserPlugins(
          plugin.pluginOptions
        )) {
          if (_.isArray(parserPlugin)) {
            const [parser, options] = parserPlugin
            remark = remark.use(parser, options)
          } else {
            remark = remark.use(parserPlugin)
          }
        }
      }
    }

    async function getAST(markdownNode) {
      const cacheKey = astCacheKey(markdownNode)
      const cachedAST = await cache.get(cacheKey)

      if (cachedAST) {
        return cachedAST
      } else if (ASTPromiseMap.has(cacheKey)) {
        // We are already generating AST, so let's wait for it
        return await ASTPromiseMap.get(cacheKey)
      } else {
        const ASTGenerationPromise = getMarkdownAST(markdownNode)
        ASTGenerationPromise.then((markdownAST) => {
          ASTPromiseMap.delete(cacheKey)
          return cache.set(cacheKey, markdownAST)
        }).catch((err) => {
          ASTPromiseMap.delete(cacheKey)
          return err
        }) // Save new AST to cache and return
        // We can now release promise, as we cached result

        ASTPromiseMap.set(cacheKey, ASTGenerationPromise)
        return ASTGenerationPromise
      }
    }

    async function getMarkdownAST(markdownNode) {
      if (process.env.NODE_ENV !== `production` || !fileNodes) {
        fileNodes = getNodesByType(`File`)
      } // Use Bluebird's Promise function "each" to run remark plugins serially.

      await Promise.each(pluginOptions.plugins, (plugin) => {
        const requiredPlugin = require(plugin.resolve)

        if (_.isFunction(requiredPlugin.mutateSource)) {
          return requiredPlugin.mutateSource(
            Object.assign(
              {
                markdownNode,
                files: fileNodes,
                getNode,
                reporter,
                cache: getCache(plugin.name),
                getCache,
                compiler: {
                  parseString: remark.parse.bind(remark),
                  generateHTML: getHTML,
                },
              },
              rest
            ),
            plugin.pluginOptions
          )
        } else {
          return Promise.resolve()
        }
      })
      const markdownAST = remark.parse(markdownNode.internal.content)

      if (basePath) {
        // Ensure relative links include `pathPrefix`
        visit(markdownAST, [`link`, `definition`], (node) => {
          if (
            node.url &&
            node.url.startsWith(`/`) &&
            !node.url.startsWith(`//`)
          ) {
            node.url = withPathPrefix(node.url, basePath)
          }
        })
      }

      if (process.env.NODE_ENV !== `production` || !fileNodes) {
        fileNodes = getNodesByType(`File`)
      } // Use Bluebird's Promise function "each" to run remark plugins serially.

      await Promise.each(pluginOptions.plugins, (plugin) => {
        const requiredPlugin = require(plugin.resolve) // Allow both exports = function(), and exports.default = function()

        const defaultFunction = _.isFunction(requiredPlugin)
          ? requiredPlugin
          : _.isFunction(requiredPlugin.default)
          ? requiredPlugin.default
          : undefined

        if (defaultFunction) {
          return defaultFunction(
            Object.assign(
              {
                markdownAST,
                markdownNode,
                getNode,
                files: fileNodes,
                basePath,
                reporter,
                cache: getCache(plugin.name),
                getCache,
                compiler: {
                  parseString: remark.parse.bind(remark),
                  generateHTML: getHTML,
                },
              },
              rest
            ),
            plugin.pluginOptions
          )
        } else {
          return Promise.resolve()
        }
      })
      return markdownAST
    }

    async function getHeadings(markdownNode) {
      const cachedHeadings = await cache.get(headingsCacheKey(markdownNode))

      if (cachedHeadings) {
        return cachedHeadings
      } else {
        const ast = await getAST(markdownNode)
        const headings = select(ast, `heading`).map((heading) => {
          return {
            value: mdastToString(heading),
            depth: heading.depth,
          }
        })
        cache.set(headingsCacheKey(markdownNode), headings)
        return headings
      }
    }

    async function getTableOfContents(markdownNode, gqlTocOptions) {
      // fetch defaults
      let appliedTocOptions = Object.assign({}, tocOptions, {}, gqlTocOptions) // get cached toc

      const cachedToc = await cache.get(
        tableOfContentsCacheKey(markdownNode, appliedTocOptions)
      )

      if (cachedToc) {
        return cachedToc
      } else {
        const ast = await getAST(markdownNode)
        const tocAst = mdastToToc(ast, appliedTocOptions)
        let toc

        if (tocAst.map) {
          const addSlugToUrl = function(node) {
            if (node.url) {
              if (
                _.get(markdownNode, appliedTocOptions.pathToSlugField) ===
                undefined
              ) {
                console.warn(
                  `Skipping TableOfContents. Field '${appliedTocOptions.pathToSlugField}' missing from markdown node`
                )
                return null
              }

              node.url = [
                basePath,
                _.get(markdownNode, appliedTocOptions.pathToSlugField),
                node.url,
              ]
                .join(`/`)
                .replace(/\/\//g, `/`)
            }

            if (node.children) {
              node.children = node.children
                .map((node) => addSlugToUrl(node))
                .filter(Boolean)
            }

            return node
          }

          if (appliedTocOptions.absolute) {
            tocAst.map = addSlugToUrl(tocAst.map)
          }

          toc = hastToHTML(
            toHAST(tocAst.map, {
              allowDangerousHTML: true,
            }),
            {
              allowDangerousHTML: true,
            }
          )
        } else {
          toc = ``
        }

        cache.set(tableOfContentsCacheKey(markdownNode, appliedTocOptions), toc)
        return toc
      }
    }

    async function getHTMLAst(markdownNode) {
      const cachedAst = await cache.get(htmlAstCacheKey(markdownNode))

      if (cachedAst) {
        return cachedAst
      } else {
        const ast = await getAST(markdownNode)
        const htmlAst = toHAST(ast, {
          allowDangerousHTML: true,
          handlers: {
            code: codeHandler,
          },
        }) // Save new HTML AST to cache and return

        cache.set(htmlAstCacheKey(markdownNode), htmlAst)
        return htmlAst
      }
    }

    async function getHTML(markdownNode) {
      const shouldCache = markdownNode && markdownNode.internal
      const cachedHTML =
        shouldCache && (await cache.get(htmlCacheKey(markdownNode)))

      if (cachedHTML) {
        return cachedHTML
      } else {
        const ast = await getHTMLAst(markdownNode) // Save new HTML to cache and return

        const html = hastToHTML(ast, {
          allowDangerousHTML: true,
        })

        if (shouldCache) {
          // Save new HTML to cache
          cache.set(htmlCacheKey(markdownNode), html)
        }

        return html
      }
    }

    async function getExcerptAst(
      fullAST,
      markdownNode,
      { pruneLength, truncate, excerptSeparator }
    ) {
      if (excerptSeparator && markdownNode.excerpt !== ``) {
        return cloneTreeUntil(
          fullAST,
          ({ nextNode }) =>
            nextNode.type === `raw` && nextNode.value === excerptSeparator
        )
      }

      if (!fullAST.children.length) {
        return fullAST
      }

      const excerptAST = cloneTreeUntil(fullAST, ({ root }) => {
        const totalExcerptSoFar = getConcatenatedValue(root)
        return totalExcerptSoFar && totalExcerptSoFar.length > pruneLength
      })
      const unprunedExcerpt = getConcatenatedValue(excerptAST)

      if (
        !unprunedExcerpt ||
        (pruneLength && unprunedExcerpt.length < pruneLength)
      ) {
        return excerptAST
      }

      const lastTextNode = findLastTextNode(excerptAST)
      const amountToPruneBy = unprunedExcerpt.length - pruneLength
      const desiredLengthOfLastNode =
        lastTextNode.value.length - amountToPruneBy

      if (!truncate) {
        lastTextNode.value = prune(
          lastTextNode.value,
          desiredLengthOfLastNode,
          `…`
        )
      } else {
        lastTextNode.value = _.truncate(lastTextNode.value, {
          length: pruneLength,
          omission: `…`,
        })
      }

      return excerptAST
    }

    async function getExcerptHtml(
      markdownNode,
      pruneLength,
      truncate,
      excerptSeparator
    ) {
      const fullAST = await getHTMLAst(markdownNode)
      const excerptAST = await getExcerptAst(fullAST, markdownNode, {
        pruneLength,
        truncate,
        excerptSeparator,
      })
      const html = hastToHTML(excerptAST, {
        allowDangerousHTML: true,
      })
      return html
    }

    async function getExcerptMarkdown(
      markdownNode,
      pruneLength,
      truncate,
      excerptSeparator
    ) {
      // if excerptSeparator in options and excerptSeparator in content then we will get an excerpt from grayMatter that we can use
      if (excerptSeparator && markdownNode.excerpt !== ``) {
        return markdownNode.excerpt
      }

      const ast = await getMarkdownAST(markdownNode)
      const excerptAST = await getExcerptAst(ast, markdownNode, {
        pruneLength,
        truncate,
        excerptSeparator,
      })
      var excerptMarkdown = unified()
        .use(stringify)
        .stringify(excerptAST)
      return excerptMarkdown
    }

    async function getExcerptPlain(
      markdownNode,
      pruneLength,
      truncate,
      excerptSeparator
    ) {
      const text = await getAST(markdownNode).then((ast) => {
        let excerptNodes = []
        let isBeforeSeparator = true
        visit(
          ast,
          (node) => isBeforeSeparator,
          (node) => {
            if (excerptSeparator && node.value === excerptSeparator) {
              isBeforeSeparator = false
            } else if (node.type === `text` || node.type === `inlineCode`) {
              excerptNodes.push(node.value)
            } else if (node.type === `image`) {
              excerptNodes.push(node.alt)
            } else if (SpaceMarkdownNodeTypesSet.has(node.type)) {
              // Add a space when encountering one of these node types.
              excerptNodes.push(` `)
            }
          }
        )
        const excerptText = excerptNodes.join(``).trim()

        if (excerptSeparator && !isBeforeSeparator) {
          return excerptText
        }

        if (!truncate) {
          return prune(excerptText, pruneLength, `…`)
        }

        return _.truncate(excerptText, {
          length: pruneLength,
          omission: `…`,
        })
      })
      return text
    }

    async function getExcerpt(
      markdownNode,
      { format, pruneLength, truncate, excerptSeparator }
    ) {
      if (format === `HTML`) {
        return getExcerptHtml(
          markdownNode,
          pruneLength,
          truncate,
          excerptSeparator
        )
      } else if (format === `MARKDOWN`) {
        return getExcerptMarkdown(
          markdownNode,
          pruneLength,
          truncate,
          excerptSeparator
        )
      }

      return getExcerptPlain(
        markdownNode,
        pruneLength,
        truncate,
        excerptSeparator
      )
    }

    return resolve({
      html: {
        type: `String`,

        resolve(markdownNode) {
          return getHTML(markdownNode)
        },
      },
      htmlAst: {
        type: `JSON`,

        resolve(markdownNode) {
          return getHTMLAst(markdownNode).then((ast) => {
            const strippedAst = stripPosition(_.clone(ast), true)
            return hastReparseRaw(strippedAst)
          })
        },
      },
      excerpt: {
        type: `String`,
        args: {
          pruneLength: {
            type: `Int`,
            defaultValue: 140,
          },
          truncate: {
            type: `Boolean`,
            defaultValue: false,
          },
          format: {
            type: `MarkdownExcerptFormats`,
            defaultValue: `PLAIN`,
          },
        },

        resolve(markdownNode, { format, pruneLength, truncate }) {
          return getExcerpt(markdownNode, {
            format,
            pruneLength,
            truncate,
            excerptSeparator: pluginOptions.excerpt_separator,
          })
        },
      },
      excerptAst: {
        type: `JSON`,
        args: {
          pruneLength: {
            type: `Int`,
            defaultValue: 140,
          },
          truncate: {
            type: `Boolean`,
            defaultValue: false,
          },
        },

        resolve(markdownNode, { pruneLength, truncate }) {
          return getHTMLAst(markdownNode)
            .then((fullAST) =>
              getExcerptAst(fullAST, markdownNode, {
                pruneLength,
                truncate,
                excerptSeparator: pluginOptions.excerpt_separator,
              })
            )
            .then((ast) => {
              const strippedAst = stripPosition(_.clone(ast), true)
              return hastReparseRaw(strippedAst)
            })
        },
      },
      headings: {
        type: [`MarkdownHeading`],
        args: {
          depth: `MarkdownHeadingLevels`,
        },

        resolve(markdownNode, { depth }) {
          return getHeadings(markdownNode).then((headings) => {
            const level = depth && headingLevels[depth]

            if (typeof level === `number`) {
              headings = headings.filter((heading) => heading.depth === level)
            }

            return headings
          })
        },
      },
      timeToRead: {
        type: `Int`,

        resolve(markdownNode) {
          return getHTML(markdownNode).then((html) => {
            let timeToRead = 0
            const pureText = sanitizeHTML(html, {
              allowTags: [],
            })
            const avgWPM = 265

            const wordCount =
              _.words(pureText).length +
              _.words(
                pureText,
                /[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FD-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\u3400-\u4DB5\u4E00-\u9FEF\uF900-\uFA6D\uFA70-\uFAD9\uFF66-\uFF6F\uFF71-\uFF9D\u{1B000}-\u{1B11E}\u{1B150}-\u{1B152}\u{1B164}-\u{1B167}\u{1F200}\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{2F800}-\u{2FA1D}]/gu
              ).length

            timeToRead = Math.round(wordCount / avgWPM)

            if (timeToRead === 0) {
              timeToRead = 1
            }

            return timeToRead
          })
        },
      },
      tableOfContents: {
        type: `String`,
        args: {
          // TODO:(v3) set default value to false
          absolute: {
            type: `Boolean`,
            defaultValue: true,
          },
          // TODO:(v3) set default value to empty string
          pathToSlugField: {
            type: `String`,
            defaultValue: `fields.slug`,
          },
          maxDepth: `Int`,
          heading: `String`,
        },

        resolve(markdownNode, args) {
          return getTableOfContents(markdownNode, args)
        },
      },
      // TODO add support for non-latin languages https://github.com/wooorm/remark/issues/251#issuecomment-296731071
      wordCount: {
        type: `MarkdownWordCount`,

        resolve(markdownNode) {
          let counts = {}
          unified()
            .use(parse)
            .use(
              remark2retext,
              unified()
                .use(english)
                .use(count)
            )
            .use(stringify)
            .processSync(markdownNode.internal.content)
          return {
            paragraphs: counts.ParagraphNode,
            sentences: counts.SentenceNode,
            words: counts.WordNode,
          }

          function count() {
            return counter

            function counter(tree) {
              visit(tree, visitor)

              function visitor(node) {
                counts[node.type] = (counts[node.type] || 0) + 1
              }
            }
          }
        },
      },
    })
  })
}
