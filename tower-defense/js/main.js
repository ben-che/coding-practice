// Map creation //

// defining the width and length of the game screen - we need these as fixed values for the
//  map generation, enemy pathing, turret placement and lose condition
const gameWidth = 80;
const gameHeight = 30;
const tileHeight = 15;
const tileWidth = 15;

// eventually, we can have multiple levels and multiple maps - this will be implemented
//  if there's enough time.
let levelNum = 0;

// turretTypes defines the number of different turrets the game will have - as the game
//  grows, we can increase this number
const turretTypes = 2;

// this is the total number of turrets on the map
let turretCounter = 0;

// here, we define baseline turret styles that we will use to style all the turret positions:
const turretLeftOffset = 200;
const turretMargin = 50;
const turretDiameter = 5;

// here, we define the turret spawn offset:
const turretSpawnLeftOffset = 5;
const turretSpawnTopOffset = 5;

// playerCash is how much in game currency the player has - will be changed
//  as game progresses
let playerCash = 100;

// drawMap() takes in no arguments and returns no values, but will create a grid system for the rest of the 
//  code to operate on, the UI and attach any methods the UI will have 
drawMap = () => {
    // this loop controls the number of rows the grid system will have
    for (let i = 0; i < gameHeight; i++ ) {
        let maptile;
        // this loop controls the number of columns the grid system will have
        for (let j = 0; j < gameWidth; j++) {
            // every time mapTile is referenced, a new div is made (as opposed
            //  calling document.createElement every time)
            // individual tiles and their handlers will be created and defined here, as opposed
            //  to creating them on the actual DOM - this promotes scalability and flexibility
            mapTile = document.createElement('div');
            // create unqiue IDs for each tile
            mapTile.setAttribute('id', 'mapTile-'+j);
            // give the tile CSS styles
            mapTile.setAttribute('class','mapTile');
            // place the tile on the grid, and ensure they do not overlap
            mapTile.style.left = (tileWidth * j + 'px');
            mapTile.style.top = (tileHeight * i + 'px');
            // here, we check what level we're on, as well as painting the path that the
            //  enemies will travel - refer to levelZero function for more information
            //  we will pass levelZero x and y coordinates accordingly
            if ((levelNum === 0) && (levelZero(j, i))) {
                mapTile.style.backgroundColor = "#1E90FF";
            }
            // if the tile isn't part of the enemy path, it means that it will be
            //  a tile that we can place a turret on - we will need to add event listeners
            //  for these tiles
            else {
                // this listens for when the mouse enters the tile
                // maptile.addEventListener('dragenter', dragEnter);
                // this listens for when the mouse is dragging something over this specific tile
                // mapTile.addEventListener('dragover',dragOver);
                // this listens for the release of the mouse button above this specific tile
                // mapTile.addEventListener('drop', dropTurret(mapTile));
            }
            // here, we append the tile we just created to the dom along with its event
            //  listeners, if any, and reset the variable for reuse
            document.body.appendChild(mapTile);
            mapTile='';

            //console logs:
            // console.log('tile appended');
        }
        // console logs:
        // console.log('row ', i ,'complete');
    }
    // this loop controls turret creation
    for (let k = 0; k < turretTypes; k++) {
        // similar to the nested loop above, we have to create hotspots for turret creation -
        //  this is where turrets are created
        let turret = document.createElement('div');
        turret.setAttribute('id', 'turret-'+k);
        turret.setAttribute('class','gen-turret-ui');
        // individual turret styles:
        turret.style.left = (turretLeftOffset + (turretDiameter + turretMargin) * k) +'px';
        turret.style.borderColor = turretInfo(turret.id).borderColor;
        // here, we make the actual hotspot for users to click on - we will also name
        //  the turrets and give them a price value as well by passing the turret id to
        //  a helper function that determines the string output for each turret
        turret.innerHTML = "<p>" + turretInfo(turret.id).name + "<br><br>$" + turretInfo(turret.id).price + "</p>";
        // when user clicks on 'this' element, the turretSelect function will fire
        turret.addEventListener('click', () => {turretBuy(turret.id)});
        // append the turret element created in the loop to the dom
        document.body.appendChild(turret);

        // console logs:
        // console.log('turret icon # ', k, ' created');
    }

    // creation of the start button will be done similar to above
	let startButton = document.createElement("div");
	startButton.setAttribute("id","start-button");
	startButton.setAttribute("class","gen-button-ui start-button");
	startButton.innerHTML = "<p> start game </p>";
	// document.getElementById('start-button').addEventListener('click', startGame);
    document.body.appendChild(startButton);
    // console log:
    // console.log('start button created');
 
	// creating a status bar to hold metadata about the game
	let statusBar = document.createElement("div");
	statusBar.setAttribute("id","status-bar");
	statusBar.setAttribute("class","status-bar");
	statusBar.innerHTML = '<p> Cash: <span id="cash">$0</span> Score: <span id="score">0</span> Wave: <span id="wave">0</span> Lives: <span id="lives">0</span></p>';
    document.body.appendChild(statusBar);
    // console logs:
    // console.log('status bar created');

    // creating a turret spawn point where turrets will spawn when they're clicked
	let turretSpawn = document.createElement("div");
	turretSpawn.setAttribute("id","turret-spawn");
	turretSpawn.setAttribute("class","turret-spawn");
	turretSpawn.innerHTML = '<p> turrets spawn here </p>';
    document.body.appendChild(turretSpawn);
    // console logs:
    // console.log('status bar created');
}


