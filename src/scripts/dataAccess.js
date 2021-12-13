const applicationState = {
	players: [],
	teams: [],
	scores: [],
	games: []
};

const API = `http://localhost:8088`;
const mainContainer = document.querySelector(".container");

//fetch each resource

export const fetchPlayers = () => {
	return fetch(`${API}/players`)
		.then((response) => response.json())
		.then((players) => {
			applicationState.players = players;
		});
};

export const fetchTeams = () => {
	return fetch(`${API}/teams`)
		.then((response) => response.json())
		.then((teams) => {
			applicationState.teams = teams;
		});
};

export const fetchScores = () => {
	return fetch(`${API}/scores`)
		.then((response) => response.json())
		.then((scores) => {
			applicationState.scores = scores;
		});
};

export const fetchGames = () => {
	return fetch(`${API}/games`)
		.then((response) => response.json())
		.then((games) => {
			applicationState.games = games;
		});
};

//getters for each data collection

export const getPlayers = () => {
	return applicationState.players.map((player) => ({ ...player }));
};

export const getTeams = () => {
	return applicationState.teams.map((team) => ({ ...team }));
};

export const getScores = () => {
	return applicationState.scores.map((score) => ({ ...score }));
};

export const getGames = () => {
	return applicationState.games.map((game) => ({ ...game }));
};

// POST request for each resource

export const saveTeam = (userServiceRequest) => {
	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userServiceRequest)
	};

	return fetch(`${API}/teams`, fetchOptions)
		.then((response) => response.json())
		.then(() => {
			mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
		});
};

export const savePlayer = (playerToSave) => {
	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(playerToSave)
	};

	return fetch(`${API}/players`, fetchOptions)
		.then((res) => res.json())
		.then(() => {
			mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
		});
};

//PUT request for each resource
export const updateTeam = (userServiceRequest) => {
	const fetchOptions = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
    body: JSON.stringify(userServiceRequest)
	};

  return fetch(`${API}/teams/${userServiceRequest.id}`, fetchOptions)
    .then((res) => res.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};
