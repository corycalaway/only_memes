const  { resources } = require ('stripe');
const stripeData = require('stripe')(process.env.REACT_APP_STRIPE_PUBLISHABLE)
const customers = new resources.Customers(stripeData, null);

module.exports = customers