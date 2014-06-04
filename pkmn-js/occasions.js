// occasions.js
// File for defining special occasions to be recognized by the park
// 

/*
Dates to do things!:
Have a banner draped on the stage (a la the congrats sign on the Game Corner)

*/

(function(){
	function GameTime(year, month, day, hour){ //constructor takes start date
		this.date = new Date(year, month-1, day, hour).getTime(); //offset for EDT
	}
	GameTime.fn = GameTime.prototype = {
		date: null, //unix epoch timestamp
		
		day : function(now) {
			if (!now) now = new Date();
			now = now.getTime();
			
			var d = (now - this.date) / (24*60*60*1000);
			if (d < 0) return 0;
			return Math.floor(d);
		},
		hour : function(now) {
			if (!now) now = new Date();
			now = now.getTime();
			
			var h = (now - this.date) / (60*60*1000);
			if (h < 0) return 0;
			return Math.floor(h % 24);
		},
		minute : function(now) {
			if (!now) now = new Date();
			now = now.getTime();
			
			var m = (now - this.date) / (60*1000);
			if (m < 0) return 0;
			return Math.floor(m % 60);
		},
		
		current : function(now) {
			if (!now) now = new Date();
			now = now.getTime();
			
			var t = (now - this.date) / (60*1000);
			if (t < 0) t = 0;
			return {
				minute: Math.floor(t % 60),
				hour:	Math.floor((t / 60) % 24),
				day: 	Math.floor((t / 60*24)),
			}
		}
	};
	window.GameTime = GameTime;
})();


