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
	
	infodex_entry: new InfodexEntry({
		title: "The Pantheon",
		html: function() {
			return $("<div>").append(
				$("<div>").css({
					"background-image": "url(img/pkdx/b/Fossil_Sprites.png)",
					"background-position": (-3*45)+"px 0px",
					width: 45, height: 45,
					"margin-right": 14,
					float: "left", 
				})
			).append("<h1>Old Amber</h1><h3>God of Balance</h3><p>Lesser Domains: Neutrality, Compromise</p>")
			.append("<p>Though Helix was the first god of TPP, the Dome and Old Amber followed on logically from the Helix's teachings. While Dome promoted Democracy, and Helix promotes Anarchy, Amber teaches that each method of input has its use, and followers of Amber learn the pros and cons of each method of input, and when they should be used.</p><p>A third system of input was implemented briefly during Crystal called (interchangeably) Demarchy, Sortition, or Lottery system. It took in inputs for about 0.5 to 1 seconds and then randomly picked from the set of submitted inputs. It had the randomness of Anarchy, but with a small hint of Democracy, where not all inputs would be counted. The system was short-lived, lasting only a day, to the grumblings of loyal Amberists.</p>");
		},
	}),
}));

addEvent(new Event({
	name : "Deity Helix",
	sprite : "img/pkmn/!deity_helix_pkmn.png",
	x: -147, y:-77, z: 16,
	animation: "breathe",
	
	infodex_entry: new InfodexEntry({
		title: "The Pantheon",
		html: function() {
			return $("<div>").append(
				$("<div>").css({
					"background-image": "url(img/pkdx/b/Fossil_Sprites.png)",
					"background-position": (-2*45)+"px 0px",
					width: 45, height: 45,
					"margin-right": 14,
					float: "left", 
				})
			).append("<h1>The Helix</h1><h3>God of Anarchy</h3><p>Lesser Domains: Chaos, Dance</p>")
			.append("<p>Helix was the first god of what would become the Pantheon. Red's constant insistence that he consult the Helix fossil for what he should do lead the chat to worship the fossil as a god.</p><p>Helix represents Anarchy, or more specifically, the style of input known as Anarchy, where every input is thrust into the emulator for it to process without bias. In this mode, an individual could affect the outcome of the stream with a single input, such as inputting DOWN when above a ledge. But with that came the unsteadiness and ham-handedness TPP has become famous for.</p><p>This input method was the first method of input in the stream. Those who worship Helix prefer Anarchy, and the more extremist followers will attempt to sabotage Democracy, such as with the famous Start9 riots. Helix and his followers are in constant fights with Dome and his.</p>");
		},
	}),
}));

addEvent(new Event({
	name : "Deity Dome",
	sprite : "img/pkmn/!deity_dome_pkmn.png",
	x: -143, y:-77, z: 16,
	animation: "breathe",
	
	infodex_entry: new InfodexEntry({
		title: "The Pantheon",
		html: function() {
			return $("<div>").append(
				$("<div>").css({
					"background-image": "url(img/pkdx/b/Fossil_Sprites.png)",
					"background-position": (-4*45)+"px 0px",
					width: 45, height: 45,
					"margin-right": 14,
					float: "left", 
				})
			).append("<h1>The Dome</h1><h3>God of Democracy</h3><p>Lesser Domains: Order, Sports</p>")
			.append("<p>Through Helix being the God of Anarchy, Dome became by extension the God of Democracy, or more specifically, the input mode 'Democracy'.</p><p>Democracy works by taking votes for inputs for about 30 seconds and then inputting the winning vote into the emulator. This allowed precision, and a degree of finesse due to the ability to input combinations of commands to play out, but came with the downside of slow progress.</p><p>This method was introduced during the Rocket Hideout maze, when Anarchy tried and failed to solve the puzzle for a solid 24 hours. Those who follow the Dome prefer Democracy, and the more extreme attempt to sabotage Anarchy attempts at puzzles to stall the stream so Democracy is perceived to be needed. Dome and his followers are in constant fights with Helix and his.</p>");
		},
	}),
}));

