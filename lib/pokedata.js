// pokedata.js
// Defining the data structure that is used for the pokemon events

(function(){
	function Event(opts){
		if (!(this instanceof Event))
			return new Event(opts);
		
		$.extend(this, opts);
	}
	
	Event.fn = Event.prototype = {
		id : null,
		name : "<Event>",
		x : 0,
		y : 0,
		z : 0, //extra Y that is not in the grid-line
		
		floating: false,
		breathe : false,
		
		img : null, //main image
		shadow : null, //shadow image
		
		toString : function(){ return "["+this.name+"]"; },
		
		getDomElement : function() {
			var eventobj = this;
			
			var base = $("<div>").addClass("event-base");
			var img = $("<img>").attr("src", this.img).addClass("main")
				.css({
					bottom : this.z,
				})
				.on("load", function(){ //need to get the width after it loads
					img.css("left", -(this.width / 2) + 8);
				})
				.on("click", function(){
					console.log("click!");
					eventobj.doClick();
				});
				
			if (this.floating || this.breathe) {
				var refpt = $("<div>").addClass("helper").css("bottom", this.z);
				img.css("bottom", 0);
				
				if (this.floating) {
					img.addClass("anim-float");
				} else if (this.breathe) {
					img.addClass("anim-breathe");
				}
				
				refpt.append(img);
				base.append(refpt);
			} else {
				base.append(img);
			}
			
			if (this.shadow) {
				var shadow = $("<img>").attr("src", this.shadow).addClass("shadow")
				.on("load", function(){ //need to get the width after it loads
					shadow.css({
						"bottom": -(this.height / 2) + 8,
						"left": -(this.width / 2) + 8,
					});
				});
				base.append(shadow);
			}
			
			return base;
		},
		
		doClick : function(e) {
			console.log("Clicked an event!");
		}
	};
	
	window.Event = Event;
})();

(function(){
	var imgmapID = 192168;
	
	function MultiEvent(opts) {
		if (!(this instanceof MultiEvent))
			return new MultiEvent(opts);
		
		Event.call(this, opts);
		this.subevents = [];
	}
	
	MultiEvent.fn = MultiEvent.prototype = new Event({
		name : "<Multi-Event>",
		subevents : null,
		
		addSubEvent : function(coords, event) {
			var polytype;
			switch (coords.split(",").length) {
				case 3 : polytype = "circle"; break;
				case 4 : polytype = "rect"; break;
				default : polytype = "poly"; break;
			}
			
			event["_subinfo"] = {
				"polytype" : polytype,
				"coords" : coords,
			};
			this.subevents.push(event);
			
			return this; //for chaining
		},
		
		getDomElement : function() {
			var eventobj = this;
			var mapid = ++imgmapID;
			
			var base = $("<div>").addClass("event-base");
			var img = $("<img>").attr("src", this.img).addClass("main")
				.css({
					bottom : this.z,
				})
				.on("load", function(){ //need to get the width after it loads
					img.css("left", -(this.width / 2) + 8);
				}).attr("usemap", "#multi"+mapid);
			
			var map = $("<map>").attr("name", "multi"+mapid);
			
			for (var i = 0; i < this.subevents.length; i++) {
				var evt = this.subevents[i];
				
				console.log("MULTI-attach event "+evt.name);
				
				$("<area>").attr({
					"shape" : evt["_subinfo"].polytype,
					"coords" : evt["_subinfo"].coords,
					"title" : evt.name,
				}).on("click", function(){
					console.log("sub click event == "+evt.name);
					evt.doClick();
				}).appendTo(map);
			}
			
			base.append(img).append(map);
			
			return base;
		},
	});
	
	window.MultiEvent = MultiEvent;
})();

(function(){
	function Building(opts) {
		if (!(this instanceof Building))
			return new Building(opts);
		
		Event.call(this, opts);
	}
	
	Building.fn = Building.prototype = new Event({
		name : "<Building>"
	});
	
	window.Building = Building;
})();

