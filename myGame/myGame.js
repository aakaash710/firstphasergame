/*global Phaser*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}


game_state.main = function () {};
game_state.main.prototype = {


	preload: function() {
	    game.load.image('sky', "assets/sky.png");
	    game.load.image('ground', "assets/platform.png"  );
	    game.load.image('star' , "assets/star.png");
	    game.load.spritesheet('sun' , "assets/sun.png", 64,64);
	    game.load.spritesheet('guy' , "assets/guy.png", 32,32);
},


create: function() {
game.physics.startSystem(Phaser.Physics.ARCADE)
game.add.sprite(0 , 0, 'sky')
this.sun = game.add.sprite(400 , 0, 'sun')
this.sun.scale.setTo(5,5)
this.sun.animations.add('shine',[0,1],3,true)
this.platforms= game.add.group();
this.platforms.enableBody = true
var ground = this.platforms.create(0, game.world.height -64,'ground')
ground.scale.setTo(2,2);
ground.body.immovable = true;
this.player = game.add.sprite(32, game.world.height - 350, 'guy')
game.physics.arcade.enable(this.player)
this.player.scale.setTo(1.75,1.75)


var ledgeData = [
    [300,250],
    [70, 400],
    [60,100],
]

var ledges = []

for(var i=0; i<ledgeData.length;i++){
    ledges.push(this.platforms.create(ledgeData[i][0],ledgeData[i][1],'ground'))
    ledges[i].body.immovable = true
}
this.player.body.bounce.y = .99;
this.player.body.gravity.y = 500;
this.player.body.collideWorldBounds = true;
this.player.animations.add('left', [0,1,2,3],10,true);
this.player.animations.add('right' , [5,6,7,8],10,true);
this.cursors = game.input.keyboard.createCursorKeys();
this.stars = game.add.group();
this.stars.enableBody = true
for (var i = 0; i < 15; i++){
    var star = this.stars.create(i*53.33,0,'star')
    star.body.gravity.y = 300;
    star.body.bounce.y = 0.7 + Math.random()*0.2
    
}
this.score = 0
this.scoreText = game.add.text(16,16,'Score:0'  ,{
    fontSize: '32px' ,
    fill: 'red'
})
},





update: function() {
    this.sun.animations.play("shine");
    game.physics.arcade.collide(this.player , this.platforms );
   this.player.body.velocity.x = 0;
    if (this.cursors.left.isDown){
       this.player.body.velocity.x = -150;
       this.player.animations.play ('left');
    }
    else if (this.cursors.right.isDown){
       this.player.body.velocity.x = 150
       this.player.animations.play ('right');
    }
    else {
        this.player.animations.stop();
        this.player.frame = 4
    } 
    if (this.cursors.up.isDown && this.player.body.touching.down){
        this.player.body.velocity.y = -400
    }
    game.physics.arcade.collide(this.stars , this.platforms);
    game.physics.arcade.overlap(this.player , this.stars , this.collectStar , null , this)
    
},

collectStar: function(player , star) {
    star.kill()
    this.score+= 10
    this.scoreText.text = "Score: " + this.score 
}
}

game.state.add('main', game_state.main);
game.state.start('main');