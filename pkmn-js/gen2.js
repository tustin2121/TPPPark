// gen2.js
// File for TPP Crystal events
// 

addEvent(new MultiEvent({
	name : "Battle of Mt Silver",
	sprite: "img/pkmn/MtSilverBattle.gif",
	x : -4, y : -16, z:-6,
	
	reflection: true,
	// refl_adj_y: -12,
	
}).addSubEvent("47,17,75,40", new Pokemon({
	name : "Lord Helix",
	
	dex : "img/pkdx/tpp8_omastar.gif",
	sources : {
		"Pokedex Image by /u/Fiirewaffle" : "http://hamigakimomo.tumblr.com/post/78067393358/ive-updated-omanytes-sprite-to-omastar-i-also",
	},
	
	OT: "Red",
	gamename : "Omastar",
	pokename : "Omastar",
	level : 52,
	memo : "God of the Religion of TPP.",
	caught : "Revived at 11d 10h 35m",
	
	ribbons : [
		new HallOfFame_Ribbon("16d 7h 45m"),
	],	
})).addSubEvent("2,19,33,40", new Pokemon({
	name : "LazorGator",
	
	dex : "img/pkdx/dex_lazorgator.png",
	sources : {
		"Pokedex Image by /u/Aleksandair" : "http://www.reddit.com/r/twitchplayspokemon/comments/20iaxx/i_made_it_anybody_want_to_use_these_sprites/",
	},
	
	OT: "AJDNNW",
	gender : 1,
	gamename : "AAAAAtttta",
	pokename : "Feraligatr",
	level : 84,
	nicknames : "General Gator",
	memo : "Knew Leer early on, which looked like laser beams.",
	
	ribbons : [
		new Starter_Ribbon(),
		new HallOfFame_Ribbon("9d 21h 24m"),
	],	
})).addSubEvent("13,3,28,19", new Pokemon({
	name : "Omelette",
	
	dex: "img/pkdx/dex_omelette.png",
	sources : {
		"Pokedex Image by /u/carlotta4th" : "http://www.reddit.com/r/twitchplayspokemon/comments/252a2b/tpp_sprites/",
	},
	
	OT: "AJDNNW",
	gender : 1,
	gamename : "Togepi",
	pokename : "Togepi",
	level : 12,
	nicknames : "Prince Omelette",
	memo : "Once used Sacred Fire via Metronome.",
	
	ribbons : [
		new Released_Ribbon("3d 15h 24m"),
	],	
}))
);

addEvent(new MultiEvent({
	name: "Dragonslayer Battle",
	sprite: "img/pkmn/atv_katie_battle.gif",
	x: 30, y: 20,
}).addSubEvent("0,8,39,37", new Pokemon({
	name : "ATV",
	
	dex : "img/pkdx/tpp2_atv.gif",
	sources : {
		"Pokedex Image by /u/Fiirewaffle" : "http://hamigakimomo.tumblr.com/post/77911455524/i-decided-to-make-custom-r-b-sprites-for-the",
	},
		
	OT: "Red",
	gamename : "AATTVVV",
	pokename : "Venomoth",
	level : 39,
	nicknames : "All-Terrain Venomoth<br/>The Dragonslayer",
	memo : "Once took down Lance's Dragonite singlehandedly.",
	
	ribbons : [
		new HallOfFame_Ribbon("16d 7h 45m"),
	],	
})).addSubEvent("64,1,94,34", new Pokemon({
	name : "Katie",
	
	dex : "img/pkdx/dex_katie.png",
	sources : {
		"Pokedex Image by /u/carlotta4th" : "http://www.reddit.com/r/twitchplayspokemon/comments/252a2b/tpp_sprites/",
	},
		
	OT: "AJDNNW",
	gender: 2,
	gamename : "KT",
	pokename : "Dragonite",
	level : 62,
	memo : "Only girl in the final Hall of Fame party.",
	
	ribbons : [
		new HallOfFame_Ribbon("9d 21h 24m"),
	],	
}))
);

