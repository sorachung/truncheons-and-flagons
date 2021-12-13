import { getTeams, getPlayers } from "../../dataAccess.js";

const mainContainer = document.querySelector(".container");

export const JoinTeam = () => {
    const teams = getTeams();
    return `
        <input type="text" class="firstName joinTeamChunk" id="firstName" placeholder="Enter your first name..."></input>
        <input type="text" class="lastName joinTeamChunk" id="lastName" placeholder="Enter your last name..."></input>
        <input type="text" class="country joinTeamChunk" id="country" placeholder="Enter your country of origin..."></input>
        <select class="teamsToJoin joinTeamChunk" id="teamsToJoin">
            <option value="">Choose a team to join</option>
            ${
                teams.map(team => {
                    //only show teams that need members
                    if (team.totalPlayers < 3) {
                        return `<option value="${team.id}">${team.name}</option>`
                    }
                }).join("")
            }
        </select>
        <button class="button joinTeamButton joinTeamChunk" id="joinTeamButton">Join Team</button>`
}

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "joinTeamButton") {
        //grab the necessary info
        const userFirstName = document.querySelector("#firstName");
        const userLastName = document.querySelector("#lastName");
        const userCountry = document.querySelector("#country");
        const teamSelect = parseInt(document.querySelector("#teamsToJoin"));
        let userTeamChoice;
        if (teamSelect) {
        userTeamChoice = teamSelect.options[teamSelect.selectedINdex].value;
        } else {
            userTeamChoice = undefined;
        }

        //make sure all of these actually have been selected
        if (userFirstName && userLastName && userTeamChoice && userCountry) {
            const dataToSendToAPI = {
                firstName: userFirstName,
                lastName: userLastName,
                country: userCountry,
                teamId: userTeamChoice
            }

            savePlayer(dataToSendToAPI);
        } else {
            window.alert("message to say pick something, will change later");
        }
    }
})