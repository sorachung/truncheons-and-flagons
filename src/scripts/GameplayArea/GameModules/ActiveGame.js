import { getGames, getScores, getTeams } from "../../dataAccess.js";
import { gameState } from "./Game.js";

export const ActiveGame = () => {
	const scores = getScores();
	const games = getGames();
	const teams = getTeams();

	//get the correct game
	const game = games.find((gam) => gam.id === gameState.activeGameId);
	//get all scores associated with the game and put them into an array
	const scoresArray = scores.filter((score) => score.gameId === game.id);

    //start html
	let html = `<h1>Round ${game.currentRound}</h1>
        <h2>Enter Scores Below</h2>
        <section class="scoreInputMenu">`;
    
    //make each teams score input card
    scoresArray.forEach(score => {
        html += `<div class="scoreInputMenuCard">
                    <input type="number" class="roundScore scoreInputMenuCardChunk" id="roundScore--${score.teamId} placeholder="Round ${game.currentRound} Score" />
                    <h3 class="scoreInputMenuCardChunk">${teams.find(team => team.id === score.teamId).name}</h3>
                    <ul class="pointsList scoreInputMenuCardChunk">
                        <li class="pointsListItem">Total: ${score.round1Score + score.round2Score + score.round3Score}</li>`;
        for (let i = 1; i < game.currentRound; i++) {
            html += `<li class="pointsListItem">Round ${i}: ${score[`round${i}Score`]}</li>`
        }
        html += `</ul>
            </div>`
    });

    //and finish with ending the input menu section and edding the button
    html += `</section>
    <button class="button" id="submitScoresButton">Submit Round ${game.currentRound} Scores</button>`

    return html;
}

//grab our container
const mainContainer = document.querySelector('.container');

//submit scores
mainContainer.addEventListener("click", (clickEvent) => {
    
})