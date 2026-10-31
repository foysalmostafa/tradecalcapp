/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const project = process.env.TRADECALC_PROJECT || path.resolve(__dirname, '..');
const deps = createRequire(path.join(project, 'package.json'));
const ts = deps('typescript');
const compiled = new Map();

function load(file, values = {}, inspect = false) {
  const cache = new Map();
  function moduleAt(filename) {
    if (cache.has(filename)) return cache.get(filename);
    const source = fs.readFileSync(filename, 'utf8');
    const cacheKey = filename + inspect;
    const output = compiled.get(cacheKey) || ts.transpileModule(source, {
      compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
      transformers: { before: [context => root => {
        function visit(node) {
          if (ts.isVariableDeclaration(node) && ts.isArrayBindingPattern(node.name) && node.initializer && ts.isCallExpression(node.initializer) && node.initializer.expression.getText(root) === 'useState') {
            const key = node.name.elements[0].name.getText(root);
            return ts.factory.updateVariableDeclaration(node, node.name, node.exclamationToken, node.type,
              ts.factory.createCallExpression(ts.factory.createIdentifier('__state'), undefined, [ts.factory.createStringLiteral(key), node.initializer.arguments[0]]));
          }
          if (inspect && ts.isFunctionDeclaration(node) && /Calc$/.test(node.name?.text || '') && node.body) {
            const names = [];
            for (const statement of node.body.statements) {
              if (ts.isVariableStatement(statement)) for (const decl of statement.declarationList.declarations) {
                if (ts.isIdentifier(decl.name)) names.push(decl.name.text);
              }
            }
            const statements = node.body.statements.map(statement => ts.isReturnStatement(statement)
              ? ts.factory.createReturnStatement(ts.factory.createObjectLiteralExpression(names.map(name => ts.factory.createShorthandPropertyAssignment(name))))
              : ts.visitNode(statement, visit));
            return ts.factory.updateFunctionDeclaration(node, node.modifiers, node.asteriskToken, node.name, node.typeParameters, node.parameters, node.type, ts.factory.updateBlock(node.body, statements));
          }
          return ts.visitEachChild(node, visit, context);
        }
        return ts.visitNode(root, visit);
      }] }
    }).outputText;
    compiled.set(cacheKey, output);
    const loadedModule = { exports: {} };
    cache.set(filename, loadedModule.exports);
    const localRequire = name => name === 'react' ? { ...deps(name), useCallback: fn => fn } : name.startsWith('.') ? moduleAt(resolve(path.resolve(path.dirname(filename), name))) : deps(name);
    const state = (name, initial) => [Object.hasOwn(values, name) ? values[name] : initial, value => { values[name] = value; }];
    new Function('require', 'module', 'exports', '__state', output)(localRequire, loadedModule, loadedModule.exports, state);
    return loadedModule.exports;
  }
  function resolve(base) { return ['', '.tsx', '.ts', '.js'].map(ext => base + ext).find(p => fs.existsSync(p)); }
  return moduleAt(resolve(path.resolve(__dirname, '..', file)));
}
module.exports = { load, deps };
