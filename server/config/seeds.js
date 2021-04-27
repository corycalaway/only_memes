const db = require('./connection');
const { User, Meme } = require('../models');

db.once('open', async () => {
  await Meme.deleteMany();

  const memes = await Meme.insertMany([

    {
      title: 'Cricket: Its alaway sunnny',
      image: "https://res.cloudinary.com/accordingtocloud/image/upload/v1619493361/Cricket_Its_always_sunny_psfn8e.gif",
      rarity: "Trash",
      category: "Pathetic"
    },

    {
      title: 'Venture Bros: Feeling Deadly',
      image: "https://res.cloudinary.com/accordingtocloud/image/upload/v1619494178/Venture-bros-monarch_bech6j.jpg",
      rarity: "Worthless",
      category: "Powerful"
    },
    { 
      title: 'Its Always Sunny: Poor Meme',
      image: "https://res.cloudinary.com/accordingtocloud/image/upload/v1619142065/it_s-always-sunny-poor_eh1nwo.jpg",
        rarity: "Legendary",
        category: "Fun" 
    },
    { 
      title: 'Futurama: You people disgust me meme',
      image: "https://res.cloudinary.com/accordingtocloud/image/upload/v1615155229/eslnt9lg2z5ruocgczzr.jpg",
        rarity: "Epic",
        category: "Happy" 
    },
    { 
      title: 'Venturebros: Science',
      image: "https://res.cloudinary.com/accordingtocloud/image/upload/v1619142413/venture-bros-science_dggnef.jpg",
        rarity: "Trash",
        category: "Dank" 
    },
    {
      title: 'Its always sunny: Explaining legacy code',
      image: "https://res.cloudinary.com/accordingtocloud/image/upload/v1619143853/legacy_meme_lujdtp.jpg",
      rarity: "Epic",
      category: "Dank"
    },
    {
      title: 'Pokemon: Squirtle programers',
      image: "https://res.cloudinary.com/accordingtocloud/image/upload/v1619143859/600aced8e6a4b_msexh4.jpg",
      rarity: "Epic",
      category: "Dank"
    },
    {
      title: 'Captain America: html ',
      image: "https://res.cloudinary.com/accordingtocloud/image/upload/v1619143875/Coding-Jokes-HTML-Meme-1024x997_goicia.jpg",
      rarity: "Worthless",
      category: "Dank"
    },
    {
      title: 'Friends: Programming memes',
      image: "https://res.cloudinary.com/accordingtocloud/image/upload/v1619143887/0_cJZQM_W_0w8QiPzD_kxxrui.jpg",
      rarity: "Worthless",
      category: "Dank"
    },
    {
      title: 'Pikachu: programing meme',
      image: "https://res.cloudinary.com/accordingtocloud/image/upload/v1619146742/image_r5vunj.png",
      rarity: "Trash",
      category: "Dank"
    },
    {
      title: 'Car: Stack overflow',
      image: "https://res.cloudinary.com/accordingtocloud/image/upload/v1619147669/stackoverflow_skzjoz.jpg",
      rarity: "Worthless",
      category: "Dank"
    },
    {
      title: 'Stick Figure: Coding work doesnt work',
      image: "https://res.cloudinary.com/accordingtocloud/image/upload/v1619147673/coding_meme_aedqur.jpg",
      rarity: "Epic",
      category: "Dank"
    },
    {
      title: 'Demon Slayer: Mom not home',
      image: "https://res.cloudinary.com/accordingtocloud/image/upload/v1619495477/Demon-Slayer-Mom_snvhme.jpg",
      rarity: "Worthless",
      category: "Dank"
    },
    {
      title: 'Demon Slayer: People Talk',
      image: "https://res.cloudinary.com/accordingtocloud/image/upload/v1619495483/Demon-Slyer-People-Talking_ln2rlx.jpg",
      rarity: "Epic",
      category: "Dank"
    },
    {
      title: 'Stress: Not Stressful',
      image: "https://res.cloudinary.com/accordingtocloud/image/upload/v1615155246/ltgfuxrct7ezwi4ac0u8.jpg",
      rarity: "Worthless",
      category: "Dank"
    },
    
  ]);

  console.log('memes seeded');



  await User.deleteMany();

  await User.create({
    username: 'test',
    email: 'test@gmail.com',
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