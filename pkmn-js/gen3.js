// gen3.js
// File for TPP Emerald events
// 

// Shedinja!
addEvent(new Pokemon({
	name : "Zexinja",
	sprite: "img/pkmn/shedinja_zexxy.png",
	shadow: "img/pkmn/generic-shadow.png",
	x: 31, y: -11, z: 16,
	
	dex : "img/pkdx/emdex_shedinja.png",
	sources : {
		"Pokedex Image by /u/bboyskullkid" : "http://www.reddit.com/r/twitchplayspokemon/comments/21g0da/was_inspired_by_my_flair_and_drew_zexxys_soul/",
	},
	
	OT: "<strike>M</strike>Ay",
	gamename : "Shedinja",
	pokename : "Shedinja",
	nicknames : "ZexyNinja",
	level : 26,
	caught : "Appeared 3d 23h 3m",
	memo : "Thought to hold the soul of Zexxy after his release.",
	
}));



// Wattson! <3
addEvent(new Person({
	name : "Wattson",
	spritesheet : "img/trainers/wattson.png",
	x: -20, y: 32,
	
	behavior: behavior.look,
	
	dialog : [
		"WAHAHAHAHAHA!",
		"WAHAHAHAHAHAHAHA!",
		"Wahahahahaha!",
		"WAHAHAHAHAHAHAHAHAHAHAHA!",
		"Wahahahahahahaha!",
	],
}));