import { getTeams, getScores, getGames } from "../../dataAccess.js";
import { BackToSelectButton } from "./BackToSelectButton.js";
import { gameState } from "./Game.js";

export const GameEnd = () => {
	const teams = getTeams();
	const scores = getScores();
	const games = getGames();

	const game = games.find((gam) => gam.id === gameState.activeGameId);
	const scoresArray = scores.filter((score) => score.gameId === game.id);
	//in this array, the index [0] team will be the one with the highest score.
	//Using a different array for this because we want to always display teams in the same order.
	const scoresSortArray = [...scoresArray];
	scoresSortArray.forEach(
		(score) =>
			(score.totalScore =
				score.round1Score + score.round2Score + score.round3Score)
	);
	//sort out the total scores. Highest scores will be at the end of array
	scoresSortArray.sort((a, b) => {
		return a.totalScore - b.totalScore;
	});
	//now mark them all appropriately as winner or not winner
	//first mark them all with a winner variable that takes the last index (highest total score) as a winner only
	for (let x = 0; x < scoresSortArray.length; x++) {
		if (x != scoresSortArray.length - 1) {
			scoresSortArray[x].winner = false;
		} else {
			scoresSortArray[x].winner = true;
		}
	}
	//now mark any team that has the same totalscore as the winner (last index) as also winner
	scoresSortArray.forEach((score) => {
		if (
			score.totalScore ===
			scoresSortArray[scoresSortArray.length - 1].totalScore
		) {
			score.winner = true;
		}
	});

	//now we make the html with all relevant information collected and sorted
	let html = `<h1 class="gameEndChunk">Final Scores</h1>
                <section class = "gameEndChunk finalScoreMenu">`;

	scoresArray.forEach((score) => {
		html += `<div class="finalScoreMenuCard">`;

        //find the score in scoresSortArray
        const thisScoreSort = scoresSortArray.find(sortScore => sortScore.id === score.id);
        //render correct crown image html based on whether or not this  score is a winner
        if (thisScoreSort.winner === true) {
            html += `<img src="./images/crown.png" alt="A golden crown" class="finalScoreMenuCardChunk crownSpot winnerCrown" />`
        } else {
            //empty div gets added for styling needs (even spacing layouts)
            html += `<div class="finalScoreMenuCardChunk crownSpot loserCrown">
                        </div>`
        }

		html += `<h3 class="finalScoreMenuCardChunk">${
			teams.find((team) => team.id === score.teamId).name
		}</h3>
        <ul class="pointsList scoreMenuCardChunk">
            <li class="pointsListItem">Total: ${
				score.round1Score + score.round2Score + score.round3Score
			}</li>`;
		//still using game.currentRound because (IN THEORY) that number is at four when a game is done and won't get higher.
		for (let i = 1; i < game.currentRound; i++) {
			html += `<li class="pointsListItem">Round ${i}: ${
				score[`round${i}Score`]
			}</li>`;
		}
		html += `</ul>
        </div>`;
	});
	//finish with adding our button and ending the section
	html += `</section>
			<section class="gameEndChunk gameEndButtons">
            ${BackToSelectButton()}
			</section>`;

	return html;
};

//There aren't any event listeners on this state. The only interactive element is the button which has its event listener in the module
