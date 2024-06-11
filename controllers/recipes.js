const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const { updateMany } = require('../models/ingredient.js');
const Ingredient = require('../models/ingredient.js');




router.get('/', async (req, res) => {
    //const userRecipes = await Recipe.find({owner: req.session.user._id});
    const populatedRecipes = await Recipe.find({}).populate('ingredients');



    res.render('recipes/index.ejs', { 
    recipes: populatedRecipes

});
  });

  router.get('/new', async (req, res) => {
    const userIngredients = await Ingredient.find()
    res.render('recipes/new.ejs', {ingredients: userIngredients});
  });








router.get('/:recipeId', async (req,res) => {
try {
const userRecipe = await Recipe.findById(req.params.recipeId).populate('ingredients');
console.log(userRecipe)


//const uIngredients = await Ingredient.find()
//const recipeIngredients = await userRecipe.populate({userIngredients})



res.render('recipes/show.ejs', {recipe: userRecipe,
    
})    
}
catch(err) {
    console.log(err)
}
})



router.get('/:recipeId/edit', async (req,res) =>{

const recipe = await Recipe.findById(req.params.recipeId)    

const userIngredients = await Ingredient.find()
res.render('recipes/edit.ejs', {recipe: recipe,
    ingredients: userIngredients
})


}
)

router.delete('/:recipeId', async (req,res ) => {




    await Recipe.deleteOne({_id: req.params.recipeId})
    
    res.redirect("/")
    
    })


router.put('/:recipeId', async (req,res)=> {

const editingRecipe = await Recipe.findById(req.params.recipeId)

const filter= {name: editingRecipe.name}


const update = {name: req.body.name, 
    instructions: req.body.instructions,

}
await Recipe.findOneAndUpdate(filter, update)


res.redirect('/')
    

})


router.post('/create', async (req,res) => {



try {
    
    const newRecipe = new Recipe(req.body);
    newRecipe.owner = req.session.user._id
    await newRecipe.save();

   /* if (recipe.owner.equals(req.session.user._id)) {
        // Proceed with edit or delete operation
      } else {
        // Redirect or show an error message
      }*/
    // Redirect to recipe index or show page
   
    res.redirect(`/ingredients/new/${newRecipe._id}`)

  } catch (error) {
    console.log(error)
    
    // Handle errors
  }
})




 


module.exports = router;