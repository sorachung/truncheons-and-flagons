import { TruncheonsAndFlagons } from "./TruncheonsAndFlagons.js";

const mainContainer = document.querySelector(".container");

const render = () => {
    mainContainer.innerHTML = TruncheonsAndFlagons();
};

render();