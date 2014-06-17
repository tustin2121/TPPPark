// gen4.1.js
// File for TPP HeartGold events
//

//Since it hasn't event started yet, TIMER!! :D

//showGameClock("TPP HeartGold Game Clock<br/>", new Date(Date.UTC(2014, 05-1, 24, 0+4)));





///////////////////////////////////////////////
// CURRENT PARTY MON!

addEvent(new Pokemon({
	name: "Trapnich",
	sprite: "img/pkmn/",
	x: 0, y: 0,
	
	dex: "img/pkdx/",
	sources: {
		"Sprite by /u/": "",
		"Pokedex Image by /u/": "",
	},
	
	OT: "",
	gender: 0,
	gamename: ",",
	pokename: "Vibrava",
	nicknames: "Trumpnich<br/>Vibrator",
	//level: 5,
	memo: "",
	
	ribbons: [
		new Starter_Ribbon(),
	],
}));

addEvent(new Pokemon({
	name: "Diglight",
	sprite: "img/pkmn/.png",
	x: 0, y: 0,
	
	dex: "img/pkdx/",
	sources: {
		"Sprite by /u/": "",
		"Pokedex Image by /u/": "",
	},
	
	OT: "",
	gender: 0,
	gamename: ",",
	pokename: "Diglett",
	//level: 5,
	memo: "",
	
	ribbons: [
	],
}));

addEvent(new Pokemon({
	name: "",
	sprite: "img/pkmn/.png",
	x: 0, y: 0,
	
	dex: "img/pkdx/",
	sources: {
		"Sprite by /u/": "",
		"Pokedex Image by /u/": "",
	},
	
	OT: "",
	gender: 0,
	gamename: ",",
	pokename: "Jigglypuff",
	nicknames: "Dovakin",
	//level: 5,
	memo: "",
	
	ribbons: [
	],
}));

addEvent(new Pokemon({
	name: "Diamondback",
	sprite: "img/pkmn/diamondback.png",
	x: 0, y: 0,
	
	dex: "img/pkdx/",
	sources: {
		"Sprite by /u/": "",
		"Pokedex Image by /u/": "",
	},
	
	OT: "",
	gender: 0,
	gamename: ",",
	pokename: "Ekans",
	caught: "Johto Safari Zone",
	//level: 5,
	memo: "",
	
	ribbons: [
	],
}));


addEvent(new Pokemon({
	name: "Oracle",
	sprite: "img/pkmn/xatu.png",
	x: 0, y: 0,
	
	dex: "img/pkdx/",
	sources: {
		"Sprite by /u/": "",
		"Pokedex Image by /u/": "",
	},
	
	OT: "",
	gender: 0,
	gamename: ",",
	pokename: "Xatu",
	nicknames: "Stare Jesus",
	caught: "Lake of Rage (Red Gyrados)",
	//level: 5,
	memo: "",
	
	ribbons: [
		new Record_Ribbon("First Shiny Caught"),
	],
}));

addEvent(new Pokemon({
	name: "3G",
	sprite: "img/pkmn/3g.png",
	x: 0, y: 0,
	
	dex: "img/pkdx/",
	sources: {
		"Sprite by /u/": "",
		"Pokedex Image by /u/": "",
	},
	
	OT: "",
	gender: 0,
	gamename: ",",
	pokename: "Larvitar",
	//level: 5,
	memo: "",
	
	ribbons: [
	],
}));


addEvent(new Trainer({
	name : "aoooo",
	spritesheet : "img/trainers/.png",
	x: -9, y: 13,
	
	dex : "",
	sources : {
		"Lyra Sprite from Bulbapedia":"", 
	},
	
	nickname : "Aoooo",
	playtime: "0d 0h 0m",
	pokedex : "0 own/0 seen",
	releasecount : 0,
	idnum : "28412",
	
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


//////////////////////////////////////////////////////////
//And Kenya, the most complicated pokemon in the park...
addEvent(new MovingPokemon({
	name: "Kenya",
	x: 0, y: 0,
	
	dex: "img/pkdx/",
	sources: {
		"Sprite by /u/": "",
		"Pokedex Image by /u/": "",
	},
	
	OT: "aoooo",
	gender: 0,
	gamename: "Kenya",
	pokename: "Groudon",
	level: 51,
	memo: "",
	
	ribbons: [
		new Released_Ribbon("6d 17h 53m"),
		new Traded_Ribbon("Gift from Webster 1d 14h 14m"),
		new Record_Ribbon("First Legendary Released"),
	],
	
	frame_width: 48,
	frame_height: 46,
	
	updateImage : function() {
		var x = -this.direction * this.frame_width;
		var y = -this.animFrame * this.frame_height;
		
		this.domImage.css({
			"background-position" : x+"px "+y+"px",
		});
	},
	
	
	behavior: function(){
		
	},
}));



