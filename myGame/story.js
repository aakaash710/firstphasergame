/*global game phaser game_state*/



game_state.story = function() {};
game_state.story.prototype = {

    preload: function() {

        game.load.image('sky', "assets/sky.png");


    },

    create: function() {
        game.add.sprite(0, 0, 'sky');
        this.text = game.add.text(200, 200, 'Welcome to Pacman world \n try to collect all the stars \n you have to get 150 points', {
            fontSize: '32px',
            fill: 'green'
        });
        setTimeout(function(){
            game.state.start('main')
        }, 10000)
    },
    update: function() {


}



}
game.state.add('story', game_state.story);
game.state.start('story');
