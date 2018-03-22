// Global variables and states //

// defining the width and length of the game screen - we need these as fixed values for the
//  map generation, enemy pathing, turret placement and lose condition
const gameWidth = 113;
const gameHeight = 30;
const tileHeight = 15;
const tileWidth = 15;

// eventually, we can have multiple levels and multiple maps - this will be implemented
//  if there's enough time.
let levelNum = 0;

// start at wave 1, and as wave increases, enemies get stronger
let levelWave = 1;

// turretTypes defines the number of different turrets the game will have - as the game
//  grows, we can increase this number
const turretTypes = 2;

// this is the total number of turrets on the map, along with a 2d array to track individual turret
//  details
let turretCounter = 0;
let turretPosition = new Array; // initialize array this way so we have access to specific indicies

// here, we define baseline turret styles that we will use to style all the turret positions:
const turretLeftOffset = 385;
const turretMargin = 100;
const turretDiameter = 5;

// here, we define the turret spawn offset:
const turretSpawnLeftOffset = 5;
const turretSpawnTopOffset = 5;

// player global variables

// playerCash is how much in game currency the player has - will be changed
//  as game progresses
let playerCash = 100;

// keeping track of player lives
let playerLives = 1;

// variable for whether or not the game is running
let start = true;

// creep global variables

// globals for creep direction
const MOVE_N = -1;
const MOVE_S = 1;
const MOVE_E = 2;
const MOVE_W = -2;
const MOVE_LAST = -99;

// how many creeps are on the board each wave
let creepCounter = 10;