addEvent(new MultiEvent({
	name: "Eeveeloutions of Love",
	sprite: "img/pkmn/buritto_flarion.gif",
	x: 23, y: 38,
}).addSubEvent("0,10,0,26,35,26,35,6,32,7,28,14,20,18,11,11", new Pokemon({
	name: "Flareon",
	
	dex : "img/pkdx/tpp7_flareon.gif",
	sources : {
		"Pokedex Image by /u/Firewaffle" : "http://hamigakimomo.tumblr.com/post/78455477855/finally-did-a-jay-leno-and-cabbage-sprite",
	},
	
	OT: "Red",
	gamename : "Flareon",
	pokename : "Flareon",
	level : 25,
	nicknames: "The False Prophet",
	memo : "Known as the False Prophet for filling a party slot slated for Lapras and evolving neither into Jolteon or Vaporeon.",
	
	ribbons : [
		new Released_Ribbon("5d 17h 47m"),
	],	
})).addSubEvent("0,0,0,9,11,11,19,18,27,13,32,6,35,5,35,0", new Pokemon({
	name: "Burrito",
	
	dex : "img/pkdx/dex_burrito.png",
	sources : {
		"Pokedex Image by /u/Aleksandair" : "http://www.reddit.com/r/twitchplayspokemon/comments/20iaxx/i_made_it_anybody_want_to_use_these_sprites/",
	},
	
	OT: "AJDNNW",
	gender: 1,
	gamename : "AAAS RJ-1",
	pokename : "Espeon",
	level : 54,
	nicknames: "Breakfast Burrito<br/>Bringer of Light",
	memo : "Known for trying to use Attract on everyone",
	
	ribbons : [
		new HallOfFame_Ribbon("9d 21h 24m"),
	],
}))
);


addEvent(new MovingPokemon({
	name : "Brian",
	spritesheet: "img/pkmn/brian_biking.png",
	x: -4, y: 14,
	
	dex : "img/pkdx/dex_brian.png",
	sources : {
		"Pokedex Image by /u/Aleksandair" : "http://www.reddit.com/r/twitchplayspokemon/comments/20iaxx/i_made_it_anybody_want_to_use_these_sprites/",
	},
	
	OT: "AJDNNW",
	gender: 1,
	gamename : "BBBBBD",
	pokename : "Pidgeot",
	level : 64,
	memo : "Lived in the shadow of Bird Jesus",
	
	ribbons : [
		new Daycare_Ribbon("Breakout Fighter"),
		new HallOfFame_Ribbon("9d 21h 24m"),
	],
	
	activeZone: {
		left: -22, right: 0,
		top: 14, bottom: 30,
	},
	
	behavior : behavior.movePath,
	behavArg : {
		run : true,
		path : [
			0,  14,
			0,  30,
			-22, 30,
			-22, 14,
		],
	},
	frame_width : 32,
	frame_height : 26,
}));


addEvent(new Pokemon({
	name : "Solid Snake",
	sprite: 1, //we supply our own complex stuff below
	x: -36, y: 9,
	animation: "custom",
	
	dex : "img/pkdx/dex_solidsnake.png",
	sources : { 
		"Pokedex Image by /u/Aleksandair" : "http://www.reddit.com/r/twitchplayspokemon/comments/20iaxx/i_made_it_anybody_want_to_use_these_sprites/",
	},
	
	OT: "AJDNNW",
	gender: 1,
	gamename : "AAJRR RRR",
	pokename : "Steelix",
	nicknames : "Solid Snake<br/>Metal Gear",
	level : 72,
	memo: "Holds: Leftovers. Excellent Tank vs Mt. Silver.",
	
	ribbons : [
		new HallOfFame_Ribbon("9d 21h 24m"),
	],
	
	actTimer : 10,
	activeZone: {
		left: -40, right: -33,
		top: 5, bottom: 13,
	},
	
	behavior : function(){
		this.actTimer--;
		if (this.actTimer > 0) return; //do nothing this time
		
		var dirChoice = Math.floor(Math.random()*4);
		var evtobj = this;
		
		var arg = this.activeZone;
		var _x = this.x;
		var _y = this.y;
		
		switch(dirChoice) {
			case 0: _y++; break; //down
			case 1: _y--; break; //up
			case 2: _x--; break; //left
			case 3: _x++; break; //right
		}
		
		if (_x >= arg.left && _x <= arg.right
		&& _y >= arg.top && _y <= arg.bottom)
		{
			this.x = _x;
			this.y = _y;
			
			$(this.domElement).css({
				left : _x * 16,
				top : _y * 16,
				"z-index" : ZBASE + _y,
			});
		}
		
		this.actTimer = 10;
	},
	
	doClick : function(e){
		this.actTimer = 10;
		
		this.domPkmn.show().delay(3000).animate({
			bottom: -20, left: 32-25+19,
		}, 1800).fadeOut(100).css({
			bottom: 10, left: 32-25, //reset
		});
		
		this.domExclaim.slideDown(300).delay(1000).fadeOut(1000);
		
		Pokemon.fn.doClick.call(this, e);
	},
	
	domPkmn : null,
	domGrass : null,
	domExclaim : null,
	
	getDomElement : function() {
		if (this.domElement) return this.domElement;
		var eventobj = this;
		
		var base = $("<div>").addClass("event-base").attr("name", this.name);
		
		var clip = $("<div>").css({
			position: "absolute",
			width: 64, height: 64,
			bottom: 0, left: -32+8,
			overflow: "hidden",
		})
		.on("vclick", function(e){
			console.log("Click SNAAAAAKE!!!", isDragging);
			if (!isDragging)
				eventobj.doClick(e);
		});
		
		this.domPkmn = $("<img>").attr("src", "img/pkmn/solid_snake.png")
			.addClass("main pokemon")
			.css({
				bottom: 10, left: 32-25,
			})
			.hide()
			// .on("vclick", function(e){
			// 	console.log("Click SNAAAAAKE!!!", isDragging);
			// 	if (!isDragging)
			// 		eventobj.doClick(e);
			// })
			.appendTo(clip);
		
		this.domGrass = $("<img>").attr("src", "img/pkmn/solid_snake_grass.gif")
			.css({
				position: "absolute",
				bottom: 0, left: 22,
				"z-index": 10,
			})
			// .on("vclick", function(e){
			// 	console.log("Click SNAAAAAKE!!!", isDragging);
			// 	if (!isDragging)
			// 		eventobj.doClick(e);
			// })
			.appendTo(clip);
		
		this.domExclaim = $("<img>").attr("src", "img/pkmn/solid_snake_exclaim.png")
			.css({
				position: "absolute",
				bottom: 34, left: 22,
				"z-index": 10,
			})
			.hide()
			.appendTo(clip);
		
		base.append(clip);
		this._storeElement(base);
		return base;
	},
}));


