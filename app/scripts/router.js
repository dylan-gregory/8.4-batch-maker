var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var ServingsContainer = require('./components/servings.jsx').ServingsContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  index: function(){
    React.createElement(ServingsContainer),
    document.getElementById('app')
  }

});

var myRouter = new AppRouter();

module.exports = {
  myRouter
};
