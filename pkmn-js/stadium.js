// stadium.js
// File for the Stadium events (during TPP Platinum)
// 

//Stadium Manager GO!
(function(){
	var SCREEN_W = 54;
	var SCREEN_H = 33;
	
	var STATE_VOTING = 10;
	var STATE_BATTLING = 20;
	var STATE_WINNINGS = 30;
	
	var redside = [];
	var blueside = [];
	
	var currState = 0;
	var countdown = 0;
	
	
	function doStadium() {
		if (countdown > 0) countdown--;
		
		switch(currState) {
			case STATE_VOTING: doVoting(); break;
			case STATE_BATTLING: doBattle(); break;
			case STATE_WINNINGS: doWinnings(); break;
		}
	}
	
	function doVoting() {
		
	}
	
	function doBattle() {
		
	}
	
	function doWinnings() {
		
	}
	
	function goToState(state) {
		currState = state;
		switch (state) {
			case STATE_VOTING: 
				countdown = 120; //1 minute (in 0.5 sec increments)
				break;
			case STATE_BATTLING:
				countdown = -1; //disabled
				break;
			case STATE_WINNINGS:
				countdown = 30; //15 seconds
				break;
		}
	}
	
	function placeBet(red) {
		var n = Math.random() * 65535;
		
		if (red) {
			var index = Math.floor(Math.random()*redside.length);
			redside.splice(index, 0, n);
		} else {
			var index = Math.floor(Math.random()*blueside.length);
			blueside.splice(index, 0, n);
		}
	}
	
	for (var i = 0; i < 200; i++) placeBet(true);
	for (var i = 0; i < 180; i++) placeBet(false);
	
	
	/////// Screen event definition ///////
	
	function Screen(opts){
		if (!(this instanceof Screen))
			return new Screen(opts);
		
		Event.call(this, opts);
		this.behavior = this.drawScreen;
	}
	Screen.fn = Screen.prototype = new Event({
		name : "<Screen>",
		sprite : 1, //we supply our own sprite
		
		canvas : null,
		context : null,
		
		_createImageTag : function() {
			var eventobj = this;
			
			var img = $("<div>").addClass("main")
				.css({
					position : "absolute",
					"background-image": "url(img/bld/Stadium_screen.png)",
					top : -16 - this.z,
					left : -16,
					width: 64, height: 48,
				});
			
			var canvas = $("<canvas width='"+SCREEN_W+"px' height='"+SCREEN_H+"px'>");
			if (!(canvas[0].getContext && canvas[0].getContext('2d'))) {
				//No canvas support, show broken screen
				img.css("background-position", "0px -48px");
				return img;
			}
			
			canvas.css({
				position: "absolute",
				left: 5, top: 8,
				// "background-color" : "blue",
			}).appendTo(img);
			this.canvas = canvas;
			this.context = canvas[0].getContext('2d');
			
			return img;
		},
		
		drawScreen : function() {
			var ctx = this.context;
			ctx.clearRect(0, 0, SCREEN_W, SCREEN_H);
			
			switch (currState) {
				case STATE_BATTLING: drawHP(); break;
				
				default: drawBetting(); break;
			}
			
			function drawBetting() {
				ctx.fillStyle = "red";
				ctx.fillRect(SCREEN_W-10, 0, 10, 3);
				
				ctx.fillStyle = "blue";
				ctx.fillRect(0, 0, 10, 3);
				
				ctx.fillStyle = "white";
				
				//red side bet
				var i = (redside.length ? (redside.length > 8? 7 : 4) : 2);
				ctx.fillRect(SCREEN_W-10-1-i, 1, i, 2);
				
				//blue side bet
				i = (redside.length ? (redside.length > 8? 7 : 4) : 2);
				ctx.fillRect(11, 1, i, 2);
				
				//middle ratio
				ctx.fillRect(SCREEN_W/2-2, 1, 4, 2);
				
				__names(blueside, 0, 4);
				__names(redside, SCREEN_W/2+1, 4);
				
				//Now filling out the names
				function __names(array, x, y) {
					ctx.save();
					ctx.translate(x, y);
					
					for (var i = 0; i < array.length; i++) {
						var n = array[i];
						switch(Math.floor(n)%6) {
							case 0:
							case 1: ctx.fillStyle = "#ffffff"; break; //red
							case 2: ctx.fillStyle = "#ac7fc9"; break; //crystal
							case 3: ctx.fillStyle = "#25c36e"; break; //emerald
							case 4: ctx.fillStyle = "#f1993e"; break; //firered
							case 5: ctx.fillStyle = "#7e8080"; break; //platinum
						}
						
						var nameW = Math.floor((1/30)*(n % 20)*(n % 25)+5); //(n % 20)+5;
						ctx.fillRect(0, i, nameW, 1);
						
						ctx.fillStyle = "white";
						ctx.fillRect(SCREEN_W/2-4, i, 3, 1);
						
						//gained or lost: #bbbbbb
						
						ctx.fillStyle = "#777777";
						ctx.fillRect(SCREEN_W/2-7, i, 3, 1);
					}
					
					ctx.restore();
				}
			}
			
			function drawHP() {
				
			}
		}
	});
	
	////////////////////////////////////////
	
	//definitions of events!
	addEvent(new Building({
		name: "Pokemon Stadium 2 (Ext)",
		sprite: "img/bld/stadium_ext.png",
		x : 76, y : -17,
		warp_x: 176, warp_y: 368,
	}));
	
	addEvent(new Building({
		name: "Pokemon Stadium 2 (Int)",
		sprite: "img/bld/stadium_int.png",
		x : 80, y : -39,
		warp_x: 192, warp_y: 0,
	}));
	
	addEvent(new Building({
		name: "Pokemon Stadium 2 (Entrance)",
		sprite: "img/bld/stadium_entrance.png",
		x : 82, y : -14,
		warp_x: 144, warp_y: 48,
		
		behavior : doStadium,
	}));
	
	addEvent(new Screen({
		x: 82, y: -16, z: 4*16,
	}));
	
	addEvent(new Screen({
		x: 82, y: -36,
	}));
})();