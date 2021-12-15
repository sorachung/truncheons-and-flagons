import { TeamsAndResults } from "./TeamsAndResults/TeamsAndResults.js";
import { Game } from "./GameplayArea/GameModules/Game.js";

export const TruncheonsAndFlagons = () => {
    //call ticker function here for header
    return `
        <h1>Truncheons And Flagons</h1>
        <article class="teamsAndResults containerChunk">
        ${TeamsAndResults()}
        </article>
        <article class="gameplayArea containerChunk">
            <section class="gameplayAreaChunk activeScoreBoard">
                Active Game Scores Go Here
            </section>
            <section class="gameplayAreaChunk game">
                ${Game()}
            </section>
        </article>
        `
}