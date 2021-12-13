import { getTeams } from "../../dataAccess.js";

export const TeamList = () => {
	const teams = getTeams();
	let html = `Teams In Need Of Players
                <ul class="joinTeamsList">`;
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
