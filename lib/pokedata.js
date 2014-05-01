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
		
		img : null,
		shadowimg : null,
		
		toString : function(){ return "["+this.name+"]"; },
		
		getDomElement : function() {
			var base = $("<div>").addClass("event-base");
			var img = $("<img>").attr("src", this.img)
				.css({
					bottom : this.z,
				})
				.on("load", function(){ //need to get the width after it loads
					img.css("left", -(this.width / 2) + 8);
				});
			base.append(img);
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
		ot : "<OT>", //original trainer
	});
	
	window.Pokemon = Pokemon;
})();


