// Entity(either player or enemy)
class Entity {
    constructor(sprite,x,y,width,height){
        // Variables applied to each of our instances go here,
        // we've provided once for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;        
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
    constructor(x,y,height, width) { 
        super();
        this.sprite = 'images/char-pink-girl.png';
        this.width = 30;
        this.height = 55;    
        this.x = x;
        this.y = y;
    };

    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        
        //detect collision between player and enemy
        allEnemies.forEach((enemy)=> {
          if  ((this.x < enemy.x + enemy.width) && ( this.x + this.width > enemy.x) && (this.y < enemy.y + enemy.height) && (this.height + this.y > enemy.y)) {  
            this.x = 200;           
            this.y = 300;
          };
        
        })
    };

    //resets player's position after a collision
    reset() {
        this.x = 200;
        this.y = 300;
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
    constructor(x,y,width,height) { 
        super();
        this.sprite = 'images/enemy-bug.png';
        this.width = 96;
        this.height = 65;
        this.x = x;
        this.y = y;
    }

    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        // TODO: check the correctness of this expression
        this.x += (dt) * Math.floor(Math.random() * 500);
        if (this.x > 500) {
            this.x = (Math.floor(Math.random())-5);
        }
  //      this.render();
    };

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//TODO: Create a loop that will create bugs bug[i] and push the it allEnemies array
//TODO: dynamically create bugs (bug[i] = new Enemy(Random-98, 60)) push to allEnemies
const bug1 = new Enemy(-100,60);
const bug2 = new Enemy(-122,143);
const bug3 = new Enemy(-178,225);

const allEnemies = [bug1, bug2, bug3];

const player = new Player(200,300,60,0);

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
