/*
** @author Eugene Andruszczenko
** @version 0.1
** @date September 18th, 2015
** @description 
** game.js is a a full canvas timber game
*/
var game = (function(){
	/*
	** @param canvas {object}
	*/	
	var canvas = document.getElementById("game");

	/*
	** @param ctx {context}
	*/		
	var ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;

	/*
	** @param width {int}
	** @param height {int}
	*/		
	var width = 568;
	var height = 320;

	/*
	** @param scale {array}
	*/			
	var scale = [
		(window.innerWidth/width),
		(window.innerHeight/height)
	];

	var banner = false;

	/*
	** @desc autoscale
	*/	
	ctx.canvas.width = width*scale[0];
	ctx.canvas.height = height*scale[1];	
	ctx.scale(scale[0], scale[1]);		

	/*
	** @param fps {int}
	*/
	var fps = 60;

	/*
	** @param toggle {boolean}
	*/
	var toggle = false;

	/*
	** @param ready {boolean}
	*/
	var ready = false;	

	/*
	** @method asset
	** @param src {string}
	** @description source to load
	** @return image obje
	*/	
	function asset(src)
	{
		image = new Image();
		image.src = "game/img/" + src;
		return image;
	}		

	/*
	** @param assets {object}
	*/
	var assets = {
		background:asset("background.png"),
		character:asset("character.png")
	};

	var character = [
		[[0,0],[32,0],[64,0]],//down
		[[0,32],[32,32],[64,32]],//left
		[[0,64],[32,64],[64,64]],//right
		[[0,96],[32,96],[64,96]],//up
		[[0,0],[32,0],[64,0]],//down-left
		[[0,32],[32,32],[64,32]],//up-left
		[[0,64],[32,64],[64,64]],//down-right
		[[0,96],[32,96],[64,96]]//up-right	
	];

	/*
	** @method init
	** @description 
	*/
	function init()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(assets.background, 0, 0, width, height);
		player.init();
    setTimeout(function(){ready = true;},250);
	}

	/*
	** @method draw
	** @description this is the core of the loop
	*/
	function draw()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(assets.background, 0, 0, width, height);
		canvas.style.backgroundColor = "rgba(0,0,0,0.1)";
		player.draw();
		if(CanvasGamepad)
		{
			gamepad(CanvasGamepad.observe())
		}
	}

	var player = {
		x:0,
		y:0,
		r:25,
		c:"rgba(0,0,0,0.1)",
		d:1,
		moving:false,
		frames:0,
		frame:0,
		delay:0,
		init:function()
		{
			this.x = width/2,
			this.y = height/2
		},
		draw:function()
		{
			ctx.fillStyle = this.c;
			ctx.beginPath();	
			//ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
			for (var i = 0 * Math.PI; i < 2 * Math.PI; i += 0.01 ) {
			    x = this.x - (this.r/2 * Math.sin(i)) * Math.sin(0 * Math.PI) + (this.r * Math.cos(i)) * Math.cos(0 * Math.PI);
			    y = this.y + (this.r * Math.cos(i)) * Math.sin(0 * Math.PI) + (this.r/2 * Math.sin(i)) * Math.cos(0 * Math.PI);

			    if (i == 0) {
			        ctx.moveTo(x, y);
			    } else {
			        ctx.lineTo(x, y);
			    }
			}
			ctx.fill();
			ctx.closePath();
			ctx.strokeStyle=this.c;
			ctx.lineWidth = 1;
			ctx.stroke();

			this.r += this.d;
			if(this.r > 30){this.d = -0.1;}
			if(this.r < 25){this.d = 0.1;}

			/*
			** character
			*/
			if(player.moving)
			{
				player.delay++;
				player.frame = parseInt(player.delay/5);
				if(player.delay >= 14){player.delay = 0;}
			}
			else
			{
				player.frame = 0;
			}

			var sx = character[player.frames][player.frame][0];
			var sy = character[player.frames][player.frame][1];
			var sw = 32;
			var sh = 32;
			var w = 32;
			var h = 32;	
						
			ctx.drawImage(
				assets.character, 
				sx, 
				sy, 
				sw, 
				sh, 
				player.x - 16, 
				player.y - this.r, 
				w, 
				h
			);
			
		}
	}

	function gamepad(map)
	{
		player.x += (map["x-axis"])*5;
		player.y += (map["y-axis"])*5;
		if(player.x < 0){player.x = 0;}
		if(player.x > width){player.x = width;}
		if(player.y < 0){player.y = 0;}
		if(player.y > height){player.y = height;}		
		if(map["a"] == 1){player.c = "rgba(255,0,0,0.25)";}
		if(map["b"] == 1){player.c = "rgba(0,255,0,0.25)";}
		if(map["x"] == 1){player.c = "rgba(0,0,255,0.25)";}
		if(map["y"] == 1){player.c = "rgba(255,0,255,0.25)";}

		if(map["start"] == 1 && !banner)
		{
			banner = true;
			//ads.banner();
		}
		if(map["select"] == 1 && banner)
		{
			banner = false;
			//ads.destroy();
		}

		var x = parseInt(map["x-dir"]);
		var y = parseInt(map["y-dir"]);
		if(x == 0 && y == 0){player.moving = false; player.frames = 0;}
		if(x == -1 && y == 0){player.moving = true; player.frames = 1;}
		if(x == 1 && y == 0){player.moving = true; player.frames = 2;}
		if(x == 0 && y == -1){player.moving = true; player.frames = 3;}
		if(x == 0 && y == 1){player.moving = true; player.frames = 0;}
		if(x == -1 && y == 1){player.moving = true; player.frames = 4;}
		if(x == -1 && y == -1){player.moving = true; player.frames = 5;}
		if(x == 1 && y == 1){player.moving = true; player.frames = 6;}
		if(x == 1 && y == -1){player.moving = true; player.frames = 7;}	
	}	

	/*
	** @method loop {iife}
	** @description this is the 
	*/	
	(function loop(){
		toggle = toggle ? false : true;
		if(toggle)
		{
			requestAnimationFrame(loop);
			return;
		}
		if(ready){draw();}
		requestAnimationFrame(loop);
	})();

	return {
		init:function(){init();},
		gamepad:function(map){gamepad(map);}
	}	
})();

/*
** @description this is for debugging in the browser
*/
if(
	window.navigator.userAgent.indexOf("Firefox") != -1 || 
	window.navigator.userAgent.indexOf("Chrome") != -1
)
{
	game.init();
}