import React from 'react';
import PlayerScore from './PlayerScore';


class WinGame extends React.Component {
	constructor() {
    	super();
    	this.SaveScore = this.SaveScore.bind(this);
    	this.toggleShowForm = this.toggleShowForm.bind(this);
    	this.toggleShowScoreTable = this.toggleShowScoreTable.bind(this);
    	this.state = {
    		showForm:false,
    		showScoreTable: false,
    		players:{},
    	};

	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('PlayerScores', JSON.stringify(nextState.players));
	}

	componentWillMount() {
		const localStorageRef = localStorage.getItem('PlayerScores');

		if (localStorageRef) {this.setState({
			players:JSON.parse(localStorageRef)
			});
		}
	}

	toggleShowForm(){
		this.setState({
			showForm: !this.state.showForm
		});
	}

	toggleShowScoreTable(){
		this.setState({
			showScoreTable: !this.state.showScoreTable
		});
	}

	SaveScore(event) {
		event.preventDefault();
		const playerID = Date.now();
		const date = new Date();
		const day = date.getDate();
		const month = date.getMonth();
		const minute = date.getMinutes();
		const hour = date.getHours();
		const dateOfPlaying = `${hour<10? '0':''}${hour}:${minute<10? '0':''}${minute} ${day<10? '0':''}${day}.${month<10? '0':''}${month}.${date.getFullYear()}`;
		const player={
			nameOfPlayer:this.nameOfPlayer.value,
			dateOfPlaying,
			score: this.props.score,
			
		};
		
		const players = {...this.state.players};
		players[`player-${playerID}`] = player;

		this.setState({
			showForm: !this.state.showForm,
			players,
			playerID
		});
	}

	render() {

		const Form = 	this.state.showForm ? (	<form action="" onSubmit ={this.SaveScore} className = "save-score">
				<input type="text" required placeholder ="Введите имя " name ="name" ref={(input)=> this.nameOfPlayer = input}/>
				<button className="button main-button" type = "submit" >Сохранить</button>
			</form>):null;

		const ScoreTable = this.state.showScoreTable ?	
			<div className ="table-wrap">
				<div className="table">
					<ul className="table-row">
		  			<li className="table-cell name">Имя </li>
		  			<li className="table-cell score">Счет </li>
		  			<li className="table-cell date">Дата</li>
  				</ul>
					{
						Object.keys(this.state.players).
							map(key=> <PlayerScore key={key} playersInfo={this.state.players[key]}/>)
					}
				</div>
			</div>
		  : null ;

		return(
		<section className="end-page ">

			<img src="Cards/Group2.png" alt="Card-won" className ="end-image"/>
			<div className="congrats">
				<p>Поздравляем<br/>Ваш итоговый счет: <span className="score">{this.props.score}</span></p>
			</div>

			<button onClick ={this.toggleShowForm} className="button main-button"
			style={this.state.showForm ? {display:"none"}: null}>
				Сохранить результат
			</button>
			{Form}			
			<button className="button main-button" data-tid="EndGame-retryGame" onClick={this.props.Start}>Еще раз</button>
			<button className="button main-button show-result" onClick ={this.toggleShowScoreTable}>
				{this.state.showScoreTable ? 'скрыть результат':'показать результат'}
				</button>
			{ScoreTable}
	</section>
		)
	}
}

export default WinGame;