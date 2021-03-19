import alias from 'rollup-plugin-alias'
import { eslint } from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import json from 'rollup-plugin-json'

export default {
  input: 'src/index.js',
  // external: ['react', 'react-dom', 'react-is'],
  external: id => id.includes('@material-ui') || [
    'react',
    'react-dom',
    'react-is',
    'clsx',
    'axios',
    'path-to-regexp',
    'qs'
  ].includes(id),
  plugins: [
    json(),
    alias({
      resolve: ['.js']
    }),
    replace({
      '__NODE_ENV__': JSON.stringify(process.env.NODE_ENV || 'development'),
      '__DEV__': process.env.NODE_ENV === 'development',
    }),
    resolve(),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**',
    }),
    eslint({
      include: ['src/**/*.js'],
      exclude: ['node_modules/**'],
      throwOnError: false,
      throwOnWarning: false,
      fix: true,
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
}