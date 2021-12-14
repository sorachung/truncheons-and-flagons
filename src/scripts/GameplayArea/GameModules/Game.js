import { ActiveGame } from "./ActiveGame.js";
import { GameSelect } from "./GameSelect.js";
import { NewGame } from "./NewGame.js";
import {
	fetchGames,
	fetchPlayers,
	fetchScores,
	fetchTeams
} from "../../dataAccess.js";

//grab the main container
const mainContainer = document.querySelector(".container");

export const gameState = {
	//possible states GameSelect, NewGame, and ActiveGame
	state: "GameSelect",
	activeGameId: 0,
	transitions: {
		GameSelect: {
			newGame() {
				//change state
				this.state = "NewGame";
				//make a statechange event to rerender I think the ones from gameselect will change this elements innerhtml. finished games should change change most html.
				mainContainer.dispatchEvent(
					new CustomEvent("gameStateChanged")
				);
			},

			continueGame() {
				this.state = "ActiveGame";
				mainContainer.dispatchEvent(
					new CustomEvent("gameStateChanged")
				);
			}
		},

		NewGame: {
			gameSelect() {
				this.state = "GameSelect";
				mainContainer.dispatchEvent(
					new CustomEvent("gameplayAreaStateChanged")
				);
			}
		},

		ActiveGame: {
			gameSelect() {
				this.state = "GameSelect";
			}
		}
	},
	changeState(actionName) {
		const action = this.transitions[this.state][actionName];

		if (action) {
			action.call(this);
		} else {
			console.log("Invalid Action");
		}
	},
	changeActiveGameId(gameId) {
		if (typeof gameId === "number") {
			this.activeGameId = gameId;
		} else {
			console.log("Game Id Not A Number");
		}
	}
};

export const Game = () => {
	switch (gameState.state) {
		case "GameSelect":
			return GameSelect();
			break;

		case "NewGame":
			return NewGame();
			break;

		case "ActiveGame":
			return ActiveGame();
			break;

		default:
			break;
	}
};

//Event Listeners for State Changes
mainContainer.addEventListener("gameStateChanged", (customEvent) => {
	Promise.all([fetchPlayers(), fetchTeams(), fetchGames(), fetchScores()])
		.then(() => {
			const gameEl = document.querySelector(".game");
			gameEl.innerHTML = Game();
		});
});

mainContainer.addEventListener("gameplayAreaStateChanged", (customEvent) => {
	Promise.all([fetchPlayers(), fetchTeams(), fetchGames(), fetchScores()])
		.then(() => {
			const gameEl = document.querySelector(".gameplayArea");
			gameEl.innerHTML = Game();
		});
});