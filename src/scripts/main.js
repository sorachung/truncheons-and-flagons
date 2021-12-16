import { fetchGames, fetchPlayers, fetchScores, fetchTeams, fetchPositions } from "./dataAccess.js";
import { SeasonScoreBanner } from "./SeasonScoreBanner.js";
import { TruncheonsAndFlagons } from "./TruncheonsAndFlagons.js";
import { Footer } from "./Footer.js";

const mainContainer = document.querySelector(".container");
const headerContainer = document.querySelector(".header");
const footerContainer = document.querySelector(".footer");

const render = () => {
    Promise.all([fetchPlayers(), fetchTeams(), fetchGames(), fetchScores(), fetchPositions()])
    .then( () => {
        mainContainer.innerHTML = TruncheonsAndFlagons();
        headerContainer.innerHTML = SeasonScoreBanner();
        footerContainer.innerHTML = Footer();
    })
};

render();

mainContainer.addEventListener("stateChanged", event => {
    render();
})