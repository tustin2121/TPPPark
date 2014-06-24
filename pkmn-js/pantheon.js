// pantheon.js
// File for the general Pantheon of TPP at Mt. Pantheon!
// 

//Fossils
addEvent(new Event({
	name : "Deity Amber Fossil",
	sprite : "img/pkmn/!deity_amber_fossil.png",
	x: -145, y:-77,
	
	infodex_entry: new InfodexEntry({
	title: "The Pantheon",
	html: "<h1>Old Amber</h1><h2>God of Balance</h2><p>Though Helix was the first god of TPP, the Dome and Old Amber followed on logically from the Helix's teachings. While Dome promoted Democracy, and Helix promotes Anarchy, Amber teaches that each method of input has its use, and followers of Amber learn the pros and cons of each method of input, and when they should be used.</p><p>A third system of input was implemented briefly during Crystal called (interchangeably) Demarchy, Sortition, or Lottery system. It took in inputs for about 0.5 to 1 seconds and then randomly picked from the set of submitted inputs. It had the randomness of Anarchy, but with a small hint of Democracy, where not all inputs would be counted. The system was short-lived, lasting only a day, to the grumblings of loyal Amberists.</p>",
	}),
}));

addEvent(new Event({
	name : "Deity Helix Fossil",
	sprite : "img/pkmn/!deity_helix_fossil.png",
	x: -147, y:-77,
	
	infodex_entry: new InfodexEntry({
	title: "The Pantheon",
	html: "<h1>The Helix</h1><h2>God of Anarchy</h2><p>Helix was the first god of what would become the Pantheon. Red's constant insistence that he consult the Helix fossil for what he should do lead the chat to worship the fossil as a god.</p><p>Helix represents Anarchy, or more specifically, the style of input known as Anarchy, where every input is thrust into the emulator for it to process without bias. In this mode, an individual could affect the outcome of the stream with a single input, such as inputting DOWN when above a ledge. But with that came the unsteadiness and ham-handedness TPP has become famous for.</p><p>This input method was the first method of input in the stream. Those who worship Helix prefer Anarchy, and the more extremist followers will attempt to sabotage Democracy, such as with the famous Start9 riots. Helix and his followers are in constant fights with Dome and his.</p>",
	}),
}));

addEvent(new Event({
	name : "Deity Dome Fossil",
	sprite : "img/pkmn/!deity_dome_fossil.png",
	x: -143, y:-77,
	
	infodex_entry: new InfodexEntry({
	title: "The Pantheon",
	html: "<h1>The Dome</h1><h2>God of Democracy</h2><p>Through Helix being the God of Anarchy, Dome became by extension the God of Democracy, or more specifically, the input mode 'Democracy'.</p><p>Democracy works by taking votes for inputs for about 30 seconds and then inputting the winning vote into the emulator. This allowed precision, and a degree of finesse due to the ability to input combinations of commands to play out, but came with the downside of slow progress.</p><p>This method was introduced during the Rocket Hideout maze, when Anarchy tried and failed to solve the puzzle for a solid 24 hours. Those who follow the Dome prefer Democracy, and the more extreme attempt to sabotage Anarchy attempts at puzzles to stall the stream so Democracy is perceived to be needed. Dome and his followers are in constant fights with Helix and his.</p>",
	}),
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
	memo: "Revived by Alice from Old Amber.",
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
	
	message: "<strong>Mt. Pantheon</strong><br/>Where the Gods come to Rest",
	
	infodex_entry: new InfodexEntry({
		title: "The Pantheon",
		html: "Since the resurrection of the Helix Fossil in Red, TwitchPlaysPokemon has followed a different set of legendary gods than the games themselves. These gods form a Pantheon of Fossils, and the addition of each new set of Fossils has brought into being lesser gods beyond the Helix, the Dome, and Old Amber. Click on the gods on the mountain to learn more about the TwitchPlaysPokemon Pantheon.",
	}),
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