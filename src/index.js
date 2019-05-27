/* eslint-disable func-names */
const validatorJS = require('validator');

const validatorKeys = Object.keys(validatorJS).filter(key => key.startsWith('is'));
validatorKeys.push('contains', 'equals', 'matches');

let errors = [];

module.exports = {
  validator(rules, next) {
    const middleware = (parent, args, context, info) => {
      rules.forEach((func) => {
        func.exec(args);
      });

      if (errors.length > 0) {
        const ctx = context;
        ctx.validationErrors = errors;
        errors = [];
      }

      return next(parent, args, context, info);
    };

    return middleware;
  },

  validate(param, input) {
    const obj = {
      callbackFuncs: [],
      isNegateNext: false,
      methods: {
        not() {
          const func = () => {
            obj.isNegateNext = true;
          };

          obj.callbackFuncs.push(func);

          return this;
        },
        exec(args) {
          const params = input ? args[input] : args;

          obj.callbackFuncs.forEach((func) => {
            func(params);
          });
        },
      },
    };

    validatorKeys.forEach((key) => {
      obj.methods[key] = function (config = {}) {
        const func = (args = { [param]: '' }) => {
          const validationResult = validatorJS[key](`${args[param]}`, config.options);
          const isError = !obj.isNegateNext ? !validationResult : validationResult;

          if (isError) {
            const validationError = {
              param,
              msg: config.msg || 'Invalid value',
            };

            errors.push(validationError);
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
