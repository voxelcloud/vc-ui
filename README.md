vc-ui
========

[![NPM package][npm]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Build Status][build-status]][build-status-url]

### Document

[document](https://harrychen0506.github.io/vc-ui/)

### Usage

* Install

``` bash
yarn add voxelcloud-ui
```

* Usage

``` javascript
import { Button } from 'voxelcloud-ui';

<Button color="primary" size="large">
    大号主按钮
</Button>
```

### Development

* Dev

``` bash
yarn install
npm run dev
```

* Code commit

``` bash
npm run commit
```

### Release

1.  Create Standard Version

``` bash
cd /
# 注意以下命令需选择：
npm run release # 默认补丁版本 增加0.0.1
npm run release -- --first-release # 首次发布
npm run release -- --prerelease # 预发布 This will tag your version as: 1.0.1-0
npm run release -- --prerelease alpha # This will tag the version as: 1.0.1-alpha.0
npm run release -- --release-as major # 主版本变更
npm run release -- --release-as minor # 次级版本变更
npm run release -- --release-as patch # 补丁版本变更
npm run release -- --release-as 1.1.0 # 变更指定版本
```

2. Build

``` bash
npm run build
```

3. Npm Publish

``` bash
git push --follow-tags origin [branchName] # branchName 分支名
npm publish 
```

[npm]: https://img.shields.io/npm/v/voxelcloud-ui.svg
[npm-url]: https://www.npmjs.com/package/voxelcloud-ui
[npm-downloads-image]: http://img.shields.io/npm/dm/voxelcloud-ui.svg?style=flat
[build-status]: https://www.travis-ci.org/HarryChen0506/vc-ui.svg?branch=develop
[build-status-url]: https://www.travis-ci.org/HarryChen0506/vc-ui
