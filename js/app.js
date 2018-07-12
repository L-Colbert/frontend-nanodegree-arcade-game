"use strict";

// Entity creator(either player or enemy)
class Entity {
    constructor(x,y,width,height,sprite){
        // Variables applied to each of our instances go here,
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite =sprite;
        this.inPlay = true;
        this.origX = x;
        this.origY = y;
    }
    
    //resets entity's position to coordinates passed in
    resetEntity(x,y) {
        this.x = this.origX;
        this.y = this.origY;
    }
    
    render() {
        // Draw the entity on the screen
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
}

// Player class, extention of the Entity constructor
class Player extends Entity {
    constructor(x,y,height, width, sprite) { 
        super(x,y,height, width, sprite);
    }
    
    update(dt) {
        //checks for collision with an enemy
        //places player at starting position if a collision occurs
        this.checkCollision();
        
        //checks to see if the game is over(player reaches the water)
        this.won();
    }
    
    /* If the game has been won(player reached the water,
        * Game is no longer in play, used to stop the drawing of frames
    */
   won(){
       if (this.y === -32) {
           this.inPlay = false;
           gameWon();
        }
    }
    
    //detect collision between player and enemy
    checkCollision() {
        allEnemies.forEach((enemy)=> {
            if (((this.x < enemy.x + enemy.width) && ( this.x + this.width > enemy.x) && (this.y < enemy.y + enemy.height) && (this.height + this.y > enemy.y)) ||  
((this.x + this.width > enemy.x) && (this.x < enemy.x + enemy.width) && (this.y + this.height > enemy.y) && (this.y < enemy.y + enemy.height))) {
                this.resetEntity();
            }
        });
    }
    
    //Receives keycode user input from the eventlistener 
    //Use to determine player movement
    handleInput(direction) {
        switch(direction) {
            case "left" : 
            //test and prevents player from moving off the left side of the canvas 
            if ((this.x - 101) > -3) {
                this.x -= 101;
            } else {
                this.x = this.x;
            }
            break;
            case "up": 
            //test and prevents player from moving off the top of the canvas             
            if ((this.y - 83) > -33) {
                this.y -= 83;
            } else {
                this.y = this.y;
            }
            break;
            case "right" : 
            //test and prevents player from moving off the right side of the canvas 
            if ((this.x + 101) < 403) {
                this.x += 101;
            } else {
                this.x = this.x;
            }
            break;
            case "down": 
            //test and prevents player from moving off the top of the canvas
            if ((this.y + 83) < 384) {
                this.y += 83;
            } else {
                this.y = this.y;
            }
        }
    }
}

//creates enemies(bugs)
class Enemy extends Entity {
    constructor(x,y,height, width, sprite) { 
        super(x,y,height, width, sprite);
        this.speed;
    }
    
    //set the speed of the enemies
    pace() {
        this.speed = Math.random() * 555;
        return this.speed;
    }

    update(dt) {
        //Moves enemy across the screen by updating its x coordinate
        // multiplied by the dt and the speed of the enemy
        this.x +=  dt * this.pace();
        if (this.x > 500) {
            this.x = Math.random() * -200;
        }
    }
}

//after reaching the water(winning), a modal is displayed
//Modal code from https://www.w3schools.com/howto/howto_css_modals.asp
function gameWon() {
        // Get the modal div
        const MODAL = document.getElementById('win-modal');
        
        // Get the <span> element that closes the modal
        const SPAN_X= document.getElementsByClassName("close")[0];
        
        //display winning modal
        MODAL.style.display = "block";
        
        // When the user clicks on <span> (x), close the modal
        SPAN_X.onclick = function() {
            MODAL.style.display = "none";
        };
        
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == MODAL) {
                MODAL.style.display = "none";
            }
        };
        
        document.querySelector('.play-again').addEventListener('click', function(event){                        
            MODAL.style.display = "none";
            gameReset(player);
        })
}

//resets the game by starting the rending again and resetting the player's/enemy's postition
function gameReset(player) {
    player.inPlay = true;
    player.resetEntity();
    allEnemies.forEach((enemy, index) => {
        enemy.resetEntity((-(100 * index) * index))
    });
    main();
}

//instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];

for ( let x =1; x <= 2; x++) {
    for (let i=1 ; i <=3; i++) { 
        allEnemies[i] = new Enemy((-(100 * i) * x), ((83 * i) -23), 78, 45,'images/enemy-bug.png');
    }
}

let player = new Player(200,300,60,10,'images/char-pink-girl.png');

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const ALLOWED_KEYS = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(ALLOWED_KEYS[e.keyCode]);
});
