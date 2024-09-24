const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3001', 'https://studio.apollographql.com', 'https://hairandco.netlify.app/'],
  credentials: true
}));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  playground: true,
  introspection: true
});

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ 
    app,
    path: '/graphql',
    cors: false
  });

  if(process.env.NODE.ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    })
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer();