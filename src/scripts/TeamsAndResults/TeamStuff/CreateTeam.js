import { getTeams, saveTeam } from "../../dataAccess.js";

const mainContainer = document.querySelector(".container");

export const CreateTeam = () => {
	return `
        <label class="label createTeamChunk" for="createTeam">Create a New Team </label>
        <input class="createTeamChunk" type="text" id="createTeam" name="createTeam" placeholder="Enter your team name..." />
		<p class="createTeamMessage createTeamChunk"></p>
        <button class="button createTeamChunk" id="createTeamBtn">Create a Team</button>       
        `;
};

mainContainer.addEventListener("click", (event) => {
	if (event.target.id === "createTeamBtn") {
		const teams = getTeams();
		const newTeamName = document.querySelector(
			"input[id='createTeam']"
		).value;
		//will use this html element to deliver appropriate messages to user
		const message = document.querySelector(".createTeamMessage");
		if (
			teams.find(
				(team) => team.name.toLowerCase() === newTeamName.toLowerCase()
			)
		) {
			message.innerHTML = `That team name already exists`;
		} else if (newTeamName === "") {
			message.innerHTMl = `please enter a team name`;
		} else {
			const newTeam = {
				name: newTeamName,
				seasonScore: 0,
				totalPlayers: 0
			};
			window.alert(`You have created the team ${newTeamName}!`);
			saveTeam(newTeam).then(() => {
				mainContainer.dispatchEvent(
					new CustomEvent("teamStateChanged")
				);
			})
            .then(() => {
                mainContainer.dispatchEvent(
                    new CustomEvent("seasonStateChanged")
                );
            });
		}
	}
});