// Master Goldeen
addEvent(new Pokemon({
	name : "Goldeen",
	sprite: "img/pkmn/goldeen.png",
	x: -27, y: -2,
	
	dex : "http://cdn.bulbagarden.net/upload/4/42/Spr_2c_118.gif",
	sources : {
		"Pokedex Image from Bulbapedia" : "",
	},
	
	OT: "AJDNNW",
	gender: 1,
	gamename : "IAAAJS",
	pokename : "Goldeen",
	nicknames : "The Chosen One",
	level : 22,
	memo : "Caught using the masterball.",
	ball: "master",
	
	ribbons : [
		new Master_Ribbon(),
	],
}));


// The Admiral
addEvent(new Pokemon({
	name : "The Admiral",
	sprite: "img/pkmn/admiral.png",
	x: -20, y: -34,
	
	dex : "img/pkdx/dex_admiral.png",
	sources : {
		"Pokedex Image by /u/Parkmayn" : "http://www.reddit.com/r/twitchplayspokemon/comments/1zczao/i_made_some_lasergator_and_admiral_sentret_sprites/",
	},
	
	OT: "AJDNNW",
	gender: 1,
	gamename : "VV",
	pokename : "Sentret",
	nicknames : "Admiral Vivi",
	level : 7,
	memo : "First pokemon to be released in AJ's journey.",
	
	ribbons : [
		new Released_Ribbon("1d 8h 21m"),
	],
}));


// Oxxy Ozzworm
addEvent(new Pokemon({
	name : "Ozzworm",
	sprite: "img/pkmn/ozzyozworm.png",
	x: 7, y: -35,
	
	dex : "img/pkdx/dex_oxxy.png", //Blubapedia
	sources : {
		"Pokedex Image from /u/Kelcyus's Twitch Pokedex Project" : "http://www.reddit.com/r/twitchplayspokemon/comments/25gcrh/twitch_pokedex_205_entries/",
	},
	
	OT: "AJDNNW",
	gender : 2,
	gamename : "OXXOZZ -:",
	pokename : "Metapod",
	nickname : "Oxxy Ozzworm<br/>Lovebug",
	level : function() {
		//Oxxy left at 3d 18h 37m -- March 6th 18:37 UTC
		var timeSince = (new Date().getTime()) - (new Date(2014, 3, 18, 18, 37).getTime());
		//convert timeSince to seconds, and divide by estimated movement
		var expSince = (timeSince / 1000) * 0.1667; //1 step per 6 seconds, with battling accounting for a lot
		
		// Medium Fast equation: EXP = n^3
		// Considerably easier to solve for N, but for consistancy, stick with Gastly's method
		// Solve for a level and loop until we don't have enough exp to be that level
		
		// Start at level 55, since we know she was that if you pick her up in the save file.
		for (var i = 50; i < 256; i++) { //limit to level 255
			var exp = Math.pow(i, 3);
			if (expSince <= exp) return i-1; //Found a level!
		}
		return "255+";
	},
	memo : "Left at the Johto Daycare at Level 8. Never retrieved.",
	
	ribbons : [
		new Daycare_Ribbon("Forevermore"),
	],
}));
// There's also the zubat left with Oxxy, but no one seems to care about it...