// Game Logic
// starts the game once the start button is pressed - it resets the board and variables
//  to their original state
let runGame = (event) => {
    if (!start) {
        console.log('game has not started')
        return;
    }
    console.log('game has started')
    // global variable reset
    playerCash = 100;
    playerLives = 1;
    turretCounter = 0;
    turretPosition.length = 0;
    levelWave = 1;
    creepCounter = 10;
    let creepId = 0;
    
    // board clear - removing turrets and creeps
    let allTurrets = document.querySelectorAll(".gen-turret");
    for (let i = 0; i < allTurrets.length; i++) {
        document.body.removeChild(allTurrets[i]);
    }

    // now that the board is clear, we have to start spawning creeps -
    //  each creep will be a div and have a unique id
    for (let i = 0; i < creepCounter; i++) {
        let creep = document.createElement('div');
        creep.setAttribute('id', 'creep-'+creepId);
        creepId++;
        creep.setAttribute('class', 'gen-creep alive');
        document.body.appendChild(creep);
        console.log('creep id #', creepId, ' spawned');
    }

    // create arrays that will eventually hold the x and y coordinates that, when combined,
    //  will list out all positions of creeps
    let moveX = new Array();    // holds x position of all creeps
    let moveY = new Array();    // holds y position of all creeps

    // movement logic
    let creepDirection = new Array(); // array that holds the direction for each minion to move in
    let creepSpawnCount = 1; // how many creeps have spawned thusfar
    let creepsSpawnRate = new Array();    // add every time a new creep is spawned
	let creepHp = new Array();  // array that holds all hp of creeps
	let creepsAliveList = new Array(); // true/false to indicate which creep is dead/alive
	let creepsDead = 0; 
    let waveOver = false;   // indicates when each wave is over - either all creeps are dead or player is
    let livesLost = 0;      // how many lives have been lost thusfar

    // reset creeps
    let creeps = document.getElementsByClassName("gen-creep");
    // console.log(creeps)
    // assign the following values to each crepe that spawns
	for(let i = 0; i < creeps.length; i++) {
		moveX[i] = 0;
		moveY[i] = 0;
		creepDirection[i] = MOVE_S;
		creepsSpawnRate[i] = 0;
		creeps[i].style.display = "none";	
        creepHp[i] = Math.pow(2, levelWave)*100;
        // creepHp[i] = 1;  // 1 hp for testing
        creepsAliveList[i] = true;
    }
    
    // interval function that moves creeps every 30ms
    timeTick = setInterval(() => {
        for (let i = 0; i < creepSpawnCount; i++) {
            creepDirection[i] = creepMovement(moveX[i], moveY[i], creepDirection[i]);
            // console.log(creepDirection[i]);  
            
            // check if creep fell off map
            if (creepDirection[i] === MOVE_LAST) {

                // creep leaves map
                if (creeps[i].classList.contains('alive')) {
                    // lose a life
                    console.log('leak - 1 life lost')
                    playerLives = playerLives - 1;
                    livesLost++;
                    creeps[i].classList.remove('alive')
                    console.log(playerLives)
                    console.log(livesLost)
                    console.log(creeps[i].classList)
                    console.log(creeps.length)
                    // TEMPORARY CODE FOR TESTING

                }
                // creep reaches end of map
                creeps[i].classList.remove('alive')
                creeps[i].style.display = 'none';

                // player runs out of lives
                if (playerLives <= 0) {
                    console.log('out of lives');
                    waveOver = true;
                    document.getElementById('game-over').classList.remove('hidden');
                    clearInterval(timeTick);
                    break;
                }
                // once all the creeps have been killed, we can progress onto the next round!
                if (creepsDead === (creeps.length - livesLost)) {
                    waveOver = true;
                }

                continue;

            }

            // see which way to move, and update the data in the array
            switch(creepDirection[i]) {
                case MOVE_N:
                    moveY[i] -= 1;
                    break;
                case MOVE_S:
                    moveY[i] += 1;
                    break;
                case MOVE_E:
                    moveX[i] += 1;
                    // console.log(moveX[i]);
                    break;
                case MOVE_W:
                    moveX[i] -= 1;
                    break;
            }

            // update creep location
            creeps[i].style.display = "block";	
            creeps[i].style.top = moveY[i] + "px";	
            creeps[i].style.left = moveX[i] + "px";

            // check to see if there are any enemies in range of turrets
            let damage = checkTurretRange(creeps[i], moveX[i], moveY[i]);
            // subtract damage from remaining creep hp
            creepHp[i] -= damage;
            // console.log('creep hp:', creepHp[i]);
            // check to see if creep is dead
            if (creepHp[i] <= 0 ) {
                creeps[i].classList.remove('alive');
                // see if creep is still alive 
                if (creepsAliveList[i]) {
                    // creep is no longer alive
                    creepsAliveList[i] = false;
                    creepsDead++;
                    
                    // add cash - base is 10, with additional increments per wave level
                    playerCash += Math.floor((10 + (levelWave*2.5)));
                    console.log('creep killed, playerCash is now', playerCash);

                    // if all creeps that are spawned are off the board (either killed
                    //  or reached end of board), the wave is over
                    if (creepsDead === (creeps.length - livesLost)) {
                        waveOver = true;
                    }
                    
                } creeps[i].style.display = 'none';
                // spawn creeps every 1 seconds until all creeps created earlier are on the board
                if ((creepsSpawnRate[i] === 50*creepSpawnCount) && creepSpawnCount < creeps.length) {
                    creepSpawnCount++;

                }
                creepsSpawnRate[i]++;
            }
            // update the cash display every tick to ensure that the game displays updated playerCash
            let cash = document.getElementById("cash");
            cash.innerHTML = "$" + playerCash;

            // update the wave number
            var wave = document.getElementById("wave");
            wave.innerHTML = levelWave;

            // update the amount of lives the player has
            var lives = document.getElementById("lives");
            lives.innerHTML = playerLives;
            // console.log('checking lives - ', playerLives)

            // check to see if the wave is over
            if (waveOver) {
                //  case where player loses
                if (playerLives === 0) {
                    let lives = document.getElementById('lives');
                    lives.innerHTML = 'dead'
                    // stop the game because palyer loses
                    clearInterval(timeTick);
                }
                // reset variables for next wave
                creepSpawnCount = 1;
                creepsDead = 0;
                waveOver = false;
                levelWave++;
                // reset creep-specific variables
                for(let i = 0; i < creeps.length; i++) {
                    moveX[i] = 0;
                    moveY[i] = 0;
                    creepDirection[i] = MOVE_S;
                    creepsSpawnRate[i]=0;
                    creeps[i].style.display = 'none';
                    creepHp[i] = Math.pow(2, levelWave)*50;
                    // creepHp[i] = 1;
                    creepsAliveList[i] = true;
                }
            }
        }
    }, 10)
    
    
}

