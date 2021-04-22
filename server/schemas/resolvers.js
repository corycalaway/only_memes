const { User, Meme, Category } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().select("-__v -password").populate("meme");
    },
    memes: async () => {
      return Meme.find().select("-__v -password");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);

      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

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
      console.log(args);
      console.log(Meme);
      const meme = await Meme.create(args);
      console.log(meme);
      // const token = signToken(user);

      // return { token, user };
      return  meme ;
    },
    addCollection: async (parent, args, context) => {
      console.log(args);
      console.log(context.user)
      if (context.user) {

         const newCollection = new Meme(args);
        //     {_id: context.user._id },
        //   {$push: { memes: _id }},
        //   { new: true }
        // );
        console.log(newCollection)

        await User.findByIdAndUpdate(context.user._id, { $push: { memes: newCollection }});


        return newCollection;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
};
module.exports = resolvers;
