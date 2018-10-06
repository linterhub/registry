# @linterhub/registry [![travis][shield-travis]][travis-url] [![semantic][shield-semantic]][semantic-url] [![npm][shield-npm]][repo-npm] [![github][shield-github]][repo-release-url]

> Registry provides an interface for obtaining information about `packages` from various `package managers`

## Table of Contents

- Background
- Installation
- Usage
- Contribute
- License

## Background

There are a [lot of package manager][wiki-managers-url] with different API, which each have
different methods and output. This repository contains a proposal to
unified API for work with of various API.

> More details in [doс][repo-doc] or at [the catalog page][catalog-url]

## Installation

### NPM

Requirements:

- [Node.js][node-js-url] 7.4+
- [npm][npm-url] 4+

```bash
npm install @linterhub/registry
```

### GitHub

All releases and the source code are available for download
at [GitHub Releases][repo-release-url].

## Usage

### JavaScript

Get meta-information of `packageName` from `npm` and output it to console:

```javascript
const registry = require('@linterhub/registry');
const manager = registry.getManager('npm');
manager.getMeta('packageName').then((data) => {
    console.log(data);
});
```

Supported package managers:

- [`npm`][npm-url]
- [`gem`][gem-url]
- [`pip`][pip-url]
- [`composer`][composer-url]
- [`nuget`][nuget-url]

### API

#### getMeta(name, [version])

Get meta-information of package

Options:

- `name`: string - package name by search
- `version`: string - package version [`latest` by default]

Return:

- `Promise` - package meta-information, which include: `name`, `url`, `license` and e.t.c

#### getDeps(name, [version])

Get dependencies for a package

Options:

- `name`: string -  package name by search
- `version`: string - package version [`latest` by default]

Return:

- `Promise` - objects array, where the object is one dependency.

#### getVersions(name)

Get all versions by package name

Options:

- `name`: string - package name by search

Returns:

- `Promise`- versions array

## Contribute

You may contribute in several ways like requesting new features,
adding tests, fixing bugs, improving documentation or examples.
Please check our [contributing guidelines][repo-contributing].

## License

[MIT][repo-license]

[repo-doc]: https://github.com/linterhub/registry/blob/master/docs
[repo-url]: https://github.com/linterhub/registry
[repo-npm]: https://www.npmjs.com/package/@linterhub/registry
[repo-license]: https://github.com/linterhub/registry/blob/master/LICENSE.md
[repo-release-url]: https://github.com/linterhub/registry/releases
[repo-contributing]: https://github.com/linterhub/registry/blob/master/.github/CONTRIBUTING.md
[shield-npm]: https://img.shields.io/npm/v/@linterhub/registry.svg
[shield-github]: https://img.shields.io/github/release/linterhub/registry.svg?label=github
[shield-travis]: https://travis-ci.com/linterhub/registry.svg?branch=master
[shield-semantic]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[npm-url]: https://www.npmjs.com
[pip-url]: https://pypi.org/project/pip/
[gem-url]: https://rubygems.org
[nuget-url]: https://www.nuget.org
[travis-url]: https://travis-ci.org/registry/schema/branches
[node-js-url]: https://nodejs.org
[catalog-url]: https://github.com/linterhub/catalog
[composer-url]: https://getcomposer.org
[semantic-url]: https://github.com/semantic-release/semantic-release
[wiki-managers-url]: https://en.wikipedia.org/wiki/List_of_software_package_management_systems
