import React from "react";
import "./Character.scss";

class Character extends React.Component {
	render() {
		const item = this.props.item;
		return (
			<li className="Characters__item">
				<a href={item.urls[0].url} className="Characters__link" target="_blank">
					<img src={item.thumbnail.path + '/standard_xlarge.'+ item.thumbnail.extension}
					     alt={item.name}
					     title={item.name} />
					<div className="Characters__link_hover">
						<div className="Characters__learn-more">Learn more</div>
					</div>
				</a>
				{item.name}
			</li>
		);
	}
}

export default Character;