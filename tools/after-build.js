/* eslint-disable */
const fs = require('fs')
const path = require('path')
/* eslint-enable */

const protoRelativeFile = 'grpc/proto/v1/config.proto'
const protoSourceFile = path.join(__dirname, '../src/', protoRelativeFile)
const protoTargetFiles = [
  path.join(__dirname, '../dist/cjs', protoRelativeFile),
  path.join(__dirname, '../dist/esm', protoRelativeFile),
]

const rs = fs.createReadStream(protoSourceFile)
rs.pipe(fs.createWriteStream(protoTargetFiles[0]))
rs.pipe(fs.createWriteStream(protoTargetFiles[1]))

const pkgRelativeFile = 'package.json'
const pkgSourceFile = path.join(__dirname, '../', pkgRelativeFile)
const pkgTargetFiles = [
  path.join(__dirname, '../dist/cjs/env/pkg.json'),
  path.join(__dirname, '../dist/esm/env/pkg.json'),
]

const rs2 = fs.createReadStream(pkgSourceFile)
rs2.pipe(fs.createWriteStream(pkgTargetFiles[0]))
rs2.pipe(fs.createWriteStream(pkgTargetFiles[1]))
