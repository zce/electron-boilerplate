# Electron Boilerplate

A boilerplate application for Electron runtime

[![Build Status](https://travis-ci.org/zce/electron-boilerplate.svg?branch=vue)](https://travis-ci.org/zce/electron-boilerplate)
[![Dependency Status](https://david-dm.org/zce/electron-boilerplate.svg)](https://david-dm.org/zce/electron-boilerplate)
[![devDependency Status](https://david-dm.org/zce/electron-boilerplate/dev-status.svg)](https://david-dm.org/zce/electron-boilerplate#info=devDependencies)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


## Quick start

The only development dependency of this project is Node.js. So just make sure you have it installed. Then type few commands known to every Node developer...

```bash
$ git clone https://github.com/zce/electron-boilerplate.git your-proj-name -b vue
$ cd your-proj-name
$ npm install
$ npm run watch
# Open a new terminal and run
$ npm run boot
```

... and boom! You have running desktop application on your screen.

### Then you can ...

1. Rewrite the `package.json`
  - `./package.json` remove all fields without `script`, `dependencies` and `devDependencies`
  - `./app/package.json`
  - `./build/package.json`

2. Put your application icons in `./tasks/resources` to replace original

3. Change asar auto updater repo url
  - create new repo for dist update
  - clone the repo to `./dist`
  - change repo config in `./tasks/updater.config.json`

4. First of all, Run `npm run dist` to create dist file
  - run `npm run dist` in proj folder
  - commit `dist` folder

## License

The MIT License (MIT)

Copyright (c) 2016 汪磊

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## NPM 

```bash
npm i vue vue-i18n vue-router vuex --save
```

```bash
npm i babel-core babel-loader babel-plugin-transform-runtime babel-preset-es2015 babel-preset-es2015-loose bluebird copy-webpack-plugin cross-env css-loader del electron-packager electron-prebuilt eslint eslint-config-standard eslint-friendly-formatter eslint-loader eslint-plugin-html eslint-plugin-promise eslint-plugin-standard extract-text-webpack-plugin file-loader gulp gulp-eslint gulp-gzip gulp-jsonminify gulp-load-plugins gulp-rename gulp-util html-webpack-plugin json-loader less less-loader minimist style-loader url-loader vue-hot-reload-api@1 vue-html-loader vue-loader vue-style-loader webpack webpack-dashboard webpack-dev-server webpack-merge --save-dev
```
