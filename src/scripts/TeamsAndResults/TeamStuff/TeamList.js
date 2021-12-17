import { getTeams } from "../../dataAccess.js";

export const TeamList = () => {
	const teams = getTeams();
	let html = `<div class="teamListChunk">Incomplete Rosters</div>
                <ul class="joinTeamsList teamListChunk">`;
	//sort by open spots
	teams.sort((a,b) => b.totalPlayers - a.totalPlayers);

	html += teams
		.map((team) => {
			if (team.totalPlayers < 3) {
				return `<li class="joinTeamsListItem">
                ${team.name}: ${3 - team.totalPlayers} open spots
                </li>`;
			}
		})
		.join("");
	html += "</ul>";
	return html;
};
