import { getTeams } from "./dataAccess.js";

export const SeasonScoreBanner = () => {
    const teams = getTeams();
    const sortedTeams = teams.sort((team1, team2) => team2.seasonScore - team1.seasonScore);
    let html = `<article class="ticker">`

    const scrollingText = sortedTeams.map(team => {
        return `<div class="teamTickerItem">${team.name}: ${team.seasonScore}</div>`
    }).join("")

    html += scrollingText + `</article>`
    return html
};