import { getTeams, saveTeam } from "../../dataAccess.js";

const mainContainer = document.querySelector(".container");

let message = "";

export const CreateTeam = () => {
    return `
        <label class="label" for="createTeam">Create a New Team </label>
        <input type="text" id="createTeam" name="createTeam" />
        <button class="button" id="createTeamBtn">Create a Team</button>
        <p>${message}</p>
        `;
};

mainContainer.addEventListener("click", (event) => {
    if (event.target.id === "createTeamBtn") {
        const teams = getTeams();
        const newTeamName = document.querySelector(
            "input[id='createTeam']"
        ).value;

        if (
            teams.find(
                (team) => team.name.toLowerCase() === newTeamName.toLowerCase()
            )
        ) {
            message = `that team name already exists`;
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
        } else if (newTeamName === "") {
            message = `please enter a team name`;
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
        } else {
            message = `You have created the team <br/>${newTeamName}!`;
            const newTeam = {
                name: newTeamName,
                seasonScore: 0,
                totalPlayers: 0,
            };
            saveTeam(newTeam);
        }
    }
});
