import { getGames, getScores, getTeams } from "../dataAccess.js";

export const RecentGamesList = () => {
    const games = getGames();
    const scores = getScores();
    const teams = getTeams();
    let html = "<ul>";
    
    // find only completed games to display and only the last 15
    const completedGames = games.filter((game) => game.completed)
    if (completedGames.length > 1) {
        completedGames.sort((game1, game2) => game1.dateFinished - game2.dateFinished)
    }

    completedGames.map((game) => {
        html += `<li>Game #${game.id}: `;
        
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
                score: foundScore.roundOneScore + foundScore.roundTwoScore + foundScore.roundThreeScore
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
