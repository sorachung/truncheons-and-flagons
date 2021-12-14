import { GameSelect } from "./GameSelect.js";
import { NewGame } from "./NewGame.js";

//grab the main container
const mainContainer = document.querySelector(".container");

export const gameState = {
    //possible states GameSelect, NewGame, and ActiveGame
    state: 'GameSelect',
    transitions: {
        GameSelect: {
            newGame() {
                //change state
                this.state = 'NewGame'
                //make a statechange event to rerender I think the ones from gameselect will change this elements innerhtml. finished games should change change most html.
                mainContainer.dispatchEvent(new CustomEvent("gameStateChanged"))
            },

            continueGame() {
                this.state = 'ActiveGame'
            }
        },
        
        NewGame: {
            gameSelect() {
                this.state = 'GameSelect'
                mainContainer.dispatchEvent(new CustomEvent("gameStateChanged"))
            }
        },

        ActiveGame: {
            gameSelect() {
                this.state = 'GameSelect'
            }
        }
    },
    changeState(actionName) {
        const action = this.transitions[this.state][actionName];

        if (action) {
            action.call(this);
        } else {
            console.log('Invalid Action');
        }
    }
};

export const Game = () => {
    switch (gameState.state) {

        case "GameSelect" :
            return GameSelect();
            break;

        case "NewGame" :
            return NewGame();
            break;

        case "ActiveGame" :
            //run active game function
            break;
    }
}

//Event Listeners for State Changes
mainContainer.addEventListener("gameStateChanged", customEvent => {
    const gameEl = document.querySelector(".game");
    gameEl.innerHTML = Game();
})