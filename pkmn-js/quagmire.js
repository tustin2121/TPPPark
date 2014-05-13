// quagmire.js
// File for the the Anarchy Quagmire
// 

//Sign
addEvent(new SignPost({
	name : "Quagmire Sign",
	x: 149, y:-265,
	
	message: "<strong>The Anarchy Quagmire</strong><br/>Remember, You're Here Forever",
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
	warp_to_x: 83, warp_to_y: 24,
}));