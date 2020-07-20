'use strict'

const {default: template} = require('@babel/template')

module.exports = function({types: t}) {
  return {
    name: 'normalize-route-object',
    pre() {
      this.filepath = ''
    },
    visitor: {
      Program: {
        enter(path) {
          this.filepath = path.node.directives.length && path.node.directives[0].value.value
        },
      },
      ObjectExpression: {
        exit(path) {
          const route = {}
          path.node.properties.forEach((property) => {
            route[property.key.name] = property.value
          })
          if (route.name && route.path) {
            path.node.properties.push(t.objectProperty(t.identifier('filepath'), t.stringLiteral(this.filepath)))
          }
        },
      },
    },
  }
}
