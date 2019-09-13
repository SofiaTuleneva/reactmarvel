import React from "react";
import Characters from "../Characters/Characters";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleShowMore = this.handleShowMore.bind(this);
		this.getCharactersByName = this.getCharactersByName.bind(this);

		this.state = {
			error: null,
			isLoaded: true,
			items: [],
			name: '',
			offset: 0,
			total: ''
		};
	}

	getCharactersByName(name, offset) {
		this.setState({
			error: null,
			isLoaded: false,
			items: []
		});

		// Public Key
		// 05b2be7446add8d4fc42d9c44ee1b846

		const marvelAPI = 'https://gateway.marvel.com/v1/public/characters';
		$.getJSON(marvelAPI, {
			apikey: '05b2be7446add8d4fc42d9c44ee1b846',
			limit: this.props.limit,
			orderBy: 'name',
			nameStartsWith: name,
			offset: offset || 0
		}).done(
			(response) => {
				this.setState((prevState, props) => {
					return {
						isLoaded: true,
						items: response.data.results,
						offset: prevState.offset + response.data.count,
						total: response.data.total,
						limit: response.data.limit,
						count: response.data.count
					};
				});

				console.log(response.data);
			}
		).fail(
			(jqXHR, textStatus, errorThrown) => {
				alert('Error. Check your Internet connection.');
				this.setState({
					isLoaded: true,
					error: JSON.parse(jqXHR.responseText)
				});
			}
		);
	}

	handleSubmit(e) {
		e.preventDefault();

		let name = e.target.elements.search.value;
		if (name === '') return;

		this.setState({
			name: name,
			offset: 0
		});

		this.getCharactersByName(name);
	}

	handleShowMore() {
		this.getCharactersByName(this.state.name, this.state.offset);
	}

	render() {
		return (
			<div className="Search">
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<input
							name="search"
							className="form-control form-control-lg"
							placeholder="Name of your character starts with"/>
					</div>
					<div className="form-group text-center">
						<input
							type="submit"
							className="btn btn-primary btn-lg"
							value="Go"/>
					</div>
				</form>

				{this.state.offset > 0 &&
				<div className="mv-message">{this.state.offset} / {this.state.total} characters</div>
				}

				<Characters data={this.state}/>

				{this.state.offset < this.state.total &&
				<div className="text-center">
					<button className="btn btn-lg btn-secondary"
					        onClick={this.handleShowMore}>
						Show next
					</button>
				</div>
				}
			</div>
		);
	}
}

export default Search;