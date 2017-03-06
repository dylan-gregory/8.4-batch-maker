var React = require('react');

var BaseLayout = require('./layouts/base.jsx').BaseLayout;
var IngredientCollection = require('../models/models.js').IngredientCollection;
var RecipeCollection = require('../models/models.js').RecipeCollection;
var Recipe = require('../models/models.js').Recipe;

class ServingsContainer extends React.Component{
  constructor(props){
    super(props);

    var currentRecipe = new Recipe();
    var modifier = 1;

    var recipeCollection = new RecipeCollection();

    recipeCollection.fetch().then(()=> {
      console.log(recipeCollection);
      console.log(props);

      currentRecipe = recipeCollection.findWhere({objectId: this.props.id});
      console.log('current', currentRecipe);
      modifier = currentRecipe.get('qty');
      console.log(modifier);
      this.setState({currentRecipe: currentRecipe, recipeCollection: recipeCollection, modifier:modifier});

    });


    this.changeServing = this.changeServing.bind(this);

    this.state = {
      recipeCollection: recipeCollection,
      currentRecipe: currentRecipe,
      modifier: modifier
    }
    console.log(this.state);

  }
  changeServing(modifier){
    var multiplier = this.state.modifier;
    multiplier = modifier;
    this.setState({modifier: multiplier});

  }
  render(){
    console.log(this.state.currentRecipe);
    return (
      <BaseLayout>
        <div className="serving-size">
          <div className="row">
            <ServingsForm changeServing={this.changeServing}
                          servingSize={this.state.currentRecipe.get('qty')}

              />
          </div>
            <h3>Ingredients you'll need:</h3>

            <IngredientList
              ingredientCollection={this.state.currentRecipe.get('ingredients')}
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
  render(){

    console.log('here', this.props.ingredientCollection);
    var ingredients = this.props.ingredientCollection.map(foodItem =>{
      return (
        <li key={this.props.ingredientCollection.indexOf(foodItem)} className="list-group-item"><input type="checkbox" value={this.props.modifier} /><span> {foodItem.qty * this.props.modifier} {foodItem.units} {foodItem.name}</span></li>
      )
    })
    return (
      <ul className="list-group">
        {ingredients}
      </ul>
    )
  }
}


module.exports = {
  ServingsContainer
};
