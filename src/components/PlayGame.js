import React from 'react';
import CardContainer from './CardContainer';
import WinGame from './WinGame';


class PlayGame extends React.Component {
	constructor(props) { 
			super(props);
			this.state = this.updateCardsState(props.cards);
			this.toggleChosen = this.toggleChosen.bind(this);
	}


	componentWillReceiveProps(nextProps) {
    this.setState(this.updateCardsState(nextProps.cards)); 
  }

  updateCardsState(cards) {
  	return {
  		cards: this.updateCards(cards),
  		chosen: null,
  		pause: false,
  		coincides: 0,
  		gameFinish:false,
  		score:0
  		
  	}
  }


  updateCards(cards) {
  	return	cards.reduce( (prev, current) => {
  		prev.push({
  			name:current.name,
  			image:current.image,
  			chosen: false,
  			coincided: false
  		});
  		return prev;
  	} , [])
  }

	isMatched(index1, index2) {
		const cards = [...this.state.cards];
		const card1 = cards[index1].name;
		const card2 = cards[index2].name;
		return card1 === card2; 

	}

	toggleChosen(index) {
		if (this.state.pause) {
			return;
		}

		const cards = [...this.state.cards];
		cards[index].chosen = true; 
		this.setState({
			cards,
			pause:true
		});

		
		if (!this.state.chosen && this.state.chosen !== 0) {
			
			this.setState({
				chosen: index,
				pause:false
			});
		} else {
			
			
			if(this.isMatched(index,this.state.chosen)) {
				const coincides = this.state.coincides + 1;
				cards[index].coincided = true; 
				cards[this.state.chosen].coincided = true; 
				
				const score = this.state.score + (9 - coincides) * 42;
				
				this.setState({
					cards,
					chosen:null,
					pause:false,
					coincides,
					score,
					gameFinish: coincides === this.state.cards.length/2 
				});	
			} else { 
				const coincides = this.state.coincides;
				let score = this.state.score - coincides * 42;
				score = score<0? 0: score; 
				setTimeout(() => {
					cards[index].chosen = false; 
					cards[this.state.chosen].chosen = false;
					this.setState({
						cards,
						score,
						chosen:null,
						pause:false
					});	
				} ,1000)
			}

		}

	}

	render() {
		const Game =this.state.gameFinish? <WinGame Start={this.props.Start} score = {this.state.score}/>: 
		(<section  >
				<div className="row-score">
					<button className="button" data-tid="Menu-newGame" onClick={this.props.Start}>Начать заново</button>
					<p>Очки: <span className="score" data-tid="Menu-scores">{this.state.score}</span></p>
				</div>
				<div className="card-deck" data-tid="Deck">
					{
						this.state.cards.map( (card, index) => 
							<CardContainer 
							index = {index}
							key = {index}
							name = {card.name}
							image = {card.image}
							chosen = {card.chosen}
							coincided = {card.coincided}
							toggleChosen = {this.toggleChosen}
							timer = {this.props.timer}
							/>
						 )
					}
				</div>
			</section>);

		return(
			<div className="game-page">
				{Game}
			</div>
			)
		}
	}

export default PlayGame;


