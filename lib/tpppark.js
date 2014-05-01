// tpppark.js

var MAP_CENTER_X = 4;
var MAP_CENTER_Y = 4;

var loadedMaps = [];

function loadBG(x, y){
	if (loadedMaps[y] && loadedMaps[y][x]) return;
	
	x += MAP_CENTER_X; //convert forward
	y += MAP_CENTER_Y;
	
	if (loadBG.mapLimits) { //if limits are defined, shortcut
		if (y < loadBG.mapLimits.minY || y > loadBG.mapLimits.maxY
		 || x < loadBG.mapLimits.minX || x > loadBG.mapLimits.maxX) 
		{
			_addSection("img/map/main_missing.png", x, y);
			return;
		}
	} 
	
	$("<img src='img/map/main_"+y+"_"+x+".png'>").on("load", function(e){
		_addSection("img/map/main_"+y+"_"+x+".png", x, y);
	}).on("error", function(e){
		_addSection("img/map/main_missing.png", x, y)
	});
	
	function _addSection(bgimg, x, y) {
		x -= MAP_CENTER_X; //convert back
		y -= MAP_CENTER_Y;
		
		if (!loadedMaps[y]) loadedMaps[y] = [];
		loadedMaps[y][x] =
		
		$("<div>").addClass("bgsection").css({
			top: y * 256,
			left: x * 256,
			"background-image" : "url("+bgimg+")",
		}).appendTo("#anchor");
	}
}
//NOTE! If the map ever expands, CHANGE THESE!!
loadBG.mapLimits = {minX : 0, maxX : 7, minY : 0, maxY : 6};

function centerOnTile(x, y, animate) {
	var scrw = $("body").width() / 2;
	var scrh = $("body").height() / 2;
	
	x = (x+8) * 16;
	y = (y+8) * 16;
	
	$("#anchor").animate({
		left: -x + scrw, top: -y + scrh,
	}, ((animate)? 400 : 0) );
}

function checkLoadOverViewArea() {
	var scrw = $("body").width() + 256;
	var scrh = $("body").height() + 256;
	var offset = $("#anchor").position();
	
	for (var y = -offset.top; y < -offset.top + scrh; y+=256) {
		for (var x = -offset.left; x < -offset.left + scrw; x += 256) {
			var mx = Math.floor(x / 256);
			var my = Math.floor(y / 256);
			
			loadBG(mx, my);
		}
	}
	
}

$(function(){ //Jquery On Ready
	centerOnTile(0, 0, 0);
	checkLoadOverViewArea();
	
	// loadBG(0, 0);
	// loadBG(1, 0);
	// loadBG(0, 1);
	// loadBG(1, 1);
	// loadBG(-1, 0);
	// loadBG(0, -1);
	// loadBG(-1, -1);
	// loadBG(1, -1);
	// loadBG(-1, 1);
});

$(function(){ //jQuery On Ready : dragging code
	var down_x, down_y;
	var last_x, last_y;
	var anchor_x, anchor_y; //where the anchor is at start of dragging
	var anchor = $("#anchor");
	
	function dragGroundEvent(e) {
		if (!e) return;
		var delta_x = down_x - e.pageX;
		var delta_y = down_y - e.pageY;
		
		anchor.css({
			left: anchor_x - delta_x,
			top : anchor_y - delta_y,
		});
		
		checkLoadOverViewArea();
		
		last_x = e.pageX; last_y = e.pageY;
	}
	
	$("body").on("mousedown", function(e){
		down_x = e.pageX; down_y = e.pageY;
		anchor_x = anchor.offset().left;
		anchor_y = anchor.offset().top;
		
		$("body").on("mousemove", dragGroundEvent);
		e.preventDefault();
	}).on("mouseup mouseenter mouseleave", function(e){
		$("body").off("mousemove", dragGroundEvent);
		e.preventDefault();
		checkLoadOverViewArea();
	})
});