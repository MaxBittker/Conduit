  var husl = HUSL;
var click = new Audio('click.mp3');

Ocean = (function() {
  // Constant properties 
  var width = 100;
  var height = 100;

  //var interval = 1000 / (60 /* fps */);
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
    }

    function onKeyUp(event) {
      var keyCode = event.keyCode;
       KeyEvent(false,keyCode);
    }
    


 

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
      click.play()
    }

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
		                0,0,0,0,0,0,0,0,0],

		               [0,0,0,1,1,1,0,0,0,
		                0,0,1,1,1,1,1,0,0,
		                0,1,1,0,1,0,1,1,0,
		                1,1,1,0,1,0,1,1,1,
		                1,1,1,1,1,1,1,1,1,
		                1,1,1,1,1,1,1,1,1,
		                0,1,1,0,0,0,1,1,0,
		                0,0,1,1,1,1,1,0,0,
		                0,0,0,1,1,1,0,0,0]];
   
         this.color = color;


      } 

      doot.prototype = {

        PushTile: function(Tiles){
        ///push
          },
         
        toot: function(Tiles){
         
          var delta = [0,0];
          var d = 25;

          //if(keyLeft||keyRight||keyUp||keyDown){
	        {  this.fa++;
	          if(this.fa>7)
	          	{this.fa = 0;
	          	this.frame = ((this.frame+1)%2);}
	         } 	


        delta[0] = (keyLeft*-d) + (keyRight*d);
		delta[1] = (keyUp  *-d) + (keyDown *d);

		if(this.x==0)
			delta[0] = Math.abs(delta[0]);
		if(this.x==500)
			delta[0] = -Math.abs(delta[0]);
		if(this.y==0)
			delta[1] = Math.abs(delta[1]);
		if(this.y==500)
			delta[1] = -Math.abs(delta[1]);

		PP = [this.x+delta[0],this.y+delta[1]]; //player pos
		TP = [Math.floor(PP[0]/25),Math.floor(PP[1]/25)];//tile pos  ------------V sprite pos
		SP = [Math.floor((PP[0]%25)/5),Math.floor((PP[1]%25)/5),(Math.floor((PP[0]%25)/5) + 5*Math.floor((PP[1]%25)/5))];
		
		var cTile = Tiles[TP[0]][TP[1]]; 
        
        if(0 == cTile.sprite[SP[2]])
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

          	else if(!cTile.froze){
          		//cTile.color  = husl.p.toRGB(160, 30, 70);
          		//cTile.froze = true;
          		
          		for(var n =0; n<5;n++){
          			if(0!=cTile.sprite[SP[2]] )
          			cTile.shift(1);
          			}
          	}

    //       else if(!cTile.froze&& (((Xopen[cTile.Orientation]*3) == (-1*delta[0])) )){
    //       	dir =(Yopen[cTile.Orientation]*3== -1*delta[0] )? 1:-1;
    //       	cTile.Orientation = (cTile.Orientation+dir+4)%4;
	         	
	   //      delta[0] = 0;
	         	
    //       	//cTile.color  = husl.p.toRGB(160, 30, 70);
    //       	//cTile.froze = true;
 			// }
 			// else if(!cTile.froze&& (((Yopen[cTile.Orientation]*3) == (-1*delta[1])) )){
    //       	dir =(Xopen[cTile.Orientation]*3== -1*delta[1] )? -1:1;
    //       	cTile.Orientation = (cTile.Orientation+dir+4)%4;
    //       		delta[1] = 0;
    //       	//cTile.froze = true;
    //       	//cTile.color  = husl.p.toRGB(160, 30, 70);
    //       //	cTile.color  = husl.p.fromHex(hex)  30*257 ;
 			// }

    //       else if(!cTile.froze&& (((Xopen[cTile.Orientation]*3) == (-1*delta[0])) || ((Yopen[cTile.Orientation]*3) == (-1*delta[1])))){
    //       	dir =1// Math.floor((PP[0]%25)/5) + Math.floor((PP[1]%25)/5)
    //       	cTile.Orientation = cTile.Orientation+dir%4;
    //       //	cTile.froze = true;
    //       //	cTile.color  = husl.p.fromHex(hex)  30*257 ;
 			// }
          }
        };

      


  function init(number) {
basecolor = Math.random()*360;

var Tiles = new Array(20);
  for (var i = 0; i < 20; i++) {
    Tiles[i] = new Array(20);
  }
 


    for (var x = 0; x < 20; x++) { 
	    for (var y = 0; y < 20; y++) { 

    
      var singleTile = new Tile(x,y, (basecolor)-(y*x*.07),300-(Math.log(x+2*y+2)*9),40-(Math.log(x+2*y+2)*9),Math.round((Math.random() *100))%4 );
	//(Math.random()*0xFFFFFF<<0)

      Tiles[x][y]= singleTile;
      }
  }
  

    return Tiles;
    }

  function Ocean(equation, canvas) {
    this.Tiles    = init(); // spawn new fish
    this.canvas    = canvas;
    this.doot 	   = new doot(45,45,99999999);
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
      if ( (delta > interval) &&    (keyLeft||keyRight||keyUp||keyDown) ){
        this.then = now;
        this.drawFrame();
        frame++;
      }
    },

    CheckAttached: function(Tile, Tiles) {
    var factor = 2;

 	   Xface = Xopen[Tile.Orientation];
  	   Yface = Yopen[Tile.Orientation];
       newX = Tile.x+ Xface;
       newY = Tile.y+ Yface;

       if(((newX<20)&&(newX>-1) && (Xopen[Tiles[newX][Tile.y].Orientation] == Xface)))
       		factor--;
       
       if((newY<20)&&(newY>-1) && (Yopen[Tiles[Tile.x][newY].Orientation] == Yface))  
       		factor--;
	 
		return (factor);
    },

    drawTile: function(Tile, Tiles) {
       var x = Tile.x;
       var y = Tile.y;
       var color = Tile.color 
       var R =Math.floor(color[0]*255);// (color & 0xff0000) >>> 16;
       var G =Math.floor(color[1]*255); //(color & 0x00ff00) >>> 8;
       var B =Math.floor(color[2]*255);// (color & 0x0000ff) >>> 0;

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

		//if(this.CheckAttached(this.Tiles[x][y],this.Tiles) ==0)
	   // 	 this.Tiles[x][y].Orientation =(this.Tiles[x][y].Orientation+1) %4; 
	   //	else
	   	//this.Tiles[x][y].shift((Math.floor(Math.random()*1.00005))%4); //


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
