// gen4.1.js
// File for TPP HeartGold events
//

//Since it hasn't event started yet, TIMER!! :D

showTimer("TPP HeartGold will begin in<br/>", new Date(Date.UTC(2014, 05-1, 24, 0+4)));









///////////////////////////////////////////////
// CURRENT PARTY MON!

addEvent(new Pokemon({
	skipme: true,
	
	name: "",
	sprite: "img/pkmn/",
	x: 0, y: 0,
	
	dex: "img/pkdx/",
	sources: {
		"Sprite by /u/": "",
		"Pokedex Image by /u/": "",
	}
	
	OT: "",
	gender: 0,
	gamename: "",
	pokename: "",
	nicknames: "",
	//level: 5,
	memo: "",
	
	ribbons: [
		new Starter_Ribbon(),
	],
}));


addEvent(new Trainer({
	skipme: true,
	
	name : "",
	spritesheet : "img/trainers/.png",
	x: -9, y: 13,
	
	dex : "",
	sources : {
		"XXXXX Sprite from Bulbapedia":"", 
	},
	
	nickname : "",
	playtime: "0d 0h 0m",
	pokedex : "0 own/0 seen",
	releasecount : 0,
	idnum : "00000",
	
	info_html : 
		"Number of E4 Attempts: ??<br/>"+
		"Times Blacked Out: ???<br/>"+
		"<br/>"+
		"<br/>"+
		"",
	icons : [
		null, //"img/icn/coin_case.png",
		null, //"img/icn/air_mail.png",
		null, //"img/icn/poke_ball.png",
		null, //"img/icn/shiny_stone.png",
		null, //"img/icn/contest_pass.png",
		null, //"img/icn/sun_stone.png",
	],
	
	behavior: null,
}));