import { getGames, getTeams, getScores } from "../dataAccess.js"

export const ActiveScoreBanner = () => {
    const games = getGames();
    const teams = getTeams();
    const scores = getScores();
    const incompleteGames = games.filter((game) => !game.completed);

    // construct each completed game's option html element
    let html =  `
        <div class="scoreTitleCard">
            <h3>Live<br/>Games</h3>
        </div>`
    incompleteGames.forEach((game) => {
        // find corresponding score objs to each game
        html += `<div class="scoreCard">
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
        foundScoresAndTeams.forEach(score => {
            html += `
                <td>${score.teamName}</td>
                <td>${score.round1Score + score.round2Score + score.round3Score}</td>
            </tr>`

        })
        html += ` 
            </tbody>         
    </table>
    </div>`
      })

    return html;
}


// import { getGames, getTeams, getScores } from "../dataAccess.js"

// export const ActiveScoreBanner = () => {
//     const games = getGames();
//     const teams = getTeams();
//     const scores = getScores();
//     const incompleteGames = games.filter((game) => !game.completed);

//     // construct each completed game's option html element
//     let html =  ``
//     incompleteGames.forEach((game) => {
//         // find corresponding score objs to each game
//         html += `<div class="scoreCard">
//         <table>
//             <thead>
//                 <tr>
//                     <th colspan=6>Game #: ${game.id}</th>
//                 </tr>
//                 <tr>
//                     <th>Teams</th>
//                     <th>Round 1</th>
//                     <th>Round 2</th>
//                     <th>Round 3</th>
//                     <th>Total</th>
//                 </tr>
//             </thead>
//             <tbody>
//         `
//         const foundScores = scores.filter(
//             (score) => score.gameId === game.id
//         );

//         // find each team obj that matches the score obj and add teamName property to the score obj
//         const foundScoresAndTeams = foundScores.map((foundScore) => {
//             const foundTeam = teams.find(
//                 (team) => team.id === foundScore.teamId
//             );
//             foundScore.teamName = foundTeam.name;
//             return foundScore;
//         });
//         foundScoresAndTeams.forEach(score => {
//             html += `
//                 <td>${score.teamName}</td>
//                 <td>${score.round1Score}</td>
//                 <td>${score.round2Score}</td>
//                 <td>${score.round3Score}</td>
//                 <td>${score.round1Score + score.round2Score + score.round3Score}</td>
//             </tr>`

//         })
//         html += ` 
//             </tbody>         
//     </table>
//     </div>`
//         // // construct what goes in between <option>here</option>
//         // const optionHTML = foundScoresAndTeams.map((score) => {
//         //     if (game.currentRound === 1) {
//         //         return `${score.teamName}: 0`;
//         //     } else if (game.currentRound === 2) {
//         //         return `${score.teamName}: ${score.round1Score}`;
//         //     } else if (game.currentRound === 3) {
//         //         return `${score.teamName}: ${score.round2Score}`;
//         //     }
//         // });
//       })

//     return html;
// }