(function(){
	function Pokemon(opts) {
		if (!(this instanceof Pokemon))
			return new Pokemon(opts);
		
		Event.call(this, opts);
	}
	
	Pokemon.fn = Pokemon.prototype = new Event({
		name : "<Pokemon>",
		breathe : true,
		
		deximg : null,
		dexsource : null,
		
		OT : "<OT>", //original trainer
		gamename : "",
		pokename : "", //spiecies name
		nicknames : "",
		caught: "",
		memo : "",
		ball : "poke",
		level : 5,
		ribbons : null,
		
		doClick : function(){
			console.log("Summary screen! ==> "+this.name);
			this.openSummaryScreen();
		},
		
		openSummaryScreen : function(){
			$("#status-screen .common-name").text(this.name);
			$("#status-screen .game-name").text(this.gamename);
			$("#status-screen .spec-name").text(this.pokename);
			$("#status-screen .level").text(this.level);
			$("#status-screen .ball").removeClass().addClass("ball").addClass(this.ball);
			$("#status-screen .ot").text(this.OT);
			$("#status-screen .memo").text(this.memo);
			$("#status-screen .caught").text(this.caught);
			$("#status-screen .nicknames").text(this.nicknames);
			
			var ribbons = $("#status-screen .ribbon").empty();
			if (this.ribbons)
				for (var i = 0; i < this.ribbons.length; i++) {
					var rb = this.ribbons[i];
					if (!(rb instanceof Ribbon)) continue;
					
					$("<section>").addClass(rb.cssclass)
						.html("<strong>" + rb.name + "</strong><br/>" + rb.desc)
						.appendTo(ribbons);
				}
			
			$("#status-screen").show();
		},
	});
	
	window.Pokemon = Pokemon;
})();


// Ribbons!

(function(){
	function Ribbon(opts) {
		if (!(this instanceof Ribbon))
			return new Ribbon(opts);
		
		$.extend(this, opts);
	}
	Ribbon.fn = Ribbon.prototype = {
		cssclass : "",
		name : "<Ribbon>",
		desc : "<desc>",
	};
	window.Ribbon = Ribbon;
	
	
	function Released_Ribbon(time) {
		if (!(this instanceof Released_Ribbon))
			return new Released_Ribbon(time);
		
		Ribbon.call(this, {"desc" : "Released "+time});
	}
	Released_Ribbon.fn = Released_Ribbon.prototype = new Ribbon({
		cssclass : "rb-purple",
		name : "Purple Heart",
	});
	window.Released_Ribbon = Released_Ribbon;
	
	
	function HallOfFame_Ribbon(time) {
		if (!(this instanceof HallOfFame_Ribbon))
			return new HallOfFame_Ribbon(time);
		
		Ribbon.call(this, {"desc" : time});
	}
	HallOfFame_Ribbon.fn = HallOfFame_Ribbon.prototype = new Ribbon({
		cssclass : "rb-hallfame",
		name : "Hall of Fame",
	});
	window.HallOfFame_Ribbon = HallOfFame_Ribbon;
	
	
	function Starter_Ribbon() {
		if (!(this instanceof Starter_Ribbon))
			return new Starter_Ribbon();
		
		Ribbon.call(this, {});
	}
	Starter_Ribbon.fn = Starter_Ribbon.prototype = new Ribbon({
		cssclass : "rb-starter",
		name : "Starter Pokemon",
		desc : "Trainer's First Pokemon",
	});
	window.Starter_Ribbon = Starter_Ribbon;
	
	
	function Record_Ribbon(record) {
		if (!(this instanceof Record_Ribbon))
			return new Record_Ribbon(record);
		
		Ribbon.call(this, {"desc": record});
	}
	Record_Ribbon.fn = Record_Ribbon.prototype = new Ribbon({
		cssclass : "rb-record",
		name : "Record Holder",
	});
	window.Record_Ribbon = Record_Ribbon;
	
	
	function Traded_Ribbon(record) {
		if (!(this instanceof Traded_Ribbon))
			return new Traded_Ribbon(record);
		
		Ribbon.call(this, {"desc": record});
	}
	Traded_Ribbon.fn = Traded_Ribbon.prototype = new Ribbon({
		cssclass : "rb-traded",
		name : "Traded",
	});
	window.Traded_Ribbon = Traded_Ribbon;
	
	
	function BloodySunday_Ribbon() {
		if (!(this instanceof BloodySunday_Ribbon))
			return new BloodySunday_Ribbon();
		
		Ribbon.call(this, {});
	}
	BloodySunday_Ribbon.fn = BloodySunday_Ribbon.prototype = new Ribbon({
		cssclass : "rb-starter",
		name : "Bloody Sunday",
		desc : "Remember the Victims",
	});
	window.BloodySunday_Ribbon = BloodySunday_Ribbon;
	
})();
