import { getTeams, savePlayer, updateTeam } from "../../dataAccess.js";

const mainContainer = document.querySelector(".container");

export const JoinTeam = () => {
	const teams = getTeams();
	//alphabetically sort team names
	teams.sort((a,b) => a.name.localeCompare(b.name));

	return `
		<div class="joinTeamChunk">Join a Team</div>
        <input type="text" class="firstName joinTeamChunk" id="firstName" placeholder="Enter your first name..."></input>
        <input type="text" class="lastName joinTeamChunk" id="lastName" placeholder="Enter your last name..."></input>
        <input type="text" class="country joinTeamChunk" id="country" placeholder="Enter your country of origin..."></input>
        <select class="teamsToJoin joinTeamChunk" id="teamsToJoin">
            <option class="teamsToJoinItem" value="">Choose a team to join</option>
            ${teams
				.map((team) => {
					//only show teams that need members
					if (team.totalPlayers < 3) {
						return `<option class="teamsToJoinItem" value="${team.id}">${team.name}</option>`;
					}
				})
				.join("")}
        </select>
        <button class="button joinTeamButton joinTeamChunk" id="joinTeamButton">Join Team</button>`;
};

mainContainer.addEventListener("click", (clickEvent) => {
	if (clickEvent.target.id === "joinTeamButton") {
		//grab the necessary info
		const userFirstName = document.querySelector("#firstName").value;
		const userLastName = document.querySelector("#lastName").value;
		const userCountry = document.querySelector("#country").value;
		const teamSelect = document.querySelector("#teamsToJoin");
		const userTeamChoice = parseInt(
			teamSelect.options[teamSelect.selectedIndex].value
		);
		//make sure all of these actually have been selected
		if (userFirstName && userLastName && userTeamChoice && userCountry) {
			//save the player
			const dataToSendToAPI = {
				firstName: userFirstName,
				lastName: userLastName,
				country: userCountry,
				teamId: userTeamChoice
			};

			//update the team with one more player
			//first find the team and change the player count of the object
			const teams = getTeams();
			const updatedTeam = teams.find(
				(team) => team.id === userTeamChoice
			);
			updatedTeam.totalPlayers++;
			//now update it in the database and alert user
			window.alert(
				`${userFirstName} ${userLastName} has joined ${updatedTeam.name}`
			);
			updateTeam(updatedTeam)
				.then(() => savePlayer(dataToSendToAPI))
				.then(() => {
					mainContainer.dispatchEvent(
						new CustomEvent("teamStateChanged")
					);
				});
		} else {
			document.querySelector("#joinTeamButton").innerHTML =
				"Missing Information";
		}
	}
});