// creepMovement is a helper function that runs at a set interval and moves the creeps on
//  the board accordingly
// takes in an instance of the creep's x coordinates, y coordinates and the current creep direction
let creepMovement = (x, y, dir) => {
    // convert x and y and scale it to each tile's 
    x = (x + tileWidth / 2) / tileWidth;
    y = (y + tileHeight / 2) / tileHeight;

    let newX = Math.floor(x);
    let newY = Math.floor(y);
    // console.log(newX);
    // console.log(newY)
    // console log to see if location is valid:
    // console.log(Math.floor(x), Math.floor(y), "returns" + levelZero(Math.floor(x), Math.floor(y)));

    // check what direction we're going and check to see if a valid tile in that direction exists
    switch(dir) {
        case MOVE_N:
            newY -= 1;
            break;
        case MOVE_S:
            newY += 1;
            break;
        case MOVE_E:
            newX += 1;
            break;
        case MOVE_W:
            newX -= 1;
            break;
    }
    
    // next steps are to check which level we're on and use that level's map to check which
    //  way the creeps will move - as new levels are added, this conditional block will need
    //  to be updated as well - as it currently stands, there is only one level

    switch(levelNum) {
        case 0:
        // console.log('level zero hit');
        // if the new location does exist, then keep going, all is well
        if (levelZero(Math.floor(newX), Math.floor(newY))) {
            // console.log('moving in the same direction')
            return dir;
        }
        // if the new position does not exist, it means the creep will fall off the map - we
        //  have to redirect it
        // if a tile east of the creep's current location exists, and if the new movement isn't
        //  the opposite of east (otherwise the creep would be moving backwards), then allow the
        //  creep to move east
        if ( levelZero( (Math.floor(x) + 1), Math.floor(y) ) && dir != MOVE_W) {
            console.log('moving e')
            return MOVE_E;
        }
        if ( levelZero( (Math.floor(x) - 1), Math.floor(y) ) && dir != MOVE_E) {
            console.log('moving w')
            return MOVE_W;
        }
        if ( levelZero( Math.floor(x), Math.floor(y) + 1 ) && dir != MOVE_N ) {
            console.log('moving s')
            return MOVE_S;
        }
        if ( levelZero( Math.floor(x), Math.floor(y) - 1 ) && dir != MOVE_S ) {
            console.log('moving n')
            return MOVE_N;
        }
        // if the board doesn't exist anywhere else, it means the creep has reached the end of their path
        return MOVE_LAST;
    }

    
}

