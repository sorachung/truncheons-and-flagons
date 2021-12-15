import { getPlayers, getTeams } from "../../dataAccess.js";

export const TeamRostersList = () => {
    const teams = getTeams();
    let html = `<ul class="teamRostersList">`
    html = teams.map(team => {
        const playersInTeam = players.filter(player => player.teamId === team.id)
        return `
            <li class="teamRostersListItem" id="teamRosterListItem--${team.id}">
                ${team.name}
            </li>`
    }).join("")
    html += `</ul>`

    return html;
}
