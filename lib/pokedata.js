// pokedata.js
// Defining the data structure that is used for the pokemon events

var behavior = {}; //behavior function holder
var eventRegistry = {}; //For when events have ids

(function(){
	function Event(opts){
		if (!(this instanceof Event))
			return new Event(opts);
		
		if (opts.refid) {
			var refevent = eventRegistry[opts.refid];
			$.extend(this, refevent, opts); //inputted opts override ref
		} 
		else {
			$.extend(this, opts);
		}
		
		if (opts.id) { //If we have an id set, put this in the registry
			eventRegistry[opts.id] = this;
		}
	}
	
	Event.fn = Event.prototype = {
		id : null,
		name : "<Event>",
		x : 0,
		y : 0,
		z : 0, //extra Y that is not in the grid-line
		
		adj_x: 0, //pixel adjustment for images
		adj_y: 0, //technically the same as z, but whatever
		refl_adj_x : 0, //for reflection adjustments
		refl_adj_y : 0, 
		adj_flip: false, //to in css flip a sprite
		
		animation : false,
		reflection: false,
		
		skipme: false, //if we want to force skipping over an event
		behavior : null,
		_isActive: true,
		activeZone : null,
		
		parent : null, //parent event, if part of a subevent
		sprite : null, //image that represents the event in the world
		spritesheet : null, //many such sprites in one sheet
		shadow : null, //shadow image
		
		domElement : null, 
		
		occasions : null, //dictionary of dictionaries for overrides during the occasions
		
		toString : function(){ return "["+this.name+"]"; },
		
		getDomElement : function() {
			if (this.domElement) return this.domElement;
			if (!this.sprite && !this.spritesheet) return null; //ignore unrepresented events
			
			var base = $("<div>").addClass("event-base").attr("name", this.name);
			var img = this._createImageTag();
			
			base.append(this._applySpriteAnimation(img));
			
			this._applyShadow(base);
			
			this._storeElement(base);

			if (this.reflection) {
				var refl = this._createReflection();
				if (refl) return $([base[0], refl[0]]);
			}
			return base;
		},
		
		_storeElement : function(base) {
			this.domElement = base;
			base.data("event", this);
		},
		
		_createImageTag : function() {
			var eventobj = this;
			
			var img = $("<img>").attr("src", this.sprite).addClass("main")
				.css({
					bottom : this.z - this.adj_y,
				})
				.on("load", function(){ //need to get the width after it loads
					img.css("left", -(this.width / 2) + 8 + eventobj.adj_x);
				})
				.on("vclick", function(){
					console.log("Click Event!", isDragging);
					if (!isDragging)
						eventobj.doClick();
				});
			if (this.adj_flip) img.addClass("flip-x");
			return img;
		},
		
		_createReflection : function() {
			var eventobj = this;
			
			var base = $("<div>").addClass("event-reflection");
			var img = $("<img>").attr("src", this.sprite)
				.css({
					top : 16 + this.z + this.adj_y + this.refl_adj_y,
				})
				.on("load", function(){ //need to get the width after it loads
					img.css("left", -(this.width / 2) + 8 + eventobj.adj_x + eventobj.refl_adj_x);
				});
			
			// img = this._applySpriteAnimation(img);
			img.addClass("reflection");
			base.append(img);
			return base;
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
		
		forOccasion : function(ocids, overrides) {
			//ocids = "Occasion IDs", the ids being strings, ocids being a comma separate lists of them
			if (!this.occasions) this.occasions = {};
			var _this = this;
			
			ids = ocids.split(/[, ]/);
			
			$.each(ids, function(i, val){
				if (!val) return; //continue
				_this.occasions[val] = overrides;
			});
			return this; //for chaining
		},
		
		applyOccasion : function(ocid) {
			if (!ocid) return;
			if (!this.occasions) return;
			
			var overrides = this.occasions[ocid];
			if (!overrides) return;
			
			$.extend(this, overrides);
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
		
		breakme: false, //if we want to break the subevents off on their own
		
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
			event.parent = this;
			event.behavior = null; //disable any behavior
			this.subevents.push(event);
			
			return this; //for chaining
		},
		
		getDomElement : function() {
			if (this.domElement) return this.domElement;
			if (!this.sprite) return null; //ignore unrepresented events
			
			var eventobj = this;
			var mapid = ++imgmapID;
			
			var base = $("<div>").addClass("event-base").attr("name", this.name);
			var img = $("<img>").attr("src", this.sprite).addClass("main")
				.css({
					bottom : this.z - this.adj_y,
				})
				.on("load", function(){ //need to get the width after it loads
					img.css("left", -(this.width / 2) + 8 + eventobj.adj_x);
				}).attr("usemap", "#multi"+mapid);
			
			if (this.adj_flip) 
				console.warn("Cannot flip multievent!", this.name);
			
			var map = $("<map>").attr("name", "multi"+mapid);
			
			for (var i = 0; i < this.subevents.length; i++) {
				var evt = this.subevents[i];
				
				$("<area>").attr({
					"shape" : evt["_subinfo"].polytype,
					"coords" : evt["_subinfo"].coords,
					// "title" : evt.name,
				}).on("vclick", {"evt" : evt}, function(e){
					console.log("Click MultiEvent!", isDragging);
					if (!isDragging)
						e.data.evt.doClick();
				}).appendTo(map);
			}
			
			base.append(img).append(map);
			
			this._storeElement(base);
			if (this.reflection) {
				var refl = this._createReflection();
				if (refl) return $([base[0], refl[0]]);
			}
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
				.on("vclick", function(){
					console.log("Click building!", isDragging);
					if (!isDragging)
						eventobj.doClick();
				});
			if (this.adj_flip) img.addClass("flip-x"); //may cause undesired warp misalignment
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
		behavArg : null,
		frame_width : 16,
		frame_height : 22,
		
		dialog : null, //an array
		dialog_assignment : "random",
		dialog_look: true,
		
		domImage : null,
		
		updateImage : function() {
			var x = -this.direction * this.frame_width;
			var y = -this.animFrame * this.frame_height;
			
			this.domImage.css({
				"background-position" : x+"px "+y+"px",
			});
		},
		
		getDomElement : function() {
			if (this.domElement) return this.domElement;
			if (!this.spritesheet) return null; //ignore unrepresented events
			
			var eventobj = this;
			
			var base = $("<div>").addClass("event-base").attr("name", this.name);
			var img = $("<div>").attr("src", this.sprite).addClass("main person")
				.css({
					"background-image": "url("+this.spritesheet+")",
					width : this.frame_width,
					height : this.frame_height,
					bottom: this.z - this.adj_y,
					left: this.adj_x,
				})
				.on("vclick", function(e){
					console.log("Click person!", isDragging);
					if (!isDragging)
						eventobj.doClick(e);
				});
			if (this.adj_flip) img.addClass("flip-x"); //moon walking?!
			base.append(img);
			
			this.domImage = img;
			this._storeElement(base);
			return base;
		},
		
		doClick : function() {
			var timeout = 4800;
			
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
				} else if ($.isFunction(this.dialog)) {
					text = this.dialog();
					if (!text) return false;
				} else { return false; }
				
				//time out based on text length
				timeout = Math.max(4800, text.length * 80);
				
				showDialog(text, this.getPosition(), timeout);
				
				//turn character to camera
				if (this.dialog_look) this.direction = 0;
				this.actTimer = Math.ceil((timeout+200)/500);
				this.updateImage();
			}
			
			if (this.openCard)
				this.openCard();
		},
		
		getPosition : function() {
			return this.domElement.position();
		},
	});
	window.Person = Person;
	
	
	//Define some behavior functions for people
	var b = window.behavior;
	
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
		this.actTimer--;
		if (this.actTimer > 0) return; //do nothing this time
		
		if (!this.behavArg 
		|| !this.behavArg["top"] === undefined || !this.behavArg["left"] === undefined 
		|| !this.behavArg["bottom"] === undefined || !this.behavArg["right"] === undefined) 
		{
			console.error("No or invalid arguments given to behavior function!");
			this.actTimer = 10000;
			return;
		}
		
		if (this._d_x !== undefined) return; //still animating, let be
		
		var dirChoice = Math.floor(Math.random()*8);
		
		if (dirChoice < 4) { //face direction
			this.direction = dirChoice;
			this.updateImage();
			
		} else { //walk!
			var evtobj = this;
			var arg = this.behavArg;
			
			this.direction = dirChoice-4;
			var _x = this.x;
			var _y = this.y;
			
			switch(dirChoice-4) {
				case 0: _y++; break; //down
				case 1: _y--; break; //up
				case 2: _x--; break; //left
				case 3: _x++; break; //right
			}
			
			//if avoid argument, do aversion calculation
			var collides = false;
			if (this.behavArg.avoidEvent) {
				var other = $(".event-base[name='"+arg.avoidEvent+"']");
				if (other.length > 0) {
					collides = (other.data("event").x == _x 
							&&  other.data("event").y == _y)
							|| (other.data("event")._d_x == _x 
							&&  other.data("event")._d_y == _y);
					// console.log("Other event collides: ", 
					// 	other.data("event").x == _x,
					// 	other.data("event").y == _y, "|",
					// 	other.data("event")._d_x == _x,
					// 	other.data("event")._d_y == _y, "=",
					// 	collides, other);
				}
			}
			
			// console.log("next: "+_x+", "+_y+" ==> "
			// 	+arg.left+" =? "+(_x >= arg.left)+" "
			// 	+arg.right+" =? "+(_x <= arg.right)+" "
			// 	+arg.top+" =? "+(_y >= arg.top)+" "
			// 	+arg.bottom+" =? "+(_y <= arg.bottom));
			
			if (_x >= arg.left && _x <= arg.right
			&& _y >= arg.top && _y <= arg.bottom
			&& !collides)
			{
				var speed = arg.speed || 500;
				var progress = arg.progressFn ||
				function(_p, progress) {
					var newFrame;
					if (progress < 0.30) {
						newFrame = 1;
					} else if (progress < 0.60) {
						newFrame = 0;
					} else if (progress < 0.90) {
						newFrame = 2;
					} else {
						newFrame = 0;
					}
					
					if (newFrame != evtobj.animFrame) {
						evtobj.animFrame = newFrame;
						evtobj.updateImage();
					}
				};
				
				this._d_x = _x;
				this._d_y = _y;
				$(this.domElement).animate({
					left : _x * 16,
					top : _y * 16,
					"z-index" : ZBASE + _y,
				}, {
					duration: speed,
					easing: "linear",
					progress : progress,
					complete : function(){
						evtobj.x = _x;
						evtobj.y = _y;
						evtobj._d_x = evtobj._d_y = undefined;
					}
				})
			}
			this.updateImage();
		}
		
		//reset action timer
		this.actTimer = Math.floor(Math.random() * 2)+4;
	};
	
	b.movePath = function(){
		if (this.actTimer < 0) return; //disabled
		
		if (!this.behavArg 
		|| !this.behavArg["path"] === undefined
		|| this.behavArg["path"].length/2 != Math.floor(this.behavArg["path"].length/2) ) 
		{
			console.error("No or invalid arguments given to behavior function!");
			this.actTimer = -1;
			return;
		}
		
		if (this._d_x !== undefined) return; //still animating along path, let be
		
		//actTimer stores our current index into our pathing array, starts at 0
		var path = this.behavArg.path;
		var dest_x = path[this.actTimer*2];
		var dest_y = path[this.actTimer*2+1];
		
		var _y = this.y;
		var _x = this.x;
		
		var movespeed = (this.behavArg.run)? 2 : 1;
		
		if (dest_x == _x && dest_y == _y) {
			//move to next path point
			this.actTimer++;
			if (this.actTimer*2 >= path.length) this.actTimer = 0; //cycle
			
			dest_x = path[this.actTimer*2];
			dest_y = path[this.actTimer*2+1];
		}
		
		//set direction based on movement, default left-right
		var dir = this.direction;
		
		if (dest_x < _x)		{ _x -= movespeed; dir = 2; }
		else if (dest_x > _x)	{ _x += movespeed; dir = 3; }
		if (dest_y < _y)		{ _y -= movespeed; dir = 1; }
		else if (dest_y > _y)	{ _y += movespeed; dir = 0; }
		
		this.direction = dir;
		
		var evtobj = this;
		
		this._d_x = _x;
		this._d_y = _y;
		$(this.domElement).animate({
			left : _x * 16,
			top : _y * 16,
			"z-index" : ZBASE + _y,
		}, {
			duration: 480,
			easing: "linear",
			progress : function(_p, progress) {
				var newFrame;
				if (progress < 0.30) {
					newFrame = 1;
				} else if (progress < 0.60) {
					newFrame = 0;
				} else if (progress < 0.90) {
					newFrame = 2;
				} else {
					newFrame = 0;
				}
				
				if (newFrame != evtobj.animFrame) {
					evtobj.animFrame = newFrame;
					evtobj.updateImage();
				}
			},
			complete : function(){
				evtobj.x = _x;
				evtobj.y = _y;
				evtobj._d_x = evtobj._d_y = undefined;
			}
		})
		
		//finally, ledging
		if (this.behavArg.ledges) {
			if ($(this.domElement).find(".shadow").length == 0) {
				this.shadow = "img/pkmn/generic-shadow.png";
				this._applyShadow(this.domElement);
				$(this.domElement).find(".shadow").css("bottom", "-4").hide();
			}
			
			var jump = false;
			for (var i = 0; i < this.behavArg.ledges.length; i+=2){
				if (this.x == this.behavArg.ledges[i] 
				&& this.y == this.behavArg.ledges[i+1]
				&& this.direction == 0)
					jump = true;
			}
			
			if (jump) {
				var shadow = $(this.domElement).find(".shadow");
				shadow.show();
				
				$(this.domElement).find(".main")
				.animate({ bottom : 14 }, { duration: 180 })
				.animate({ bottom :  0 }, { duration: 300, 
					complete: function(){
						shadow.hide();
					},
				});
			}
		}
	};
})();

