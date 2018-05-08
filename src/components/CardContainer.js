import React from 'react';

class CardContainer extends React.Component {
	constructor() {
    super();
    this.Click = this.Click.bind(this);
  } 

  Click() {
  	if (!this.props.chosen) {
    	this.props.toggleChosen(this.props.index);
		}
  }

	render() {

		const chosen = this.props.chosen||this.props.timer ? 'chosen' : ''; 
		const visibility = this.props.coincided ? 'hidden' : 'visible ';

		return(
		<div className="container">
			<div 
				className={`card ${chosen}`}
				style = {{visibility:`${visibility}`}}
				onClick={this.Click} 
			>
			<div className="shirt" data-tid="Card"></div>
			<div className="front" data-tid="Card-flipped" style={{backgroundImage: this.props.image}}></div>
			</div>
		</div>
		)
	}
}

export default CardContainer;