// drawMap() takes in no arguments and returns no values, but will create a grid system for the rest of the 
//  code to operate on, the UI and attach any methods the UI will have 
const drawMap = () => {
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
                // set dirt path background for creeps to navigate on
                mapTile.style.background = "url('img/Dirt.jpg')";
            }
            // if the tile isn't part of the enemy path, it means that it will be
            //  a tile that we can place a turret on - we will need to add event listeners
            //  for these tiles
            else {
                // this listens for when the mouse enters the tile and cancels any default events
                mapTile.addEventListener('dragenter', cancelEvent);
                // we have to add event listeners that handle the dragging and dropping here:
                // this listens for when the mouse is dragging something over the tile and ensures
                //  that the drop behaviour works
                mapTile.addEventListener('dragover', (event) => { duringDrag(event) });
                // this listens for the release of the mouse button above this specific tile and
                //  has logic to ensure that the placement is valid
                mapTile.addEventListener('drop', (event) => { dropTurret(event)}, false );
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
        turret.setAttribute('class','gen-turret-ui ui-0'+k);
        // individual turret styles:
        turret.style.left = (turretLeftOffset + (turretDiameter + turretMargin) * k) +'px';
        turret.style.borderColor = turretInfo(turret.id).borderColor;
        // here, we make the actual hotspot for users to click on - we will also name
        //  the turrets and give them a price value as well by passing the turret id to
        //  a helper function that determines the string output for each turret
        turret.innerHTML = "<p>" + turretInfo(turret.id).name + "<br><br>$" + turretInfo(turret.id).price + "</p>";
        // when user clicks on 'this' element, the turretSelect function will fire
        turret.addEventListener('click', () => {turretBuy(turret.id)}, false);
        // append the turret element created in the loop to the dom
        document.body.appendChild(turret);

        // console logs:
        // console.log('turret icon # ', k, ' created');
    }

    // creation of the start button will be done similar to above
	let startButton = document.createElement("div");
	startButton.setAttribute("id","start-button");
    startButton.setAttribute("class","gen-button-ui start-button");
	// startButton.innerHTML = "<p> start game </p>";
    document.body.appendChild(startButton);
    // clicking start button starts the game
    document.getElementById('start-button').addEventListener('click', startGame);
    // console log:
    // console.log('start button created');
 
	// creating a status bar to hold metadata about the game
	let statusBar = document.createElement("div");
	statusBar.setAttribute("id","status-bar");
	statusBar.setAttribute("class","status-bar");
	statusBar.innerHTML = '<p> Cash: <span id="cash">$0</span>  Wave: <span id="wave">0</span> Lives: <span id="lives">0</span></p>';
    document.body.appendChild(statusBar);
    // console logs:
    // console.log('status bar created');
    
    // creating a turret spawn point where turrets will spawn when they're clicked
    let turretSpawnHead = document.createElement("div");
    turretSpawnHead.setAttribute("class","turret-spawn-header");
    turretSpawnHead.innerHTML = '<p style="margin:0;"> turrets spawn here </p>';
    document.body.appendChild(turretSpawnHead);
	let turretSpawn = document.createElement("div");
	turretSpawn.setAttribute("id","turret-spawn");
	turretSpawn.setAttribute("class","turret-spawn");
	// turretSpawn.innerHTML = '<p> turrets spawn here </p>';
    document.body.appendChild(turretSpawn);
    let turretSpawnCenter = document.createElement("div");
    turretSpawnCenter.setAttribute("id","turret-spawn-center");
    turretSpawnCenter.setAttribute("class","turret-spawn-center");
    document.body.appendChild(turretSpawnCenter);
    // console logs:
    // console.log('status bar created');
    let gameDesc = document.createElement("div");
    gameDesc.setAttribute("class","text-writeup");
    gameDesc.innerHTML = '<p> Creeps will start spawning once you press start - build towers to stop them from reaching the end of the map! </p>'
    document.body.appendChild(gameDesc);
}

// event listener placed on the start button for starting the game
let startGame = () => {
    // event.preventDefault();
    runGame();

}
// =============== //
// Map Generation  //
// =============== //

// in general, these map generation helper functions will take in an x and y coordinate
//  and return true or false - these values will be passed onto the main map drawing function
//  and are used to determine whether or not the specific tile will be a path for the
//  enemies to walk on or not
// visually, if true is returned, the tile will be turned into a path tile, if not
//  then the tile will be a grass tile for turret placement
const levelZero = (x,y) => {   
    // console.log(x, y);

    // defining the coordinates for enemy pathing

    // if(	( ((x === 0) && (y >= 0 && y <= 4))) ||
    //     ( ((x >= 0 && x <= 74) && (y === 4))) || 
    //     ( ((x === 75) && ( y >= 4 && y <= 6))) ||
    //     ( ((x <= 75 && x >= 0) && ( y === 6 )))
    // )

    if ( ((x === 0) && (y >= 0 && y <= 28)) ||
         ((x === 0) && (y === 28)) ||
         ((x === 1) && (y === 28)) ||
         ((x === 2) && (y === 28)) ||
         ((x === 2) && (y <= 28 && y >= 0))
        )

	{  
        // console.log('returning true')
		return true;
    }
    // console.log('returning false')
	return false;
}


