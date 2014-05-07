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


// Oddish in da house! With Cabbage the White
addEvent(new Building({
	name: "Oddish House",
	sprite: "img/bld/oddishhouse.png",
	x : -35, y : -27,
	warp_x: 16, warp_y: 48,
}));

addEvent(new Pokemon({
	name : "Cabbage",
	sprite: "img/pkmn/cabbage_white.png",
	x: -37, y: -25,
	
	// dex : "img/pkdx/emdex_shedinja.png",
	// sources : {
	// 	"Pokedex Image by /u/bboyskullkid" : "http://www.reddit.com/r/twitchplayspokemon/comments/21g0da/was_inspired_by_my_flair_and_drew_zexxys_soul/",
	// },
	
	OT: "<strike>M</strike>Ay",
	gender: 2,
	gamename : "Vileplume",
	pokename : "Vileplume",
	nicknames : "Cabbage the White",
	level : 49,
	ball : "safari",
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
		"Wahahahahahahahahaha! See you again soon!", //OmegaRuby and AlphaSapphire!
	],
}));



// And finally, May (the M is silent)!
addEvent(new MultiEvent({
	name : "Pooch Swingset",
	sprite: "img/pkmn/may_swingset.gif",
	x : 9, y : 23, z:-6,
}).addSubEvent("15,19,28,42", new Trainer({
	name : "A",
	
	nickname : "<strike>M</strike>ay (M = Silent)",
	playtime: "21d 19h 27m",
	pokedex : "40 own/164 seen",
	releasecount : 5,
	idnum : "00000",
	
	info_html : 
		"Number of E4 Attempts: 103<br/>"+
		"Times Blacked Out: 89+<br/>"+
		"Oddish Caught: 29<br/>"+
		"Poochyena Caught: 7<br/>"+
		"",
	icons : [
		"img/icn/good_rod.png",
		"img/icn/goggles.png",
		"img/pkmn/oddish_1.png",
		"img/icn/cat_head.png",
		"img/icn/contest_pass.png",
		"img/icn/clock.png",
	],
	
	badge_html : "",
})).addSubEvent("16,1,30,13", new Pokemon({ //top pooch
	name : "Pooch 1",
	
})).addSubEvent("34,22,47,42", new Pokemon({ //swinging pooch
	name : "Pooch 2",
	
}))
);

