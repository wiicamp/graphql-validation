const { validator, validate } = require('graphql-validation');

let { books, users } = require('../seeding'); // eslint-disable-line

const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    createBook: validator([ // Validation time!!!!!
      validate('title')
        .not().isEmpty({ msg: 'Title is required' })
        .contains({ msg: 'Title must be contains "GraphQL"', options: 'GraphQL'}),

      validate('content')
        .not().isEmpty()
        .isLength({ msg: 'Content must be more than 5 characters', options: { min: 5 }}),
    ], (parent, args, context, info) => {
      if (context.validationErrors) {
        // Handle Error
        return {
          message: '400 Bad Request',
          errors: context.validationErrors,
        }
      }

      const { title, content } = args;

      const id = `b${books.length}`;

      books.push({
        id,
        title,
        content,
      });

      return {
        message: '201 Created',
        book: {
          title,
          content,
        },
      };
    }),
  },
};

module.exports = resolvers;
