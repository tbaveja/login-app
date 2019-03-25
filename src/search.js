import React, { Component } from 'react';
import axios from 'axios';
import Pagination from "react-js-pagination";


class Search extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			searchText: '',
			apiData: [],
			activePage: 1,
			perPage: 5
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handlePageChange=this.handlePageChange.bind(this);
	}
	

	handleSearch(e) {
		const searchString = this.state.searchText;
		const _this = this;
		
		axios
		  .get('http://3.122.7.162:5000/v60/admin/search/user?keyword='+ searchString + '&alias=false', {withCredentials: true})
			.then(function(response) {
			  console.log(response);
			 _this.setState({ 
				apiData: [...response.data]
			});
			})
			.catch(function(error) {
			  console.log(error)
			});
			e.preventDefault();
	}
	handleChange(e) {
  		let search = e.target.name;
  		this.setState({
  			[search]: e.target.value
  		});
  	}
	handlePageChange(pageNumber) {
		console.log("active page is: " + pageNumber);
		this.setState({activePage: pageNumber});
	}

	render() {
		//let showData = [];
		let data = this.state.apiData
		//console.log(data);
		
		const { apiData, activePage, perPage } = this.state;
	
		const indexOfLastTodo = activePage * perPage;
        const indexOfFirstTodo = indexOfLastTodo - perPage;
        const currentTodos = apiData.slice(indexOfFirstTodo, indexOfLastTodo);

		const renderTodos = currentTodos.map((row, index) => {
			console.log(index + " : " + row.username);
			if(row.attributes[0].value < 50) {
				return 	<tr className="showRed" key={index} ><td >{row.username}</td>
						<td>{row.displayName}</td>
						<td>{row.status}</td></tr>;
			} else {
				return 	<tr key={index} ><td >{row.username}</td>
						<td>{row.displayName}</td>
						<td>{row.status}</td></tr>;
			}
        });
		
		
		return (
			<div className="search-box" style={{marginTop: 20}}>
				<form className="search-form" onSubmit={this.handleSearch}>
					<h3>Search User</h3>
					<input name ="searchText" placeholder="Enter User Name" type="text" onChange={this.handleChange}></input>
					<input type="submit" value="Search"></input>
				</form>
				
				<div className="searchResults">
					<div className="searchResultText">Search Result For: <span>{this.state.searchText}</span></div>
					<div className="searchResultText users-text">Users</div>
					<table>
						<tbody>
						<tr>
							<th>Username</th>
							<th>Name</th>
							<th>Status</th>
						</tr>
					{renderTodos}
					</tbody>
					</table>
				</div>
				<Pagination activePage={this.state.activePage}
							itemsCountPerPage={5}
							totalItemsCount={data.length}
							hideNavigation={true}
							hideFirstLastPages={true}
							onChange={this.handlePageChange} />
			</div>
		)
	}
}

export default Search;
