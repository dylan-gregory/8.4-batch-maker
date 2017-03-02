var React = require('react');

class BaseLayout extends React.Component{
  render(){
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Batch Maker</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Add New Recipe</a></li>
                <li><a href="#">Settings</a></li>
                <li><a href="#">Account</a></li>
              </ul>
            </div>
          </div>
        </nav>

      <div className="container">
        <div className="row">
          <div className="col-md-12">

            <div className="col-md-8 col-md-offset-2">
              <div className="row">
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

              {props.children}

            </div>

            </div>
          </div>

        </div>
      </div>
    )
  }
}

module.exports = {
  BaseLayout
};
