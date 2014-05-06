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
		
		animation : false,
		behavior : null,
		
		sprite : null, //image that represents the event in the world
		spritesheet : null, //many such sprites in one sheet
		shadow : null, //shadow image
		
		domElement : null, 
		
		toString : function(){ return "["+this.name+"]"; },
		
		getDomElement : function() {
			if (this.domElement) return this.domElement;
			if (!this.sprite) return null; //ignore unrepresented events
			
			var base = $("<div>").addClass("event-base");
			var img = this._createImageTag();
				
			base.append(this._applySpriteAnimation(img));
			
			this._applyShadow(base);
			
			this.domElement = base;
			return base;
		},
		
		_createImageTag : function() {
			var eventobj = this;
			
			var img = $("<img>").attr("src", this.sprite).addClass("main")
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
			return img;
		},
		
		_applySpriteAnimation : function(img) {
			if (!this.animation) return img;
			
			var refpt = $("<div>").addClass("helper").css("bottom", this.z);
			img.css("bottom", 0);
			
			img.addClass("anim-"+this.animation);
			
			refpt.append(img);
			return refpt;
		},
		
		_applyShadow : function(base) {
			if (!this.shadow) return;
			
			var shadow = $("<img>").attr("src", this.shadow).addClass("shadow")
			.on("load", function(){ //need to get the width after it loads
				shadow.css({
					"bottom": -(this.height / 2) + 8,
					"left": -(this.width / 2) + 8,
					"z-index": -1,
				});
			});
			base.append(shadow);
		},
		
		doClick : function(e) {
			console.log("Clicked an event!");
		},
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
			if (this.domElement) return this.domElement;
			if (!this.sprite) return null; //ignore unrepresented events
			
			var eventobj = this;
			var mapid = ++imgmapID;
			
			var base = $("<div>").addClass("event-base");
			var img = $("<img>").attr("src", this.sprite).addClass("main")
				.css({
					bottom : this.z,
				})
				.on("load", function(){ //need to get the width after it loads
					img.css("left", -(this.width / 2) + 8);
				}).attr("usemap", "#multi"+mapid);
			
			var map = $("<map>").attr("name", "multi"+mapid);
			
			for (var i = 0; i < this.subevents.length; i++) {
				var evt = this.subevents[i];
				
				$("<area>").attr({
					"shape" : evt["_subinfo"].polytype,
					"coords" : evt["_subinfo"].coords,
					"title" : evt.name,
				}).on("click", {"evt" : evt}, function(e){
					e.data.evt.doClick();
				}).appendTo(map);
			}
			
			base.append(img).append(map);
			
			this.domElement = base;
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
		name : "<Building>",
		
		warp_x : 0, //center image so event base sits over where
		warp_y : 0, //the in-game warp tile would go
		
		_createImageTag : function() {
			var eventobj = this;
			
			return $("<img>").attr("src", this.sprite).addClass("main")
				.css({
					top : -this.warp_y,
					left : -this.warp_x,
				})
				.on("click", function(){
					console.log("click!");
					eventobj.doClick();
				});
		},
	});
	
	window.Building = Building;
})();


(function(){
	function Person(opts) {
		if (!(this instanceof Person))
			return new Person(opts);
		
		Event.call(this, opts);
	}
	
	Person.fn = Person.prototype = new Event({
		name : "<Person>",
		
		direction : 0, //0 = down, 1 = up, 2 = left, 3 = right
		animFrame : 0,
		actTimer : 0, //action count down, used variously by behaviors
		
		dialog : null, //an array
		dialog_assignment : "random",
		
		domImage : null,
		
		updateImage : function() {
			var x = -this.direction * 16;
			var y = -this.animFrame * 22;
			
			this.domImage.css({
				"background-position" : x+"px "+y+"px",
			});
		},
		
		getDomElement : function() {
			if (this.domElement) return this.domElement;
			if (!this.spritesheet) return null; //ignore unrepresented events
			
			var eventobj = this;
			
			var base = $("<div>").addClass("event-base");
			var img = $("<div>").attr("src", this.sprite).addClass("main person")
				.css({
					"background-image": "url("+this.spritesheet+")",
				})
				.on("click", function(){
					console.log("click!");
					eventobj.doClick();
				});
			base.append(img);
			
			this.domImage = img;
			this.domElement = base;
			return base;
		},
		
		doClick : function() {
			if (this.dialog) {
				var text;
				
				if ($.isArray(this.dialog)) {
					switch (this.dialog_assignment) {
						case "random":
							var index = Math.floor(Math.random() * this.dialog.length);
							text = this.dialog[index];
							break;
						case "sequential":
							//TODO
							break;
						default: return false;
					}
				} else if (this.dialog instanceof String) {
					text = this.dialog;
				} else { return false; }
				
				showDialog(text, this.domElement.position(), 4800);
			}
			
			//turn character to camera
			this.direction = 0;
			this.actTimer = 10;
			this.updateImage();
		},
	});
	window.Person = Person;
	
	
	//Define some behavior functions for people
	var b = {};
	
	//Look about randomly
	b.look = function() {
		this.actTimer--;
		if (this.actTimer > 0) return; //do nothing this time
		
		this.direction = Math.floor(Math.random()*4);
		this.updateImage();
		
		//reset action timer
		this.actTimer = Math.floor(Math.random() * 2)+4;
	}
	
	//Meander around a fixed area
	b.meander = function() {
		
	}
	
	window.behavior = b;
	
	
})();

