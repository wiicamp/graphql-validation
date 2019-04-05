# graphql-validation
`graphql-validation` is a GraphQL middleware that wraps [validator.js](https://github.com/chriso/validator.js) validator functions.

## Table of Contents
- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [License](#license)

## Features
- Based on validator.js
- Validate both args & input type
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

## API
#### `validator(rules: array, controller: function)`
| Args                         | Type                                                            | Default | Description                                                                                                                                                                                                                                              |
| --------------------------- | --------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rules`                  | `Array` | `undefined`  |  List of validation's rules. **Required**.                                            |
| `controller`             | `Function`              | `undefined`       | Controller of mutation's field. **Required**. |
     
#### `validate(param: string)`
| Args                         | Type                                                            | Default | Description                                                                                                                                                                                                                                              |
| --------------------------- | --------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `param`                  | `String` | `undefined`  |  Name of param. **Required**.                                            |
#### [Validator functions](https://github.com/chriso/validator.js#validators) 
| Args                         | Type                                                            | Default | Description                                                                                                                                                                                                                                              |
| --------------------------- | --------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`                  | `Object` | `{ msg: 'Invalid value' }`  | Option of [validator functions](https://github.com/chriso/validator.js#validators).  

## License
`graphql-validation` is released under the MIT license. See [LICENSE](./LICENSE) for details.  
  
Any question or support will welcome.
