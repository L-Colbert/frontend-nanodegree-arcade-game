// Entity(either player or enemy)
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
        
    //resets entities position to coordinates passed 
    resetEntity(x,y) {
        this.x = this.origX;
        this.y = this.origY;
        }

   render() {
    // Draw the entity on the screen, required method for game
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   };

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Entity {
    constructor(x,y,height, width, sprite) { 
        super(x,y,height, width, sprite);
    };

    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        
        //detect collision between player and enemy
        allEnemies.forEach((enemy)=> {
          if  ((this.x < enemy.x + enemy.width) && ( this.x + this.width > enemy.x) && (this.y < enemy.y + enemy.height) && (this.height + this.y > enemy.y)) {  
              this.resetEntity();
          };
        });

        /* If the game has been won(player reached the water,
        * Game is no longer in play, used to stop the drawing of frames
        */
       if (this.y === -32) {
           this.inPlay = false;
            gameWon();
        };
    };
    
    //Receives keycode user input from eventlistener 
    //Use to determine player movement
    handleInput(direction) {
        switch(direction) {
            case "left" : 
            //test and prevents player from moving off the left side of the canvas 
            if ((this.x - 101) > -3) {
                this.x -= 101;
                break;
            } else {
                this.x = this.x;
                break;
            };
            case "up": 
            //test and prevents player from moving off the top of the canvas             
            if ((this.y - 83) > -33) {
                this.y -= 83;
                break;
            } else {
                this.y = this.y;
                break;
            };
            case "right" : 
            //test and prevents player from moving off the right side of the canvas 
            if ((this.x + 101) < 403) {
                this.x += 101;
                break;
            } else {
                this.x = this.x;
                break;
            };
            case "down": 
            //test and prevents player from moving off the top of the canvas
            if ((this.y + 83) < 384) {
                this.y += 83;
                break;
            } else {
                this.y = this.y;
                break;
            };
        };
    }
};

class Enemy extends Entity {
    constructor(x,y,height, width, sprite) { 
        super(x,y,height, width, sprite);
    }
    
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x +=  dt * 275;
        if (this.x > 500) {
            this.x = (Math.floor(Math.random()));
            // this.x = this.orig;
        }
    };
    
};

function gameWon() {
    (function displayModal() {
        // Get the modal div
        const modal = document.getElementById('win-modal');
        
        // Get the <span> element that closes the modal
        const spanX= document.getElementsByClassName("close")[0];
        
        //display winning modal
        modal.style.display = "block";
        
        // When the user clicks on <span> (x), close the modal
        spanX.onclick = function() {
            modal.style.display = "none";
        };
        
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            };
        };
        
        document.querySelector('.play-again').addEventListener('click', function(event){                        
            modal.style.display = "none";
            gameReset(player);
        })
        
    })();
};

//resets the game by starting the rending again and resetting the player's postition
function gameReset(player) {
    player.inPlay = true;
    player.resetEntity();
    allEnemies.forEach((enemy, index) => {enemy.resetEntity((-(100 * index) * index))});
    main();
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];

for ( let x =1; x <= 2; x++) {
    for (let i=1 ; i <=3; i++) { 
        allEnemies[i] = new Enemy((-(100 * i) * x), ((83 * i) -23), 96, 65,'images/enemy-bug.png');
    }
}

const win = this;

const player = new Player(200,300,30,55,'images/char-pink-girl.png');
console.log(player.origX, player);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
