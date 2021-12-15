import { getPlayers, getTeams } from "../../dataAccess.js";

export const TeamRostersList = () => {
    const teams = getTeams();
    const players = getPlayers();

    let html = `<ul class="teamRostersListUl">`;
    html += teams
        .map((team) => {
            const playersInTeam = players.filter(
            (player) => player.teamId === team.id
            );
            return `
            <li class="teamRostersListItem" id="teamRosterListItem--${team.id}">
                ${team.name}
                <div class="teamRosterPopUp" id="teamRosterPopUp--${team.id}">
                <ul class=teamRosterPlayers>
                    ${playersInTeam.length > 0 ? playersInTeam.map((player) => `<li>${player.firstName} ${player.lastName}</li>`).join("") : `<li>no players</li>`}
                </ul>    
                
                </div>
            </li>`;
        })
        .join("");
    html += `</ul>`;

    return html;
};

const mainContainer = document.querySelector(".container");
mainContainer.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id.startsWith("teamRosterListItem--")) {
        const [, teamId] = clickEvent.target.id.split("--");
        const popup = document.getElementById(`teamRosterPopUp--${teamId}`)

        const showPopups = document.getElementsByClassName("show")
        if(showPopups.length > 0 ) {
            for (const showPopup of showPopups) {
                if(showPopup.id != popup.id){
                    showPopup.classList.remove("show")
                }
            }
        }
        popup.classList.toggle("show");
        
    }
});
