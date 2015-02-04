
Ocean = (function() {
  // Constant properties 
  var width = 100;
  var height = 100;

  var interval = 1000 / (2 /* fps */);
  var frame = 1;
      
  var TileSprite=[1,0,0,0,0, //(yes, this is what you think it is)
                  1,0,0,0,0,
                  1,1,0,0,0,
                  1,1,1,0,0,
                  1,1,1,1,1];

 

  window.addEventListener("keydown", onKeyDown, false);
  window.addEventListener("keyup", onKeyUp, false);

  var keyW = false
    , keyA = false
    , keyS = false
    , keyD = false

    , keyUp = false  
    , keyLeft = false
    , keyDown = false
    , keyRight = false;

 function KeyEvent(Boolean,keyCode) {
     
      switch (keyCode) {
        case 68: //d
          keyD = Boolean;
          break;
        case 83: //s
          keyS = Boolean;
          break;
        case 65: //a
          keyA = Boolean;
          break;
        case 87: //w
          keyW = Boolean;
          break;
        case 39: //up
          keyRight = Boolean;
          break;
        case 40: //down
          keyDown = Boolean;
          break;
        case 37: //left
          keyLeft = Boolean;
          break;
        case 38: //up
          keyUp = Boolean;
          break;
      }
    }

function onKeyDown(event) {
      var keyCode = event.keyCode;
      KeyEvent(true,keyCode);
    }

    function onKeyUp(event) {
      var keyCode = event.keyCode;
       KeyEvent(false,keyCode);
    }
    


 

function Tile(x, y, color, Orientation){
         this.x = x;
         this.y = y;
         this.Orientation = Orientation;
         this.color = color;
     
      }; 

    

  function init(number) {


var Tiles = new Array(20);
  for (var i = 0; i < 20; i++) {
    Tiles[i] = new Array(20);
  }
 


    for (var x = 0; x < 20; x++) { 
	    for (var y = 0; y < 20; y++) { 

    
      var singleTile = new Tile(x,y, 1111111111, Math.round((Math.random() * 100))%4);
	//(Math.random()*0xFFFFFF<<0)

      Tiles[x][y]= singleTile;
      }
  }

    return Tiles;
    }

  function Ocean(equation, canvas) {
    this.Tiles    = init(); // spawn new fish
    this.canvas    = canvas;
    this.scale     = 5//canvas.getAttribute('width') / width;
    console.log(this.scale);
    this.context   = canvas.getContext('2d');
    this.imageData = this.context.createImageData(width * this.scale, height * this.scale);
    this.then      = +Date.now();
    this.paused    = false;
  }


  Ocean.prototype = {
    play: function() {
      this.paused = false;
      this.step();
    },

    pause: function() {
      this.paused = true;
    },

    step: function() {
      // Rerun the step() function every animation frame
      if (this.paused) return;
      requestAnimFrame(this.step.bind(this));

      var now = +Date.now();
      var delta = now - this.then;
      if (delta > interval) {
        this.then = now;
        this.drawFrame();
        frame++;
      }
    },

    drawTile: function(Tile) {
       var x = Tile.x;
       var y = Tile.y;
       var color = Tile.color;
       var R = (color & 0xff0000) >>> 16;
       var G = (color & 0x00ff00) >>> 8;
       var B = (color & 0x0000ff) >>> 0;

       var Orientation = Tile.Orientation;
      // console.log(Orientation);
       var sprite = TileSprite;
       var sps  = 4;

       var xpos = function (x) 
        {
        if((Orientation ==1) ||( Orientation ==3))
          return(sps-x);
        else  
          return(x);
       }
    
    var ypos = function (y) 
        {
        if((Orientation ==0) ||( Orientation ==1))
          return(sps-y);
        else  
          return(y);
       }

       for (var sx = 0; sx < 25; sx++) {
            for (var sy = 0; sy < 25; sy++) {
              if( sprite[(xpos(Math.floor(sx/5))+(5*ypos(Math.floor(sy/5))))])  
              {
              var i = ((((y*5) * this.scale + (sy-1)) * width * this.scale) + ((x*5) * this.scale + (sx-1))) * 4 ;
              this.imageData.data[i]   = R%255;
              this.imageData.data[i+1] = G%255;
              this.imageData.data[i+2] = B%255;
              this.imageData.data[i+3] = 255;
              }      
            }
          }

    },

   
   

    drawFrame: function() {
    
      this.context.fillRect(0,0,500,500);
    //  offset =79+ Math.round)( (Math.sin(frame/3) *2)  + (Math.random()*2)) ; 
      this.context.fillStyle = 'black'//#0310'+offset.toString(16);
      this.context.fill();
      // this.context.scale(5,5);
     this.imageData = this.context.getImageData(0, 0, 500, 500);
      
    

     for (var x = 0; x < 20; x++) { 
	    for (var y = 0; y < 20; y++) { 
	    	 this.Tiles[x][y].Orientation =(this.Tiles[x][y].Orientation+ 
	    	 	(Math.floor(
	    	 		Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*3 
	    	 				)
	    	 	)
	    	 	)%4;
      this.drawTile( this.Tiles[x][y] );
      }
  }

      // document.getElementById('score').innerHTML = 'Catch Rate:   WASD: ' +this.boats[0].rate.toFixed(0)+'    ArrowKeys: ' +this.boats[1].rate.toFixed(0)+'     -    Population: '+this.Fishes.length ;
      //document.getElementById('score').innerHTML = 'Fish Caught:   WASD: ' +this.boats[0].haul+'    ArrowKeys: ' +this.boats[1].haul+'     -    Population: '+this.Fishes.length ;
     
      this.context.putImageData(this.imageData, 0, 0);
       

    }
  };

  var requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 2000);
        };

  return Ocean;
})();
