import {
	getGames,
	getScores,
	getTeams,
	getPositions,
	updateScore,
	updateGame,
	updateTeam
} from "../../dataAccess.js";
import { gameState } from "./Game.js";
import { BackToSelectButton } from "./BackToSelectButton.js";

export const ActiveGame = () => {
	const scores = getScores();
	const games = getGames();
	const teams = getTeams();
	const positions = getPositions();

	//get the correct game
	const game = games.find((gam) => gam.id === gameState.activeGameId);
	//get all scores associated with the game and put them into an array
	const scoresArray = scores.filter((score) => score.gameId === game.id);

	//start html
	let html = `<h1 class="activeGameChunk">Round ${game.currentRound}</h1>
        <h2 class="activeGameChunk">Enter Scores Below</h2>
        <section class="activeGameChunk scoreMenu">`;

	//make each teams score input card
	scoresArray.forEach((score) => {
		html += `<div class="scoreMenuCard">
                    <input type="number" class="roundScore scoreMenuCardChunk" id="roundScore--${
						score.id
					}" placeholder="Click To Enter Score" />
                    <h3 class="scoreMenuCardChunk">${
						teams.find((team) => team.id === score.teamId).name
					}</h3>
					<img class="scoreMenuCardChunk positionImage" src="${positions.find(pos => pos.id === score[`round${game.currentRound}PositionId`]).imageLink}" alt="ADD TEXT HERE" />
                    <ul class="pointsList scoreMenuCardChunk">
                        <li class="pointsListItem">Total: ${
							score.round1Score +
							score.round2Score +
							score.round3Score
						}</li>`;
		for (let i = 1; i < game.currentRound; i++) {
			html += `<li class="pointsListItem">Round ${i}: ${
				score[`round${i}Score`]
			}</li>`;
		}
		html += `</ul>
            </div>`;
	});

	//and finish with ending the input menu section and adding submit score and back button
	html += `</section>
	<section class="activeGameChunk activeGameButtons">
    <button class="button" id="submitScoresButton">Submit Round ${game.currentRound} Scores</button>
    ${BackToSelectButton()}
	</section>`;

	return html;
};

//grab our container
const mainContainer = document.querySelector(".container");

//submit scores
mainContainer.addEventListener("click", (clickEvent) => {
	if (clickEvent.target.id === "submitScoresButton") {
		// collect relevant objects
		const scores = getScores();
		const games = getGames();
		const teams = getTeams();

		const game = games.find((gam) => gam.id === gameState.activeGameId);
		const scoresArray = scores.filter((score) => score.gameId === game.id);
		

		//create our array to hold the promises
		const promiseArray = [];
		// // variable used to check total of scores entered per round
		// let totalRoundScore = 0;

		let hasNegativeNumber = false;
		
		//update round scores for all shallow score object copy things
		scoresArray.forEach((score) => {
			let newScore = parseInt(mainContainer.querySelector(
				`#roundScore--${score.id}`
			).value);
			if (!newScore) {
				newScore = 0;
			} 
			
			if(newScore < 0) {
				hasNegativeNumber = true;
			} else {
				score[`round${game.currentRound}Score`] = newScore;
			}
			// // add score from each team 
			// totalRoundScore += newScore;
		});

		// // check if sum of the three teams scores are greater than 3
		// if(totalRoundScore > 3) {
		// 	window.alert("Round score total must not exceed 3.")
		// } else {
			
		//only do this stuff if there is NO negative score put in
		if (!hasNegativeNumber) {
			//update our game object shallow copy's round counter
			game.currentRound++;

			//split off what happens based on what round we are in (finished game)
			if (game.currentRound > 3) {
				//game is over
				game.completed = true;
				game.dateFinished = Date.now();
				//put all promises to update score into the array
				scoresArray.forEach((score) => {
					//get team that matches each score to update that team's seasonScore property
					const currentTeam = teams.find(team => team.id === score.teamId);
					currentTeam.seasonScore += score.round1Score + score.round2Score + score.round3Score;
					promiseArray.push(updateTeam(currentTeam));

					promiseArray.push(updateScore(score));
				});
				//put updated game into promise array
				promiseArray.push(updateGame(game));
				//do the promises
				Promise.all(promiseArray).then(() => {
					gameState.changeState("activeGameFinished");
				});
			} else {
				//game is still going on
				//put all promises to update score into the array
				scoresArray.forEach((score) => {
					promiseArray.push(updateScore(score));
				});
				//put updated game into promise array
				promiseArray.push(updateGame(game));
				//do the promises
				Promise.all(promiseArray).then(() => {
					//now update game state
					gameState.changeState("activeGameContinue");
				});
			}	

		// }
		} else {
			window.alert("Negative scores are not allowed");
		}
		
	}
});