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
	
	OT: "AJDNNW",
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