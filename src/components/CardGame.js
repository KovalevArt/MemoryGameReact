import React from 'react';

import StartGame from './StartGame';
import PlayGame from './PlayGame';
import WinGame from './WinGame';
import CARDS from '../CARDS';
import { Random } from '../HelpFunction';

import CardContainer from './CardContainer';

class CardGame extends React.Component {

	constructor() {
		super();

		this.getRandomCards = this.getRandomCards.bind(this);
		this.Start = this.Start.bind(this);
		this.finish = this.finish.bind(this);
		
		this.state = {
			gameStart: false,
			gameFinish: false,
			cards: []

		};
	}

	Start() {
		this.getRandomCards();
		this.setState({
			gameStart: true,
			gameFinish: false,
			timer: false
		});
		setTimeout(()=>{
			this.setState({timer:true})
		},700);
		setTimeout(()=>{
			this.setState({timer:false})
		},5700);
	}

	getRandomCards() {


		let RandomCards = CARDS
			.sort(Random)
			.slice(0,9);

		let RandomPairOfCards = [...RandomCards, ...RandomCards]
			.sort(Random);

		this.setState({
			cards: RandomPairOfCards
		});
	}


finish() {
	this.setState({
			gameFinish: true
	});
}

	render() {

		const gameOn = this.state.gameStart ? 
				this.state.gameFinish ? <WinGame Start={this.Start}/>: <PlayGame
				cards={this.state.cards}
				finish= {this.finish} 
				Start={this.Start}
				timer={this.state.timer}/> 
		: <StartGame Start={this.Start}/>;
		
		return(
			<div className = "main-wrap">
				{gameOn}
			</div>
		
		)
	}
}

export default CardGame;

