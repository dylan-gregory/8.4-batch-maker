var React = require('react');

var BaseLayout = require('./layouts/base.jsx').BaseLayout;
var IngredientCollection = require('../models/models.js').IngredientCollection;

class ServingsContainer extends React.Component{
  constructor(props){
    super(props);
    var ingredientCollection = new IngredientCollection();

    ingredientCollection.add([
      {name: 'chopped onion', qty: 1, units: 'cup'},
      {name: 'diced carrots', qty: .5, units: 'cup'},
      {name: 'beef tenderloin', qty: 3, units: 'lbs'}
    ]);

    this.state = {
      ingredientCollection: ingredientCollection
    }
  }
  render(){
    return (
      <BaseLayout>
        <div className="serving-size">
          <div className="row">
            <ServingsForm />
          </div>
            <h3>Ingredients you'll need:</h3>

            <IngredientList ingredientCollection={this.state.ingredientCollection}/>
        </div>
      </BaseLayout>
    )
  }
}

class ServingsForm extends React.Component{
  constructor(props){
    super(props);
    
  }
  changeServing(){

  }
  render(){
    return (
      <form className="well"action="">
        <span>Makes <input onChange={this.changeServing} className="form-control serving-number" type="text" /> servings</span>
        <div className="input-group">
          <span className="input-group-addon">
            <input type="radio" aria-label="..." />
          </span>
          <span className="input-group-addon">
            <input type="radio" aria-label="..." />
          </span>
          <button className="btn btn-success">Adjust Recipe</button>
        </div>
      </form>
    )
  }
}

class IngredientList extends React.Component{
  render(){

    var ingredients = this.props.ingredientCollection.map(foodItem =>{
      return (
        <li key={foodItem.cid} className="list-group-item"><input type="checkbox" value="" /><span>{foodItem.get('qty')} {foodItem.get('units')} {foodItem.get('name')}</span></li>
      )
    })
    return (
      <ul className="list-group">
        {ingredients}
      </ul>
    )
  }
}

// class IngredientItem extends React.Component{
//   render(){
//     return (
//
//
//
//
//     )
//   }
// }

module.exports = {
  ServingsContainer
};
