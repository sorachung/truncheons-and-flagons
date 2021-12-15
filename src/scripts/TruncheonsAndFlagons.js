import { RecentGamesList } from "./TeamAndResults/RecentGamesList.js"
import { JoinTeam } from "./TeamAndResults/TeamStuff/JoinTeam.js";
import { CreateTeam } from "./TeamAndResults/TeamStuff/CreateTeam.js" 
import { TeamList } from "./TeamAndResults/TeamStuff/TeamList.js";
import { Game } from "./GameplayArea/GameModules/Game.js";
import { ActiveScoreBanner } from "./GameplayArea/ActiveScoreBanner.js";

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
                    ${TeamList()}
                </div>
            </section>
            <section class="recentGameResults teamsAndResultsChunk">
                    ${RecentGamesList()}
            </section>
        </article>

        <article class="gameplayArea containerChunk">
            <section class="gameplayAreaChunk activeScoreBoard">
                ${ActiveScoreBanner()}
            </section>
            <section class="gameplayAreaChunk game">
                ${Game()}
            </section>
        </article>
        `
}