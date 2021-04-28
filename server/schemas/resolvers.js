const { User, Meme, Category } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('memes')

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },

    users: async () => {
      return User.find().select("-__v -password").populate("memes");
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
          { $inc: { credit: - 1 } },
          { new: true }
        ).populate("memes");


        let newCollection = await User.findByIdAndUpdate(

          { _id: context.user._id },
          { $addToSet: { memes: memeId } },
          { new: true }
        ).populate("memes");

        return updateCredit
      }
      throw new AuthenticationError("Not logged in");
    },
  },
};
module.exports = resolvers;
