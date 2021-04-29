const { User, Meme, Category } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
require("dotenv").config();
const stripe = require("stripe")("sk_test_51IlTtaBUkwJkuKUZ25btIPXZVhR9Rph59BwcFvC0oTaKPZxKEmGO9GMalPYGDEVLX4Mzu34ZMxyyzXckilR8bqEm00mvyIGpRd");
const publicVar = "sk_test_51IlTtaBUkwJkuKUZ25btIPXZVhR9Rph59BwcFvC0oTaKPZxKEmGO9GMalPYGDEVLX4Mzu34ZMxyyzXckilR8bqEm00mvyIGpRd"
const publicProd = "prod_JOKk1cEFYUvi2E"


const resolvers = {
  Query: {
    userPurchase: async (parent, {source}, context) => {
     

      if (context.user) {

        const user = await User.findByIdAndUpdate(context.user._id)

        if (!user) {
          console.log("error")
        }

        const paymentIntent = await stripe.paymentIntents.create({
          amount: 999,

          currency: "usd"
        });
        console.log(paymentIntent.client_secret)
        // res.send({
        //   clientSecret: paymentIntent.client_secret
        // });

        // let updatePurchase = await User.findByIdAndUpdate(
        //   { _id: context.user._id },
        //   { stripeId: paymentIntent.client_secret } ,
        //   { new: true }
        // )
      
        // const customer = stripe.customers.create({
        //   email: user.email,
        //   source,
        //   price: price_1IlY53BUkwJkuKUZgH0VUkHr
        // })

        console.log(customer)
        console.log({client_secret: paymentIntent.client_secret})
        
        return ({ client_secret: paymentIntent.client_secret })
        // user.stripeId = customer.id;
        // user.type = "paid";
        // await user.save();
        // return user

      }
      // if(context.user) {


      //   const user = await User.findByIdAndUpdate(context.user._id)

      //   if (!user) {
      //     console.log("error")
      //   }
      //   console.log(stripe.customers)
      //   const customer = stripe.customers.create({
      //     email: user.email,
      //     source,

      //   })



      //   console.log(user)
      //   console.log(customer)
      //   user.stripeId = customer.id;
      //   user.type = "paid";
      //   await user.save();
      //   return user

      // }
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("memes");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },

    users: async () => {
      return User.find().select("-__v -password").populate("memes");
    },
    memes: async () => {
      return Meme.find().select("-__v -password");
    },
    getStripeSess: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const line_items = [];

      const product = await stripe.products.create({
        name: "Credits",
        description: "Meme credits - store currency",
        // add a pikachu meme coin img here
        // images: [`${url}/images/${products[i].image}`],
      });

      // generate price id using the product id
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount_decimal: 999,
        currency: "usd",
      });

      // add price id to the line items array
      line_items.push({
        price: price.id,
        quantity: 10,
      });
      // const session = await stripe.checkout.sessions.create({
      //   payment_method_types: ["card"],
      //   line_items,
      //   mode: "payment",
      //   success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
      //   cancel_url: `${url}/`,
      // });

      try {
        const session = await stripe.paymentIntents.create({
          amount,
          currencty: "USD",
          payment_method_types: ["card"],
          line_items,
          mode: "payment",
          confirm: true
        })
        console.log(payment)
        return resolvers.status(200).json({
          confirm: "abc123"
        })

      } catch (error) {


      }

      console.log(session)
      return { session: session.id };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);

      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    databaseMeme: async (parent, args) => {
      const meme = await Meme.create(args);

      return meme;
    },
    addCollection: async (parent, { memeId }, context) => {
      if (context.user) {
        let updateCredit = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $inc: { credit: -1 } },
          { new: true }
        ).populate("memes");

        let newCollection = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { memes: memeId } },
          { new: true }
        ).populate("memes");

        return updateCredit;
      }
      throw new AuthenticationError("Not logged in");
    },
    addUserCredits: async (parent, args, context) => {
      console.log(context.user);
      if (context.user) {
        console.log("the args is", args);
        return await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $inc: { credit: 10 } },
          { new: true }
        );
      }
    },
   
  },
};
module.exports = resolvers;
