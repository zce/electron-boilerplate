# electron-boilerplate

[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

> A boilerplate application with Vue.js framework for [Electron](https://electronjs.org) runtime.

## Usage

Click the "Use this template" button.

Alternatively, create a new directory and then run:

```sh
$ mkdir my-project
$ cd my-project
$ curl -fsSL https://github.com/zce/electron-boilerplate/archive/master.tar.gz | tar -xz --strip-components 1
```

Or git clone:

```sh
$ git clone https://github.com/zce/electron-boilerplate.git --depth 1 my-project
```

Active Travis CI

Create new GitHub token with public_repo scope: https://github.com/settings/tokens，Set in travis-ci.org dashboard

```
GH_TOKEN=<your github token>
```

After Travis finishes building your app, open the release draft it created and click "Publish".

## Features

- [`electron-builder`](https://www.electron.build) fully set up to create cross-platform builds
- [Builds the app on Travis](https://www.electron.build/multi-platform-build#sample-travisyml-to-build-electron-app-for-macos-linux-and-windows)
- [Silent auto-updates](https://www.electron.build/auto-update)
- App menu that adheres to the system user interface guidelines
- [Config handling](https://github.com/sindresorhus/electron-store)
- [Context menu](https://github.com/sindresorhus/electron-context-menu)
- [User-friendly handling of unhandled errors](https://github.com/sindresorhus/electron-unhandled)
- Easily publish new versions to GitHub Releases
- And much more!

## Todos

- [ ] Something

## dependencies

- source-map-support

## devDependencies

- @commitlint/cli
- @commitlint/config-conventional
- @vue/eslint-config-standard
- @vue/eslint-config-typescript
- commitizen
- cz-conventional-changelog
- electron
- electron-builder
- electron-webpack
- eslint
- eslint-friendly-formatter
- eslint-loader
- eslint-plugin-vue
- fork-ts-checker-webpack-plugin
- husky
- lint-staged
- node-sass
- prettier
- sass-loader
- standard-version
- ts-loader
- typescript
- vue
- vue-html-loader
- vue-i18n
- vue-loader
- vue-property-decorator
- vue-router
- vue-style-loader
- vue-template-compiler
- vuex
- vuex-class
- webpack
- webpack-build-notifier

## References

> Helpful links

- https://github.com/zeng450026937/RTVC
- https://github.com/electron/electron-quick-start/blob/master/main.js
- https://github.com/mawie81/electron-window-state
- https://github.com/sindresorhus/electron-boilerplate
- https://github.com/sindresorhus/electron-util
- https://github.com/sindresorhus/electron-store
- https://github.com/sindresorhus/electron-context-menu
- https://github.com/sindresorhus/electron-dl
- https://github.com/sindresorhus/electron-debug
- https://github.com/sindresorhus/electron-unhandled
- https://github.com/sindresorhus/electron-reloader
- https://github.com/sindresorhus/electron-serve
- https://github.com/sindresorhus/np

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; [汪磊](https://zce.me)

[travis-image]: https://img.shields.io/travis/zce/electron-boilerplate.svg
[travis-url]: https://travis-ci.org/zce/electron-boilerplate
[codecov-image]: https://img.shields.io/codecov/c/github/zce/electron-boilerplate.svg
[codecov-url]: https://codecov.io/gh/zce/electron-boilerplate
[license-image]: https://img.shields.io/github/license/zce/electron-boilerplate.svg
[license-url]: https://github.com/zce/electron-boilerplate/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/zce/electron-boilerplate.svg
[dependency-url]: https://david-dm.org/zce/electron-boilerplate
[devdependency-image]: https://img.shields.io/david/dev/zce/electron-boilerplate.svg
[devdependency-url]: https://david-dm.org/zce/electron-boilerplate?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: http://standardjs.com
