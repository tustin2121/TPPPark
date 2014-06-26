// quagmire.js
// File for the the Anarchy Quagmire
// 

//Sign
addEvent(new SignPost({
	name : "Quagmire Sign",
	x: 149, y:-265,
	
	message: "<strong>The Anarchy Quagmire</strong><br/>Don't Forget, You're Here Forever",
	
	infodex_entry: new InfodexEntry({
		title: "The Anarchy Quagmire",
		html: function(){
			return $("<div>").append('<h1>The Wild Ride</h1><h3>"I want to get off Giovanni\'s Wild Ride!</h3><p>The Anarchy Quagmire represents some of the worst puzzles TwitchPlaysPokemon has ever seen.</p>')
			.append("")
			// .append("<h3></h3><p></p>")
			;
		},
	}),
}));

addEvent(new SignPost({
	name : "Ledge Sign",
	x: 167, y:-263,
	sprite: 2,
	message: "In memory of a worthy foe: The Ledge of Route 9.",
	
	infodex_entry: new InfodexEntry({
		title: "The Anarchy Quagmire",
		html: "<h3>The Ledge</h3><p>The Ledge of Route 9 is the famous bane of TPP's Anarchy mode. There is a single row of tiles above a ledge along this route, and one stray DOWN will send us over the ledge and force us to retrace our steps back to the start of the ledge. The time it took for us to conquer the ledge is second only to the Rocket Hideout Maze, but it earns honor for being an obstacle in four separate games.</p>",
	}),
}));
addEvent(new SignPost({
	name : "Maze Sign",
	x: 144, y:-247,
	sprite: 2,
	message: "In memory of a worthy foe: The Rocket Hideout Spinning Tile Maze.",
	
	infodex_entry: new InfodexEntry({
		title: "The Anarchy Quagmire",
		html: "<h3>Mr. Giovanni's Wild Ride</h3><p>You will find the Rocket Hideout from TPP Red and TPP FireRed in the Anarchy Quagmire. This is the worst offender for terrible mazes to do in Anarchy. Both times, Anarchy was given 24 hours to complete the maze, and both times it failed to do so successfully, and Democracy was implemented. It is a sour point for any Helix supporter.</p>",
	}),
}));
addEvent(new SignPost({
	name : "Rock Sign",
	x: 162, y:-217,
	sprite: 2,
	message: "In memory of a worthy foe: The Undersea Caves.",
	
	infodex_entry: new InfodexEntry({
		title: "The Anarchy Quagmire",
		html: "<h3>The Undersea Caves</h3><p>The stones at the bottom of the quagmire need to be pushed in a specific order and in a specific direction to solve the puzzle. And to reset, you must leave the room and come back. For the same reasons as the Ice Path, this took far too long.</p>",
	}),
}));
addEvent(new SignPost({
	name : "Ice Sign",
	x: 201, y:-229,
	sprite: 2,
	message: "In memory of a worthy foe: The Ice Path.",
	
	infodex_entry: new InfodexEntry({
		title: "The Anarchy Quagmire",
		html: "<h3>Ice Path</h3><p>Ice puzzles are not easy for TPP, even with half the people knowing what path needs to be taken. One wrong move will send us flying across the puzzle to a point of no return, and with the lag and deliberate trolling, ice puzzles are tough. Pryce's gym deserves special mention in this regard, though he only took a couple attempt, the amount of time it took to try again lead to us being stuck there for many many hours.</p>",
	}),
}));
addEvent(new SignPost({
	name : "PC Sign",
	x: 178, y:-247,
	sprite: 2,
	message: "In memory of a worthy foe: The PC and Bed combo of the Weather Institute.",
	
	infodex_entry: new InfodexEntry({
		title: "The Anarchy Quagmire",
		html: '<h3>The Weather Institute</h3><p>Having been horribly scarred by the PC shuffle earlier in the run, the PC sitting next to the bed that allowed us to heal in the weather institute scared us greatly. In order to heal, we had to get in front of the PC in the top of the tiny side room this was in and then face the bed and press A to sleep in it. An A in the wrong order would result in a PC being turned on and lots of Bs and downs to attempt to get out of there. Thankfully, this was not a required "puzzle", or indeed a "puzzle" at all, and could be skipped.</p>',
	}),
}));
addEvent(new SignPost({
	name : "Grave Sign 1",
	x: 200, y:-245,
	sprite: 2,
	message: "In memory of a worthy foe: Morty's Gym<br/>Walk along the Unseen Path.",
	
	infodex_entry: new InfodexEntry({
		title: "The Anarchy Quagmire",
		html: "<h3>Morty's Gym</h3><p>Not represented here, but deserving special mention, Morty's Gym in Crystal and HeartGold also required Democracy to complete, though Anarchy managed to get up to half way through in both cases. The problem with this puzzle in particular is that if you make one wrong move, the puzzle resets you to the beginning. We made many wrong moves...</p>",
	}),
}));
addEvent(new SignPost({
	name : "Grave Sign 2",
	x: 204, y:-245,
	sprite: 2,
	message: "In memory of a worthy foe: Relic Castle<br/>Forever falling down the Quicksand Traps.",
	
	infodex_entry: new InfodexEntry({
		title: "The Anarchy Quagmire",
		html: "<h3>Relic Castle</h3><p>Not represented here, but deserving special mention, Relic Castle in TPP Black was a bane of the stream for almost 24 hours straight, and many times before that even. There are quicksand pits in the castle that suck people who run down through them to the floor below, and ever since the Running Shoes were invented, people ran everywhere. So several times, whether deliberately or by ignorance, people commanded Jimmy to run through the sand traps, causing us to be sucked down into the floor below and be forced to try again.</p>",
	}),
}));
addEvent(new SignPost({
	name : "Grave Sign 3",
	x: 208, y:-245,
	sprite: 2,
	message: "In memory of a <strike>worthy</strike> foe: The C-Gear<br/>Forever trapped in the Entralink.",
	
	infodex_entry: new InfodexEntry({
		title: "The Anarchy Quagmire",
		html: "<h3>The C-Gear</h3><p>Not represented here, the C-Gear was not a puzzle, but a constant annoyance that the stream could not overcome. It took two taps on the touch screen to use the C-Gear to take us to the Entralink, and then two hours or so to find the exit back to where we were at the time. And often times, leaving the Entralink meant returning mere moments later. It was a obstacle that was always present and couldn't be turned off for long.</p><p>The stream could not beat the C-Gear, and the Streamer disabled it after almost 24 hours via a Action Replay cheat discovered by /u/tustin2121, so the TPP Black run could continue unhindered. We made over 30 trips to the Entralink from the time we acquired the C-Gear till the time it was disabled.</p>",
	}),
}));



//Warp Points
// addEvent(new WarpTile({
// 	name : "To Quagmire Warp 1",
// 	x: 100, y:-37,
// 	warp_to_x: 160, warp_to_y: -247,
// }));
addEvent(new WarpTile({
	name : "To Quagmire Warp 2",
	x: 101, y:-37,
	warp_to_x: 160, warp_to_y: -247,
}));

addEvent(new WarpTile({
	name : "From Quagmire Warp 1",
	x: 150, y: -267,
	warp_to_x: 83, warp_to_y: -24,
}));
addEvent(new WarpTile({
	name : "From Quagmire Warp 2",
	x: 151, y: -267,
	warp_to_x: 83, warp_to_y: -24,
}));