var config = {
         type: Phaser.AUTO,
         width: 800,
         height: 600,
         physics: {
             default: 'arcade',
             arcade: {
                 gravity: { y: 0 },
                 debug: false
             }
         },
         scene: {
             preload: preload,
             create: create,
             update: update
         }
};

var timer;
var birds;
var platforms;
var cursors;
var maxBirdSpeed;
var minBirdSpeed;
var gameOver = false;
var score = 0;
var clock = 2;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('tree', 'assets/tree.png');
    this.load.image('bird', 'assets/bird-1.png');
}

function create ()
{
    this.add.image(400, 300, 'sky');
    this.add.image(350, 280, 'tree');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(400, -100, 'ground').setScale(2).refreshBody();

    birds = this.physics.add.group();

    createBirds();

    this.physics.add.collider(birds, platforms);

    timer = setInterval(createBirds, 3000);
    countDown = setInterval(passTime, 1000);

    this.input.on('gameobjectdown', function (pointer, gameObject) {

	gameObject.disableBody(true, true);
	score += 10;
	clock += 1;
	scoreText.setText('Bird Score: ' + score);
	timerText.setText('Time: ' + clock);
    }, this);

    scoreText = this.add.text(16, 540, 'Bird Score: 0', { fontSize: '32px', fill: '#000' });

    timerText = this.add.text(300, 16, 'Time: ' + clock, { fontSize: '32px', fill: '#000' });
}

function update ()
{
    if (clock === 0){
	
	gameOverText = this.add.text(250, 240, 'Final Score: ' + score, { fontSize: '32px', fill: '#000' });
	this.physics.pause();
	clearInterval(countDown);
	clearInterval(timer);
    }
}

function createBirds ()
{
    birds.children.iterate(function(child){
	child.destroy();
    });
    birds.clear(true);
    imax = Phaser.Math.RND.integerInRange(3, 5);
    for (i = 0; i<imax; i++){
	var bird = birds.create(12, Phaser.Math.FloatBetween(150, 500), 'bird');
	bird.setVelocityX(Phaser.Math.FloatBetween(250, 600));
	bird.setVelocityY(Phaser.Math.FloatBetween(-200, 200));
	bird.setBounce(Phaser.Math.FloatBetween(0.9, 1.1));
	bird.setInteractive();
    }
}

function passTime ()
{
    clock -= 1;
    timerText.setText('Time: ' + clock);
}

function resetCountDown ()
{
    if (countDown != null){
        clearInterval(countDown);
    }
    countDown = setInterval(passTime, 3000);
}

function resetBirdTimer ()
{
    if (timer != null){
        clearInterval(timer);
    }
    timer = setInterval(createBirds, 3000);
}
