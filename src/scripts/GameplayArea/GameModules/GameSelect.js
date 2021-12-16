import { getGames, getScores, getTeams } from "../../dataAccess.js";
import { gameState } from "./Game.js";

export const GameSelect = () => {
    const games = getGames();
    const scores = getScores();
    const teams = getTeams();

    // filter to get array of only game objs in progress
    const incompleteGames = games.filter((game) => !game.completed);

    // beginning HTML 
    let html = `<h2 class="gameSelectChunk">Select An Option</h2>
    <section id="gameSelect" class="gameSelectChunk gameSelectMenu">
        <div class="gameSelectCard" id="gameSelect--newGame">New Game</div>`

    // construct each completed game's option html element
    html += incompleteGames.map((game) => {
        // find corresponding score objs to each game
        const foundScores = scores.filter(
            (score) => score.gameId === game.id
        );

        // find each team obj that matches the score obj and add teamName property to the score obj
        const foundScoresAndTeams = foundScores.map((foundScore) => {
            const foundTeam = teams.find(
                (team) => team.id === foundScore.teamId
            );
            foundScore.teamName = foundTeam.name;
            return foundScore;
        });

        // construct what goes in between <option>here</option>
        const optionHTML = foundScoresAndTeams.map((score) => {
            if (game.currentRound === 1) {
                return `${score.teamName}: 0`;
            } else if (game.currentRound === 2) {
                return `${score.teamName}: ${score.round1Score}`;
            } else if (game.currentRound === 3) {
                return `${score.teamName}: ${score.round2Score}`;
            }
        });

        return  `<div class="gameSelectCard" id="gameSelect--${game.id}">Game #${game.id}, Round ${game.currentRound}: ` + optionHTML.join(" | ") + `</div>`;
      }).join("")

    html += `</section>`

    return html
};

const mainContainer = document.querySelector(".container");

mainContainer.addEventListener("click", (event) => {
    if (event.target.id.startsWith("gameSelect--")) {
        const [,selectedGameId] = event.target.id.split("--")
        if (selectedGameId === "newGame") {
            gameState.changeState('newGame')
        } else {
            //change active game number 
            gameState.changeActiveGameId(parseInt(selectedGameId));
            //now change state
            gameState.changeState('continueGame');
        }
        
    }
});