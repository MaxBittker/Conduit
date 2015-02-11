  var husl = HUSL;
//var click = new Audio('click.mp3');

var Ocean = (function() {
  // Constant properties 
  var width = 100;
  var height = 100;

  //var interval = 1000 / (60 /* fps */);
  var frame = 1;

   var Xopen = [ 1, 1, -1,-1];
  var Yopen	= [ -1, 1, 1,-1];	
      
  var TileSprite=[[1,0,3,0,0, //(yes, this is what you think it is)
                   1,0,2,2,0,
                   1,1,0,2,4,
                   1,1,1,0,0,
                   1,1,1,1,1],

                  [1,1,1,1,1, 
                   1,1,1,0,0,
                   1,1,0,2,3,
                   1,0,2,2,0,
                   1,0,4,0,0],

                  [1,1,1,1,1, 
                   0,0,1,1,1,
                   4,2,0,1,1,
                   0,2,2,0,1,
                   0,0,3,0,1],

                  [0,0,4,0,1, 
                   0,2,2,0,1,
                   3,2,0,1,1,
                   0,0,1,1,1,
                   1,1,1,1,1]];


 			

  window.addEventListener("keydown", onKeyDown, false);
 // window.addEventListener("keyup", onKeyUp, false);

  var keyLeft = false 
    , keyRight = false
    , keyDown = false
    , keyUp = true;
    // , keyUpE = false  
    // , keyLeftE = false
    // , keyDownE = false
    // , keyRightE = false;

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
    //console.log(keyLeft);
     //this.Ocean.step();
    }

    // function onKeyUp(event) {
    //   var keyCode = event.keyCode;
    //    KeyEvent(false,keyCode);
    // }
    


 

function Tile(x, y, h,s,l, Orientation){
         this.x = x;
         this.y = y;
         this.Orientation = Orientation;
         this.color = husl.p.toRGB(h, s, l);
         this.froze = false
        this.sprite = TileSprite[this.Orientation];
     
      }; 

      Tile.prototype = {

   shift: function(dir) {
   
      this.Orientation = ((this.Orientation+dir+4)%4);
      this.sprite = TileSprite[this.Orientation];
     // click.play();
    },
    newO: function(O,which) {
    	if(which)
    		var click = new Audio('boom.mp3');
    	else
			var click = new Audio('bap.mp3');


    	//if(((O+4)%4)!=this.Orientation)
      	click.play();
      this.Orientation = ((O+4)%4);
      this.sprite = TileSprite[this.Orientation];

    },
   Xopen: function(){
     var open = [ 1, 1, -1,-1];
     return(open[this.Orientation]);
   },
    Yopen: function(){
     var open = [ -1, 1, 1,-1];	
     return(open[this.Orientation]);
   }
 

};


    
function doot(x, y, h,s,l){

         this.color = husl.p.toRGB(h, s, l);
         this.x = x;
         this.y = y;

      //   this.dy = 0;
       //  this.dy = 0;

         this.facing = 0;//0 =CW 1 = CCW 
         this.frame = 0;
         this.fa=0;
      
   
  


      } 

      doot.prototype = {

        // PushTile: function(Tiles){
        // ///push
        //   },
         
        toot: function(Tiles){
         
	         this.fa = (this.fa+1)%4;
	          if(this.fa=3)
	          	this.frame = ((this.frame+1)%2);

		var delta = [0,0];

	    var cTile = Tiles[this.x][this.y]; 

		delta = [cTile.Xopen(),cTile.Yopen()]; 
			delta[((cTile.Orientation+this.facing+keyDown)%2)] = 0;

		
        if(this.x+delta[0]<0)
            delta[0] = 0;
        if(this.y+delta[1]<0)
 			 delta[1] = 0;
 		if(this.x+delta[0]>19  && this.y+delta[1]>16)
            {
            this.x = 0;
            this.y = (20-this.y);
            return(true);  	
            }	
		if(this.y+delta[1]>19  && this.x+delta[0]>16)
            {
            this.x = (20-this.x);
            this.y = 0;
            return(true);  	
            }	
        if(this.x+delta[0]>19)
            delta[0] = 0;
        if(this.y+delta[1]>19)
 			 delta[1] = 0;

		var nTile = Tiles[this.x+delta[0]][this.y+delta[1]];
		if((keyRight || keyLeft)&& !keyDown )
			{
			nTile.newO(cTile.Orientation+(((this.facing*-2)+1)*(1+(keyRight==this.facing))),keyRight);
       		
   			if(keyRight)
    			this.facing = 0; //cw
    		else	
    			this.facing = 1; //ccw
    		}
    	else if ((-1*delta[0])==nTile.Xopen() ||  (-1*delta[1])==nTile.Yopen()   )
    		{
    		var ting = keyDown ? (new Audio ('ting2.mp3')): (new Audio('ting.mp3'));

    		ting.play();

    		if(((4+(cTile.Orientation-nTile.Orientation))%2)==0)
    			this.facing = !this.facing;

    		}
    	else
    		return;

          this.x += delta[0];
          this.y += delta[1];

       

      		return(false);
          }
        };

      


  function init(basecolor) {


var Tiles = new Array(20);
  for (var i = 0; i < 20; i++) 
    Tiles[i] = new Array(20);
  
 


    for (var x = 0; x < 20; x++) { 
	    for (var y = 0; y < 20; y++) { 

    
      var singleTile = new Tile(x,y, (basecolor)-(y*x*.19),300-(Math.log(x+2*y+2)*15),40-(Math.log(x+2*y+2)*9),Math.round((Math.random() *100))%4 );
	//(Math.random()*0xFFFFFF<<0)

      Tiles[x][y]= singleTile;
      }
  }
  

    return Tiles;
    }

  function Ocean(equation, canvas) {
  	this.startingColor = Math.random()*360
    this.Tiles     = init(this.startingColor); // spawn new fish
    this.canvas    = canvas;
    this.doot 	   = new doot(1,1,30,177,30);
    this.scale     = 5//canvas.getAttribute('width') / width;
    console.log(this.scale);
    this.context   = canvas.getContext('2d');
    this.imageData = this.context.createImageData(width * this.scale, height * this.scale);
    this.then      = +Date.now();
    this.paused    = false;

 for (var i = 0; i < 4; i++) { 
    for (var x = 0; x < 20; x++) { 
	    for (var y = 0; y < 20; y++) { 
    if(this.CheckAttached(this.Tiles[x][y],this.Tiles) !=2)
		    this.Tiles[x][y].shift( (Math.random()>.5)?-1:1) ;
      }
  }}

   this.drawFrame();
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

    //  var now = +Date.now();
    //  var delta = now - this.then;

      if ( keyLeft || keyRight || keyUp || keyDown){
      //  this.then = now;
      
        this.drawFrame();
        frame++;

 	 	keyUp    = false;
     	keyLeft  = false;
    	keyDown  = false;
    	keyRight = false;

      }
    },

    CheckAttached: function(Tile, Tiles) {
    var factor = 2;

 	   Xface = Tile.Xopen();
  	   Yface = Tile.Yopen();

       newX = Tile.x+ Xface;
       newY = Tile.y+ Yface;

       if(((newX<20)&&(newX>-1) && (Tiles[newX][Tile.y].Xopen() == Xface)))
       		factor--;
       
       if((newY<20)&&(newY>-1) && (Tiles[Tile.x][newY].Yopen() == Yface))  
       		factor--;
	 
		return (factor);
    },

    drawTile: function(Tile, Tiles) {
       var x = Tile.x;
       var y = Tile.y;

       var isDoot = (this.doot.x == x && this.doot.y == y);

       var color = Tile.color ;
       var R =Math.floor(color[0]*255);// (color & 0xff0000) >>> 16;
       var G =Math.floor(color[1]*255); //(color & 0x00ff00) >>> 8;
       var B =Math.floor(color[2]*255);// (color & 0x0000ff) >>> 0;

       if(isDoot)
       {

  	   var Dcolor = this.doot.color; 
       var DR =Math.floor(Dcolor[0]*255);// (color & 0xff0000) >>> 16;
       var DG =Math.floor(Dcolor[1]*255); //(color & 0x00ff00) >>> 8;
       var DB =Math.floor(Dcolor[2]*255);// (color & 0x0000ff) >>> 0;

       }



       var Orientation = Tile.Orientation;
      
      // console.log(Orientation);
       var sprite = Tile.sprite;
       var sps  = Math.sqrt(sprite.length)-1;

      if(this.CheckAttached(Tile,Tiles)==0)
       		sprite = [1,1,1,1,1, //(yes, this is what you think it is)
                	  1,1,1,1,1,
               	  	  1,1,1,1,1,
              	      1,1,1,1,1,
              	      1,1,1,1,1];


       for (var sx = 0; sx < 25; sx++) {
            for (var sy = 0; sy < 25; sy++) {
            	var type = sprite[(Math.floor(sx/5)+(5*Math.floor(sy/5)))];
            	var C  = 0;
              if( 1== type)  
              {
              var i = ((((y*5) * this.scale + (sy-1)) * width * this.scale) + ((x*5) * this.scale + (sx-1))) * 4 ;
              this.imageData.data[i]   = R%255;
              this.imageData.data[i+1] = G%255;
              this.imageData.data[i+2] = B%255;
              this.imageData.data[i+3] = 255;
              } 
              else if(isDoot && 1 < type) 
              	{ 
              		if((this.doot.facing+3) == type)
              		  C = 50;
              		  	
              var i = ((((y*5) * this.scale + (sy-1)) * width * this.scale) + ((x*5) * this.scale + (sx-1))) * 4 ;
              this.imageData.data[i]   = (DR+C)%255;
              this.imageData.data[i+1] = (DG+C)%255;
              this.imageData.data[i+2] = (DB-C)%255;
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
              var i = (((( ((y+1)*25)-17) + (sy-1)) * width * this.scale) + (((x+1)*25)-17)  + (sx-1)) * 4 ;
              this.imageData.data[i]   = R%255;
              this.imageData.data[i+1] = G%255;
              this.imageData.data[i+2] = B%255;
              this.imageData.data[i+3] = 255;
              }      
            }
          }

    },

   
   

    drawFrame: function() {
    //console.log(this.frame);
      this.context.fillRect(0,0,500,500);
      // offset =5+ Math.round( (Math.sin(frame/3) *2)  + (Math.random()*60)) ; 
      this.context.fillStyle = husl.p.toHex(40,60, 2);////t'#0010'+offset.toString(16);
      this.context.fill();
      // this.context.scale(5,5);
     this.imageData = this.context.getImageData(0, 0, 500, 500);

      // if(frame>1)
    if(this.doot.toot(this.Tiles))
		{this.startingColor-=40;
		this.Tiles = init(this.startingColor);
			}
     
     for (var x = 0; x < 20; x++) { 
	    for (var y = 0; y < 20; y++) { 

		//if(this.CheckAttached(this.Tiles[x][y],this.Tiles) ==0)
	   // 	 this.Tiles[x][y].Orientation =(this.Tiles[x][y].Orientation+1) %4; 
	   //	else
	   	//this.Tiles[x][y].shift((Math.floor(Math.random()*1.00005))%4); //
       

      this.drawTile( this.Tiles[x][y], this.Tiles);
      }
 		 }
 		 
 //this.drawDoot(this.doot, this.Tiles);

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
