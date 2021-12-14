import { getGames, getScores, getTeams } from "../../dataAccess.js";
import { gameState } from "./Game.js";

export const GameSelect = () => {
    const games = getGames();
    const scores = getScores();
    const teams = getTeams();

    // filter to get array of only game objs in progress
    const completedGames = games.filter((game) => !game.completed);

    // beginning HTML 
    let html = `<label for="gameSelect">Select a game:</label>
    <select id="gameSelect" name="gameSelect">
        <option value="0">Choose your game</option>
        <option value="newGame">New Game</option>`

    // construct each completed game's option html element
    html += completedGames.map((game) => {
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
                return `${score.teamName}: ${score.roundOneScore}`;
            } else if (game.currentRound === 3) {
                return `${score.teamName}: ${score.roundTwoScore}`;
            }
        });

        return  `<option value="${game.id}">Game #${game.id}, Round ${game.currentRound}: ` + optionHTML.join(" | ") + `</option>`;
      })

    html += `</select>
    <button class="button" id="selectGameBtn">Select Game</button>`

    return html
};

const mainContainer = document.querySelector(".container");

mainContainer.addEventListener("click", (event) => {
    if (event.target.id === "selectGameBtn") {
        const selectedGameId = mainContainer.querySelector(`select[id="gameSelect"]`).value 
        if (selectedGameId === "newGame") {
            gameState.changeState('newGame')
        } else {
            gameState.changeState('continueGame')
        }
        
    }
});