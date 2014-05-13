// other.js
// File for various other events relating to TPP
// 

addEvent(new Building({
	name : "Released Starter Campfire Base",
	sprite : "img/bld/campfire.gif",
	x: -13, y: -31,
	
	warp_x: 24, warp_y: -6,
}));

addEvent(new MultiEvent({
	name : "Released Starter Campfire Pokemon",
	sprite : "img/pkmn/campfire_pokes.gif",
	x: -13, y: -29,
	
	adj_x: -5, adj_y: 5,
	
}).addSubEvent("34,2,64,24", new Pokemon({
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
})).addSubEvent("56,24,72,42", new Pokemon({
	name: "Zexy",
	sprite: "img/pkmn/zexxy.png",
	x : -14, y : -29,
	
	dex : "img/pkdx/emdex_zexy.png",
	sources : {
		"Pokedex Image by /u/NoPenNameGirl" : "http://www.reddit.com/r/twitchplayspokemon/comments/22d7zw/request_done_zexy_the_torchic_sprite/",
	},
		
	OT: "<strike>M</strike>Ay",
	gender: 1,
	gamename : "zyyxyy",
	pokename : "Torchic",
	level : 38,
	ribbons : [
		new Starter_Ribbon(),
		new Released_Ribbon("3d 23h 9m"),
	],
})).addSubEvent("2,19,32,41", new Pokemon({
	name: "Abby",
	sprite: "img/pkmn/abby-gen1.png",
	x : -13, y : -30,
	
	dex : "img/pkdx/tpp9_abby.gif",
	sources : {
		"Pokedex Image by /u/Fiirewaffle" : "http://hamigakimomo.tumblr.com/post/78067393358/ive-updated-omanytes-sprite-to-omastar-i-also",
		"Sprite by /u/carlotta4th" : "http://www.reddit.com/r/twitchplayspokemon/comments/1yx0gx/i_madealtered_flairs_suggestions_or_corrections/",
	},
		
	OT: "Red",
	gamename : "ABBBBBBK",
	pokename : "Charmelion",
	level : 34,
	ribbons : [
		new Starter_Ribbon(),
		new Released_Ribbon("4d 8h 53m"),
	],
})));

addEvent(new Building({
	name : "Shiny House",
	sprite : "img/bld/shiny2.png",
	x: -38, y: -13,
	
	warp_x: 32, warp_y: 54,
}));

addEvent(new SignPost({
	name : "Park Sign",
	x: 5, y: 9,
}));

// Creepy eyes! >:3
addEvent(new Event({
	name : "Cave Eyes",
	sprite : "img/pkmn/cave_eyes.png",
	x: -20, y: -36, z: 0,
	
	doClick : function() {
		var eyes = $(this.domElement).find("img.main");
		eyes.delay(1400) //blink eyes
			.hide(10).delay(100).show(10).delay(100)
			.hide(10).delay(100).show(10).delay(100)
			.delay(600)
			.hide(200);
		
		this.doClick = function(){}; //remove this function
	},
}));


//SHIPPING APP!
/*
The shipping app is the "Matchup App" from Platinum, where you can select two
pokemon and see if they're compatable for breeding. Here, we're going to show off
some of the OTPs of TPP.

Four levels: "OTP", "Shipping", "Interest", and "NOPE!" indicating how shipped they are

-- OTP --
Joey + AJ
M4 + Zexxy

-- Shipping --
M4 + C3   (C3 -> M4)
Mightydoge + BirdCop

-- Interest --



-- NOPE! --
(Any others)

*/
