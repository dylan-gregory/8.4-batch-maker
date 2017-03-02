var Backbone = require('backbone');

var Recipe = Backbone.Model.extend({
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

var Ingredient = Backbone.Model.extend({
  defaults: {
    name: '',
    units: '',
    qty; 1
  }
});

var IngredientCollection = Backbone.Collection.extend({
  model: Ingredient
});
