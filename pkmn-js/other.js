// other.js
// File for various other events relating to TPP
// 

//////////////////// Starter Campfire ///////////////////////

addEvent(new Building({
	name : "Released Starter Campfire Base",
	sprite : "img/bld/campfire.gif",
	x: -13, y: -31,
	
	warp_x: 24, warp_y: -6,
}));

addEvent(new MultiEvent({
	name : "Released Starter Campfire Pokemon",
	sprite : "img/pkmn/campfire_pokes.gif",
	x: -13, y: -29,
	
	adj_x: -5, adj_y: 5,
	
}).addSubEvent("34,2,64,24", new Pokemon({
	name : "Chimchar",
	sprite: "img/pkmn/chimchar.png",
	x: -12, y: -29,
	
	dex : "http://cdn.bulbagarden.net/upload/8/80/Spr_4p_390.png",
	sources : {
		"Pokedex Image from Bulbapedia" : "",
	},
	
	OT: "nqpppnl",
	gender: 2,
	gamename : "Chimchar",
	pokename : "Chimchar",
	nicknames : "LazorApe",
	level : 15,
	// memo : "",
	
	ribbons : [
		new Starter_Ribbon(),
		new Released_Ribbon("0d 12h 33m"),
		new Record_Ribbon("Fastest Released Starter"),
	],
})).addSubEvent("56,24,72,42", new Pokemon({
	name: "Zexy",
	sprite: "img/pkmn/zexxy.png",
	x : -14, y : -29,
	
	dex : "img/pkdx/emdex_zexy.png",
	sources : {
		"Pokedex Image by /u/NoPenNameGirl" : "http://www.reddit.com/r/twitchplayspokemon/comments/22d7zw/request_done_zexy_the_torchic_sprite/",
	},
		
	OT: "<strike>M</strike>Ay",
	gender: 1,
	gamename : "zyyxyy",
	pokename : "Torchic",
	level : 38,
	ribbons : [
		new Starter_Ribbon(),
		new Released_Ribbon("3d 23h 9m"),
	],
})).addSubEvent("2,19,32,41", new Pokemon({
	name: "Abby",
	sprite: "img/pkmn/abby-gen1.png",
	x : -13, y : -30,
	
	dex : "img/pkdx/tpp9_abby.gif",
	sources : {
		"Pokedex Image by /u/Fiirewaffle" : "http://hamigakimomo.tumblr.com/post/78067393358/ive-updated-omanytes-sprite-to-omastar-i-also",
		"Sprite by /u/carlotta4th" : "http://www.reddit.com/r/twitchplayspokemon/comments/1yx0gx/i_madealtered_flairs_suggestions_or_corrections/",
	},
		
	OT: "Red",
	gamename : "ABBBBBBK",
	pokename : "Charmeleon",
	level : 34,
	ribbons : [
		new Starter_Ribbon(),
		new Released_Ribbon("4d 8h 53m"),
	],
})));

///////////////// Train Station ////////////////////
// I like trains!

addEvent(new Building({
	name: "Train Station",
	sprite: "img/bld/train_station.png",
	x: -19, y: 60,
	
	warp_x: 128, warp_y: 144,
}));

addEvent(new Event({
	name: "Train",
	sprite: "img/bld/train.png",
	x: -15, y: 58, z: -8,
	
	is_stopped : false, //if the train is stopped permenantly at the station
	
	activeZone : function(load) {
		if (this.is_stopped) return false;
		var res = !(load.bottom < 56 || load.top > 61);
		if (!res && this.nowRunning) {
			this.nowRunning = false;
			this.domElement.hide();
		}
		return res;
	},
	
	lastRun : -1,
	nowRunning : false,
	actTimer : 0,
	behavior: function(){
		if (--this.actTimer > 0) return;
		if (this.is_stopped) return;
		if (!this.nowRunning) {
			this.domElement.hide();
			
			var date = new Date();
			var hour = date.getHours();
			var min = date.getMinutes();
			//run on the hour (up to 5 minutes after) and only once per hour
			if (min > 5 || hour == this.lastRun) {
				this.actTimer = 120;
				return;
			}
			
			//We want to run, place train just off the left side of the screen
			var offset = $("#anchor").position();
			this.domElement.css("left", -offset.left - 256).show();
			
			this.lastRun = hour;
			this.nowRunning = true;
			this.actTimer = -1;
			console.log("Train now running!");
		}
		
		if (this.nowRunning) {
			var xloc = this.domElement.position().left;
			this.domElement.stop().animate({
				"left" : xloc + 128,
			}, {
				duration: 500,
				easing: 'linear',
			});
			
			var offset = $("#anchor").position();
			var scrw = $("body").width() + 512;
			if (xloc > -offset.left + scrw) {
				this.domElement.hide();
				this.nowRunning = false;
				this.actTimer = 60;
			}
		}
	},
}));

/////////////////// Shiny House ///////////////////

addEvent(new Building({
	name : "Shiny House",
	sprite : "img/bld/shiny2.png",
	x: -38, y: -13,
	
	warp_x: 32, warp_y: 54,
}));

//////////////////// Misc Signs! //////////////////

addEvent(new SignPost({
	name : "Park Sign",
	x: 5, y: 9,
}));


//////////////// Creepy Eyes! >:3 ////////////////////
addEvent(new Event({
	name : "Cave Eyes",
	sprite : "img/pkmn/cave_eyes.png",
	x: -20, y: -36, z: 0,
	
	doClick : function() {
		var eyes = $(this.domElement).find("img.main");
		eyes.delay(1400) //blink eyes
			.hide(10).delay(100).show(10).delay(100)
			.hide(10).delay(100).show(10).delay(100)
			.delay(600)
			.hide(200);
		
		this.doClick = function(){}; //remove this function
	},
}));


//SHIPPING APP!
/*
The shipping app is the "Matchup App" from Platinum, where you can select two
pokemon and see if they're compatable for breeding. Here, we're going to show off
some of the OTPs of TPP.

Four levels: "OTP", "Shipping", "Interest", and "NOPE!" indicating how shipped they are

-- OTP --
Joey + AJ
M4 + Zexxy

-- Shipping --
M4 + C3   (C3 -> M4)
Mightydoge + BirdCop

-- Interest --



-- NOPE! --
(Any others)

*/
