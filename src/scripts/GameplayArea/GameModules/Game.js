import { ActiveGame } from "./ActiveGame.js";
import { GameSelect } from "./GameSelect.js";
import { NewGame } from "./NewGame.js";
import { GameEnd } from "./GameEnd.js";
import {
	fetchGames,
	fetchPlayers,
	fetchScores,
	fetchTeams
} from "../../dataAccess.js";
import { ActiveScoreBanner } from "../ActiveScoreBanner.js";

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
			},
			newGameStart() {
				this.state = "ActiveGame";
				mainContainer.dispatchEvent(
					new CustomEvent("gameplayAreaStateChanged")
				);
			}

		},

		ActiveGame: {
			//for going back to the game select menu
			gameSelect() {
				this.state = "GameSelect";
				mainContainer.dispatchEvent(
					new CustomEvent("gameStateChanged")
				);
			},
			//for submitting new scores but not leaving the activeGame Menu
			activeGameContinue() {
				this.state = "ActiveGame";
				mainContainer.dispatchEvent(
					new CustomEvent("gameplayAreaStateChanged")
				);
			},
			// for use if the active game ends
			activeGameFinished() {
				this.state = "GameEnd";
				mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
			}
		},

		GameEnd: {
			//going back to the game select menu
			gameSelect() {
				this.state = "GameSelect";
				//this one wiill only change the game area. The final score submission is actually what rerenders everything because the updated final scores are the only things that effect everything else. This is just a nice end game screen that will flip back to the game select screen.
				mainContainer.dispatchEvent(
					new CustomEvent("gameStateChanged")
				);
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

		case "GameEnd" :
			return GameEnd();
			break;

		default:
			break;
	}
};

//Event Listeners for State Changes
mainContainer.addEventListener("gameStateChanged", (customEvent) => {
	Promise.all([
		fetchPlayers(),
		fetchTeams(),
		fetchGames(),
		fetchScores()
	]).then(() => {
		const gameEl = document.querySelector(".game");
		gameEl.innerHTML = Game();
	});
});

mainContainer.addEventListener("gameplayAreaStateChanged", (customEvent) => {
	Promise.all([
		fetchPlayers(),
		fetchTeams(),
		fetchGames(),
		fetchScores()
	]).then(() => {
		const bannerEl = document.querySelector(".activeScoreBoard");
		//HERE we will call the ActiveGameBannerFunction once it is made
		bannerEl.innerHTML = ActiveScoreBanner();
		const gameEl = document.querySelector(".game");
		gameEl.innerHTML = Game();
	});
});
