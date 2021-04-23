const { User, Meme, Category } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
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
      console.log(args);
      console.log(Meme);
      const meme = await Meme.create(args);
      console.log(meme);
      // const token = signToken(user);

      // return { token, user };
      return meme;
    },
    addCollection: async (parent, { memeId }, context) => {
      console.log(context.user);
      if (context.user) {
        //  const newCollection = new Meme(_id);
        //     {_id: context.user._id },
        //   {$push: { memes: _id }},
        //   { new: true }
        // );

        let newCollection = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { memes: memeId } },
          { new: true }
        ).populate("memes");

        console.log(newCollection);
        return newCollection;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
};
module.exports = resolvers;
