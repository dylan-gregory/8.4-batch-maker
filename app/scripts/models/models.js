var Backbone = require('backbone');

var parse = require('../setup');

var Recipe = Backbone.Model.extend({
  idAttribute: 'objectId',
  defaults: function() {
    return {
      name: '',
      qty: 1,
      ingredients: new IngredientCollection()
    }
  }
  // Rough sketch of what I need to do to update the ingredients
  // servings: function(){
  //   var newAmount = this.qty/ newServingSize;
  //   return ingredients.qty * newAmount;
  // }
});

var RecipeCollection = Backbone.Collection.extend({
  model: Recipe,
  url: function(){
    return parse.BASE_API_URL + '/classes/gregory'
  },
  parse: function(data){
    return data.results
  }
});

var Ingredient = Backbone.Model.extend({
  defaults: {
    name: '',
    units: '',
    qty: 1
  }
});

var IngredientCollection = Backbone.Collection.extend({
  model: Ingredient
});

module.exports = {
  Recipe,
  RecipeCollection,
  Ingredient,
  IngredientCollection
};
