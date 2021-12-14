import { GameSelect } from "./GameSelect.js";


export const gameState = {
    //possible states GameSelect, NewGame, and ActiveGame
    state: 'GameSelect',
    transitions: {
        GameSelect: {
            newGame() {
                //change state
                this.state = 'NewGame'
                //make a statechange event to rerender I think the ones from gameselect will change this elements innerhtml. finished games should change change most html.
            },

            continueGame() {
                this.state = 'ActiveGame'
            }
        },
        
        NewGame: {
            gameSelect() {
                this.state = 'GameSelect'
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
            //run new game function
            break;

        case "ActiveGame" :
            //run active game function
            break;
    }
}