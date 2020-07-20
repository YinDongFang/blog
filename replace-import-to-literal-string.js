'use strict'

const {default: template} = require('@babel/template')

module.exports = function({types: t}) {
  return {
    name: 'replace-import-to-literal-string',
    visitor: {
      ImportDeclaration: {
        exit(path) {
          const source = path.node.source.value
          const views = /^@\/?views\//
          const routes = /routeEnums/
          const permissions = /permissionEnums/
          // 替换view的import为字符串
          if (views.test(source)) {
            const value = path.node.source.value.replace(views, '')
            const values = Array.apply(null, Array(path.node.specifiers.length)).map(() => `'${value}'`)
            const keys = path.node.specifiers.map((item) => item.local.name)
            path.replaceWith(template.ast(`const [${keys.join()}] = [${values.join()}]`))
          }
          // 删除routeEnum引用
          else if (routes.test(source)) {
            path.remove()
          }
          // 删除permissionEnum引用
          else if (permissions.test(source)) {
            path.remove()
          }
        },
      },
      CallExpression: {
        // 替换 import view 为字符串
        exit(path) {
          const judge = () => t.isImport(path.node.callee) && t.isMemberExpression(path.parentPath.node) && t.isCallExpression(path.parentPath.parentPath.node)
          if (judge()) {
            do {
              path.parentPath.parentPath.replaceWith(path.node)
              path = path.parentPath.parentPath
            } while (judge())
            path.replaceWith(t.stringLiteral(path.node.arguments[0].value.replace(/^@\/?views\//, '')))
          }
        },
      },
      MemberExpression: {
        // 替换RouteEnums和PERMISSION_PAGE为字符串
        exit(path) {
          if (t.isIdentifier(path.node.object) && (path.node.object.name === 'PERMISSION_PAGE' || path.node.object.name === 'RouteEnums')) path.replaceWith(t.stringLiteral(path.node.property.name))
        },
      },
    },
  }
}