// Map Generation //
// in general, these map generation helper functions will take in an x and y coordinate
//  and return true or false - these values will be passed onto the main map drawing function
//  and are used to determine whether or not the specific tile will be a path for the
//  enemies to walk on or not
// visually, if true is returned, the tile will be turned into a path tile, if not
//  then the tile will be a grass tile for turret placement
function levelZero(x,y)
{   // defining the coordinates for enemy pathing
    if(	(x === 0 && (y >= 0 && y <= 1)) ||
        (x >=1 && x <= 75) && (y === 1) ||
        (x === 75 && (y >= 1 && y <= 5)) ||
        (x <= 75 && x >= 1) && (y===5) ||
        (x===1 && y>=5)
		)
	{
		return true;
	}
	return false;
}
 
// Turret Functions //

// function to determine individual turret ui stylings - used in the initial drawing of the map
// turretInfo takes in a num (a unique turret id, in context), and returns an object with 
//  key value pairs that hold each turret's information
turretInfo = (id) => {
    switch(id) {
        case 'turret-0':
            return {
                name: 'weak',
                price : '10',
                borderColor : 'red'
            }
        case 'turret-1':
            return {
                name: 'medium',
                price : 100,
                borderColor : 'blue'
            }
    }
}

// turretBuy takes in a turret ID, and if the player has enough in game currency, a
//  turret will be created 
turretBuy = (id) => {
    // console log to determine the click handler is working and the correct
    //  element is being handled
    // console.log('turret id: ', id, ' was clicked');

    // grab the correct instance of the turret and set a context:
    let context = document.getElementById(id);
    // grab mouse event and assign it to mouseContext
    let mouseContext = window.event;

    // checking if context is correct:
    // console.log(context);
    // console.log(context.id);
    // console.log(mouseContext);
    
    if (turretInfo(context.id).price > playerCash) {
        // console log to check control flow:
        // console.log('not enough cash');
        return;
    }
    // console log to check control flow:
    // console.log('enough cash');

    let x = mouseContext.pageX,
        y = mouseContext.pageY;

    let spawnTurret = document.createElement('div');
    spawnTurret.setAttribute('id', turretCounter);
    turretCounter++;

    document.getElementById('turret-spawn').appendChild(spawnTurret);

}