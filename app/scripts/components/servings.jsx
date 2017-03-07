var React = require('react');

var BaseLayout = require('./layouts/base.jsx').BaseLayout;
var IngredientCollection = require('../models/models.js').IngredientCollection;
var RecipeCollection = require('../models/models.js').RecipeCollection;
var Recipe = require('../models/models.js').Recipe;

class ServingsContainer extends React.Component{
  constructor(props){
    super(props);

    var currentRecipe = new Recipe();

    var recipeCollection = new RecipeCollection();

    this.state = {
      recipeCollection: recipeCollection,
      currentRecipe: currentRecipe,
      origServing: '',
      modifier: 1
    }

    recipeCollection.fetch().then(()=> {
      currentRecipe = recipeCollection.findWhere({objectId: this.props.id});
      var origServing = currentRecipe.get('qty');
      // console.log(modifier);
      this.setState({currentRecipe: currentRecipe, recipeCollection: recipeCollection, origServing: origServing });
      console.log('done fetch', this.state.origServing);
    });

    this.changeServing = this.changeServing.bind(this);
  }
  changeServing(servings){
    var modifier = servings / this.state.currentRecipe.get('qty');

    this.setState({modifier: modifier});

  }
  render(){

    return (
      <BaseLayout>
        <div className="serving-size well">
          <div className="row">
            <div className="col-md-6">
            <div><img src={this.state.currentRecipe.get('url')} /></div>
            </div>
            <div className="col-md-6">
            <h2>{this.state.currentRecipe.get('name')}</h2>
            </div>

            { this.state.origServing !== '' ? <ServingsForm changeServing={this.changeServing}
                        servingSize={this.state.origServing}
                          /> : null }


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

    console.log('that',this.props.servingSize);

    this.state = {
      servings: this.props.servingSize
    };
    console.log('this', this.state.servings);
  }
  handleChangeServing(e){
    e.preventDefault();
    this.setState({servings: e.target.value});
    // var modifier = (recipe.qty / this.state.modifier);
  }
  changeServing(e){
    e.preventDefault();
    this.props.changeServing(this.state.servings)
  }
  render(){
    return (
      <form onSubmit={this.changeServing} className="adjust-bar"action="">
        <span>Makes <input onChange={this.handleChangeServing} className="form-control serving-number" value={this.state.servings} type="text" /> servings</span>
        <div className="input-group">

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
