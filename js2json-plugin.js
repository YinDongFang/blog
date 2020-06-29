'use strict'

module.exports = function({types: t}) {
  return {
    name: 'transform-property-literals',
    visitor: {
      // { 'foo': 'bar' } -> { foo: 'bar' }
      ObjectProperty: {
        exit(path) {
          // get old key path and value path
          const key = path.get('key')
          if (!key.isIdentifier()) return

          // replace node
          const newNode = t.clone(path.node)
          newNode.key = t.stringLiteral(key.node.name)
          newNode.computed = false
          path.replaceWith(newNode)
        },
      },
      ExportDefaultDeclaration: {
        exit(path) {
          path.replaceWith(path.node.declaration)
        },
      },
    },
  }
}
