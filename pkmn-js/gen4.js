// gen4.js
// File for TPP Platinum events
// - or -
// HOW THE HELL DO I CODE NAMES WITH FREAKING UMBRELLAS IN THEM?!?! O_o
//

// Released Pokemon: Their stories are finished, they can enter the Park

addEvent(new Pokemon({
	name : "Chimchar",
	sprite: "img/pkmn/chimchar.png",
	x: -12, y: -29,
	
	// dex : "img/pkdx/emdex_cruella.png",
	// sources : {
	// 	"Pokedex Image by /u/NoPenNameGirl" : "http://www.reddit.com/r/twitchplayspokemon/comments/22kx4y/the_ateam_sprite/",
	// },
	
	OT: "nqpppnl",
	gender: 2,
	gamename : "Chimchar",
	pokename : "Chimchar",
	nicknames : "LazorApe",
	level : 15,
	// memo : "",
	
	ribbons : [
		new Starter_Ribbon(),
		new Released_Ribbon("0d 12h 33m"),
		new Record_Ribbon("Fastest Released Starter"),
	],
}));


addEvent(new Pokemon({
	name : "Oreo",
	sprite: "img/pkmn/bidoof-oreo.png",
	x: 14, y: -29,
	
	// dex : "img/pkdx/emdex_cruella.png",
	// sources : {
	// 	"Pokedex Image by /u/NoPenNameGirl" : "http://www.reddit.com/r/twitchplayspokemon/comments/22kx4y/the_ateam_sprite/",
	// },
	
	OT: "nqpppnl",
	gender: 2,
	gamename : "1 OORROOOO",
	pokename : "Bidoof",
	nicknames : "Special Agent Zigzagoon",
	level : 15,
	// memo : "",
	
	ribbons : [
		new Released_Ribbon("0d 5h 34m"),
		new Record_Ribbon("Fastest Release"),
	],
}));


// Current Party Pokemon: DO NOT uncomment sprites until they win the Hall of Fame ribbon!

addEvent(new Pokemon({
	name : "Bronzor",
	// sprite: "img/pkmn/bronzor.png",
	// x: -37, y: -25,
	
	// dex : "img/pkdx/emdex_cruella.png",
	// sources : {
	// 	"Pokedex Image by /u/NoPenNameGirl" : "http://www.reddit.com/r/twitchplayspokemon/comments/22kx4y/the_ateam_sprite/",
	// },
	
	OT: "nqpppnl",
	gender: 0,
	// gamename : "Bronzor",
	pokename : "Bronzor",
	// nicknames : "",
	// level : 5,
	// memo : "",
	
	ribbons : [
		new Record_Ribbon("First to catch PkRS"),
		new Pokerus_Ribbon(),
	],
}));

addEvent(new Pokemon({
	name : "Sunbrella",
	// sprite: "img/pkmn/sunberella.png",
	// x: -37, y: -25,
	
	// dex : "img/pkdx/emdex_cruella.png",
	// sources : {
	// 	"Pokedex Image by /u/NoPenNameGirl" : "http://www.reddit.com/r/twitchplayspokemon/comments/22kx4y/the_ateam_sprite/",
	// },
	
	OT: "nqpppnl",
	gender: 2,
	// gamename : "O_o",
	pokename : "Roselia",
	// level : 5,
	memo : "Evolved via Rare Candy by anti-evolution trolls spamming the menu button.",
	
	ribbons : [
		// new Pokerus_Ribbon(),
	],
}));

addEvent(new Pokemon({
	name : "Shinx",
	// sprite: "img/pkmn/sunshine_shinx.png",
	// x: -37, y: -25,
	
	// dex : "img/pkdx/emdex_cruella.png",
	// sources : {
	// 	"Pokedex Image by /u/NoPenNameGirl" : "http://www.reddit.com/r/twitchplayspokemon/comments/22kx4y/the_ateam_sprite/",
	// },
	
	OT: "nqpppnl",
	gender: 2,
	// gamename : "O_o",
	pokename : "Shinx",
	nicknames : "Sparkles<br/>Sunshine",
	// level : 5,
	// memo : "",
	ball : "heal",	
	
	ribbons : [
		// new Pokerus_Ribbon(),
	],
}));
