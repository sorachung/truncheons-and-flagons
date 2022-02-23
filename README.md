# truncheons-and-flagons
Truncheons and Flagons was a popular game in taverns during the middle ages. This web app is a scorekeeper for the game.

## About the Game and its Rules

In the roaring 1130's, peasants and serfs across Europe and Western Asia popularized a tavern game known as Truncheon & Flagons. Scholars believe that the game originated in the Tattered Flagon tavern located in Southern Aragon, near the city of Jara.

Since it was not an official game of the royalty or merchant classes at the time, writings about it are rare and often vague. However, what modern anthropologists have been able to piece together paint a picture of an odd, fun, and sometimes violent game - depending on how drunk the contestants became.

The rules of the game were fairly simple, yet allowed for some subtlety.

1. There are three teams in a game of Truncheon & Flagons.
    * The Knights
    * The Fairies
    * The Goblins
1. Each team has three players.
1. Six flagons of ale, mead, or wine are be arranged on a table. Four flagons making the corners of a square, and the fifth and sixth being placed in the middle of the square. The table should be in an area of a tavern where the teams had some ability to move around.
1. Teams rotated between being the Knights, Fairies, and Goblins after each round.
1. The Knights have to throw a small wooden ball into one of the flagons. Each Knight has their own ball.
1. Each Knight that successfully throws a ball into a flagon earns 2 points for the Knights.
1. Each Knight that successfully throws a ball that lands on the table earns 1 point for the Knights.
1. The Goblins guard the flagons by swinging small truncheons to knock the ball out of the air before it landed in a flagon or on the table.
1. Each Goblin that successfully knocks a thrown wooden ball out of the air earns 1 point for the Goblins.
1. The Fairies can distract the Knights or the Goblins.
1. If a Fairy distract a Knight enough that a ball is dropped, or thrown out of the playing area, the Fairies receive 1 point.
1. If a Fairy distracts a Goblin enough so that a thrown ball lands anywhere in the playing area _(on the table or in a flagon)_ without any defensive truncheon swings, the Fairies receive 1 point.
1. There are three rounds so that each team can play each role.
1. At the end of round three, whichever team has the most points earns the honor of drinking the contents of the six flagons.

## Features
- Create teams with custom team names
- Join teams by entering the contestant's name and country of origin
- Displays scores of each team in a current game
- Shows cumulative points for each team
- 

## How to Use

### Dependencies
* [JSON Server](https://github.com/typicode/json-server)

### Instructions
#### Installation/Starting the app
* clone the repository
* install JSON Server with `npm install json-server` in api directory (add the -g flag if you'd like to install it globally)
* host the api on port 8088 with `json-server -p 8088 database.json`
* in src directory of repo, host the app on any port (I like to use [serve](https://www.npmjs.com/package/serve))
