import { getGames, getScores, getTeams } from "../../dataAccess.js";
import { recentGamesState } from "./RecentGames.js";

export const RecentGamesList = () => {
    const games = getGames();
    const scores = getScores();
    const teams = getTeams();
    let html = '<h2>Recent Game Results</h2><ul class="recentGamesList">';
    
    // find only completed games to display and only the last 15
    const completedGames = games.filter((game) => game.completed)
    if (completedGames.length > 1) {
        completedGames.sort((game1, game2) => game1.dateFinished - game2.dateFinished)
    }

    completedGames.forEach((game) => {
        html += `<li class="recentGamesListItem" id="recentGamesList--${game.id}">Game #${game.id}: `;
        
        // array that contains the three teams that participated in a game
        const threeTeamScores = [];

        // find each score object that matches with each game
        let foundScores = scores.filter((score) => score.gameId === game.id);
        for (const foundScore of foundScores) {
            // find each team obj that matches with each score obj
            const foundTeam = teams.find(
                (team) => foundScore.teamId === team.id
            );
            //add the object of team name and score to array
            threeTeamScores.push({
                name: foundTeam.name,
                score: foundScore.round1Score + foundScore.round2Score + foundScore.round3Score
            })
        }

        // sort the teams by highest scoring to lowest scoring
        threeTeamScores.sort((team1, team2) => {
            return team2.score - team1.score
        })

        // add each team's score to the html rep
        html += threeTeamScores.map((team) => `${team.name}: ${team.score}`).join(" | ") + `</li>`
    });

    html += `</ul>`

    return html;
};

//grab container
const mainContainer = document.querySelector(".container");

//add our event listener for when we click one of the games
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("recentGamesList--")) {
        const [,gameId] = clickEvent.target.id.split("--");
        recentGamesState.changeBoxScoreGameId(parseInt(gameId));
        recentGamesState.changeState('boxScore');
    }
})