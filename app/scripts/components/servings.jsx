var React = require('react');

class ServingsContainer extends React.Component{
  render(){
    return (
      <div class="serving-size">
        <div class="row">
          <ServingsForm />
        </div>
          <h1>Ingredient List</h1>

          <IngredientList />

      </div>
    )
  }
}

class ServingsForm extends React.Component{
  render(){
    return (
      <form class="well"action="">
        <span>Makes <input type="text"> servings</span>
        <div class="input-group">
          <span class="input-group-addon">
            <input type="radio" aria-label="...">
          </span>
          <span class="input-group-addon">
            <input type="radio" aria-label="...">
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
      <ul class="list-group">
        <IngredientItem />
      </ul>
    )
  }
}

class IngredientItem extends React.Component{
  render(){
    return (



      <li class="list-group-item"><input type="checkbox" value=""></li>
    )
  }
}
