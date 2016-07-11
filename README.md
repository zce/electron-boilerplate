# electron-boilerplate

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

 A boilerplate application for Electron runtime

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


"watch": "cross-env NODE_ENV=development webpack-dev-server --hot --inline --colors",
    "clean": "rimraf build",
    "preboot": "npm run clean && cross-env NODE_ENV=development webpack --progress --hide-modules",
    "boot": "cross-env NODE_ENV=development electron build",
    "dev": "node tasks/runner",
    "build": "npm run clean && cross-env NODE_ENV=production webpack --progress --hide-modules -p",
    "prestart": "npm run build",
    "start": "cross-env NODE_ENV=production electron build",
    "release": "node tasks/release",
