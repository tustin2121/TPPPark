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
	
	var RANDOM_NAMES = [
	];
	
	var NAMED_PATRONS = {
		"tustin2121" : 0,
		"carlotta4th" : 0,
		
	};
	
	var redside = [];
	var blueside = [];
	
	var currState = 0;
	var countdown = 0;
	
	var eventlist = [];
	
	function doStadium() {
		if (countdown > 0) countdown--;
		
		if (currState == 0) doInit();
		
		switch(currState) {
			case STATE_VOTING: doVoting(); break;
			case STATE_BATTLING: doBattle(); break;
			case STATE_WINNINGS: doWinnings(); break;
		}
	}
	
	function doInit() {
		//Create people randomly!
		for (var x = 70; x <= 95; x++) {
			//Skip stairs
			if (x == 71 || x == 79 || x == 86 || x == 94) continue;
			for (var y = -37; y <= -31; y++) {
				if (x > 79 && x < 86 && y < -34) continue; //skip screen area
				
				if (Math.random() > 0.85) continue; //randomly skip patrons
				
				var patron = new Patron({
					style : Math.floor(Math.random()*44),
					x: x, y: y,
				});
				
				addEvent(patron);
				eventlist.push(patron);
			}
		}
		
		setInterval(fireStadiumBehaviors, 250);
		
		goToState(STATE_VOTING);
	}
	
	function fireStadiumBehaviors() {
		$.each(eventlist, function(i, obj){
			if (!obj.stadiumBehavior || !$.isFunction(obj.stadiumBehavior)) return;
			obj.stadiumBehavior();
		});
	}
	
	function doVoting() {
		// placeBet(true);
		// placeBet(false);
		
		if (countdown <= 0) goToState(STATE_BATTLING);
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
	
	// for (var i = 0; i < 200; i++) placeBet(true);
	// for (var i = 0; i < 180; i++) placeBet(false);
	
	/////////// Patron Definition ////////////
	
	function Patron(opts) {
		if (!(this instanceof Patron))
			return new Patron(opts);
		
		Event.call(this, opts);
	}
	
	Patron.fn = Patron.prototype = new Event({
		name : "<Patron>",
		sprite: 1, 
		
		direction : 0, //0 = down, 1 = up, 2 = left, 3 = right
		style : 0,
		
		delayBehaviorTimer : 0,
		domImage : null,
		vote : null, //1 = red, 2 = blue
		
		updateImage : function() {
			var x = -this.direction * 16;
			var y = -this.style * 22;
			
			this.domImage.css({
				"background-position" : x+"px "+y+"px",
			});
		},
		
		stadiumBehavior : function() {
			switch(currState) {
				case STATE_VOTING:
					this.delayBehaviorTimer--;
					if (this.delayBehaviorTimer > 0) break;
					
					if (this.vote) {
						this.direction = 0;
						break;
					} 
					
					var r = Math.floor(Math.random()*8);
					this.direction = (r < 4)?r:0;
					
					var bet = Math.random();
					// console.log(bet, (countdown/120));
					if (bet > (countdown/120.0)*2) {
						this.vote = Math.floor((bet * 3019) % 2)+1;
						placeBet(this.vote-1);
					}
					
					this.delayBehaviorTimer = Math.random()*10;
					break;
				
				case STATE_BATTLING:
					this.direction = 0;
					break;
			}
			
			this.updateImage();
		},
		
		getDomElement : function() {
			if (this.domElement) return this.domElement;
			
			var base = $("<div>").addClass("event-base").attr("name", this.name);
			var img = this._createImageTag();
			
			base.append(img);
			
			this._applyShadow(base);
			
			this.domImage = img;
			this._storeElement(base);
			return base;
		},
		
		_createImageTag : function() {
			var eventobj = this;
			
			var img = $("<div>").addClass("main person")
				.css({
					position : "absolute",
					"background-image": "url(img/trainers/stadium_patrons.png)",
					bottom: -2,
				});
			return img;
		},
	});
	
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
		sprite: "img/bld/Stadium_ext.png",
		x : 76, y : -17,
		warp_x: 176, warp_y: 368,
	}));
	
	addEvent(new Building({
		name: "Pokemon Stadium 2 (Seating)",
		sprite: "img/bld/Stadium_seating.png",
		x : 80, y : -39,
		warp_x: 192, warp_y: 0,
	}));
	
	addEvent(new Building({
		name: "Pokemon Stadium 2 (Arena)",
		sprite: "img/bld/Stadium_arena.png",
		x : 79, y : -30,
		warp_x: 176, warp_y: 8,
	}));
	
	addEvent(new Building({
		name: "Pokemon Stadium 2 (Entrance)",
		sprite: "img/bld/Stadium_entrance.png",
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