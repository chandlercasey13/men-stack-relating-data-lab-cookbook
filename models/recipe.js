const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: String,
  instructions: String,
  owner: mongoose.Schema.Types.ObjectId,
  ingredients: [{type: mongoose.Schema.Types.ObjectId,
    ref:'Ingredient'
  }],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
