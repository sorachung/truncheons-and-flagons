import { gameState } from "./Game.js";

export const BackToSelectButton = () => {
	return `
        <button class="button" id="backToSelectButton">Return To Game Selection</button>`;
};

//grab container
const mainContainer = document.querySelector(".container");

mainContainer.addEventListener("click", (clickEvent) => {
	if (clickEvent.target.id === "backToSelectButton") {
		gameState.changeState("gameSelect");
	}
});
