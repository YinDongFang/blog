'use strict'

const {default: template} = require('@babel/template')

module.exports = function({types: t}) {
  return {
    name: 'entry-js-handler',
    pre() {
      this.isEntry = false
    },
    visitor: {
      Program: {
        enter(path) {
          this.isEntry = path.node.directives.length && path.node.directives[0].value.value === 'entry'
        },
      },
      ExportDefaultDeclaration: {
        exit(path) {
          if (this.isEntry) {
            const exports = template.ast('module.exports = x')
            exports.expression.right = path.node.declaration
            path.replaceWith(exports)
          }
        },
      },
    },
  }
}
