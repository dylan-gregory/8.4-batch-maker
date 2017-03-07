var Backbone = require('backbone');

var parse = require('../setup');

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectID',
  // save(){
  //
  // },
  setPointer: function(fieldName, parseClass, objectID){
    var pointerObject = {"__type": "Pointer", "className": parseClass, "objectId": objectID};
    this.set(fieldName, pointerObject);
    return this;
  }
});

var ParseCollection = Backbone.Collection.extend({
  whereClause: {},
  parseWhere: function(field, value, objectId){

    if (objectId) {
      value = {
        field: field,
        className: value,
        objectId: objectId,
        '__type': ' Pointer'
      };
    }

    this.whereClause[field] = value;

    return this;
  },
  url: function(){
    var url = this.baseUrl;

    if(Object.keys(this.whereClause).length > 0){
      url += '?where=' + JSON.stringify(this.whereClause);
      this.whereClause = {};
    }
    return url;
  }
});

var Recipe = ParseModel.extend({
  defaults: function() {
    return {
      name: '',
      qty: 1,
      ingredients: new IngredientCollection()
    }
  }
});

var RecipeCollection = ParseCollection.extend({
  model: Recipe,
  url: function(){
    return parse.BASE_API_URL + '/classes/gregory'
  },
  parse: function(data){
    return data.results
  },
  baseUrl:'https://tiny-parse-server.herokuapp.com/classes/gregory'
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
