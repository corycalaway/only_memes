const { User, Meme, Category } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
// require("dotenv").config();
const stripe = require("stripe")("pk_test_51IlTtaBUkwJkuKUZFnJfhMskFb19fE0lGkZBKaxBsY44lxavB6DMfg88D31jw8tdcFGSQcjt8cbHIQVNmtJCkIGA00TSTd0gD9");

const resolvers = {
  Query: {
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
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      const account = await stripe.accounts.create({
        type: 'custom',
        country: 'US',
        business_type: 'company',
        capabilities: {
          card_payments: {
            requested: true,
          },
          transfers: {
            requested: true,
          },
        },
        settings: {
          payments: {
            statement_descriptor: 'RUNNER CLUB',
          },
        },
      });
      
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
