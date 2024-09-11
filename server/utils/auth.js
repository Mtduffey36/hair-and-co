const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { user } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = user;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ _id, name, lastName, email, role }) {
    const payload = { _id, name, lastName, email, role };
    return jwt.sign({ user: payload }, secret, { expiresIn: expiration });
  },
};