import React from "react";
import "./Characters.scss";
import Character from "../Character/Character";

class Characters extends React.Component {
	render() {
		const { error, isLoaded, items } = this.props.data;

		if (error) {
			return <div className="mv-message">Error: {error.code}. {error.status || error.message}</div>;
		} else if (!isLoaded) {
			return <div className="preloader">Loading...</div>;
		} else if (items.length === 0) {
			return <div className="mv-message">No characters found</div>;
		} else {
			return (
				<div className="Characters">
					<ul>
						{items.map(item => (
							<Character key={item.id} item={item} />
						))}
					</ul>
				</div>
			);
		}

	}
}

export default Characters;