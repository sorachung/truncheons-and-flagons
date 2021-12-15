import { fetchGames, fetchPlayers, fetchScores, fetchTeams } from "./dataAccess.js";
import { SeasonScoreBanner } from "./SeasonScoreBanner.js";
import { TruncheonsAndFlagons } from "./TruncheonsAndFlagons.js";

const mainContainer = document.querySelector(".container");
const headerContainer = document.querySelector(".header")

const render = () => {
    Promise.all([fetchPlayers(), fetchTeams(), fetchGames(), fetchScores()])
    .then( () => {
        mainContainer.innerHTML = TruncheonsAndFlagons();
        headerContainer.innerHTML = SeasonScoreBanner();
    })
};

render();

mainContainer.addEventListener("stateChanged", event => {
    render();
})