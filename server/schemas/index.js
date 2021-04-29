const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const stripe = require('./stripe')

module.exports = { typeDefs, resolvers, stripe };
