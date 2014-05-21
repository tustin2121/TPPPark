// gen4.js
// File for TPP Platinum events
// - or -
// HOW THE HELL DO I CODE NAMES WITH FREAKING UMBRELLAS IN THEM?!?! O_o
//

// Released Pokemon: Their stories are finished, they can enter the Park

addEvent(new Pokemon({
	name : "Oreo",
	sprite: "img/pkmn/bidoof-oreo.png",
	x: 14, y: -29,
	
	dex : "http://cdn.bulbagarden.net/upload/a/ae/Spr_4p_399_f.png",
	sources : {
		"Pokedex Image from Bulbapedia" : "",
		"Sprite is Flair by /u/RT-Pickred": "",
	},
	
	OT: "nqpppnl",
	gender: 2,
	gamename : "1 OORROOOO",
	pokename : "Bidoof",
	level : 15,
	// memo : "",
	
	ribbons : [
		new Released_Ribbon("0d 5h 34m"),
		new Record_Ribbon("Fastest Release"),
	],
}));

//
// Note: Chimchar is attached to the Released Starter Campfire multi-event 
// defined in the "other" events file. See there for her event definition.
//

addEvent(new Pokemon({
	name : "Bidoof",
	// sprite: "img/pkmn/bidoof.png",
	x: 7, y: -24,
	
	dex : "http://cdn.bulbagarden.net/upload/f/f2/Spr_4p_399_m.png",
	sources : {
		"Pokedex Image from Bulbapedia" : "",
	},
	
	OT: "nqpppnl",
	gender: 1,
	gamename : "nppmwB9◊Im",
	pokename : "Bidoof",
	nicknames : "",
	// level : 5,
	// memo : "",
	
	ribbons : [
		new Pokerus_Ribbon(),
		new Released_Ribbon("8d 14h 35m"),
	],
}));

addEvent(new Pokemon({
	name : "Baby Bidoof",
	// sprite: "img/pkmn/bidoof.png",
	x: 7, y: -24,
	
	dex : "http://cdn.bulbagarden.net/upload/f/f2/Spr_4p_399_m.png",
	sources : {
		"Pokedex Image from Bulbapedia" : "",
	},
	
	OT: "nqpppnl",
	gender: 1,
	gamename : "???",
	pokename : "Bidoof",
	nicknames : "",
	level : 1,
	memo : "Child of a Daycare one-night stand between Solareon and Agent 006. Has Solareon's Rock Smash.",
	
	ribbons : [
		new Daycare_Ribbon("Born"),
	],
}));

addEvent(new Pokemon({
	name: "Geodude",
	sprite: "img/pkmn/shiny-geodude.gif",
	x: -43, y: -10,
	
	dex: "http://cdn.bulbagarden.net/upload/b/b0/Spr_4p_074_s.png", //Bulbapedia
	sources : {
		"Pokedex Image from Bulbapedia" : "",
	},
	
	OT: "--",
	gamename: "--",
	pokename: "Geodude",
	caught: "Encountered by nqpppnl.",
	level: 20,
	memo: "TPP's third random shiny, killed in battle.",
}));


// Master Geodude
addEvent(new Pokemon({
	name : "Geodude",
	sprite: "img/pkmn/master-geodude.png",
	x: -30, y: -10,
	
	dex : "http://cdn.bulbagarden.net/upload/b/b7/Spr_4p_074.png",
	sources : {
		"Pokedex Image from Bulbapedia" : "",
	},
	
	OT: "nqpppnl",
	gender: 2,
	gamename : "Geodude",
	pokename : "Geodude",
	nicknames : "Master Dude",
	level : 17,
	memo : "Caught using the masterball.",
	ball: "master",
	
	ribbons : [
		new Master_Ribbon(),
	],
}));


addEvent(new Pokemon({
	name : "Steve",
	// sprite: "img/pkmn/bronzong.png",
	// x: -37, y: -25,
	
	// dex : "img/pkdx/emdex_cruella.png",
	// sources : {
	// 	"Pokedex Image by /u/NoPenNameGirl" : "http://www.reddit.com/r/twitchplayspokemon/comments/22kx4y/the_ateam_sprite/",
	// },
	
	OT: "nqpppnl",
	gender: 0,
	gamename : "Bronzong",
	pokename : "Bronzong",
	nicknames : "Captain America",
	// level : 5,
	memo : "First to contract the Pokerus virus, named Captain America for this feat.",
	
	ribbons : [
		new Record_Ribbon("First to catch PkRS"),
		new Pokerus_Ribbon(),
		//new Daycare_Ribbon("To Learn Something"),
		new HallOfFame_Ribbon("17d 11h 39m"),
	],
}));

