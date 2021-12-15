import { getTeams, getScores, getGames } from "../../dataAccess.js";
import { recentGamesState } from "./RecentGames.js";

export const BoxScore = () => {
    // this is a copy of the game end menu with adjust class names to allow for accurate CSS and a different buttona the bottom
    const teams = getTeams();
	const scores = getScores();
	const games = getGames();

	const game = games.find((gam) => gam.id === recentGamesState.boxScoreGameId);
	const scoresArray = scores.filter((score) => score.gameId === game.id);

	const scoresSortArray = [...scoresArray];
	scoresSortArray.forEach(
		(score) =>
			(score.totalScore =
				score.round1Score + score.round2Score + score.round3Score)
	);
	
	scoresSortArray.sort((a, b) => {
		return a.totalScore - b.totalScore;
	});
	
	for (let x = 0; x < scoresSortArray.length; x++) {
		if (x != scoresSortArray.length - 1) {
			scoresSortArray[x].winner = false;
		} else {
			scoresSortArray[x].winner = true;
		}
	}
	
	scoresSortArray.forEach((score) => {
		if (
			score.totalScore ===
			scoresSortArray[scoresSortArray.length - 1].totalScore
		) {
			score.winner = true;
		}
	});

	
	let html = `<h1>Final Scores</h1>
                <section class = "boxScore">`;

	scoresArray.forEach((score) => {
		html += `<div class="boxScoreCard">`;

        const thisScoreSort = scoresSortArray.find(sortScore => sortScore.id === score.id);
        
        if (thisScoreSort.winner === true) {
            html += `<img src="./images/crown.png" alt="A golden crown" class="boxScoreCardChunk crownSpot winnerCrown" width="50" height="50" />`
        } else {
            html += `<div class="boxScoreCardChunk crownSpot loserCrown">
                        </div>`
        }

		html += `<h3 class="boxScoreCardChunk">${
			teams.find((team) => team.id === score.teamId).name
		}</h3>
        <ul class="pointsList boxScoreCardChunk">
            <li class="pointsListItem">Total: ${
				score.round1Score + score.round2Score + score.round3Score
			}</li>`;
		
		for (let i = 1; i < game.currentRound; i++) {
			html += `<li class="pointsListItem">Round ${i}: ${
				score[`round${i}Score`]
			}</li>`;
		}
		html += `</ul>
        </div>`;
	});
	
	html += `</section>
            <button class="button" id="backToGamesListButton">Back</button>` 
    
    return html;
}

//grab container
const mainContainer = document.querySelector(".container");

//add event listener for button click
mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "backToGamesListButton") {
        recentGamesState.changeState("list");
    }
})