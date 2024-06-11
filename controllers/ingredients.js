

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const { render } = require('ejs');
const Ingredient = require('../models/ingredient.js');





router.get('/', async (req,res) =>{
   
const allIngredients =  await Ingredient.find();
    res.render('ingredients/index.ejs', {ingredients: allIngredients})
})

router.get('/new/:recipeId', async (req,res) =>{
  const newRecipe =  await Recipe.findById(req.params.recipeId)
    console.log(newRecipe)
        res.render('ingredients/new.ejs', {recipe: newRecipe})
    })


router.post('/create/:recipeId', async (req,res) => {
    const newIngredient =   new Ingredient(req.body);
    await newIngredient.save();
const newRecipe =  await Recipe.findById(req.params.recipeId)
newRecipe.ingredients.push(newIngredient)
    

    await newRecipe.save();

   /* if (recipe.owner.equals(req.session.user._id)) {
        // Proceed with edit or delete operation
      } else {
        // Redirect or show an error message
      }*/
    // Redirect to recipe index or show page
   
    


    res.redirect('/')
})
module.exports = router;