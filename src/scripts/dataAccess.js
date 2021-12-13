const applicationState = {
    players: [],
    teams: [],
    scores: [],
    games: [],
};

const API = `http://localhost:8088`;

//fetch each

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
