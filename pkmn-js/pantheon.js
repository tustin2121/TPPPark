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