import {RecentGamesList } from "./RecentGamesList.js";
import { BoxScore } from "./BoxScore.js";

//grab main container
const mainContainer = document.querySelector(".container");

export const recentGamesState = {
    state: "List",
    boxScoreGameId: 0,
    transitions : {
        List: {
            boxScore() {
                this.state = "BoxScore";
                mainContainer.dispatchEvent(new CustomEvent("recentGamesStateChanged"));
            }
        },

        BoxScore: {
            list() {
                this.state = "List";
                mainContainer.dispatchEvent(new CustomEvent("recentGamesStateChanged"));
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
    changeBoxScoreGameId(gameId) {
        if (typeof gameId === "number") {
            this.boxScoreGameId = gameId;
        } else {
            console.log("BoxScore Game Id Not A Number")
        }
    }
};

export const RecentGames = () => {
    switch (recentGamesState.state) {
        case "List":
            return RecentGamesList();
            break;

        case "BoxScore":
            return BoxScore();
            break;

        default:
            break;
    }
}

mainContainer.addEventListener("recentGamesStateChanged", customEvent => 
{
    //no need to fetch things from api because it is already updated when it gets listed here in this area
    const recentGamesEl = document.querySelector(".recentGameResults")
    recentGamesEl.innerHTML = RecentGames();
})