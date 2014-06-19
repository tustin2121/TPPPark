// pantheon.js
// File for the general Pantheon of TPP at Mt. Pantheon!
// 

//Fossils
addEvent(new Event({
	name : "Deity Amber Fossil",
	sprite : "img/pkmn/!deity_amber_fossil.png",
	x: -145, y:-77,
}));

addEvent(new Event({
	name : "Deity Helix Fossil",
	sprite : "img/pkmn/!deity_helix_fossil.png",
	x: -147, y:-77,
}));

addEvent(new Event({
	name : "Deity Dome Fossil",
	sprite : "img/pkmn/!deity_dome_fossil.png",
	x: -143, y:-77,
}));


addEvent(new Event({
	name : "Deity Armor Fossil",
	sprite : "img/pkmn/!deity_shield_fossil.png",
	x: -149, y:-74,
}));

addEvent(new Event({
	name : "Deity Skull Fossil",
	sprite : "img/pkmn/!deity_skull_fossil.png",
	x: -141, y:-74,
}));

addEvent(new Event({
	name : "Deity Claw Fossil",
	sprite : "img/pkmn/!deity_claw_fossil.png",
	x: -149, y:-72,
}));

addEvent(new Event({
	name : "Deity Root Fossil",
	sprite : "img/pkmn/!deity_root_fossil.png",
	x: -141, y:-72,
}));


//Deities
addEvent(new Event({
	name : "Deity Amber",
	sprite : "img/pkmn/!deity_amber_pkmn.png",
	x: -145, y:-77, z: 16,
	animation: "breathe",
}));

addEvent(new Event({
	name : "Deity Helix",
	sprite : "img/pkmn/!deity_helix_pkmn.png",
	x: -147, y:-77, z: 16,
	animation: "breathe",
}));

addEvent(new Event({
	name : "Deity Dome",
	sprite : "img/pkmn/!deity_dome_pkmn.png",
	x: -143, y:-77, z: 16,
	animation: "breathe",
}));

// Defined in the Gen 4.1 file
/*
addEvent(new Event({
	name : "Deity Armor",
	sprite : "img/pkmn/!deity_shield_pkmn.png",
	x: -151, y:-74, z: 8,
	animation: "breathe",
}));*/

// Defined in the Gen 4.1 file 
/*
addEvent(new Event({
	name : "Deity Skull",
	sprite : "img/pkmn/!deity_skull_pkmn.png",
	x: -139, y:-74, z: 8,
	animation: "breathe",
})); */

addEvent(new Event({
	name : "Deity Claw",
	sprite : "img/pkmn/!deity_claw_pkmn.png",
	x: -151, y:-72, z: 8,
	animation: "breathe",
}));

addEvent(new Event({
	name : "Deity Root",
	sprite : "img/pkmn/!deity_root_pkmn.png",
	x: -139, y:-72, z: 8,
	animation: "breathe",
}));


addEvent(new Pokemon({
	name : "Amberzard", //"Pantheon Guardian",
	sprite : "img/pkmn/!deity_amber_guardian.png",
	x: -145, y:-74,
	
	dex: "img/pkdx/b/Spr_3f_006.png",
	sources : {
		"Pokedex Sprite from Bulbapedia": "",
	},
	
	OT: "Alice",
	gender: 1,
	gamename: "AATUUVWVW",
	pokename: "Charizard",
	level: 5,
	nicknames: "Prophet of Amber",
	memo: "Revived by Alice from the Amber Fossil.",
}));

addEvent(new Pokemon({
	name : "Ariadome",
	sprite : "img/pkmn/!deity_dome_guardian.png",
	x: -141, y:-66,
	
	dex: "img/pkdx/b/Spr_3r_168.png",
	sources : {
		"Pokedex Sprite from Bulbapedia": "",
	},
	
	OT: "Alice",
	gender: 0,
	gamename: "Lwweekjjje",
	pokename: "Ariados",
	level: 5,
	nicknames: "Prophet of Dome",
	memo: "Revived by Alice from the Dome Fossil.",
}));


//Sign
addEvent(new SignPost({
	name : "Pantheon Sign",
	x: -152, y:-53,
	
	message: "<strong>Mt. Pantheon</strong><br/>Where the Gods come to Rest"
}));

//Warp Points
addEvent(new WarpTile({
	name : "To Pantheon Warp 1",
	x: -38, y:-39,
	warp_to_x: -145, warp_to_y: -64,
}));
addEvent(new WarpTile({
	name : "To Pantheon Warp 2",
	x: -37, y:-39,
	warp_to_x: -145, warp_to_y: -64,
}));

addEvent(new WarpTile({
	name : "From Pantheon Warp 1",
	x: -132, y: -77,
	warp_to_x: -33, warp_to_y: -31,
}));
addEvent(new WarpTile({
	name : "From Pantheon Warp 2",
	x: -131, y: -77,
	warp_to_x: -33, warp_to_y: -31,
}));