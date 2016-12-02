/*global game phaser game_state*/



game_state.story = function() {};
game_state.story.prototype = {

    preload: function() {

        game.load.image('sky', "assets/sky.png");


    },

    create: function() {
        game.add.sprite(0, 0, 'sky');
        this.text = game.add.text(200, 200, 'Welcome to Pacman world \n try to collect all the stars \n you have to get 150 points \n wait 10 seconds or press the up arrow key \n to continue ', {
            fontSize: '32px',
            fill: 'green'
        });
        setTimeout(function(){
            game.state.start('main')
        }, 10000)
        
        this.cursors = game.input.keyboard.createCursorKeys();
    },
    update: function() {

 if (this.cursors.up.isDown) {
     game.state.start('main')
 }
 
}



}
game.state.add('story', game_state.story);
game.state.start('story');
