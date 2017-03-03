var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var parse = require('./setup');
var ServingsContainer = require('./components/servings.jsx').ServingsContainer;
var MainContainer = require('./components/recipeList.jsx').MainContainer;
var LoginContainer = require('./components/login.jsx').LoginContainer;

var User = require('./models/user').User;


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'login',
    'recipe/':'currentRecipe'
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
    this.navigate('recipe/', {trigger: true});
    return false;
  }

  return Backbone.Router.prototype.execute.apply(this, arguments);
  },
  index: function(){
    ReactDOM.render(
      React.createElement(MainContainer),
      document.getElementById('app')
    )
  },
  currentRecipe: function(){
    ReactDOM.render(
      React.createElement(ServingsContainer),
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