// 
addEvent(new Pokemon({
	name : "AAAAAAAAAA",
	sprite: "img/pkmn/aaaaa_ponyta.gif",
	x: 23, y: 19,
	animation: null,
	
	dex : "img/pkdx/dex_aaaaa.png",
	sources : {
		"Pokedex Image by /u/carlotta4th" : "http://www.reddit.com/r/twitchplayspokemon/comments/252a2b/tpp_sprites/",
	},
	
	OT: "AJDNNW",
	gender: 1,
	gamename : "AAAAAAA",
	pokename : "Ponyta",
	nicknames : "A9",
	level : 32,
	memo : "Always screaming...",
}));



// And finally, AJ and Joey <3
addEvent(new Trainer({
	name : "AJDNNW",
	spritesheet : "img/trainers/aj.png",
	x: 18, y: -1,
	
	dex: "img/pkdx/trainer_aj.png",
	sources: {
		"Trainer Sprite by /u/CyberDork35" : "http://www.reddit.com/r/twitchplayspokemon/comments/230qbl/im_making_custom_twitch_plays_pokemon_trainer/",
	},
	
	nickname : "AJ Downs",
	playtime: "13d 2h 2m",
	pokedex : "32 own/200 seen",
	releasecount : 4,
	idnum : "47901",
	
	info_html : 
		"Number of E4 Attempts: 38<br/>"+
		"Times Blacked Out: 41<br/>"+
		"Boyfriend: Joey<br/>"+
		"<br/>"+
		"",
	icons : [
		"img/icn/slowpoke_search.png",
		"img/icn/expshare.png",
		"img/icn/leftovers.png",
		"img/icn/joey_head.png",
		"img/icn/tiny_mushroom.png",
		"img/icn/slowpoke_tail.png",
	],
	
	badge_html : "",
	
	activeZone: {
		left: 12, right: 18,
		top: -8, bottom: 3,
	},
	
	behavior: behavior.movePath,
	behavArg : {
		path : [
			18,  3,
			12,  3,
			12, -8,
			18, -8,
		],
		ledges : [
			18, -4,
			18,  2,
		],
	},
}));

//And, of course, the love of AJ's life:
addEvent(new Person({
	name: "Joey",
	spritesheet : "img/trainers/joey.png",
	x: 21, y: 0,
	
	smitten : false,
	aj : null,
	domHeart : null,
	
	getDomElement : function(){
		var base = Person.fn.getDomElement.call(this);
		this.aj = $(".event-base[name='AJDNNW']");
		
		this.domHeart = $("<img>").attr("src", "img/trainers/tiny_heart.png")
			.css({
				left : 8-3, bottom : 8,
				"z-index": -100,
			});
		
		base.append(this.domHeart);
		return base;
	},
	
	behavior : function(){
		var ajpos = this.aj.position();
		
		if (ajpos.left < 17 * 16) { //AJ is walking around
			this.smitten = false;
			behavior.look.call(this); //Do normal looking behavior
		} 
		else { //AJ is walking down
			this.smitten = true;
			
			//Follow his walking
			if (ajpos.top < -2 * 16) {
				this.direction = 1;
			} else if (ajpos.top > 1*16) {
				this.direction = 0;
			} else {
				this.direction = 2;
			}
		}
		
		this.updateImage();
		
		// //reset action timer
		// this.actTimer = Math.floor(Math.random() * 2)+4;
	},
	
	dialog : function() {
		if (!this.smitten) {
			switch (Math.floor(Math.random() * 6)) {
				case 0: return "YOUNGSTER JOEY: Check out my awesome RATICATE, Ace!";
				case 1: return "YOUNGSTER JOEY: My RATATTA is in the top percentage of all RATATTAs!";
				case 2: return "YOUNGSTER JOEY: Ace is in the top percentage of all RATICATEs!";
				case 3: return "YOUNGSTER JOEY: Why'd you have to go and box Ace, AJ...?";
				case 4: return "YOUNGSTER JOEY: AJ is in the top percentage of all Trainers in Johto and Kanto, you know. I wish I could be as good as him.";
				case 5: return "YOUNGSTER JOEY: AJ's the only one who's ever exchanged numbers with me. <3";
			}
			
		} else {
			this.domHeart.css({ bottom: 16 }).show()
			.animate({
				bottom: 40,
			}, {
				duration: 1500,
				progress: function(p, n){
					$(this).css({ left: 8 - 3 + Math.cos(n*10) * 4 });
				},
			}).fadeOut(100);
			
			return false;
		}
	},
}));

