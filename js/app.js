// Entity(either player or enemy)
class Entity {
    constructor(sprite,x,y){
        // Variables applied to each of our instances go here,
        // we've provided once for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.x = x;
        this.y = y;
        this.sprite = sprite;        
    }

   render() {
        // Draw the entity on the screen, required method for game
           ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   };
 
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Entity {
        constructor(x,y) { 
            super();
            this.sprite = 'images/char-pink-girl.png';
            this.x = x;
            this.y = y;
    }

    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        //TODO: switch statement to determine x and y coordinates of the player
        // this.x +=
        // this.y += 
        this.render();
    };

};

class Enemy extends Entity {
    constructor(x,y) { 
        super();
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
    }

    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += (dt) * Math.floor(Math.random() * 500);
        if (this.x > 500) {
            this.x = (Math.floor(Math.random())-5);
        }
        this.render();
    };

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//TODO: Create a loop that will create bugs bug[i] and push the it allEnemies array

const bug1 = new Enemy(-55,60);
const bug2 = new Enemy(-200,143);
const bug3 = new Enemy(-20,225);

const allEnemies = [bug1, bug2, bug3, ];

const player = new Player(200,425);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // player.handleInput(allowedKeys[e.keyCode]);
});
