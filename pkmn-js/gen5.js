// gen5.js
// File for TPP Black events
//

//showTimer
showGameClock("TPP Black Game Clock<br/>", new Date(Date.UTC(2014, 06-1, 15, 0+4)));



//Dammit, we've got 5 pokemon for the park ALREADY -_-

//
// Note: Tepig is attached to the Released Starter Campfire multi-event 
// defined in the "other" events file. See there for his event definition.
//






// Jimmy!!
addEvent(new Trainer({
	name : "GMYC&nbsp;&nbsp;",
	spritesheet : "img/trainers/napoleon.png",
	x: -9, y: 13,
	
	dex : "img/pkdx/b/Spr_Pt_Lucas.png",
	sources : {
		"Lucas Sprite from Bulbapedia":"", 
	},
	
	idnum : "12339",
	nickname : "Napoleon",
	altnicks : "Nipple",
	playtime: "17d 11h 39m",
	pokedex : "52 own/206 seen",
	releasecount : "4 (+22)",
	catchcount : 0,
	e4attempts : 49,
	blackouts : 173,
	
	personality: "Napoleon hates pokemon, or he did at the start of his adventure. He is a quiet, reserved 'dandy', more concerned with keeping himself looking fabulous than any adventure at hand. He's also a habitual gambler.",
	notable: 
		"Number of Wooper Caught: 20<br/>"+
		"Number of Pokeballs Bought: 400+<br/>"+
		"Number of Times Time Traveled: 2",
	ribbons: [
		new Ribbon({ cssclass: "rb-pokerus", name: "Infected", desc: "Died from the Pokérus virus, freezing the game."}),
		new Record_Ribbon("Paradoxical: Had to load a previous save file."),
	],
	
	// info_html : 
	// 	"Number of E4 Attempts: 49<br/>"+
	// 	"Times Blacked Out: 173<br/>"+
	// 	"Number of Wooper Caught: 20<br/>"+
	// 	"Number of Times Time Traveled: 2<br/>"+
	// 	"Number of Pokeballs Bought: 400+",
	icons : [
		"img/icn/coin_case.png",
		"img/icn/air_mail.png",
		"img/icn/poke_ball.png",
		"img/icn/shiny_stone.png",
		"img/icn/contest_pass.png",
		"img/icn/sun_stone.png",
	],
	
	badge_html : "",
	
	behavior: behavior.look,
	
	dialog: [ 
		"YOU SPELLED MY NAME WRONG!!",
		"HELLO?! Anyone want to FIX MY NAME ON THIS SIGN?!?!",
		"It's <em>NA</em>poleon! NAH! As in you can DO NOTHING TO MAKE ME HAPPY ABOUT THIS!!",
		"I pay GOOD MONEY at the Game Corner and they CAN'T EVEN SPELL MY NAME RIGHT?!",
	],
	dialog_assignment: "random",
	
	// doClick : function(){
	// 	Person.fn.doClick.call(this);
	// 	this.openTrainerCard();
	// },
}));