(function(){
	function Trainer(opts) {
		if (!(this instanceof Trainer))
			return new Trainer(opts);
		
		Person.call(this, opts);
		
		if (!this.sources)
			console.warn("Trainer", this.name, "has no sources defined!");
	}
	
	Trainer.fn = Trainer.prototype = new Person({
		name : "<Trainer>",
		nickname : "",
		
		dex : null,
		
		sources : null,
		
		playtime : "",
		pokedex : "",
		releasecount : 0,
		idnum : "00000",
		
		info_html : null,
		badge_html : null,
		icons: null, //array of up to 6 images!
		
		// doClick : function(){
		// 	console.log("Trainer Card screen! ==> "+this.name);
		// 	this.openCard();
		// },
		
		openCard : function() {
			infodex.displayTrainer(this);
			
			$("#trainer-card .front .name").html(this.name);
			$("#trainer-card .back .name").html(this.nickname);
			$("#trainer-card .idno").html(this.idnum);
			$("#trainer-card .playtime").html(this.playtime);
			$("#trainer-card .pkdex").html(this.pokedex);
			$("#trainer-card .release").html(this.releasecount);
			$("#trainer-card .sprite img").attr("src", this.dex);
			
			$("#trainer-card .info").html(this.info_html);
			
			if (this.icons) {
				for (var i = 0; i < 6; i++) {
					var icon = this.icons[i];
					$("#trainer-card .icons .item"+(i+1)+" img").attr("src", icon);
				}
			} else {
				$("#trainer-card .icons img").attr("src", null);
			}
			
			$("#trainer-card .badges").html(this.badge_html);
			
			$("#trainer-card a").attr("target", "_blank");
			$("#trainer-card").show();
			
			displaySources("trainer", this.sources);
		},
	});
	
	window.Trainer = Trainer;
})();