addEvent(new Event({
	name : "Deity Armor",
	sprite : "img/pkmn/!deity_shield_pkmn.png",
	x: -151, y:-74, z: 8,
	animation: "breathe",
	
	infodex_entry: new InfodexEntry({
		title: "The Pantheon",
		html: function() {
			return $("<div>").append(
				$("<div>").css({
					"background-image": "url(img/pkdx/b/Fossil_Sprites.png)",
					"background-position": (-0*45)+"px 0px",
					width: 45, height: 45,
					"margin-right": 14,
					float: "left", 
				})
			).append("<h1>Armor</h1><h3>God of Skill</h3><p>Lesser Domains: defense, skill, strategy</p>")
			.append("<p>Lord Armor and Lord Skull, both appearing in the series starting with Platinum, which was the same time the Stadium appeared, are Gods of the Stadium. While Lord Armor represents the red team, Lord Skull represents the blue.</p>");
		},
	}),
}));

addEvent(new Event({
	name : "Deity Skull",
	sprite : "img/pkmn/!deity_skull_pkmn.png",
	x: -139, y:-74, z: 8,
	animation: "breathe",
	
	infodex_entry: new InfodexEntry({
		title: "The Pantheon",
		html: function() {
			return $("<div>").append(
				$("<div>").css({
					"background-image": "url(img/pkdx/b/Fossil_Sprites.png)",
					"background-position": (-6*45)+"px 0px",
					width: 45, height: 45,
					"margin-right": 14,
					float: "left", 
				})
			).append("<h1>Skull</h1><h3>God of Luck</h3><p>Lesser Domains: offense, gambling</p>")
			.append("<p>Lord Armor and Lord Skull, both appearing in the series starting with Platinum, which was the same time the Stadium appeared, are Gods of the Stadium. While Lord Skull represents the red team, Lord Armor represents the blue.</p>");
		},
	}),
})); 

addEvent(new Event({
	name : "Deity Root",
	sprite : "img/pkmn/!deity_root_pkmn.png",
	x: -139, y:-72, z: 8,
	animation: "breathe",
	
	infodex_entry: new InfodexEntry({
		title: "The Pantheon",
		html: function() {
			return $("<div>").append(
				$("<div>").css({
					"background-image": "url(img/pkdx/b/Fossil_Sprites.png)",
					"background-position": (-5*45)+"px 0px",
					width: 45, height: 45,
					"margin-right": 14,
					float: "left", 
				})
			).append("<h1>Root</h1><h3>God of Speech</h3><p>Lesser Domains: communication, connections, earth, humor, potatoes</p>")
			.append("<p>Lord Root appeared during FireRed, around the same time that  Chat-To-Speech was implemented into the stream. He is therefore often associated with the Speech system, with potato both being a root and the most said word in the text to speech system.</p>");
		},
	}),
}));

addEvent(new Event({
	name : "Deity Claw",
	sprite : "img/pkmn/!deity_claw_pkmn.png",
	x: -151, y:-72, z: 8,
	animation: "breathe",
	
	infodex_entry: new InfodexEntry({
		title: "The Pantheon",
		html: function() {
			return $("<div>").append(
				$("<div>").css({
					"background-image": "url(img/pkdx/b/Fossil_Sprites.png)",
					"background-position": (-1*45)+"px 0px",
					width: 45, height: 45,
					"margin-right": 14,
					float: "left", 
				})
			).append("<h1>Claw</h1><h3>God of Silence</h3><p>Lesser Domains: isolation, air, contemplation, stealth</p>")
			.append("<p>The Claw Fossil first appeared in the pokemon series in the same generation as Root, and therefore the two are paired off, with Lord Claw being associated with the opposite ideals of Lore Root.</p>");
		},
	}),
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
		html: "<h1>The Pantheon</h1><p>Since the resurrection of the Helix Fossil in Red, TwitchPlaysPokemon has followed a different set of legendary gods than the games themselves. These gods form a Pantheon of Fossils, and the addition of each new set of Fossils has brought into being lesser gods beyond the Helix, the Dome, and Old Amber. Click on the gods on the mountain to learn more about the TwitchPlaysPokemon Pantheon.</p><img src='img/pkdx/b/Fossil_Sprites.png' style='width:100%' />",
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