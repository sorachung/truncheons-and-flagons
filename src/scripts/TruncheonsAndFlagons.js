import { JoinTeam } from "./TeamAndResults/TeamStuff/JoinTeam.js";
import { CreateTeam } from "./TeamAndResults/TeamStuff/CreateTeam.js"

export const TruncheonsAndFlagons = () => {
    //call ticker function here for header
    return `
        <h1>Truncheons And Flagons</h1>
        <article class="teamsAndResults containerChunk">
            <section class="teamFormation teamsAndResultsChunk">
                <div class="teamFormationChunk teamCreation">
                    ${CreateTeam()}
                </div>
                <div class="teamFormationChunk joinTeam">
                    ${JoinTeam()}
                </div>
                <div class="teamFormationChunk incompleteTeamList">
                    Teams In Need Of Players
                </div>
            </section>
            <section class="recentGameResults teamsAndResultsChunk">
                Recent Game Results
                <ul>
                    <li>Function for Results Go Here</li>
                </ul>
            </section>
        </article>

        <article class="gameplayArea containerChunk">
            <section class="gameplayAreaChunk activeScoreBoard">
                Active Game Scores Go Here
            </section>
            <section class="gameplayAreaChunk game">
                Game Function Handles Everything Here
            </section>
        </article>
        `
}