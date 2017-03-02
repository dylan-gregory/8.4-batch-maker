var React = require('react');

var BaseLayout = require('./layouts/base.jsx').BaseLayout;

class ServingsContainer extends React.Component{
  render(){
    return (
      <BaseLayout>
        <div className="serving-size">
          <div className="row">
            <ServingsForm />
          </div>
            <h1>Ingredient List</h1>

            <IngredientList />
        </div>
      </BaseLayout>
    )
  }
}

class ServingsForm extends React.Component{
  render(){
    return (
      <form className="well"action="">
        <span>Makes <input type="text" /> servings</span>
        <div className="input-group">
          <span className="input-group-addon">
            <input type="radio" aria-label="..." />
          </span>
          <span className="input-group-addon">
            <input type="radio" aria-label="..." />
          </span>
          <button>Adjust Recipe</button>
        </div>
      </form>
    )
  }
}

class IngredientList extends React.Component{
  render(){
    return (
      <ul className="list-group">
        <IngredientItem />
      </ul>
    )
  }
}

class IngredientItem extends React.Component{
  render(){
    return (



      <li className="list-group-item"><input type="checkbox" value="" /></li>
    )
  }
}

module.exports = {
  ServingsContainer
};
