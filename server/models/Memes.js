const mongoose = require("mongoose");

const { Schema } = mongoose;

const memeSchema = new Schema({
  title: {
    type: String,
    required: true,
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
    required: true,
    trim: true,
  },
});

const Meme = mongoose.model("Memes", memeSchema);

module.exports = Meme;
