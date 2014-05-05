// gen2.js
// File for TPP Crystal events
// 
/*
addEvent(new Pokemon({
	name: "Battle of Mt Silver",
	OT: "Red",
	img: "img/pkmn/MtSilverBattle.gif",
	breathe : false,
	x : -4, y : -16, z:-6,
}));
*/

addEvent(new MultiEvent({
	name : "Battle of Mt Silver",
	img: "img/pkmn/MtSilverBattle.gif",
	x : -4, y : -16, z:-6,
}).addSubEvent("47,17,75,40", new Pokemon({
	name : "Lord Helix",
	
	dex : "img/pkdx/tpp8_omastar.gif",
	dexsource : "http://hamigakimomo.tumblr.com/post/78067393358/ive-updated-omanytes-sprite-to-omastar-i-also",
	
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


// Oxxy Ozzworm
addEvent(new Pokemon({
	name : "Ozzworm",
	img: "img/pkmn/ozzyozworm.png",
	x: 7, y: -35,
	
	//dex : "img/pkdx/tpp10_dux.gif",
	//dexsource : "http://hamigakimomo.tumblr.com/post/78067393358/ive-updated-omanytes-sprite-to-omastar-i-also",
	
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