(function(){
	function Trainer(opts) {
		if (!(this instanceof Trainer))
			return new Trainer(opts);
		
		Person.call(this, opts);
	}
	
	Trainer.fn = Trainer.prototype = new Person({
		name : "<Trainer>",
		nickname : "",
		
		playtime : "",
		pokedex : "",
		releasecount : 0,
		idnum : 0,
		
		worshiped_items : null,
		e4attempts : 0,
		blackouts : 0,
		extra : 0,
		badge_html : null,
		
		doClick : function(){
			console.log("Trainer Card screen! ==> "+this.name);
			this.openTrainerCard();
		},
		
		openTrainerCard : function() {
			//TODO
		},
	});
	
	window.Trainer = Trainer;
})();


(function(){
	function Pokemon(opts) {
		if (!(this instanceof Pokemon))
			return new Pokemon(opts);
		
		Event.call(this, opts);
	}
	
	Pokemon.fn = Pokemon.prototype = new Event({
		name : "<Pokemon>",
		animation : "breathe",
		
		dex : null,
		dexsource : null,
		spritesource : null,
		
		sources : null,
		
		gender : 0, //valid values: 0 = genderless/unkown, 1 = male, 2 = female 
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
			$("#status-screen .common-name").html(this.name);
			$("#status-screen .game-name").html(this.gamename);
			$("#status-screen .spec-name").html(this.pokename);
			$("#status-screen .ball").removeClass().addClass("ball").addClass(this.ball);
			$("#status-screen .ot").html(this.OT);
			$("#status-screen .memo").html(this.memo);
			$("#status-screen .caught").html(this.caught);
			$("#status-screen .nicknames").html(this.nicknames);
			$("#status-screen .sprite img").attr("src", this.dex);
			
			$("#status-screen .gender").removeClass("male female");
			switch (this.gender) {
				case 1: case "male":
					$("#status-screen .gender").addClass("male"); break;
				case 2: case "female":
					$("#status-screen .gender").addClass("female"); break;
			}
			
			{
				var sources = "";
				
				if (!this.sources) this.sources = {};
				
				if (this.dexsource) {
					this.sources["Pokedex Image"] = this.dexsource;
				}
				if (this.spritesource) {
					this.sources["Sprite Source"] = this.spritesource;
				}
				
				$.each(this.sources, function(key, val){
					if (/^http:\/\//.test(val)) {
						sources += "<a href='"+val+"'>"+key+"</a><br/>";
					} else {
						console.warn("Source for '"+key+"' is not an http link! ==> "+val);
						sources += key + ": "+val+"<br/>";
					}
				});
				
				if (!sources) console.error("No sources listed for event: "+this.name);
				
				$("#status-screen .sources").html(sources);
			}
			
			if ($.isFunction(this.level)) {
				var lvl = this.level();
				$("#status-screen .level").text(lvl);
			} else {
				$("#status-screen .level").text(this.level);
			}
			
			var ribbons = $("#status-screen .ribbon").empty();
			if (this.ribbons)
				for (var i = 0; i < this.ribbons.length; i++) {
					var rb = this.ribbons[i];
					if (!(rb instanceof Ribbon)) continue;
					
					$("<section>").addClass(rb.cssclass)
						.html("<strong>" + rb.name + "</strong><br/>" + rb.desc)
						.appendTo(ribbons);
				}
			
			// positionStatusScreenRelTo(this);
			
			$("#status-screen").show();
		},
	});
	
	window.Pokemon = Pokemon;
})();

////////////////////////////
// Ribbons!
////////////////////////////

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
	
	
	function Traded_Ribbon(text) {
		if (!(this instanceof Traded_Ribbon))
			return new Traded_Ribbon(text);
		
		Ribbon.call(this, {"desc": text});
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
		cssclass : "rb-bloodysunday",
		name : "Bloody Sunday Victim",
		desc : "Always Remember",
	});
	window.BloodySunday_Ribbon = BloodySunday_Ribbon;
	
	
	function Daycare_Ribbon(text) {
		if (!(this instanceof Daycare_Ribbon))
			return new Daycare_Ribbon(text);
		
		Ribbon.call(this, {"desc": text});
	}
	Daycare_Ribbon.fn = Daycare_Ribbon.prototype = new Ribbon({
		cssclass : "rb-daycare",
		name : "Daycare Raised",
	});
	window.Daycare_Ribbon = Daycare_Ribbon;
	
})();
