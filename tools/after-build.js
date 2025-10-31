/* eslint-disable */
const fs = require('fs')
const path = require('path')
/* eslint-enable */

const pkgRelativeFile = 'package.json'
const pkgSourceFile = path.join(__dirname, '../', pkgRelativeFile)
const pkgTargetFiles = [
  path.join(__dirname, '../dist/cjs/pkg.json'),
  path.join(__dirname, '../dist/esm/pkg.json'),
]

const rs2 = fs.createReadStream(pkgSourceFile)
rs2.pipe(fs.createWriteStream(pkgTargetFiles[0]))
rs2.pipe(fs.createWriteStream(pkgTargetFiles[1]))
