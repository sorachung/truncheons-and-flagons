import { getTeams } from "./dataAccess.js";

export const SeasonScoreBanner = () => {
    const teams = getTeams();
    const sortedTeams = teams.sort((team1, team2) => team2.seasonScore - team1.seasonScore);
    let html = `<div class="ticker-wrap"><article class="ticker">`

    const scrollingText = sortedTeams.map(team => {
        return `<div class="teamTickerItem">${team.name}: ${team.seasonScore}</div>`
    }).join("")

    html += scrollingText + `</article></div>`
    return html
};

//a special event used to update just this module in specific circumstances
const mainContainer = document.querySelector(".container");

mainContainer.addEventListener("seasonStateChanged", customEvent => {
    const headerEl = document.querySelector(".header");
    headerEl.innerHTML = SeasonScoreBanner();
})