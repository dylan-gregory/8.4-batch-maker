var React = require('react');

var BaseLayout = require('./layouts/base.jsx').BaseLayout;

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
  render(){
    return (
      <div>
        <div className="row">
          <h3>Add a new recipe</h3>
          <div className="col-xs-6 col-md-4">
            <a href="#" className="thumbnail">
              <img src="" alt="" />
            </a>
          </div>
          <input type="text" placeholder="Recipe Name" />
          <input type="text" placeholder="By..." />
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
          <div className="dropdown">
            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              Dropdown
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" className="divider"></li>
              <li><a href="#">Separated link</a></li>
            </ul>
          </div>
          <input type="text" placeholder="Prep time" />
          <input type="text" placeholder="Cook time" />
          <input type="text" placeholder="Cook temp" />
        </div>
      </div>
    )
  }
}

module.exports = {
  MainContainer
}
