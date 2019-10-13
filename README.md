# Graph

> This app is using https://github.com/jaredpalmer/tsdx *- Zero-config CLI for TypeScript package development

In the production, I'd rather use pure `node-based` app, but in the requirements are `js/ts`. Therefore, in this example is no docker. 

## Stack
- https://github.com/jaredpalmer/tsdx
- Node
- TypeScript
- ES6
- Jest

## Usage (the `dist` folder)
- run
  - `node dist/index.js <file> <entityId>`
  - e. g. `node dist/index.js inputs/example/input.json 5` 

## Installation

- `npm run install`

## Development

- `npm run start`

## Production

- `npm run build` - Bundles the package to the `dist` folder

## Tests

- `npm run test`
