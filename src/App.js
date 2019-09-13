import React from "react";
import "./App.scss";
import Search from "./Components/Search/Search.js";

class App extends React.Component {
	render() {
		return(
			<div className="App">
				<h2 className="mv-title">Find Your Character</h2>
				<Search limit={64} />
			</div>
		);
	}
}

export default App;