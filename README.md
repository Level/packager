# level-packager

**Superseded by [`abstract-level`](https://github.com/Level/abstract-level). Please see [Frequently Asked Questions](https://github.com/Level/community#faq).**

## API

Exports a single function which takes a single argument, an `abstract-leveldown` compatible storage back-end for [`levelup`](https://github.com/Level/levelup). The function returns a constructor function that will bundle `levelup` with the given `abstract-leveldown` replacement. The full API is supported, including optional functions, `destroy()`, and `repair()`. Encoding functionality is provided by [`encoding-down`](https://github.com/Level/encoding-down).

The constructor function has a `.errors` property which provides access to the different error types from [`level-errors`](https://github.com/Level/errors#api).

For example use-cases, see:

- [`level`](https://github.com/Level/level)
- [`level-mem`](https://github.com/Level/level-mem)
- [`level-hyper`](https://github.com/Level/level-hyper)
- [`level-lmdb`](https://github.com/Level/level-lmdb)

Also available is a _test.js_ file that can be used to verify that the user-package works as expected.

_If you are upgrading: please see [`UPGRADING.md`](UPGRADING.md)._

## Contributing

[`Level/packager`](https://github.com/Level/packager) is an **OPEN Open Source Project**. This means that:

> Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.

See the [Contribution Guide](https://github.com/Level/community/blob/master/CONTRIBUTING.md) for more details.

## License

[MIT](LICENSE)
