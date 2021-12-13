import { fetchGames, fetchPlayers, fetchScores, fetchTeams } from "./dataAccess.js";
import { TruncheonsAndFlagons } from "./TruncheonsAndFlagons.js";

const mainContainer = document.querySelector(".container");

const render = () => {
    Promise.all([fetchPlayers(), fetchTeams(), fetchGames(), fetchScores()])
    .then( () => {
        mainContainer.innerHTML = TruncheonsAndFlagons();
    })
};

render();

mainContainer.addEventListener("stateChanged", event => {
    render();
})