(function(){
	function Pokemon(opts) {
		if (!(this instanceof Pokemon))
			return new Pokemon(opts);
		
		Event.call(this, opts);
		if (!this.sources)
			console.warn("Trainer", this.name, "has no sources defined!");
	}
	
	Pokemon.fn = Pokemon.prototype = new Event({
		name : "<Pokemon>",
		animation : "breathe",
		z : 3,
		
		dex : null,
		// dexsource : null,
		// spritesource : null,
		
		sources : null,
		lore_html: null,
		
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
			infodex.displayPokemon(this);
			/*
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
				if (!this.sources) this.sources = {};
				
				if (this.dexsource) {
					console.log("outdated dex source method!");
					this.sources["Pokedex Image"] = this.dexsource;
				}
				if (this.spritesource) {
					console.log("outdated sprite source method!");
					this.sources["Sprite Source"] = this.spritesource;
				}
				
				displaySources("pkmn", this.sources);
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
			
			$("#status-screen a").attr("target", "_blank");
			// positionStatusScreenRelTo(this);
			$("#status-screen").show();
			*/
		},
	});
	
	window.Pokemon = Pokemon;
})();

(function(){
	//An amalgum of Pokemon and Person
	function MovingPokemon(opts){
		if (!(this instanceof MovingPokemon))
			return new MovingPokemon(opts);
		
		Pokemon.call(this, opts);
	}
	
	MovingPokemon.fn = MovingPokemon.prototype = new Pokemon({
		name : "<Moving Pokemon>",
		
		direction : 0, //0 = down, 1 = up, 2 = left, 3 = right
		animFrame : 0,
		actTimer : 0, //action count down, used variously by behaviors
		behavArg : null,
		frame_width : 16,
		frame_height : 22,
		
		// dialog : null, //an array
		// dialog_assignment : "random",
		
		domImage : null,
		
		updateImage : Person.fn.updateImage,
		getDomElement : Person.fn.getDomElement,
	});
	
	window.MovingPokemon = MovingPokemon;
})();

