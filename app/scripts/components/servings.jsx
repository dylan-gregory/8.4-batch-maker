var React = require('react');

var BaseLayout = require('./layouts/base.jsx').BaseLayout;
var IngredientCollection = require('../models/models.js').IngredientCollection;
var RecipeCollection = require('../models/models.js').RecipeCollection;

class ServingsContainer extends React.Component{
  constructor(props){
    super(props);
    var ingredientCollection = new IngredientCollection();


    ingredientCollection.add([
      {name: 'chopped onion', qty: 1, units: 'cup'},
      {name: 'diced carrots', qty: .5, units: 'cup'},
      {name: 'beef tenderloin', qty: 3, units: 'lbs'}
    ]);

    this.changeServing = this.changeServing.bind(this);

    this.state = {
      ingredientCollection: ingredientCollection,
      modifier: 1
    }

  }
  changeServing(modifier){
    var multiplier = this.state.modifier;
    multiplier = modifier;
    this.setState({modifier: multiplier});

  }
  render(){
    return (
      <BaseLayout>
        <div className="serving-size">
          <div className="row">
            <ServingsForm changeServing={this.changeServing} />
          </div>
            <h3>Ingredients you'll need:</h3>

            <IngredientList
              ingredientCollection={this.state.ingredientCollection}
              modifier={this.state.modifier}
            />
        </div>
      </BaseLayout>
    )
  }
}

class ServingsForm extends React.Component{
  constructor(props){
    super(props);
    this.handleChangeServing = this.handleChangeServing.bind(this);
    this.changeServing = this.changeServing.bind(this);

    this.state = {
      modifier: 1
    }
  }
  handleChangeServing(e){
    e.preventDefault();
    this.setState({modifier: e.target.value});
    // var modifier = (recipe.qty / this.state.modifier);
  }
  changeServing(e){
    e.preventDefault();
    this.props.changeServing(this.state.modifier)
  }
  render(){
    return (
      <form onSubmit={this.changeServing} className="well"action="">
        <span>Makes <input onChange={this.handleChangeServing} className="form-control serving-number" value={this.state.modifier} type="text" /> servings</span>
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
  constructor(props){
    super(props);



  }
  // componentWillReceiveProps(multiplier){
  //   console.log(this.state.modifier);
  //   this.setState({modifier: this.props.modifier});
  // }
  render(){

    var ingredients = this.props.ingredientCollection.map(foodItem =>{
      return (
        <li key={foodItem.cid} className="list-group-item"><input type="checkbox" value={this.props.modifier} /><span> {foodItem.get('qty') * this.props.modifier} {foodItem.get('units')} {foodItem.get('name')}</span></li>
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
