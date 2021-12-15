import { getGames, getTeams, getScores } from "../dataAccess.js"

export const ActiveScoreBanner = () => {
    const games = getGames();
    const teams = getTeams();
    const scores = getScores();
    const incompleteGames = games.filter((game) => !game.completed);

    // create surrounding div for ticker
    let html =  `
        <div class="activeScoreBoard__ticker">
            <div class="scoreTitleCard">
                <h3>Live<br/>Games</h3>
            </div>`
    incompleteGames.forEach((game) => {
        // find corresponding score objs to each game
        html += `
        <div class="scoreCard">
            <table>
                <tbody>
        `
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

        // add table row for each team and their score
        foundScoresAndTeams.forEach(score => {
            html += `
            <tr>
                <td>${score.teamName}</td>
                <td>${score.round1Score + score.round2Score + score.round3Score}</td>
            </tr>`

        })

        // close out the score card
        html += ` 
                    </tbody>         
                </table>
            </div>`
      })

    return html + `</div>`;
}