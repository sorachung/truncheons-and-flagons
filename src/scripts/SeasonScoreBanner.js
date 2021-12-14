import { getTeams } from "./dataAccess.js";

export const SeasonScoreBanner = () => {
    const teams = getTeams();
    let html = `<article class="ticker">`

    const scrollingText = teams.map(team => {
        return `<div class="teamTickerItem" id="team--${team.id}">${team.name}: ${team.seasonScore}</div>`
    }).join("")

    html += scrollingText + `</article>`
    return html
};
