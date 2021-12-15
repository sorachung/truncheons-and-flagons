import { RecentGames } from "./RecentGames/RecentGames.js";
import { JoinTeam } from "./TeamStuff/JoinTeam.js";
import { CreateTeam } from "./TeamStuff/CreateTeam.js" 
import { TeamList } from "./TeamStuff/TeamList.js";
import { fetchPlayers, fetchTeams } from "../dataAccess.js";

export const TeamsAndResults = () => {

    return `
    <section class="teamFormation teamsAndResultsChunk">
        <div class="teamFormationChunk teamCreation">
            ${CreateTeam()}
        </div>
        <div class="teamFormationChunk joinTeam">
            ${JoinTeam()}
        </div>
        <div class="teamFormationChunk incompleteTeamList">
            ${TeamList()}
        </div>
    </section>
    <section class="recentGameResults teamsAndResultsChunk">
            ${RecentGames()}
    </section>`
}

//grab container
const mainContainer = document.querySelector(".container");

//make our listener that rerenders this area only
mainContainer.addEventListener("teamStateChanged", customEvent => {
    Promise.all([fetchPlayers(), fetchTeams()])
        .then(() => {
            const teamEl = document.querySelector(".teamsAndResults");
            teamEl.innerHTML = TeamsAndResults();
        })
})