var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var parse = require('./setup');
var ServingsContainer = require('./components/servings.jsx').ServingsContainer;
var MainContainer = require('./components/recipeList.jsx').MainContainer;
var RecipeForm = require('./components/recipeList.jsx').RecipeForm;
var IngredientsForm = require('./components/recipeList.jsx').IngredientsForm;
var LoginContainer = require('./components/login.jsx').LoginContainer;

var User = require('./models/user').User;


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'login',
    'recipes/:id':'currentRecipe',
    'recipes/': 'addNewRecipe',
    'recipe/add': 'actuallyAdd'
  },
  initialize: function(){
  // Do the parse setup to set headers and configure API url
  parse.setup({
    BASE_API_URL: 'https://tiny-parse-server.herokuapp.com'
  });
  },
  execute: function(callback, args, name) {
  // var isLoggedIn = localStorage.getItem('user');
  var user = User.current()
  if (!user && name != 'login') {
    this.navigate('', {trigger: true});
    return false;
  }

  if(user && name == 'login'){
    this.navigate('recipes/', {trigger: true});
    return false;
  }

  return Backbone.Router.prototype.execute.apply(this, arguments);
  },
  addNewRecipe: function(){
    ReactDOM.render(
      React.createElement(MainContainer),
      document.getElementById('app')
    )
  },
  actuallyAdd: function(){

    // ReactDOM.render(
    //   React.createElement(RecipeForm),
    //   document.getElementById('app')
    // )

  },
  currentRecipe: function(id){

    ReactDOM.render(
      React.createElement(ServingsContainer, {id: id}),
      document.getElementById('app')
    )
  },
  login: function(){
    ReactDOM.render(
      React.createElement(LoginContainer),
      document.getElementById('app')
    )
  }

});

var myRouter = new AppRouter();

module.exports = {
  myRouter
};
