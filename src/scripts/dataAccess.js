const applicationState = {
	players: [],
	teams: [],
	scores: [],
	games: [],
	positions: []
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

export const fetchPositions = () => {
	return fetch(`${API}/positions`)
		.then((res) => res.json())
		.then((positions) => {
			applicationState.positions = positions;
		})
}

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

export const getPositions = () => {
	return applicationState.positions.map((position) => ({...position}));
}

// POST request for each resource

export const saveTeam = (userServiceRequest) => {
	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userServiceRequest)
	};

	return fetch(`${API}/teams`, fetchOptions);
};

export const savePlayer = (playerToSave) => {
	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(playerToSave)
	};

	return fetch(`${API}/players`, fetchOptions);
};

export const saveGame = (userServiceRequest) => {
	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userServiceRequest)
	};

	return fetch(`${API}/games`, fetchOptions);
};

export const saveScore = (userServiceRequest) => {
	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userServiceRequest)
	};

	return fetch(`${API}/scores`, fetchOptions);
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

  return fetch(`${API}/teams/${userServiceRequest.id}`, fetchOptions);
};

export const updateGame = (userServiceRequest) => {
	const fetchOptions = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userServiceRequest)
	};

	return fetch(`${API}/games/${userServiceRequest.id}`, fetchOptions);
}

export const updateScore = (userServiceRequest) => {
	const fetchOptions = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userServiceRequest)
	};

	return fetch(`${API}/scores/${userServiceRequest.id}`, fetchOptions);
}