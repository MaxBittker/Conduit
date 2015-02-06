
Ocean = (function() {
  // Constant properties 
  var width = 100;
  var height = 100;

  var interval = 1000 / (30 /* fps */);
  var frame = 1;
      
  var TileSprite=[[1,0,0,0,0, //(yes, this is what you think it is)
                   1,0,0,0,0,
                   1,1,0,0,0,
                   1,1,1,0,0,
                   1,1,1,1,1],

                  [1,1,1,1,1, 
                   1,1,1,0,0,
                   1,1,0,0,0,
                   1,0,0,0,0,
                   1,0,0,0,0],

                  [1,1,1,1,1, 
                   0,0,1,1,1,
                   0,0,0,1,1,
                   0,0,0,0,1,
                   0,0,0,0,1],

                  [0,0,0,0,1, 
                   0,0,0,0,1,
                   0,0,0,1,1,
                   0,0,1,1,1,
                   1,1,1,1,1]];


  var Xopen = [ 1, 1, -1,-1];
  var Yopen	= [ -1, 1, 1,-1];				

  window.addEventListener("keydown", onKeyDown, false);
  window.addEventListener("keyup", onKeyUp, false);

  var keyUp = false  
    , keyLeft = false
    , keyDown = false
    , keyRight = false;

 function KeyEvent(Boolean,keyCode) {
     
      switch (keyCode) {
        case 68: //d
          keyRight = Boolean;
          break;
        case 83: //s
          keyDown = Boolean;
          break;
        case 65: //a
          keyLeft = Boolean;
          break;
        case 87: //w
          keyUp = Boolean;
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
         this.froze = false
     
      }; 

    
function doot(x, y, color){
         this.x = x;
         this.y = y;
         this.dy = 0;
         this.dy = 0;
         this.frame = 0;
         this.fa=0;
         this.sprite= [[0,0,0,0,0,0,0,0,0,
		                0,0,0,1,1,1,0,0,0,
		                0,0,1,1,1,1,1,0,0,
		                0,1,1,0,1,0,1,1,0,
		                0,1,1,1,1,1,1,1,0,
		                0,1,1,1,1,1,1,1,0,
		                0,0,1,1,0,1,1,0,0,
		                0,0,0,1,1,1,0,0,0,
		                0,0,0,1,0,0,1,0,0],

		               [0,0,0,1,1,1,0,0,0,
		                0,0,1,1,1,1,1,0,0,
		                0,1,1,0,1,0,1,1,0,
		                1,1,1,0,1,0,1,1,1,
		                1,1,1,1,1,1,1,1,1,
		                1,1,1,1,1,1,1,1,1,
		                0,1,1,0,0,0,1,1,0,
		                0,0,1,1,1,1,1,0,0,
		                0,0,1,0,0,1,0,0,0]];
   
         this.color = color;


      } 

      doot.prototype = {

        PushTile: function(Tiles){
        ///push
          },
         
        toot: function(Tiles){
         
          var delta = [0,0];


          if(keyLeft||keyRight||keyUp||keyDown){
	          this.fa++;
	          if(this.fa>7)
	          	{this.fa = 0;
	          	this.frame = ((this.frame+1)%2);}
	         } 	


        delta[0] = (keyLeft*-3) + (keyRight*3);
		delta[1] = (keyUp  *-3) + (keyDown *3);

		if(this.x==0)
			delta[0] = Math.abs(delta[0]);
		if(this.x==500)
			delta[0] = -Math.abs(delta[0]);
		if(this.y==0)
			delta[1] = Math.abs(delta[1]);
		if(this.y==500)
			delta[1] = -Math.abs(delta[1]);

		PP =[this.x+delta[0],this.y+delta[1]];

		var cTile = Tiles[Math.floor(PP[0]/25)][Math.floor(PP[1]/25)]; 
        if(0 == cTile.sprite[Math.floor((PP[0]%25)/5) + 5* Math.floor((PP[1]%25)/5)])
       		{
       
          this.x += delta[0];
          this.y += delta[1];

        if(this.x>=500-1)
            this.x = 500-1;
          if(this.x<=0)
            this.x = 0;
          if(this.y>=500-1)
            this.y = 500-1;
          if(this.y<=0)
            this.y = 0;
          }

          else if(!cTile.froze&& (((Xopen[cTile.Orientation]*3) == (-1*delta[0])) || ((Yopen[cTile.Orientation]*3) == (-1*delta[1])))){
          	dir =1// Math.floor((PP[0]%25)/5) + Math.floor((PP[1]%25)/5)
          	cTile.Orientation = cTile.Orientation+dir%4;
          //	cTile.froze = true;
          	cTile.color *=  3 ;
 			}
          }
        };

      


  function init(number) {


var Tiles = new Array(20);
  for (var i = 0; i < 20; i++) {
    Tiles[i] = new Array(20);
  }
 


    for (var x = 0; x < 20; x++) { 
	    for (var y = 0; y < 20; y++) { 

    
      var singleTile = new Tile(x,y, 1111111111+(255*x*y), Math.round((Math.random() * 100))%4);
	//(Math.random()*0xFFFFFF<<0)

      Tiles[x][y]= singleTile;
      }
  }

    return Tiles;
    }

  function Ocean(equation, canvas) {
    this.Tiles    = init(); // spawn new fish
    this.canvas    = canvas;
    this.doot 	   = new doot(250,250,99999999);
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

    drawTile: function(Tile, Tiles) {
       var x = Tile.x;
       var y = Tile.y;
       var color = Tile.color;
       var R = (color & 0xff0000) >>> 16;
       var G = (color & 0x00ff00) >>> 8;
       var B = (color & 0x0000ff) >>> 0;

       var Orientation = Tile.Orientation;
       Tile.sprite = TileSprite[Tile.Orientation];
      // console.log(Orientation);
       var sprite = Tile.sprite;
       var sps  = Math.sqrt(sprite.length)-1;

       Xface = Xopen[Orientation];
       Yface = Yopen[Orientation];
       newX = x+ Xface;
       newY = y+ Yface;
       if(  ( ((newX<20)&&(newX>-1) && (Xopen[Tiles[newX][y].Orientation] == Xface)) 
       	  &&  ((newY<20)&&(newY>-1) && (Yopen[Tiles[x][newY].Orientation] == Yface)) )   )
       		sprite = [1,1,1,1,1, //(yes, this is what you think it is)
                	  1,1,1,1,1,
               	  	  1,1,1,1,1,
              	      1,1,1,1,1,
              	      1,1,1,1,1];


    //    var xpos = function (x) 
    //     {
    //     if((Orientation ==2) ||( Orientation ==3))
    //       return(sps-x);
    //     else  
    //       return(x);
    //    }
    
    // var ypos = function (y) 
    //     {
    //     if((Orientation ==2) ||( Orientation ==1))
    //       return(sps-y);
    //     else  
    //       return(y);
    //    }

       for (var sx = 0; sx < 25; sx++) {
            for (var sy = 0; sy < 25; sy++) {
              if( sprite[(Math.floor(sx/5)+(5*Math.floor(sy/5)))])  
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
     drawDoot: function(doot, Tiles) {
       var x = doot.x;
       var y = doot.y;
       var color = doot.color;
       var R = (color & 0xff0000) >>> 16;
       var G = (color & 0x00ff00) >>> 8;
       var B = (color & 0x0000ff) >>> 0;

      
       
      // console.log(Orientation);
       var sprite = doot.sprite[doot.frame];
       var sps  = Math.sqrt(sprite.length)-1;

       
 

       for (var sx = 0; sx < 9; sx++) {
            for (var sy = 0; sy < 9; sy++) {
              if( sprite[(Math.floor(sx))+(9*Math.floor(sy))])  
              {
              var i = ((((y-4) + (sy-1)) * width * this.scale) + ((x-4)  + (sx-1))) * 4 ;
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
	    	 this.Tiles[x][y].Orientation =(this.Tiles[x][y].Orientation+// 0);
	    	 	(Math.floor(Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*2 )))%4; //
      this.drawTile( this.Tiles[x][y], this.Tiles);
      }
 		 }
 this.doot.toot(this.Tiles);
 this.drawDoot(this.doot, this.Tiles);

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
