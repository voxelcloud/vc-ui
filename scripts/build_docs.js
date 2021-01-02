const path = require('path')
const fs = require('fs')
const shell = require('shelljs')
const ora = require('ora')
const symbols = require('log-symbols')
const chalk = require('chalk')
const { mkDir, rmDir, copyDir } = require('./shell/command')
const cwd = process.cwd()

const TEMP_DIR = 'gh_pages'
const TARGET_DIR = './'
const SOURCE_DIR = '.docz'

async function buildDocs() {
  createHtml()
  afterBuild()
}

// 生成HTML
function createHtml() {
  let spinner = ora('Create Docs HTML...')
  spinner.start()
  shell.exec('npm run docz:build')
  spinner.succeed()
  console.log(symbols.success, chalk.green('The docs HTML has created successfully!'))
}

function afterBuild() {
  cleanOldDir()
  copyTargetDir()
  console.log(symbols.success, chalk.green('The docs has built successfully!'))
}

// 清除旧目录
function cleanOldDir() {
  const target = path.resolve(cwd, TEMP_DIR, TARGET_DIR)
  if (fs.existsSync(target)) {
    rmDir(target)
    console.log(symbols.success, chalk.green('clean old gh-pages docs successfully!'))
  }
}
// 拷贝目标文件夹
function copyTargetDir() {
  const from = path.resolve(SOURCE_DIR, 'dist/*')
  const to = path.resolve(cwd, TEMP_DIR, TARGET_DIR)
  if (!fs.existsSync(to)) {
    mkDir(to)
  }
  copyDir(from, to)
}

// 移除缓存
// function removeTemp() {
//   const target = path.resolve(cwd, TEMP_DIR)
//   if (fs.existsSync(target)) {
//     rmDir(target)
//     console.log(symbols.success, chalk.green(`remove ${target} successfully!'`))
//   }
// }
module.exports.buildDocs = buildDocs
// module.exports.removeTemp = removeTemp