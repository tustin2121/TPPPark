// community.js
// For the definitions of the community center buildings
// For the definitions of the people, see _usernames.js
//

(function(){
	var COMMUNITY_SPRITES = {
		"main" : { author: "carlotta4th", filename: "img/community/xxxxx.png", },
		"l4zy" : { author: "l4zyhero", filename: "img/community/xxxxx.png", },
	};
	
	
	function TPPer(opts){
		if (!(this instanceof TPPer))
			return new TPPer(opts);
		
		Person.call(this, opts);
	}
	TPPer.fn = TPPer.prototype = new Person({
		name: "<TPPer>", //common name
		name_twitch: "--",
		name_reddit: "--", //prepend /u/
		title: "", //put into quotes
		role: "",
		description: "",
		
		nomination: "", //nomination html?
		
		icon : null,
		spritesheet: null, //spritesheet id -> COMMUNITY_SPRITES
		sprite: 0, //index into the sprite sheet
		
		
		
		dialog: null,
		
		getDomElement : function() {
			if (this.domElement) return this.domElement;
			if (!this.spritesheet) return null;
			
			var eventobj = this;
			
			var base = $("<div>").addClass("event-base").attr("name", this.name);
			var img = this._createImageTag();
			if (this.adj_flip) img.addClass("flip-x"); //moon walking?!
			base.append(img);
			
			this.domImage = img;
			this._storeElement(base);
			return base;
		},
		
		_createImageTag : function() {
			var eventobj = this;
			
			var spritesheet = COMMUNITY_SPRITES[this.spritesheet];
			this.frame_width = spritesheet.frame_width || 16;
			this.frame_height= spritesheet.frame_height|| 22;
			
			
			var img = $("<div>").addClass("main person")
				.css({
					"background-image": "url("+spritesheet.filename+")",
					width : this.frame_width,
					height : this.frame_height,
					bottom: this.z - this.adj_y,
					left: this.adj_x,
				})
				.on("vclick", function(e){
					console.log("Click community member!", isDragging);
					if (!isDragging)
						eventobj.doClick(e);
				});
			
			return img;
		},
		
		updateImage : function() {
			var x = -this.direction * this.frame_width;
			var y = -this.sprite * this.frame_height;
			
			this.domImage.css({
				"background-position" : x+"px "+y+"px",
			});
		},
		
		openCard : function() {
			//Open the Community Member Card
		},
	});
	
	window.TPPer = TPPer;
})();