// ==================== //
// Turret Functions //
// ==================== //

// function to determine individual turret ui stylings - used in the initial drawing of the map
// turretInfo takes in a num (a unique turret id, in context), and returns an object with 
//  key value pairs that hold each turret's information
const turretInfo = (id) => {
    switch(id) {
        case 'turret-0':
            return {
                name: 'weak',
                price : 20,
                borderColor : 'red',
                damage: 3,
                range:30,
                // background: 'url("../img/tower0")'
            }
        case 'turret-1':
            return {
                name: 'medium',
                price : 70,
                borderColor : 'blue',
                damage:7,
                range: 60
            }
    }
}

// turretBuy takes in a turret ID, and if the player has enough in game currency, a
//  turret will be created 
const turretBuy = (id) => {
    // console log to determine the click handler is working and the correct
    //  element is being handled
    console.log('turret id: ', id, ' was clicked');

    // grab the correct instance of the turret and set a context:
    let context = document.getElementById(id);

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
    // subtract cash after purchase
    playerCash -= turretInfo(id).price
    console.log(playerCash);

    let spawnTurret = document.createElement('div');
    // we need to include 2 pieces of information in this element's id:
    //  1. the turret type, so we can reference the damage and range it has
    //  2. a unique identifier so we can find it on the dom and perform actions on it 
    //  id will be: < turrettype-# : uniqueturretID >
    spawnTurret.setAttribute('id', id+":"+'drag-' + turretCounter);
    turretCounter++;

    // seeing which turret id was clicked, and which class to append
    switch(id) {
        case 'turret-0':
        console.log('spawning weak turret')
        spawnTurret.setAttribute('class','gen-turret grabbable t00');
        break; 
        
        case 'turret-1':
        console.log('spawning strong turret');
        spawnTurret.setAttribute('class', 'gen-turret grabbable t01');
        break;
    }
    spawnTurret.setAttribute("draggable","true");
    spawnTurret.addEventListener('dragstart', (event) => {turretDrag(spawnTurret, event)});
    document.body.appendChild(spawnTurret);

   

}

// turret drag logic start

// turretDrag is the inital event listener attached to newly spawned turrets that
//  waits for a user's drag event to begin
let turretDrag = (turret, event) => {
    // console log to check argument, and to see if it functions when being dragged
    //  ~the correct element is being targetted, and the drag action is being logged~ 
    // console.log(event);
    // console.log(turret);   

    // dataTransfer allows the element's properties to be transferred between the 
    //      beginning to end of drop states
    event.dataTransfer.effectAllowed='copy';
    event.dataTransfer.setData('text', event.target.id);
    // console.log(event.target.id);
    // the turret id is correctly being selected and set

}

let duringDrag = (event) => {
    // by default, items cannot be dragged and dropped - we can prevent default to allow the
    //  dragging and dropping behaviour to take place
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    // console.log('duringDrag function has fired');

}

