import React, { Component } from 'react';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: '',
			pass: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

  	handleSubmit(e) {
  		alert(this.state.user + ' is trying to sign in !');
  		const data = {
	      username: this.state.user,
	      credential: this.state.pass
	    }
	   
	    axios.post('http://3.122.7.162:5000/v60/admin/session', data, {withCredentials: true})
	    .then(response => {
	    	if(response.status = 200) { 
				console.log("Response code is 200");
				this.props.history.push("/search");
         	}
	      	console.log("response");
	      	console.log(response);
	    })
	    .catch(error => {
		
			this.props.history.push("/");
	      console.log("error");
	      console.log(error);
	    });
  		e.preventDefault();
  	}

  	handleChange(e) {
  		let name = e.target.name;
  		this.setState({
  			[name]: e.target.value
  		});
  	}

	render() {
		return (
			<div className="login-box">
				<form className="login-form" onSubmit={this.handleSubmit}>
					<h1 className="login-text">Login</h1>
					<input name="user" type="text" onChange={this.handleChange}></input>
					<input name="pass" type="password" onChange={this.handleChange}></input>
					<input type="submit" value="Login"></input>
					<div className="hr"></div>
					
				</form>

			</div>
		);
	}
}

export default withRouter(Login);