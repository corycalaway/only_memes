const db = require('./connection');
const { User, Meme } = require('../models');

db.once('open', async () => {
  await Meme.deleteMany();

  const memes = await Meme.insertMany([
    { 
        title: 'Food',
        image: "www.coolfood.com",
        rarity: "Worthless",
        category: "Fun" 
    },
    { 
        title: 'Peanut Jelly',
        image: "www.lamefood.com",
        rarity: "Epic",
        category: "Happy" 
    },
    { 
        title: 'Peanut Jelly',
        image: "www.colldio.com",
        rarity: "Trash",
        category: "Dank" 
    },
  ]);

  console.log('memes seeded');



  await User.deleteMany();

  await User.create({
    username: 'Pamela',
    email: 'pamela@testmail.com',
    password: 'password12345',
    credit: 10
    
  });

  await User.create({
    username: 'Elijah',
    email: 'eholt@testmail.com',
    password: 'password12345',
    credit: 10
  });

  await User.create({
    username: 'Pete',
    email: 'nowway@testmail.com',
    password: 'password12345',
    credit: 10
 
  });

  console.log('users seeded');

  process.exit();
});