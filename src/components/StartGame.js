import React from 'react';


class StartGame extends React.Component {
	render() {
		return(
		<section className="start-page " data-tid="App" >
			<img src="Cards/StartGame.png" className = "start-image" alt="Card-Main"/>
			<h1 className="heading">MEMORY GAME</h1>
			<button className="button main-button" data-tid="NewGame-startGame"
			onClick={this.props.Start}

			>Начать игру</button>
		</section>
		)
	}
}

export default StartGame;