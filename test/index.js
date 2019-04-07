/* eslint-disable */
const { expect } = require('chai');

const { validator, validate } = require('../src/index.js');

describe('Validator function test', () => {
  it('Validate args', () => {
    let errors = [];
    const args = { title: '' };

    validator([
      validate('title')
        .not().isEmpty(),
    ], (parent, args, context, info) => {
      errors = context.validationErrors;
    })({}, args, {}, {});

    const result = [{ param: 'title', msg: 'Invalid value'}];

    expect(JSON.stringify(errors)).to.equal(JSON.stringify(result));
  });

  it('Validate input types', () => {
    let errors = [];
    const args = { data: { title: '' } };

    validator([
      validate('title', 'data')
        .not().isEmpty(),
    ], (parent, args, context, info) => {
      errors = context.validationErrors;
    })({}, args, {}, {});

    const result = [{ param: 'title', msg: 'Invalid value' }];

    expect(JSON.stringify(errors)).to.equal(JSON.stringify(result));
  });
});
