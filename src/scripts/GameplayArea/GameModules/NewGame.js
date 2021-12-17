import {
	getTeams,
	getGames,
	getScores,
	getPlayers,
	getPositions,
	saveGame,
	saveScore
} from "../../dataAccess.js";
import { gameState } from "./Game.js";
import { BackToSelectButton } from "./BackToSelectButton.js";

//html
export const NewGame = () => {
	const teams = getTeams();
	const scores = getScores();
	const games = getGames();
	//sort team names alphabetically
	teams.sort((a,b) => a.name.localeCompare(b.name));

	return `
        <h2 class="newGameChunk">New Game</h2>
        <h3 class="newGameChunk">Select Teams</h3>
        <section class="teamsMenu newGameChunk">
            <div class="teamSelectCard" id="teamOne">
                <select class="teamSelect" id="teamSelect--1">
                    <option value="">Choose A Team</option>
                    ${teams
						.map((team) => {
							const myScores = scores.filter(score => score.teamId === team.id);
							const myGames = games.filter(game => myScores.find(score => score.gameId === game.id));
							//only show teams with full rosters and not currently in a game
							if (team.totalPlayers >= 3 && !myGames.find(game => game.completed === false)) {
								return `<option value="${team.id}">${team.name}</option>`;
							}
						})
						.join("")}
                </select>
                <ul class="teamRoster" id="teamRoster--1">
                </ul>
            </div>
            
            <div class="teamSelectCard" id="teamTwo">
                <select class="teamSelect" id="teamSelect--2">
                    <option value="">Choose A Team</option>
                    ${teams
						.map((team) => {
							const myScores = scores.filter(score => score.teamId === team.id);
							const myGames = games.filter(game => myScores.find(score => score.gameId === game.id));
							//only show teams with full rosters and not currently in a game
							if (team.totalPlayers >= 3 && !myGames.find(game => game.completed === false)) {
								return `<option value="${team.id}">${team.name}</option>`;
							}
						})
						.join("")}
                </select>
                <ul class="teamRoster" id="teamRoster--2">
                </ul>
           </div>
           <div class="teamSelectCard" id="teamThree">
                <select class="teamSelect" id="teamSelect--3">
                    <option value="">Choose A Team</option>
                    ${teams
						.map((team) => {
							const myScores = scores.filter(score => score.teamId === team.id);
							const myGames = games.filter(game => myScores.find(score => score.gameId === game.id));
							//only show teams with full rosters and not currently in a game
							if (team.totalPlayers >= 3 && !myGames.find(game => game.completed === false)) {
								return `<option value="${team.id}">${team.name}</option>`;
							}
						})
						.join("")}
                </select>
                <ul class="teamRoster" id="teamRoster--3">
                </ul>
            </div>
        </section>
		<section class="newGameMenuButtons newGameChunk">
        <button class="button startGameButton" id="startGameButton">Start Game</button>
		${BackToSelectButton()}
		</section>
        `;
};

//grab maincontainer
const mainContainer = document.querySelector(".container");

//add in our event listener for showing rosters based on selection
mainContainer.addEventListener("change", (changeEvent) => {
	if (changeEvent.target.id.startsWith("teamSelect")) {
		const players = getPlayers();

		//grab the team number
		const [, targetSelectNumber] = changeEvent.target.id.split("--");
		//use it to grab the correct roster ul
		const rosterListEl = document.querySelector(
			`#teamRoster--${targetSelectNumber}`
		);
		//with the correct html element identified we will now put in the roster list for the selected team
		//this starts with grabbing the correct team object's id
		const teamSelect = document.querySelector(
			`#teamSelect--${targetSelectNumber}`
		);
		const selectedTeamId = parseInt(
			teamSelect.options[teamSelect.selectedIndex].value
		);
		//now change the innerhtml of the selected team roster element to a list of all players that have ids which match to the team
		rosterListEl.innerHTML = players
			.map((player) => {
				if (player.teamId === selectedTeamId) {
					return `<li class="rosterListItem"><div class="rosterListItemPlayer">${player.firstName} ${player.lastName}</div>
														<div class="rosterListItemCountry">Hails from ${player.country}</div></li>`;
				}
			})
			.join("");
	}
});

//add in our event listener for clicking the button
mainContainer.addEventListener("click", (clickEvent) => {
	if (clickEvent.target.id === "startGameButton") {
		//collect our team ids
		const teamIds = [];
		teamIds.push(
			parseInt(
				mainContainer.querySelector(`select[id="teamSelect--1"]`).value
			)
		);
		teamIds.push(
			parseInt(
				mainContainer.querySelector(`select[id="teamSelect--2"]`).value
			)
		);
		teamIds.push(
			parseInt(
				mainContainer.querySelector(`select[id="teamSelect--3"]`).value
			)
		);

		//create our game object
		const gameToSendToAPI = {
			currentRound: 1,
			completed: false
		};
		//check if any teams are already in a game
		let teamAlreadyInGame = false;
		const scores = getScores();
		const games = getGames();
		for (const teamId of teamIds) {
			const teamsScores = scores.filter(
				(score) => score.teamId === teamId
			);
			//create an array of game objects that the team is involved in
			const teamsGames = teamsScores.map((score) => 
				games.find((game) => game.id === score.gameId)
			);
			teamsGames.forEach((game) => {
				if (!game.completed) {
					teamAlreadyInGame = true;
				}
			});
		}
		if (teamAlreadyInGame) {
			window.alert(
				"All teams must finish their games before starting a new game"
			);
		} else {
			//send game object to database
			//but first make sure all our teams are different
			const unique = Array.from(new Set(teamIds));
			if (unique.length === teamIds.length) {
				saveGame(gameToSendToAPI)
					.then((res) => res.json())
					.then((newGameFromAPI) => {
						const gameIdentifier = newGameFromAPI.id;
						const newScoresPromisesArray = [];
						//take care of position assignments
						const positions = getPositions();
						//make a random order of our shallow copy of positions using the fisher yates method
						for (let i = positions.length -1; i > 0; i--) {
							const j = Math.floor(Math.random() * i);
							const temp = positions[i];
							positions[i] = positions[j];
							positions[j] = temp;
						}
						//a counter to work our way through the positions array in the following for loop
						let positionsIndexCounter = 0;

						for (const teamIdentifier of teamIds) {
							const scoreToSendToAPI = {
								gameId: gameIdentifier,
								teamId: teamIdentifier,
								round1Score: 0,
								round2Score: 0,
								round3Score: 0,
							};
							
							//loop through and put in the positin ids in order
							for (let i = 0; i < positions.length; i++) {
								let positionsIndex = positionsIndexCounter + i;
								if (positionsIndex > positions.length - 1) {
									positionsIndex -= positions.length;
								}
								scoreToSendToAPI[`round${i+1}PositionId`] = positions[positionsIndex].id;
							}

							newScoresPromisesArray.push(
								saveScore(scoreToSendToAPI)
							);

							positionsIndexCounter++;
						}
						// change active game id in game state machine
						gameState.changeActiveGameId(parseInt(gameIdentifier));
						return Promise.all(newScoresPromisesArray);
					})
					.then(() => {
						gameState.changeState("newGameStart");
					});
			} else {
				window.alert("Please select three different teams");
			}
		}
	}
});
