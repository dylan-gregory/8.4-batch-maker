var Backbone = require('backbone');

var parse = require('../setup');

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',
  save: function(key, val, options){
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
  },
  setPointer: function(field, parseClass, objectId){
    var pointerObject = {
      "__type": "Pointer",
      "className": parseClass,
      "objectId": objectId
    };

    this.set(field, pointerObject);

    return this;
  }
});

var ParseCollection = Backbone.Collection.extend({
  whereClause: {},
  parseWhere: function(field, value, objectId){
    // If an objectId is passed in then we are building a pointer where
    if(objectId){
      value = {
        field: field,
        className: value,
        objectId: objectId,
        '__type': 'Pointer'
      };
    }

    // // Check if the field has a search option set
    // if(field.indexOf('$') !== -1){
    //   var search = field.split('$');
    //   field = search[0];
    //   var comparison = '$' + search[1];
    //
    //   var clause = {};
    //   clause[comparison] = value;
    //   value = clause;
    // }

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
  },
  parse: function(data){
    return data.results;
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
  // url: function(){
  //   return parse.BASE_API_URL + '/classes/gregory'
  // },
  // parse: function(data){
  //   return data.results
  // },
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