let dropTurret = (event) => {
    // we have to once again, call the preventDefault method for the drop event to occur,
    //  as the browser interprets a drop as a link by default
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    let data = event.dataTransfer.getData("text");
    console.log('this is the dataTransfer for dropTurret: ' + data);

    // assign the tile that we dropped the turret on to a variable for easy access
    let mapTile = event.target;
    // console.log('this is the mapTile we are dropping on: ');
    // console.log(mapTile);

    // save turret type and id for use later
    let turretType = data.substring(0,data.indexOf(":"));
    let turretId = data.substring(data.indexOf(":")+1);
    // console.log('turret type is: '+ turretType );
    // console.log('turret id is: '+ (turretId));

    // also grab the data of the specific turret element we're dropping
    let turretContext = document.getElementById(data);
    // console.log('this is turret context:');
    // console.log(turretContext);
    // change the turret location to be the exact location of the tile
    turretContext.style.left = mapTile.style.left;
    turretContext.style.top = mapTile.style.top;

    // grab and assign the x and y coordinates to variables accordingly, and 
    //  drop the "px" part of the coordinates so that we end up with numbers to work with
    let x = mapTile.style.left.replace(/\D/g,"");
    let y = mapTile.style.top.replace(/\D/g,"");
    
    // store turret data into global array - this part tells us that the turret at (x,y) has
    //  the traits of this turret type
    // information inside each nested array is stored like this:
    //  damage, range, x-location, y-location, unqiue id
    turretPosition[turretCounter - 1] = new Array( turretInfo(turretType).damage, turretInfo(turretType).range, x , y, data );
    console.log(turretPosition);

    // once the player places the turret, it stays in place		
    turretContext.setAttribute("draggable","false");
    turretContext.addEventListener('dragstart', (event) => cancelEvent(event));

     // adjusting the visual radius indicator of the turrets
     let turretRangeIndicator = document.createElement('div');
     
     // because each turret has a different range, there have to be manual adjustments made for each turret type
     switch(turretType) {
         case 'turret-0':
         console.log('spawning weak turret range');
         turretRangeIndicator.setAttribute('class', 't00-range');
         turretRangeIndicator.style.top = (y - 8.5 )+'px';
         turretRangeIndicator.style.left = (x - 7.5) + "px";
        //  console.log(turretRangeIndicator.style.top);
         break; 
         
         case 'turret-1':
         console.log('spawning strong turret range');
         turretRangeIndicator.setAttribute('class', 't01-range');
         turretRangeIndicator.style.top = (y - 22 )+'px';
         turretRangeIndicator.style.left = (x - 23) + "px";
         turretRangeIndicator.setAttribute('class', 't01-range');
         break;
     }
     document.body.appendChild(turretRangeIndicator);
}

let checkTurretRange = (creep, x, y) => {
    let damage = 0;
    
    for (let i = 0; i < turretCounter; i++) {
        // console.log('num of turrets logged in var:', turretCounter);
        // console.log('num of turrets actually in array: ', turretPosition.length)
        
        // adding this if statement fixes visual bugs on the map, for when user buys a new turret,
        //      but the turret x and y locations aren't defined on the map yet and return undefined
        if (turretPosition[i]) {
            // turretPosition array elements are composed of :
            //  damage, range, x-location, y-location, and unqiue id in that order
            let turretX = turretPosition[i][2];
            let turretY = turretPosition[i][3];
        
        if (radiusCalc(x, turretX, y, turretY) <= turretPosition[i][1]) {
            // creep takes damage - flash red as visual indicator
            // UPDATE - LOOKS WEIRD WITH SPRITES - SHOULD HAVE CUSTOM HURT ANIMATIONS EVENTUALLY
            // creep.style.backgroundColor='red';
            damage += turretPosition[i][0]; 
        }}
    }
    // if creep is not taking damage, keep background transparent
    if (damage === 0) {
        creep.style.backgroundColor='transparent';
    }
    // damage is being logged correctly
    // console.log(damage)
    return damage;
}

// calculate
let radiusCalc = (x1,x2,y1,y2) => {
    return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
}


// turret firing animations //

// turret drag logic end
// ==================== //
// Turret Functions End //
// ==================== //




// Misc bug-squashing code
// cancelEvent helps prevent strange default browser actions from happening during the 
//  dragging and dropping process
let cancelEvent = (event) => {
	if(event.preventDefault) {
	    event.preventDefault();
	}
	else {
		event.returnValue = false;
	}
}
 


// ISSUES:
// - creep pathing: x values are returning true, even when it should return false
// - only one creep is being released at a time

// - game over screen (DONE)
// - fix creep hp styling 