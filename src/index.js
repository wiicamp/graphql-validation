/* eslint-disable func-names */
const validatorJS = require('validator');

const validatorKeys = Object.keys(validatorJS).filter(key => key.startsWith('is'));

let errors = [];

module.exports = {
  validator(rules, next) {
    const middleware = (parent, args, context, info) => {
      rules.forEach((func) => {
        func.exec(args);
      });

      if (errors.length > 0) {
        const ctx = context;
        ctx.validateErrors = errors;
        errors = [];
      }

      return next(parent, args, context, info);
    };

    return middleware;
  },

  validate(field) {
    const obj = {
      callbackFuncs: [],
      isNegateNext: false,
      methods: {
        not() {
          obj.isNegateNext = true;

          return this;
        },
        exec(args) {
          obj.callbackFuncs.forEach((func) => {
            func(args);
          });
        },
      },
    };

    validatorKeys.forEach((key) => {
      obj.methods[key] = function (options = {}) {
        const func = (args = {}) => {
          const validateValue = validatorJS[key](args[field], options);
          const isError = !obj.isNegateNext ? !validateValue : validateValue;

          if (isError) {
            const validateError = {
              param: field,
              msg: options.msg || 'Invalid value',
            };

            errors.push(validateError);
          }

          obj.isNegateNext = false;
        };

        obj.callbackFuncs.push(func);

        return obj.methods;
      };
    });

    return obj.methods;
  },
};
