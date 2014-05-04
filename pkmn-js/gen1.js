// gen1.js
// File for TPP Red events
// 

// Bird Jesus and his Church of Helix
addEvent(new Building({
	name: "The Church of Helix",
	img: "img/bld/church.png",
	x : 8, y : 8,
}));

addEvent(new Pokemon({
	name: "Bird Jesus",
	floating: true,
	img: "img/pkmn/bird-jesus.png",
	shadow : "img/pkmn/bird-jesus-shadow.png",
	x : 10, y : 8, z: 20,
	
	dex : "img/pkdx/tpp1_birdjesus.gif",
	dexsource : "http://hamigakimomo.tumblr.com/post/77911455524/i-decided-to-make-custom-r-b-sprites-for-the",
	
	OT: "Red",
	gamename: "aaabaaaajss",
	pokename: "Pidgeot",
	level: 69,
	nicknames : "Abba Jesus",
	
	ribbons : [
		new HallOfFame_Ribbon("16d 7h 45m"),
	],
}));

//
// Note: Lord Helix is attached to the Battle of Mt Silver multi-event defined
// in the Gen 2 file. See there for his event definition.
//

// ATV
addEvent(new Pokemon({
	name : "ATV",
	
	dex : "img/pkdx/tpp2_atv.gif",
	dexsource : "http://hamigakimomo.tumblr.com/post/77911455524/i-decided-to-make-custom-r-b-sprites-for-the",
	
	OT: "Red",
	gamename : "AATTVVV",
	pokename : "Venomoth",
	level : 39,
	nicknames : "All-Terrain Venomoth<br/>The Dragonslayer",
	memo : "Once took down Lance's Dragonite singlehandedly.",
	
	ribbons : [
		new HallOfFame_Ribbon("16d 7h 45m"),
	],	
}));

//The Fonz
addEvent(new Pokemon({
	name : "King Fonz",
	
	dex : "img/pkdx/tpp3_fonz.gif",
	dexsource : "http://hamigakimomo.tumblr.com/post/77911455524/i-decided-to-make-custom-r-b-sprites-for-the",
	
	OT: "Red",
	gamename : "AAAAAAAAAA",
	pokename : "Nidoking",
	level : 54,
	memo : "Survived and entered party on Bloody Sunday",
	caught : "Caught in Safari Zone",
	ball : "safari",
	
	ribbons : [
		new HallOfFame_Ribbon("16d 7h 45m"),
	],	
}));

//Air
addEvent(new Pokemon({
	name : "Air",
	
	dex : "img/pkdx/tpp6_air.gif",
	dexsource : "http://hamigakimomo.tumblr.com/post/77911455524/i-decided-to-make-custom-r-b-sprites-for-the",
	
	OT: "Red",
	gamename : "AIIIIIIRRR",
	pokename : "Lapras",
	nicknames : "Air Jordan<br/>Fresh Prince of Bel AIR",
	level : 31,
	
	ribbons : [
		new HallOfFame_Ribbon("16d 7h 45m"),
	],	
}));

// Zapdos
addEvent(new Pokemon({
	name : "Battery Jesus",
	
	dex : "img/pkdx/tpp5_zapdos.gif",
	dexsource : "http://hamigakimomo.tumblr.com/post/77911455524/i-decided-to-make-custom-r-b-sprites-for-the",
	
	OT: "Red",
	gamename : "AA-j",
	pokename : "Zapdos",
	nicknames : "Double-A Jay<br/>Archangel of Justice",
	level : 81,
	caught : "With Masterball 10d 7h 49m",
	ball : "master",
	memo : "Attempts at retreival caused Bloody Sunday. Invaluable at Elite Four.",
	
	ribbons : [
		new HallOfFame_Ribbon("16d 7h 45m"),
	],	
}));

// Red's Abby
addEvent(new Pokemon({
	name: "Abby",
	img: "img/pkmn/abby-gen1.png",
	x : -14, y : -34,
	
	dex : "img/pkdx/tpp9_abby.gif",
	dexsource : "http://hamigakimomo.tumblr.com/post/78067393358/ive-updated-omanytes-sprite-to-omastar-i-also",
	
	OT: "Red",
	gamename : "ABBBBBBK",
	pokename : "Charmelion",
	level : 34,
	ribbons : [
		new Starter_Ribbon(),
		new Released_Ribbon("4d 8h 53m"),
	],
}));

// DigRat
addEvent(new Pokemon({
	name: "DigRat",
	
	dex : "img/pkdx/tpp11_digrat.gif",
	dexsource : "http://hamigakimomo.tumblr.com/post/78067393358/ive-updated-omanytes-sprite-to-omastar-i-also",
	
	OT: "Red",
	gamename : "AAJST(???",
	pokename : "Raticate",
	nicknames : "BigDig",
	level : 20,
	memo : "A trouble maker, known for digging us out of places we wanted to be.",
	
	ribbons : [
		new Released_Ribbon("10d 16h 2m"),
		new BloodySunday_Ribbon(),
	],
}));

// DUX!
addEvent(new Pokemon({
	name : "DUX",
	
	dex : "img/pkdx/tpp10_dux.gif",
	dexsource : "http://hamigakimomo.tumblr.com/post/78067393358/ive-updated-omanytes-sprite-to-omastar-i-also",
	
	OT: "Red",
	gamename : "DUX",
	pokename : "Farfetch'd",
	level : 31,
	nicknames : '"The Slayer of Trees"',
	memo : "Known for its mighty Cut ability!",
	
	ribbons : [
		new Traded_Ribbon("For Spearow 2d 6h 59m"),
		new Released_Ribbon("10d 13h 13m"),
		new BloodySunday_Ribbon(),
	],
}));