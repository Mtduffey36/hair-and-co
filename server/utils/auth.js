const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '24h';

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
      const decoded = jwt.verify(token, secret, { maxAge: expiration });
      req.user = decoded.user;
    } catch (err){
      console.log('Invalid token', err.message);
    }

    return req;
  },
  signToken: function ({ _id, name, lastName, email, role }) {
    const payload = { _id, name, lastName, email, role };
    return jwt.sign({ user: payload }, secret, { expiresIn: expiration });
  },
};