//Occasion Manager GO!!
(function(){
	var currOccasion = undefined;
	var currGame = new GameTime(2014, 05, 24+1, 0);
	var OCCASION_LIST = [];
	
	window.parseOccasionHash = function(hash) {
		setCurrentOccasion(hash);
	};
	
	window.setCurrentOccasion = function(ocid){
		//For forcing an occasion, for testing and hash linking
		if (currOccasion !== undefined) {
			console.error("Cannot set occasion after occasion processing has been done.");
			return;
		}
		currOccasion = ocid;
	};
	
	window.getCurrentOccasion = function(){
		if (currOccasion === undefined) {
			//If we haven't determined yet, determine now if there is one
			currOccasion = null; //set to something so we don't check again
			
			OCCASION_LIST.sort(function(a, b){
				return a.pr - b.pr;
			});
			
			var now = new Date();
			// $.each(OCCASION_LIST, function(i, obj){
			// 	if (obj.isfn(now)) {
			// 		currOccasion = obj.ocid;
			// 	}
			// }); //This gives latter entries priority, overwriting previous entries's assignments
			
			for (var i = 0; i < OCCASION_LIST.length; i++) {
				var obj = OCCASION_LIST[i];
				if (obj.isfn(now)) {
					currOccasion = obj.ocid;
				}
			}
		}
		
		return currOccasion;
	};
	
	
	window.addOccasion = function(ocid, isfn, priority){
		if (priority === undefined) priority = 0;
		var obj = {
			"ocid" : ocid, //Occasion ID
			"isfn" : isfn, //Is Function (is it now?)
			"pr" : priority,
		};
		
		OCCASION_LIST.push(obj);
	}
	
	
	///// IsFn Convience Functions /////
	var b = window.isdatefns = {};
	b.onDate = function(month, day) {
		return function(date){
			return (date.getMonth() == month && date.getDate() == day);
		};
	}
	
	//////////////////////////////////////////////////////////////////////////////////////
	// Define occasion banner
	
	var banner = new Event({
		name: "occasion banner",
		x: 10, y: -37, 
		skipme: true, //usually skip
		
		upperBannerText: "",
		lowerBannerText: "",
		bannerSize: 0, //1 for biggest, 2 for medium, 3 for small
		
		domLower: null,
		domUpper: null,
		getDomElement : function() {
			if (this.domElement) return this.domElement;
			
			var base = $("<div>").addClass("event-base").attr("name", this.name);
			if (this.lowerBannerText && this.bannerSize > 0) {
				var lower = $("<div>").addClass("banner lower")
					.css({
						"background-image": "url(img/bld/occasion_banner.png)",
						"background-position": "0px -"+(24*this.bannerSize)+"px",
						left: -112, top: -26,
					})
					.text(this.lowerBannerText);
				this.domLower = lower;
				base.append(lower);
			}
			
			if (this.upperBannerText) {
				var upper = $("<div>").addClass("banner upper")
					.css({
						"background-image": "url(img/bld/occasion_banner.png)",
						"background-position": "0px 0px",
						left: -112, top: -45,
					})
					.text(this.upperBannerText);
				this.domUpper = upper;
				base.append(upper);
			}
			
			this._storeElement(base);
			return base;
		},
	});
	addEvent(banner);
	
	
	//////////////////////////////////////////////////////////////////////////////////////
	// Define Occasions!
	//////////////////////////////////////////////////////////////////////////////////////

	{	/***************************************************
		 April 1st: April Fools
		 	No Banner, just chaos
			EVERY SPRITE BECOMES AN ODDISH SPRITE!! O_O
		***************************************************/
		addOccasion("aprilfools", isdatefns.onDate(4, 1));
		
		
		
	}{	/***************************************************
		 March 1st: National Helix Day
			"The Day TPPRed was Completed"
			The banner put up recognizes the day
			Stadium is constantly in Praise Helix mode?
		***************************************************/
		addOccasion("helixday", isdatefns.onDate(3, 1));
		
		
		
	}{	/***************************************************
		 Feb 23rd: Bloody Sunday Rememberance Day
			(Also every run, from 10d7h to 10d16h)
			The banner put up recognizes the day
			11 candles, for each mon, are put on the lake, bobbing about.
			The three mon with ribbons stand on the bridge, overlooking the lake.
		***************************************************/
		addOccasion("bloodysaturday", function(date){ //set up for it
			return ((currGame.day(date) == 10
				 && currGame.hour(date) > 0 && currGame.hour(date) < 7)
				 || (date.getMonth() == 2 && date.getDate() == 22))
		}, 10);
		addOccasion("bloodysunday", function(date) {
			return ((currGame.day(date) == 10
				 && currGame.hour(date) > 7 && currGame.hour(date) < 16)
				 || (date.getMonth() == 2 && date.getDate() == 23))
		}, 100);

		//TODO: Break the multi-events M4 Bowling

		/////////////// Define Candle /////////////////
		function Candle(opts){
			if (!(this instanceof Candle))
				return new Candle(opts);
			
			Event.call(this, opts);
			
			if (this.candle_num < 0) this.candle_num = Math.floor(Math.random()*8);
			this.forOccasion("bloodysunday", { skipme: false })
		}
		Candle.fn = Candle.prototype = new Event({
			name: "<Candle>",
			skipme: true,
			candle_num: -1,
			animation: "custom",
			frame_width: 32,
			frame_height: 32,
			
			spritesheet : "img/bld/memorial_candles2.png",
			
			domAnim: null,
			bob_x : 0,
			bob_y : 0,
			bobloop: 0,
			
			_createImageTag : function(){
				var img = $("<div>").attr("src", this.sprite).addClass("main person")
					.css({
						"background-image": "url("+this.spritesheet+")",
						width : this.frame_width,
						height : this.frame_height,
						left: -8, bottom: -8,
						"background-position": "-"+(32*(this.candle_num%4))+"px -"+(32*Math.floor(this.candle_num/4))+"px",
					});
				if (this.adj_flip) img.addClass("flip-x");
				return img;
			},
			
			behavior: function(){
				if (!this.domAnim) this.domAnim = this.domElement.find(".helper");
				
				this.bobloop += Math.PI/2;
				this.bob_x += (Math.random()*2)-1;
				this.bob_y += (Math.random()*2)-1;
				
				//curb wandering
				if (this.bob_x > 16) this.bob_x -= 1;
				if (this.bob_x <-16) this.bob_x += 1;
				if (this.bob_y > 16) this.bob_y -= 1;
				if (this.bob_y <-16) this.bob_y += 1;
				
				this.domAnim.animate({
					left: this.bob_x,
					bottom: this.bob_y + Math.sin(this.bobloop),
				}, 500);
			},
			
		});
		
		
		addEvent(new Candle({ x: -16, y:  -5, }));
		addEvent(new Candle({ x: -14, y: -10, }));
		addEvent(new Candle({ x:  -7, y: -12, candle_num: 11, }));
		
		addEvent(new Candle({ x:  -5, y:  -8, }));
		addEvent(new Candle({ x:   2, y:  -9, }));
		addEvent(new Candle({ x:   3, y:  -5, }));
		
		addEvent(new Candle({ x:  -3, y:  -3, candle_num: 10, }));
		addEvent(new Candle({ x: -10, y:  -1, }));
		addEvent(new Candle({ x: -18, y:  -3, }));
		
		addEvent(new Candle({ x:  -9, y:  -8, }));
		addEvent(new Candle({ x:  -1, y:  -6, }));
		addEvent(new Candle({ x: -12, y:  -5, })
			.forOccasion("bloodysaturday", {
				skipme: false,
				x: -19, y: -8,
				behavior: null,
			}));
		
		
		
		banner.forOccasion("bloodysunday", {
			skipme: false,
			upperBannerText: "In Memoriam",
			lowerBannerText: "Bloody Sunday", 
			bannerSize: 3,
		}).forOccasion("bloodysaturday", {
			skipme: false,
			upperBannerText: "In Memoriam",
		});


	}{	/***************************************************
		 Weds, Every Week: Protagonist Tournament!
			Stadium has battlers now! Our Portagonists!
			Their teams are thrown randomly into the lineup and they battle one another.
		***************************************************/

		addOccasion("protagturni", function(date) {
			return (date.getDay() == 3)
		});


	}
})();

