// gen2.js
// File for TPP Crystal events
// 

addEvent(new MultiEvent({
	name : "Battle of Mt Silver",
	sprite: "img/pkmn/MtSilverBattle.gif",
	x : -4, y : -16, z:-6,
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
	dexsource : "http://www.reddit.com/r/twitchplayspokemon/comments/20iaxx/i_made_it_anybody_want_to_use_these_sprites/",
	
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
	
	// dex : "img/pkdx/tpp10_dux.gif",
	// sources : {
	// 	"Pokedex Image by " : "",
	// },
	
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
	
	// dex : "img/pkdx/dex_admiral.png",
	// sources : {
	// 	"Pokedex Image by /u/Parkmayn" : "http://www.reddit.com/r/twitchplayspokemon/comments/1zczao/i_made_some_lasergator_and_admiral_sentret_sprites/",
	// },
	
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
	
	behavior: null,
	// behavior: behavior.meander,
	// behavArg : {
	// 	"left" : -10, "top" : -38,
	// 	"right": -10, "bottom": -37,
	// },
}));