addEvent(new MultiEvent({
	name: "The Royal Family",
	sprite: "img/pkmn/sunbrella_family.gif",
	x: 29, y: 36,
}).addSubEvent("25,0,47,25", new Pokemon({
	name : "Sunbrella",
	
	dex : "img/pkdx/ptdex_sunbrella.png",
	sources : {
		"Pokedex Image by /u/carlotta4th" : "http://www.reddit.com/r/twitchplayspokemon/comments/252a2b/tpp_sprites/",
	},
	
	OT: "nqpppnl",
	gender: 2,
	gamename : "!☂!!☀! !:1",
	pokename : "Roserade",
	nicknames: "The Empress<br/>Queen",
	level : 71,
	memo : "Evolved to Roselia via Rare Candy by anti-evolution trolls spamming the menu button.",
	
	ribbons : [
		new Daycare_Ribbon("To Learn Petal Dance"),
		new Pokerus_Ribbon(),
		new HallOfFame_Ribbon("17d 11h 39m"),
	],
})).addSubEvent("0,0,20,25", new Pokemon({
	name : "Roselio",
	
	dex : "http://cdn.bulbagarden.net/upload/9/9d/Spr_4p_315_m.png",
	sources : {
		"Pokedex Image from Bulbapedia" : "",
	},
	
	OT: "nqpppnl",
	gender: 1,
	gamename : "Roselia",
	pokename : "Roselia",
	level : 24,
	memo: "Caught before Napoleon's coma, lost to the time Paradox.",
	
	ribbons : [
		new Daycare_Ribbon("To Love Sunbrella"),
		new Released_Ribbon("12d 10h 32m* <br/>(*Lost to Paradox)"),
		//No badges after this, so they don't bleed into one another.
	],
}))
);


addEvent(new Pokemon({
	name : "Shinx",
	// sprite: "img/pkmn/sunshine_shinx.png",
	x: -37, y: -25,
	
	// dex : "img/pkdx/ptdex_.png",
	// sources : {
	// 	"Pokedex Image by /u/NoPenNameGirl" : "http://www.reddit.com/r/twitchplayspokemon/comments/22kx4y/the_ateam_sprite/",
	// },
	
	OT: "nqpppnl",
	gender: 2,
	gamename : '0"☀ ☀0☀☺ &#9785;',
	pokename : "Shinx",
	nicknames : "Sparkles<br/>Sunshine",
	level : 63,
	memo : "Forever unable to evolve...",
	ball : "heal",	
	
	ribbons : [
		new Daycare_Ribbon("To Learn Discharge"),
		new Pokerus_Ribbon(),
		new HallOfFame_Ribbon("17d 11h 39m"),
	],
}));

addEvent(new Pokemon({
	name : "Solareon",
	// sprite: "img/pkmn/sunshine_shinx.png",
	// x: -37, y: -25,
	
	// dex : "img/pkdx/emdex_cruella.png",
	// sources : {
	// 	"Pokedex Image by /u/NoPenNameGirl" : "http://www.reddit.com/r/twitchplayspokemon/comments/22kx4y/the_ateam_sprite/",
	// },
	
	OT: "nqpppnl",
	gender: 1,
	gamename : "Flareon",
	pokename : "Flareon",
	nicknames : "Sun Prophet",
	level : 97,
	memo : "Said to have broken the Fire Starter curse by entering the Hall of Fame.",
	
	ribbons : [
		new Pokerus_Ribbon(),
		new HallOfFame_Ribbon("17d 11h 39m"),
	],
}));

