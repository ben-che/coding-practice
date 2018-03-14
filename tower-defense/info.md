# Project Proposal Outline

**Description**: 

A top-down 2D tower defense game. Enemies will move on a path and players can build towers around the path that
automatically damage the enemies. Enemies will spawn in waves and get incrementally stronger after each wave. 
If the player defeats all the enemies in a wave, the next wave will begin. If an enemy reaches the end of the path, the player loses.

**Core Features**: 
Enemy movement logic, enemy health logic, placable towers, one map, wave increments, start, function and lose condition implementation.

**Stretch Features**: 
A decent UI that displays important information to player (score, lives, cash),
Different Maps,
sprites for tower, map and enemies
different types of enemies,
sellable, movable and upgradable towers

**User Stories**: 
As a player, I can begin the game
As a player, I can purchase turrets that will automatically target enemies
As a player, I can place turrets on the map
As a player, I can lose the game

**Tech-Stack**: 
At it's core, the tech stack will be HTML, CSS and vanilla JS. As the game grows, there may be a need for jQuery. I may also
port the game over to React.

There isn't really a need for a server or database, as the only get request that will be sent is the initial loading of the page.
I don't forsee implementing a database either because I don't think I need any persistent data across sessions - there may be
a need for a database if I eventually want to keep track of scores or players, or if users need some sort of "save" state. However,
this is really far in the future and out of the scope of this project.

**Description of Data**: 
Data will be held in variables. Because there aren't any persistent states or authentication, there doesn't need to be any
persistent data storage.

## Front-End: 
The front end will be a one-pager, where the tower defense game will be played. The screen will only consist of the game
elements and maybe a lil spot for me to plug my instagram.

## Server-side:
All that is needed in the server is a GET route for page loads - this can be done through deployment and a web service, as 
opposed to having a custom server with custom endpoints.

**Project Timeline**
The requirements will be completed in the following order:
- Map generation
- Enemy path generation
- Creation of UI elements
- Creation of tower objects
- Placement of towers functionality
- Enemy spawn, health and movement logic
- "Collision" logic (how enemies get damaged by towers)
- Lose condition
- Incremental waves
- Additional stretch features