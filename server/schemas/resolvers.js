const { User, Memes, Category } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('meme');
              
        }

    },
    Mutation: {
        addUser: async (parent, args) => {
            
            const user = await User.create(args);

            const token = signToken(user);
          
            return { token, user };
          },
    }
}
module.exports = resolvers;