addEvent(new Pokemon({
	name : "Agent 006",
	// sprite: "img/pkmn/agent_bibarel.png",
	x: 7, y: -24,
	
	dex : "img/pkdx/ptdex_cruella.png",
	sources : {
		"Pokedex Image by /u/carlotta4th" : "http://www.reddit.com/r/twitchplayspokemon/comments/252a2b/tpp_sprites/",
	},
	
	OT: "nqpppnl",
	gender: 2,
	gamename : "00&nbsp;&nbsp;00&nbsp;06",
	pokename : "Bibarel",
	nicknames : "",
	level : 5,
	memo : "",
	
	ribbons : [
		// new Pokerus_Ribbon(), //caught after the outbreak
		new Daycare_Ribbon("Had a baby?!"),
		new HallOfFame_Ribbon("17d 11h 39m"),
	],
}));

addEvent(new Pokemon({
	name : "Golbat",
	// sprite: "img/pkmn/sunshine_shinx.png",
	// x: -37, y: -25,
	
	// dex : "img/pkdx/emdex_cruella.png",
	// sources : {
	// 	"Pokedex Image by /u/NoPenNameGirl" : "http://www.reddit.com/r/twitchplayspokemon/comments/22kx4y/the_ateam_sprite/",
	// },
	
	OT: "nqpppnl",
	gender: 1,
	gamename : "Golbat",
	pokename : "Golbat",
	nicknames : "",
	// level : 5,
	// memo : "",
	
	ribbons : [
		new Pokerus_Ribbon(),
		new HallOfFame_Ribbon("17d 11h 39m"),
	],
}));

addEvent(new Pokemon({
	name : "Togepi",
	sprite: "img/pkmn/kk-roy.png",
	x: 16, y: -33,
	
	dex : "http://cdn.bulbagarden.net/upload/0/07/Spr_4p_175.png",
	sources : {
		"Pokedex Image from Bulbapedia" : "",
		"Sprite is Flair by /u/RT-Pickred": "",
	},
	
	OT: "nqpppnl",
	gender: 2,
	gamename : "KK♀ROOOY",
	pokename : "Togepi",
	nicknames : "",
	level : 48,
	memo : "Had lots of fun in the Day Care",
	
	ribbons : [
		new Daycare_Ribbon("Common Resident"),
		new Pokerus_Ribbon(),
	],
}));


// And finally, Nepoleon himself!
addEvent(new Trainer({
	name : "nqpppnl",
	spritesheet : "img/trainers/napoleon.png",
	x: -9, y: 13,
	
	dex : "http://cdn.bulbagarden.net/upload/6/6b/Spr_Pt_Lucas.png",
	sources : {
		"Lucas Sprite from Bulbapedia":"", 
	},
	
	nickname : "Napoleon",
	playtime: "17d 11h 39m",
	pokedex : "52 own/206 seen",
	releasecount : "4 (+22)",
	idnum : "12339",
	
	info_html : 
		"Number of E4 Attempts: 49<br/>"+
		"Times Blacked Out: 173<br/>"+
		"Number of Wooper Caught: 20<br/>"+
		"Number of Times Time Traveled: 2<br/>"+
		"Number of Pokeballs Bought: 400+",
	icons : [
		"img/icn/coin_case.png",
		"img/icn/air_mail.png",
		"img/icn/poke_ball.png",
		"img/icn/shiny_stone.png",
		"img/icn/contest_pass.png",
		"img/icn/sun_stone.png",
	],
	
	badge_html : "",
	
	behavior: behavior.look,
	
	dialog: [ 
		"YOU SPELLED MY NAME WRONG!!",
		"HELLO?! Anyone want to FIX MY NAME ON THIS SIGN?!?!",
		"It's <em>NA</em>poleon! NAH! As in you can DO NOTHING TO MAKE ME HAPPY ABOUT THIS!!",
		"I pay GOOD MONEY at the Game Corner and they CAN'T EVEN SPELL MY NAME RIGHT?!",
	],
	dialog_assignment: "random",
	
	doClick : function(){
		Person.fn.doClick.call(this);
		this.openTrainerCard();
	},
}));

//And his very own Game Corner!
addEvent(new Building({
	name: "Game Corner",
	sprite: "img/bld/gamecorner.png",
	x : -7, y : 12,
	warp_x: 48, warp_y: 48,
}));

addEvent(new Building({
	name: "Game Corner Congrats Sign",
	sprite: "img/bld/gamecorner_sign.png",
	x : -7, y : 13, 
	warp_x: 44, warp_y: 37,
}));
