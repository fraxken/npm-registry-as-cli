# Npm-registry-as-cli
Get the JSON payload returned by the NPM registry for a given package.

## Getting Started
This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm install npm-registry-as-cli -g
# or
$ npx npm-registry-as-cli
```

## Usage example
When installed globally the `npmreg` executable will be exposed in your terminal

```bash
$ npmreg httpie
```

for a given version of a package

```bash
$ npmreg httpie 1.1.2
```

## License
MIT
