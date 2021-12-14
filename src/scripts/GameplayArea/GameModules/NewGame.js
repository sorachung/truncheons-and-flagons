import {
	getTeams,
	getGames,
	getScores,
	getPlayers,
	saveGame,
	saveScore
} from "../../dataAcces.js";

//html
export const NewGame = () => {
    const teams = getTeams();
	return `
        <h2>New Game</h2>
        <h3>Select Teams</h3>
        <section class="teamsMenu">
            <div class="teamSelectCard" id="teamOne">
                <select class="teamSelect" id="teamSelect--1">
                    <option value="">Choose A Team</option>
                    ${teams
						.map((team) => {
							//only show teams with full rosters
							if (team.totalPlayers >= 3) {
								return `<option value="${team.id}">${team.name}</option>`;
							}
						})
						.join("")}
                </select>
                <ul class="teamRoster" id="teamRoster--1">
                </ul>
            </div>
            
            <div class="teamSelectCard" id="teamTwo">
                <select class="teamSelect" id="teamSelect--2">
                    <option value="">Choose A Team</option>
                    ${teams
						.map((team) => {
							if (team.totalPlayers >= 3) {
								return `<option value="${team.id}">${team.name}</option>`;
							}
						})
						.join("")}
                </select>
                <ul class="teamRoster" id="teamRoster--2">
                </ul>
           </div>
           <div class="teamSelectCard" id="teamThree">
                <select class="teamSelect" id="teamSelect--3">
                    <option value="">Choose A Team</option>
                    ${teams
						.map((team) => {
							if (team.totalPlayers >= 3) {
								return `<option value="${team.id}">${team.name}</option>`;
							}
						})
						.join("")}
                </select>
                <ul class="teamRoster" id="teamRoster--3">
                </ul>
            </div>
        </section>
        <button class="button startGameButton" id="startGameButton">Start Game</button>
        `;
};

//grab maincontainer
mainContainer = document.querySelector(".container");

//add in our event listener for showing rosters based on selection
mainContainer.addEventListener("change", (changeEvent) => {
	if (changeEvent.target.id.startsWith("teamSelect")) {
        const players = getPlayers();

        //grab the team number
        const [,targetSelectNumber] = clickEvent.target.id.split('--');
        //use it to grab the correct roster ul
        const rosterListEl = document.querySelector(`#teamRoster--${targetSelectNumber}`)
        //with the correct html element identified we will now put in the roster list for the selected team
        //this starts with grabbing the correct team object's id
        const teamSelect = document.querySelector(`#teamSelect--${targetSelectNumber}`);
        const selectedTeamId = parseInt(teamSelect.options[teamSelect.selectedIndex].value);
        //now change the innerhtml of the selected team roster element to a list of all players that have ids which match to the team
        rosterListEl.innerHTML = players.map(player => {
            if (player.teamId === selectedTeamId) {
                return `<li class="rosterListItem">${player.firstName} ${player.lastName}</li>`
            }
        }).join("");
	}
});
