// stadium.js
// File for the Stadium events (during TPP Platinum)
// 

//Stadium Manager GO!
(function(){
	
	
	
	
	
	
	//definitions of events!
	addEvent(new Building({
		name: "Pokemon Stadium 2 (Ext)",
		sprite: "img/bld/stadium_ext.png",
		x : 76, y : -17,
		warp_x: 176, warp_y: 368,
	}));
	
	addEvent(new Building({
		name: "Pokemon Stadium 2 (Int)",
		sprite: "img/bld/stadium_int.png",
		x : 80, y : -39,
		warp_x: 192, warp_y: 0,
	}));
	
	addEvent(new Building({
		name: "Pokemon Stadium 2 (Entrance)",
		sprite: "img/bld/stadium_entrance.png",
		x : 82, y : -14,
		warp_x: 144, warp_y: 48,
	}));
	
	//Screens: warp_x,y = 16,16
})();