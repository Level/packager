# level-packager

> `levelup` package helper for distributing with an `abstract-leveldown` compatible back-end

[![level badge][level-badge]](https://github.com/level/awesome)
[![npm](https://img.shields.io/npm/v/level-packager.svg)](https://www.npmjs.com/package/level-packager)
![Node version](https://img.shields.io/badge/Node.js-%3E%3D6.0.0-orange.svg?style=flat-square)
[![Build Status](https://secure.travis-ci.org/Level/packager.png)](http://travis-ci.org/Level/packager)
[![dependencies](https://david-dm.org/Level/packager.svg)](https://david-dm.org/level/packager)
[![npm](https://img.shields.io/npm/dm/level-packager.svg)](https://www.npmjs.com/package/level-packager)

Exports a single function which takes a single argument, an `abstract-leveldown` compatible storage back-end for [`levelup`](https://github.com/Level/levelup). The function returns a constructor function that will bundle `levelup` with the given `abstract-leveldown` replacement. The full API is supported, including optional functions, `destroy()`, and `repair()`. Encoding functionality is provided by [`encoding-down`](https://github.com/Level/encoding-down).

For example use-cases, see:

* [`level`](https://github.com/Level/level)
* [`level-mem`](https://github.com/Level/level-mem)
* [`level-hyper`](https://github.com/Level/level-hyper)
* [`level-lmdb`](https://github.com/Level/level-lmdb)

Also available is a *test.js* file that can be used to verify that the user-package works as expected.

<a name="contributing"></a>
Contributing
------------

`level-packager` is an **OPEN Open Source Project**. This means that:

> Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.

See the [contribution guide](https://github.com/Level/community/blob/master/CONTRIBUTING.md) for more details.

<a name="license"></a>
License &amp; Copyright
-------------------

Copyright (c) 2012-2017 `level-packager` [contributors](https://github.com/level/community#contributors).

`level-packager` is licensed under the MIT license. All rights not explicitly granted in the MIT license are reserved. See the included `LICENSE.md` file for more details.

[level-badge]: http://leveldb.org/img/badge.svg
