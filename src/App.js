import React, { Component } from 'react';
import './App.css';
import Login from './login.js'
import Search from './search.js' 

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { Switch } from 'react-router';

class App extends Component {


  render() {
    return (
	
    <div className="App">
	<Router>
		<Switch>
			<Route exact path="/" component={Login} />
			<Route path="/search" component={Search} />
        </Switch>
	</Router>
		
		
      </div>
    );
  }
}

export default App;
