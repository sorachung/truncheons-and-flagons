import { getTeams, getPlayers } from "../../dataAccess.js";

export const JoinTeam = () => {
    const teams = getTeams();
    return `
        <input type="text" class="firstName joinTeamChunk" id="firstName" placeholder="Enter your first name..."></input>
        <input type="text" class="lastName joinTeamChunk" id="lastName" placeholder="Enter your last name..."></input>
        <select class="teamsToJoin joinTeamChunk" id="teamsToJoin">
            <option value="">Choose a team to join</option>
            ${
                teams.map(team => {
                    //only show teams that need members
                    if (team.totalPlayers < 3) {
                        return `<option value="${team.id}>${team.name}</option>`
                    }
                }).join("")
            }
        </select>
        <button class="button joinTeam" id="joinTeam">Join Team</button>`
}