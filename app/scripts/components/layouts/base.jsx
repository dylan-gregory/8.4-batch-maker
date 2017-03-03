var React = require('react');

class BaseLayout extends React.Component{
  constructor(props){
    super(props);
  }
  signOut(){
    localStorage.clear();
  }
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
                <li><a href="#">My Recipes</a></li>
                <li><a href="#"><button onClick={this.signOut} className="btn btn-danger" >Log Out</button></a></li>
              </ul>
            </div>
          </div>
        </nav>

      <div className="container">
        <div className="row">
          <div className="col-md-12">

            <div className="col-md-8 col-md-offset-2">


              {this.props.children}

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
