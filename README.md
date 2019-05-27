<p align="center"><img src="https://s3-ap-southeast-1.amazonaws.com/cdn.tuidev.io/graphql-validation.png" width="150" /></p>

# graphql-validation
[![NPM version](https://img.shields.io/npm/v/graphql-validation.svg)](https://www.npmjs.com/package/graphql-validation)
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
- [Contribution](#contribution)
- [License](#license)

## Features
- Based on validator.js
- Validate both args & input types
- Easy to use
- Easy to modularizing
- Pure javascript

## Install
```sh
yarn add graphql-validation
```
or
```sh
npm i --save graphql-validation
```
## Usage
### Basic 
```javascript
const { validator, validate } = require('graphql-validation'); // Import module

const resolver = {
  Mutation: {
    createPost: validator([ // <--- Validate start here
      validate('id').isMongoId(),
      validate('title') // <--- Validate title 
        .isLength({ msg: 'Title is invalid' options: { min: 3, max: 20 } })
        .contains({ msg: 'Title must contains "hi"', options: 'hi' })
        .not().isEmpty({ msg: 'Title is required' }),
      validate('content') // <--- Validate content
        .isLength({ options: { min: 10, max: 20 } }),
    ], (parent, args, context, info) => {
      if (context.validationErrors) {
        // Validate failed
        console.log(context.validationErrors); // Do anything with this errors
        
        return;
      }
    
      // Validate successfully, time to create new post
    }),
  },
};
```
```javascript
Input: { id: 'hellomongo', title: '', content: 'Hi!' };

// console.log(context.validationErrors);
Output: [
  {
    param: 'id',
    msg: 'MongoId is invalid',
  },
  {
    param: 'title',
    msg: 'Title is invalid',
  },
  {
    param: 'title',
    msg: 'Title must contains \"hi\"',
  },
  {
    param: 'title',
    msg: 'Title is required',
  },
  {
    param: 'content',
    msg: 'Invalid value',
  }
];
```

### Validate Input types
```javascript
const { validator, validate } = require('graphql-validation'); // Import module

const resolver = {
  Mutation: {
    createPost: validator([
      validate('title', 'data') // <--- Validate input types
        .not().isEmpty({ msg: 'Title is required' }), 
      validate('content') // <--- Just validate args
        .isLength({ options: { min: 10, max: 20 } }),
    ], (parent, args, context, info) => {
      if (context.validationErrors) {
        // Validate failed
        console.log(context.validationErrors); // Do anything with this errors
        
        return;
      }
    
      // Validate successfully, time to create new post
    }),
  },
};
```
```javascript
Input: { data: { title: '' }, content: 'Hi!' };

// console.log(context.validationErrors);
Output: [
  { param: 'title', msg: 'Title is required' },
  { param: 'content', msg: 'Invalid value' },
];
```

> To get started with `graphql-validation`, you can refer to this [example](example).


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
| `config`                  | `Object { msg: string, options: any }` | `{ msg: 'Invalid value' }`  | `msg`: Custom error message, `options`: options of [validator functions](https://github.com/chriso/validator.js#validators).  

## Contribution
Contribution are always **welcome and recommended**! Here is how:

- Fork the repository ([here is the guide](https://help.github.com/articles/fork-a-repo/)).
- Clone to your machine `git clone https://github.com/YOUR_USERNAME/graphql-validation.git`
- Make your changes
- Create a pull request

## License
`graphql-validation` is released under the MIT license. See [LICENSE](./LICENSE) for details.  
  
Any question or support will welcome.
