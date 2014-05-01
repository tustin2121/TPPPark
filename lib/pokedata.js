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
			var base = $("<div>").addClass("event-base");
			var img = $("<img>").attr("src", this.img).addClass("main")
				.css({
					bottom : this.z,
				})
				.on("load", function(){ //need to get the width after it loads
					img.css("left", -(this.width / 2) + 8);
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
	};
	
	window.Event = Event;
})();

(function(){
	function Building(opts) {
		if (!(this instanceof Event))
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
		if (!(this instanceof Event))
			return new Pokemon(opts);
		
		Event.call(this, opts);
	}
	
	Pokemon.fn = Pokemon.prototype = new Event({
		name : "<Pokemon>",
		fullname : "",
		OT : "<OT>", //original trainer
		ribbons : null,
		breathe : true,
	});
	
	
	
	window.Pokemon = Pokemon;
})();


