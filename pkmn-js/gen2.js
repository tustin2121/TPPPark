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
	memo : "Knew Leer early on, which looked like laser beams. His EXP sponge ways were the cause of the first Gator Wars, in which Omelette died. Defeated Lance in a clutch victory, and went on to take down Red atop Mt. Silver",
	
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
	memo : "Once used Sacred Fire via Metronome. Was released in the first Gator Wars, which soon brought about the end of the wars.",
	
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
	memo : "Once took down Lance's Dragonite singlehandedly; due to a bug in the enemy AI, the enemy Dragonite never attacked ATV.",
	
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
	name: "Burrito Writes Fanfiction!",
	sprite: "img/pkmn/burrito_fanfic.gif",
	x: 39, y: 29, z:-32
}).addSubEvent("0,9,20,42", new Pokemon({
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
	nicknames: "Breakfast Burrito, Bringer of Light",
	memo : "Known for trying to use Attract on everyone. He's writing fanfiction right now.",
	
	ribbons : [
		new HallOfFame_Ribbon("9d 21h 24m"),
	],
})).addSubEvent("21,13,36,35", new Event({
	name: "Burrito's Computer",
	
	doClick: function(){
		if (loadBurritoStory) {
			loadBurritoStory();
		}
	},
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
	memo : "Lived in the shadow of Bird Jesus, but eventually came into his own.",
	
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
}).forOccasion("bloodysunday", {
	x: 9, y: -7,
	
	behavior: function(){
		this.direction = 2;
		this.updateImage();
	},
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
	nicknames : "Solid Snake, Metal Gear",
	level : 72,
	memo: "Holds: Leftovers. Excellent Tank vs Mt. Silver. Was evolved from an Onix on level up due to the Crystal ROM Hack we were playing that changed trade evolutions into level up evolutions.",
	
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
			.appendTo(clip);
		
		this.domGrass = $("<img>").attr("src", "img/pkmn/solid_snake_grass.gif")
			.css({
				position: "absolute",
				bottom: 0, left: 22,
				"z-index": 10,
			})
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
	
	dex : "img/pkdx/b/Spr_2c_118.gif",
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
	nickname : "Oxxy Ozzworm, Lovebug",
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

//ACE!!
addEvent(new Pokemon({
	name : "Ace",
	sprite: "img/pkmn/ace_raticate.png",
	x: 23, y: 0,
	
	dex : "img/pkdx/b/Spr_2c_020.gif",
	sources : {
		"Pokedex Image from Bulbapedia" : "",
	},
	
	OT: "AJDNNW",
	gender: 1,
	gamename : "A",
	pokename : "Raticate",
	nicknames : "A Rat",
	level :39,
	memo: "Said to be Joey's Rattata given to AJ and evolved."
	
}).forOccasion("bloodysaturday", {
	x: 12, y: -41,
	adj_flip: true,
}).forOccasion("bloodysunday", {
	x: -19, y: -10,
	adj_flip: true,
}));

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


addEvent(new Pokemon({
	name : "--",
	sprite: "img/pkmn/shiny-gyrados.gif",
	x: -44, y: -5,
	animation: null,
	
	dex : "img/pkdx/b/Spr_2c_130_s.gif",
	sources : {
		"Pokemon Sprite by /u/carlotta4th" : "",
	},
	
	OT: "--",
	gender: 1,
	gamename : "Gyarados",
	pokename : "Gyarados",
	level : 30,
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
	
	idnum : "47901",
	nickname : "AJ Downs",
	playtime: "13d 2h 2m",
	pokedex : "32 own / 200 seen",
	releasecount : 4,
	catchcount : 0,
	e4attempts : 38,
	blackouts : 41,
	
	personality: "Thought of as the youngest of our protagonists. He's a bit of a mommy's boy. He loves getting calls from Joey, and loves being with Joey.",
	notable: "Boyfriend: Joey",
	ribbons: [
	],
	
	// info_html : 
	// 	"Number of E4 Attempts: 38<br/>"+
	// 	"Times Blacked Out: 41<br/>"+
	// 	"Boyfriend: Joey<br/>"+
	// 	"<br/>"+
	// 	"",
	icons : [
		new Icon("slowpoke_search.png", "<b>Slowpoke</b> was always there in the Pokedex, where we'd spend our time searching for type combinations or names that didn't exist."),
		new Icon("expshare.png", "Our use of the <b>Exp Share</b> allowed our team to become balanced one again after LazorGator hogged a lot of Exp."),
		new Icon("leftovers.png", "The <b>Leftovers</b> which we gave to Solid Snake allowed him to tank our way to the top of Mt. Silver to bear Red."),
		new Icon("joey_head.png", "<b>Joey</b> is the chat's favorite trainer. His calls always lightened the mood. When we beat Red, we went back to fight Joey one last time."),
		new Icon("tiny_mushroom.png", "The trip through Telefang after our journey through Johto may or may not have been a <b>Tiny Mushroom</b> induced dream of Joey's..."),
		new Icon("slowpoke_tail.png", "We purchased a <b>Slowpoke Tail</b> with the last of our money, and it spent the rest of the game changing hands in our party."),
	],
	
	badges_info : {
		img: "img/icn/badges_crystal.png",
		frame_width: 26,
		frame_height: 26,
	},
	badges : [
		new Badge({ name: "Zephyr Badge", leader: "Falkner", type: "Flying" }),
		new Badge({ name: "Hive Badge", leader: "Bugsy", type: "Bug" }),
		new Badge({ name: "Plain Badge", leader: "Whitney", type: "Normal" }),
		new Badge({ name: "Fog Badge", leader: "Morty", type: "Ghost" }),
		new Badge({ name: "Storm Badge", leader: "Chuck", type: "Fighting" }),
		new Badge({ name: "Mineral Badge", leader: "Jasmine", type: "Steel" }),
		new Badge({ name: "Glacier Badge", leader: "Pryce", type: "Ice" }),
		new Badge({ name: "Rising Badge", leader: "Clair", type: "Dragon" }),
		
		new Badge({ name: "Boulder Badge", leader: "Brock", type: "Rock" }),
		new Badge({ name: "Cascade Badge", leader: "Misty", type: "Water" }),
		new Badge({ name: "Thunder Badge", leader: "Lt. Surge", type: "Electric" }),
		new Badge({ name: "Rainbow Badge", leader: "Erika", type: "Grass" }),
		new Badge({ name: "Soul Badge", leader: "Janine", type: "Poison" }),
		new Badge({ name: "Marsh Badge", leader: "Sabrina", type: "Psychic" }),
		new Badge({ name: "Volcano Badge", leader: "Blaine", type: "Fire" }),
		new Badge({ name: "Earth Badge", leader: "Blue", type: "No" }),
	],
	
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
}).forOccasion("bloodysaturday", {
	x: 7, y:-40,
	adj_y: 2,
	behavior: function(){
		this.direction = 3;
		this.updateImage();
	},
	
	dialog_look: false,
	dialog_assignment: "random",
	dialog: [
		"One second, Joey, I'm still tying this thing...",
		"Stay, you stupid banner... where's LazorGator to weld this thing...?",
		"Just hang tight Joey, I've almost got this!",
		"There it's-- no it's not... I should have taken scout lessons when mommy suggested it...",
		"I know you're afraid of heights Joey, just give me a little longer!",
	],
}).forOccasion("bloodysunday", {
	x: -19, y:-8,
	behavior: function(){
		this.direction = 3;
		this.updateImage();
	},
	
	dialog_look: false,
	dialog_assignment: "random",
	dialog: [
		"...",
		"... Omlette...",
		".....",
		"....Admiral......",
		"......",
		"....",
	],
}));

//And, of course, the love of AJ's life:
addEvent(new Person({
	name: "Joey",
	spritesheet : "img/trainers/joey.png",
	x: 21, y: 0,
	
	infodex_entry: new InfodexEntry({
		title: "Love Interest",
		sprite: "img/pkdx/b/Spr_HGSS_Youngster.png",
		html: "<h1>The Chat's First Love</h1><p>Though many players of Crystal hate Joey and his constant calling and constant talking about his Ratatta, the chat fell in love with him. Any time he would call, the chat would explode with heart emoticons and proposals to do things to Joey that are best left unsaid.</p><p>Granted, Joey, and in fact, anyone who called during TPP Crystal, was still annoying: they always seemed to call on the hour, and the other thing that happened on the hour was Democracy mode. So often times, Democracy mode was just starting and someone like Joey would call interrupt Democracy's plan, often falling back to Anarchy due to a vote split.</p><p>These occurrences also lead many to believe that AJ loved Joey, because he would always stop for his calls, and his calls allowed a brief respite from the constant commands of the voices. After the events atop Mt. Silver, AJ went back to Joey for one last battle, and after that last battle, after the TPP Crystal stream came to a close, the lore states that AJ and Joey lived the rest of their lives together, as close friends at first, but as lovers when they came to adulthood.</p>",
	}),
	
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
			switch (Math.floor(Math.random() * 7)) {
				case 0: return "YOUNGSTER JOEY: Check out my awesome RATICATE, Ace!";
				case 1: return "YOUNGSTER JOEY: My RATTATA is in the top percentage of all RATTATAs!";
				case 2: return "YOUNGSTER JOEY: Ace is in the top percentage of all RATICATEs!";
				case 3: return "YOUNGSTER JOEY: Why'd you have to go and box Ace, AJ...?";
				case 4: return "YOUNGSTER JOEY: AJ is in the top percentage of all Trainers in Johto and Kanto, you know. I wish I could be as good as him.";
				case 5: return "YOUNGSTER JOEY: AJ's the only one who's ever exchanged numbers with me. <3";
				case 6: return "YOUNGSTER JOEY: Being beaten this often actually feels good now!";
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
}).forOccasion("bloodysaturday", {
	x: 14, y: -40,
	adj_y: 2,
	behavior: function(){
		this.direction = 2;
		this.updateImage();
	},
	
	dialog_look: false,
	dialog_assignment: "random",
	dialog: [
		"You got it over there AJ?", 
		"It's tied up over here!", 
		"I don't think I'm ready for the other banner yet!",
		"I'm scared, AJ... I hate heights...",
	],
}).forOccasion("bloodysunday", {
	x: -19, y:-9,
	behavior: function(){
		this.actTimer--;
		this.direction = (this.actTimer>0)? 0 : 3;
		this.updateImage();
	},
	
	dialog_assignment: "random",
	dialog: [
		"Don't cry, AJ... You'll make me cry...",
		"AJ.... *sniff*",
		"It'll be okay, AJ...",
		":'(",
		"*sniffle*",
		"Do you need a hug, AJ?",
	],
}));

