const mongoose = require("mongoose");

const { Schema } = mongoose;

const memeSchema = new Schema({
  title: {
    type: String,

    trim: true,
  },
  image: {
    type: String,
  },
  rarity: {
    type: String,
    trim: true,
  },
  category: {
    type: String,

    trim: true,
  },
});

const Meme = mongoose.model("Memes", memeSchema);

module.exports = Meme;
