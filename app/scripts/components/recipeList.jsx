var React = require('react');
var Backbone = require('backbone');

var BaseLayout = require('./layouts/base.jsx').BaseLayout;
var IngredientCollection = require('../models/models.js').IngredientCollection;
var Ingredient = require('../models/models.js').Ingredient;
var RecipeCollection = require('../models/models.js').RecipeCollection;

var myRouter = require('../router.js').myRouter;

class MainContainer extends React.Component {
  constructor(props){
    super(props);

    this.addNewRecipe = this.addNewRecipe.bind(this);

    var recipeCollection = new RecipeCollection();
    recipeCollection.fetch().then(()=> {
      this.setState({recipeCollection});
    });

    this.addNewRecipe = this.addNewRecipe.bind(this);
    this.handleToggleForm = this.handleToggleForm.bind(this);
    this.viewRecipe = this.viewRecipe.bind(this);

    this.state = {
      recipeCollection,
      showForm: false
    }

  }
  addNewRecipe(recipe){
    this.state.recipeCollection.create(recipe, {success: () => {
      this.setState({recipeCollection: this.state.recipeCollection});
    }});
  }
  handleToggleForm(e){
    e.preventDefault();
    this.setState({showForm: !this.state.showForm});

  }
  viewRecipe(recipe){
    Backbone.history.navigate('recipes/' + recipe.get('objectId'), {trigger: true});

  }
  render(){
    return(
      <BaseLayout>
        <div className="row">
          <RecipesList recipeCollection={this.state.recipeCollection}
                        viewRecipe={this.viewRecipe}
                        />
        </div>
        <h4>Add a new recipe? <button onClick={this.handleToggleForm} className="btn btn-default">+</button></h4>

        {this.state.showForm ? <RecipeForm
                                addNewRecipe={this.addNewRecipe}
                                /> : null}

      </BaseLayout>

    )
  }
}

class RecipesList extends React.Component {
  render(){

    var recipeList = this.props.recipeCollection.map(recipe =>{
      return (

          <div key={recipe.cid} className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src={recipe.get('url')} alt="" />
              <div className="caption">
                <h3><a onClick={(e) => {e.preventDefault();
                     this.props.viewRecipe(recipe);}}
                  href={"recipes/#" + recipe.get('objectId')}>
                  {recipe.get('name')}</a></h3>
              </div>
            </div>
          </div>

      )
    });

    return (
      <span>{recipeList}</span>
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

    this.addNewRecipe = this.addNewRecipe.bind(this);
    this.handleUrl = this.handleUrl.bind(this);


    this.state = {
      name: '',
      qty: 1,
      url: '',
      ingredients: ingredients,
      tempIngred: new Ingredient(),
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
  handleUrl(e){
    this.setState({url: e.target.value});
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
  addNewRecipe(e){
    e.preventDefault();
    this.props.addNewRecipe(this.state);

  }
  render(){

    return (
      <div className="row">
        <form onSubmit={this.addNewRecipe}>
          <div className="row">

            <div className="col-xs-6 col-md-4">
              <a href="#" className="thumbnail">
                <img src="" alt="" />
              </a>
              <input onChange={this.handleUrl} placeholder="Image url"/>
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

                <input onChange={this.handleIngredAmount} type="number" className="form-control ingred-amount" placeholder="#" />
                <input onChange={this.handleIngredUnits} type="text" className="form-control ingred-units" placeholder="units" />
                <div className="input-group">
                  <input onChange={this.handleIngredName} type="text" className="form-control ingred-name" placeholder="onions, potatos, etc..." />
                  <span className="input-group-btn">
                    <button onClick={this.addIngredient} className="btn btn-default" type="button">+</button>
                  </span>
              </div>
                <IngredientsForm ingredients={this.state.ingredients}/>
          </div>
          <input type="submit" className="btn btn-success" value="Add New Recipe"/>
        </form>
      </div>
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
