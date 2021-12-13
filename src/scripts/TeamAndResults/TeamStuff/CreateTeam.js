import { getTeams, saveTeam } from "../../dataAccess.js";

const mainContainer = document.querySelector(".container");

export const CreateTeam = () => {
    return `
        <label class="label" for="createTeam">Create a New Team </label>
        <input type="text" id="createTeam" name="createTeam" />
        <button class="button" id="createTeamBtn">Create a Team</button>
        <p class="createTeamMessage"></p>
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
            message.innerHTML = `that team name already exists`;
        } else if (newTeamName === "") {
            message.innerHTMl = `please enter a team name`;
        } else {
            const newTeam = {
                name: newTeamName,
                seasonScore: 0,
                totalPlayers: 0,
            };
            message.innnerHTML = `You have created the team <br/>${newTeamName}!`;
            saveTeam(newTeam);
        }
    }
});
