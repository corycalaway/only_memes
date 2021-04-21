const mongoose = require("mongoose");

const { Schema } = mongoose;

const memeSchema = new Schema({
 
  title: {
    type: String,
    required: true,
    trim: true,
  },
  rarity: {
    type: String,
    trim: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Meme = mongoose.model("Memes", memeSchema);
module.exports = Meme;
