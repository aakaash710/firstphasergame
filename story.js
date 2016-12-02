/*global game phaser game_state*/



game_state.story = function () {};
game_state.story.prototype = {
    
    	preload: function() {
    	
    	    	    game.load.image('sky', "assets/sky.png");
    	    
    	    
    	},
    	
    	create: function() {
    game.add.sprite(0 , 0, 'sky')	    
    	    
    	    
    	    
    	    

  
},
    	update: function() {
    	    
    	    
    	    
    	    
    	
    	    
    	    
    	}
}    	
    	game.state.add('story', game_state.story);
    	game.state.start('story');
