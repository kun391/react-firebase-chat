# react-firebase-chat
Firebase chat example with react redux
## Requirements
- Node >= 6.x

## Install

```sh
$ npm install
```

## Run & Build

```sh
# for development
$ npm run dev

# for build
$ npm run build
```

## Convension
- Use ES6 (transpiled with Babel)
- Use Webpack
- Use JSX
- Always look at your bundle size

  One tip to making your bundle way smaller is to import directly from the node module root path.

  Do this:

    `import Foo from ‘foo/Foo’`

  instead of:

    `import {Foo} from ‘foo’`
- Keep your components small (Very Small)
- Use PropTypes to set data validation for components
- Always bind the functions in the constructor method
- Avoid Refs