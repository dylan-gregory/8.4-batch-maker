var React = require('react');

var BaseLayout = require('./layouts/base.jsx').BaseLayout;
var IngredientCollection = require('../models/models.js').IngredientCollection;
var Ingredient = require('../models/models.js').Ingredient;

class MainContainer extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <BaseLayout>
        <RecipesList />

        <RecipeForm />
      </BaseLayout>

    )
  }
}

class RecipesList extends React.Component {
  render(){
    return (
      <span>Recipes</span>
    )
  }
}



class RecipeForm extends React.Component{
  constructor(props){
    super(props);

    var ingredients = new IngredientCollection();

    this.addIngredient = this.addIngredient.bind(this);
    this.handleRecipeName = this.handleRecipeName.bind(this);
    this.handleServingSize = this.handleServingSize.bind(this);

    this.handleIngredAmount = this.handleIngredAmount.bind(this);
    this.handleIngredUnits = this.handleIngredUnits.bind(this);
    this.handleIngredName = this.handleIngredName.bind(this);



    this.state = {
      name: '',
      qty: '',
      ingredients: ingredients,
      tempIngred: new Ingredient()
    }
  }
  addIngredient(){
    console.log('tempIngred', this.state.tempIngred);
    var ingredients = this.state.ingredients;
    ingredients.add(this.state.tempIngred.clone());
    this.setState({ingredients: ingredients});
  }
  handleRecipeName(e){
    this.setState({name: e.target.value});
    console.log(this.state);
  }
  handleServingSize(e){
    this.setState({qty: e.target.value});
    console.log(this.state);
  }
  handleIngredAmount(e){
    this.state.tempIngred.set('qty', e.target.value);

    console.log(this.state.tempIngred);
  }
  handleIngredUnits(e){
    this.state.tempIngred.set('units', e.target.value);
  }
  handleIngredName(e){
    this.state.tempIngred.set('name', e.target.value);
  }
  render(){

    return (
      <form>
        <div className="row">
          <h3>Add a new recipe</h3>
          <div className="col-xs-6 col-md-4">
            <a href="#" className="thumbnail">
              <img src="" alt="" />
            </a>
            <input placeholder="Image url"/>
          </div>
          <input onChange={this.handleRecipeName} type="text" placeholder="Recipe Name" />
          <input onChange={this.handleServingSize} type="text" placeholder="Serving Size" />
          <div className="checkbox">
            <label>
              <input type="checkbox" value="" />
              Make Public
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input type="checkbox" value="" />
              Keep Private
            </label>
          </div>
        </div>

        <div className="row">
          <input type="text" placeholder="Prep time" />
          <input type="text" placeholder="Cook time" />
          <input type="text" placeholder="Cook temp" />
        </div>
        <div className="row">
          <h3>Add ingredients:</h3>
            <input onChange={this.handleIngredAmount} type="number" className="form-control" placeholder="#" />
            <input onChange={this.handleIngredUnits} type="text" className="form-control" placeholder="units" />
            <div className="input-group">
              <input onChange={this.handleIngredName} type="text" className="form-control" placeholder="onions, potatos, etc..." />
              <span className="input-group-btn">
                <button onClick={this.addIngredient} className="btn btn-default" type="button">+</button>
              </span>
            </div>
              <IngredientsForm ingredients={this.state.ingredients}/>
        </div>
      </form>
    )
  }
}



class IngredientsForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      ingredients: this.props.ingredients
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({ingredients: this.props.ingredients});
  }
  render(){

    var newIngredients = this.state.ingredients.map(item =>{
      return (
        <li key={item.cid} className="list-group-item"> {item.get('qty')} {item.get('units')} {item.get('name')}</li>
      )
    });

    return (
      <div>
        <ul className="list-group">

          {newIngredients}

        </ul>
      </div>

    )
  }
}

module.exports = {
  MainContainer
};
