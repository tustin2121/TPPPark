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
	memo : "God of the Religon of TPP.",
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
})).addSubEvent("1,64,94,34", new Pokemon({
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
		new HallOfFame_Ribbon("9d 21h 24m"),
	],
	
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
	
	dex : "http://cdn.bulbagarden.net/upload/1/10/Spr_2c_010.gif", //Blubapedia
	// dex : "img/pkdx/tpp10_dux.gif",
	sources : {
		"Pokedex Image from Bulbapedia" : "",
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
	sprite: "img/pkmn/aaaaa_ponyta.png",
	x: 23, y: 19,
	
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
	idnum : "00000",
	
	info_html : 
		"Number of E4 Attempts: 38<br/>"+
		"Times Blacked Out: 41<br/>"+
		"<br/>"+
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
	
	// behavior: null,
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


