// other.js
// File for various other events relating to TPP
// 

addEvent(new Building({
	name : "Released Starter Campfire",
	sprite : "img/bld/campfire.gif",
	x: -13, y: -31,
	
	warp_x: 24, warp_y: -6,
}));

// Creepy eyes! >:3
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
