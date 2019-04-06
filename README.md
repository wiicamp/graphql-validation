# graphql-validation
[![NPM version](https://img.shields.io/npm/v/graphql-validation.svg)](https://img.shields.io/npm/v/graphql-validation.svg)
[![Minified size](https://img.shields.io/bundlephobia/min/graphql-validation.svg)](https://img.shields.io/bundlephobia/min/graphql-validation.svg)
[![License: MIT](https://img.shields.io/npm/l/graphql-validation.svg)](https://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/havinhthai/graphql-validation.svg)](https://david-dm.org/havinhthai/graphql-validation.svg)
[![TravisCI](https://travis-ci.org/havinhthai/graphql-validation.svg?branch=master)](https://travis-ci.org/havinhthai/graphql-validation.svg?branch=master)

`graphql-validation` is a GraphQL middleware that wraps [validator.js](https://github.com/chriso/validator.js) validator functions.

## Table of Contents
- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [License](#license)

## Features
- Based on validator.js
- Validate both args & input types
- Easy to use
- Easy to modularizing
- Pure javascript

## Install
```sh
npm i --save graphql-validation
```
or
```sh
yarn add graphql-validation
```

## Usage
### Basic 
```javascript
const { validator, validate } = require('graphql-validation'); // Import module

const resolver = {
  Mutation: {
    createPost: validator([
      validate('title').not().isEmpty({ msg: 'Title is required' }),
      validate('content').isLength({ min: 10, max: 20 }),
    ], (parent, args, context, info) => {
      if (context.validateErrors.length > 0) {
        // Validate failed
        console.log(context.validateErrors); // Do anything with this errors
        
        return;
      }
    
      // Validate successfully, time to create new post
    }),
  },
};
```
```javascript
// console.log(context.validateErrors);
[
  { param: 'title', msg: 'Title is required' },
  { param: 'content', msg: 'Invalid value' },
]
```

### With Input types
```javascript
const { validator, validate } = require('graphql-validation'); // Import module

const resolver = {
  Mutation: {
    createPost: validator([
      validate('title', 'data').not().isEmpty({ msg: 'Title is required' }), // <-- add name of input in second param
      validate('content').isLength({ min: 10, max: 20 }),
    ], (parent, args, context, info) => {
      if (context.validateErrors.length > 0) {
        // Validate failed
        console.log(context.validateErrors); // Do anything with this errors
        
        return;
      }
    
      // Validate successfully, time to create new post
    }),
  },
};
```

## API
#### `validator(rules: array, controller: function)`
| Args                         | Type                                                            | Default | Description                                                                                                                                                                                                                                              |
| --------------------------- | --------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rules`                  | `Array` | `undefined`  |  List of validation's rules. **Required**.                                            |
| `controller`             | `Function`              | `undefined`       | Controller of mutation's field. **Required**. |
     
#### `validate(param: string, input: string)`
| Args                         | Type                                                            | Default | Description                                                                                                                                                                                                                                              |
| --------------------------- | --------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `param`                  | `String` | `undefined`  |  Name of param. **Required**.                                            |
| `input`                  | `String` | `undefined`  |  Name of input. Options.                                            |

#### Validator functions 
| Args                         | Type                                                            | Default | Description                                                                                                                                                                                                                                              |
| --------------------------- | --------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`                  | `Object` | `{ msg: 'Invalid value' }`  | Option of [validator functions](https://github.com/chriso/validator.js#validators).  

## License
`graphql-validation` is released under the MIT license. See [LICENSE](./LICENSE) for details.  
  
Any question or support will welcome.
