import React from 'react';

class PlayerScore extends React.Component {
  render() {
  	return(
  		<ul className="table-row">
  			<li className="table-cell name">{this.props.playersInfo.nameOfPlayer }</li>
  			<li className="table-cell score">{this.props.playersInfo.score}</li>
  			<li className="table-cell date">{this.props.playersInfo.dateOfPlaying}</li>
  		</ul>
  	)
  }
}


export default PlayerScore;