(function(){
	function WarpTile(opts){
		if (!(this instanceof WarpTile))
			return new WarpTile(opts);
		
		Event.call(this, opts);
	}
	
	WarpTile.fn = WarpTile.prototype = new Event({
		name : "<Warp Tile>",
		sprite: 1, //we supply the sprite
		
		warp_to_x: 8,
		warp_to_y: 8,
		preload : 1,
		
		_createImageTag : function() {
			var eventobj = this;
			
			var img = $("<img>").attr("src", "img/bld/warp.png").addClass("main warp")
				.css({
					bottom : 0,
					left: 0,
				})
				.on("vclick", function(e){
					console.log("Click sign!", isDragging);
					if (!isDragging)
						eventobj.doClick(e);
				});
			return img;
		},
		
		doClick: function(){
			if (this.preload) {
				preloadArea({
					top: Math.floor((this.warp_to_y - this.preload)/16),
					bottom: Math.ceil((this.warp_to_y + this.preload)/16),
					left: Math.floor((this.warp_to_x - this.preload)/16),
					right: Math.ceil((this.warp_to_x + this.preload)/16),
				})
			}
			centerOnTile(this.warp_to_x, this.warp_to_y, true);
		}
	});
	window.WarpTile = WarpTile;
})();

(function(){
	function SignPost(opts){
		if (!(this instanceof SignPost))
			return new SignPost(opts);
		
		Event.call(this, opts);
	}
	
	SignPost.fn = SignPost.prototype = new Event({
		name : "<SignPost>",
		sprite: 1, //we supply the sprite
		
		message : "<strong>Welcome to TPP Park!</strong><br/>The Lands where Voices Whisper",
		
		_createImageTag : function() {
			var eventobj = this;
			
			var img = $("<div>").attr("src", this.sprite).addClass("main sign")
				.css({
					"background-image": "url(img/bld/sign.png)",
					"background-position": "-"+((this.sprite-1)*16)+"px 0px",
					position: "absolute",
					bottom: 0, left: 0,
					width : 16, height : 24,
				})
				.on("vclick", function(e){
					console.log("Click sign!", isDragging);
					if (!isDragging)
						eventobj.doClick(e);
				});
			return img;
		},
		
		doClick: function(){
			//time out based on text length
			timeout = Math.max(4800, this.message.length * 80);
			
			showDialog(this.message, this.domElement.position(), timeout);
		},
	});
	window.SignPost = SignPost;
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
	
	
	function Pokerus_Ribbon() {
		if (!(this instanceof Pokerus_Ribbon))
			return new Pokerus_Ribbon();
		
		Ribbon.call(this, {});
	}
	Pokerus_Ribbon.fn = Pokerus_Ribbon.prototype = new Ribbon({
		cssclass : "rb-pokerus",
		name : "Infected",
		desc : "Caught the Pokérus virus",
	});
	window.Pokerus_Ribbon = Pokerus_Ribbon;
	
	function Master_Ribbon() {
		if (!(this instanceof Master_Ribbon))
			return new Master_Ribbon();
		
		Ribbon.call(this, {});
	}
	Master_Ribbon.fn = Master_Ribbon.prototype = new Ribbon({
		cssclass : "rb-master",
		name : "Master of Class",
		desc : "Honored by the Master Ball",
	});
	window.Master_Ribbon = Master_Ribbon;
	
})();

////////////////////////////
// Occasions!
////////////////////////////

//TODO