// gen5.js
// File for TPP Black events
//

//showTimer
// showGameClock("TPP Black Game Clock<br/>", new Date(Date.UTC(2014, 06-1, 15, 0+4)));



//Dammit, we've got 5 pokemon for the park ALREADY -_-

//
// Note: Tepig is attached to the Released Starter Campfire multi-event 
// defined in the "other" events file. See there for his event definition.
//

addEvent(new Pokemon({
	name : "Cat",
	sprite: "img/pkmn/cat.png",
	x: -2, y: 36,
	adj_flip: true, adj_x: 6,
	
	dex : "img/pkdx/b/Spr_5b_509.png",
	sources : {
		"Sprite from Bulbapedia" : "",
		"Pokedex Image from Bulbapedia" : "",
	},
	
	OT: "GMYC&nbsp;&nbsp;",
	gender: 2,
	gamename : "B66_4ssidb",
	pokename : "Purrloin",
	nicknames : "",
	level : 12,
	// memo : "",
	
	ribbons : [
		new Pokerus_Ribbon(),
		new Released_Ribbon("1d 14h 16m"),
		new MondayMassacre_Ribbon(),
	],
}));

addEvent(new Pokemon({
	name : "Puppy",
	sprite: "img/pkmn/puppy.png",
	x: -3, y: 36,
	adj_flip: true, adj_x: 2,
	
	dex : "img/pkdx/b/Spr_5b_506.png",
	sources : {
		"Sprite from Bulbapedia" : "",
		"Pokedex Image from Bulbapedia" : "",
	},
	
	OT: "GMYC&nbsp;&nbsp;",
	gender: 1,
	gamename : "Lillipup",
	pokename : "Lillipup",
	nicknames : "",
	level : 16,
	// memo : "",
	
	ribbons : [
		new Pokerus_Ribbon(),
		new Released_Ribbon("1d 13h 38m"),
		new MondayMassacre_Ribbon(),
	],
}));

addEvent(new Pokemon({
	name : "BBQ",
	sprite: "img/pkmn/bbq.png",
	x: -4, y: 36,
	adj_flip: true, adj_x: -2,
	
	dex : "img/pkdx/b/Spr_5b_511.png",
	sources : {
		"Sprite from Bulbapedia" : "",
		"Pokedex Image from Bulbapedia" : "",
	},
	
	OT: "GMYC&nbsp;&nbsp;",
	gender: 1,
	gamename : "mbbqUU FG",
	pokename : "Pansage",
	nicknames : "",
	level : 27,
	// memo : "",
	
	ribbons : [
		new Pokerus_Ribbon(),
		new Released_Ribbon("1d 14h 2m"),
		new MondayMassacre_Ribbon(),
	],
}));

addEvent(new Pokemon({
	name : "Tympole",
	sprite: "img/pkmn/tympole.png",
	x: -5, y: 36,
	adj_flip: true, adj_x: -6,
	
	dex : "img/pkdx/b/Spr_5b_535.png",
	sources : {
		"Sprite from Bulbapedia" : "",
		"Pokedex Image from Bulbapedia" : "",
	},
	
	OT: "GMYC&nbsp;&nbsp;",
	gender: 1,
	gamename : "Tympole",
	pokename : "Tympole",
	nicknames : "",
	level : 14,
	memo : "Seen as one of the causes of the Monday Massacre: we were only trying to box the two Tympole...",
	
	ribbons : [
		new Pokerus_Ribbon(),
		new Released_Ribbon("1d 14h 40m"),
		new MondayMassacre_Ribbon(),
	],
}));




// Jimmy!!
addEvent(new Trainer({
	skipme: true,
	name : "GMYC&nbsp;&nbsp;",
	spritesheet : "img/trainers/napoleon.png",
	x: -9, y: 13,
	
	dex : "img/pkdx/b/Spr_Pt_Lucas.png",
	sources : {
		"Lucas Sprite from Bulbapedia":"", 
	},
	
	idnum : "12339",
	nickname : "Napoleon",
	altnicks : "Nipple",
	playtime: "17d 11h 39m",
	pokedex : "52 own/206 seen",
	releasecount : "4 (+22)",
	catchcount : 0,
	e4attempts : 49,
	blackouts : 173,
	
	personality: "Napoleon hates pokemon, or he did at the start of his adventure. He is a quiet, reserved 'dandy', more concerned with keeping himself looking fabulous than any adventure at hand. He's also a habitual gambler.",
	notable: 
		"Number of Wooper Caught: 20<br/>"+
		"Number of Pokeballs Bought: 400+<br/>"+
		"Number of Times Time Traveled: 2",
	ribbons: [
	],
	
	// info_html : 
	// 	"Number of E4 Attempts: 49<br/>"+
	// 	"Times Blacked Out: 173<br/>"+
	// 	"Number of Wooper Caught: 20<br/>"+
	// 	"Number of Times Time Traveled: 2<br/>"+
	// 	"Number of Pokeballs Bought: 400+",
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
	
	// doClick : function(){
	// 	Person.fn.doClick.call(this);
	// 	this.openTrainerCard();
	// },
}));