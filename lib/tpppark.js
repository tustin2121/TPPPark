// tpppark.js

var USE_AJAX_MAP_LOADING = false;

var TILE_SIZE = 16;

function isZoomed() {
	return $("body").hasClass("x2");
}

function setZoomed(b) {
	if (b) {
		$("body").addClass("x2");
		TILE_SIZE = 32;
	} else {
		$("body").removeClass("x2");
		TILE_SIZE = 16;
	}
}

//////// The Maps! //////////

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
	
	if (USE_AJAX_MAP_LOADING) {
		$.ajax({
			url : "img/map/main_"+y+"_"+x+".png",
			dataType: "image",
			success: function(){
				_addSection("img/map/main_"+y+"_"+x+".png", x, y);
			},
			error:  function(){
				_addSection("img/map/main_missing.png", x, y);
			}
		});
	} else {
		$("<img src='img/map/main_"+y+"_"+x+".png'>").on("load", function(e){
			_addSection("img/map/main_"+y+"_"+x+".png", x, y);
		}).on("error", function(e){
			_addSection("img/map/main_missing.png", x, y)
		});
	}
	
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
loadBG.mapLimits = {minX : 0, maxX : 10, minY : 0, maxY : 6};

function centerOnTile(x, y, animate) {
	var scrw = $("body").width() / 2;
	var scrh = $("body").height() / 2;
	
	x = (x) * TILE_SIZE;
	y = (y) * TILE_SIZE;
	
	$("#anchor").animate({
		left: -x + scrw, top: -y + scrh,
	}, ((animate)? 400 : 0) );
}

function positionStatusRel(evt) {
	// var x = evt.x * TILE_SIZE;
	// var y = evt.y * TILE_SIZE;
	
}
positionStatusRel.divX = 0.5;
positionStatusRel.divYUpper = 0.4;
positionStatusRel.divYLower = 0.9;

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
	centerOnTile(8, 8, 0);
	checkLoadOverViewArea();
	
});

//////// Events ///////

var eventList = [];
var behaviorList = []; //list of events with behaviors

function addEvent(obj) {
	if (!(obj instanceof Event)) return;
	
	if (eventList) {
		//the eventlist will be set to null on ready
		eventList.push(obj);
	} else {
		var dom = obj.getDomElement();
		if (!dom) {
			console.warn("Skipping empty event: "+obj.name);
			return;
		}
		dom.css({
			top: obj.y * TILE_SIZE, 
			left: obj.x * TILE_SIZE,
			"z-index" : 10000 + obj.y,
		}).appendTo("#anchor");
		
		if (obj.behavior) {
			behaviorList.push(obj);
		}
	}
}

function fireBehaviors() {
	$.each(behaviorList, function(i, obj){
		if (!obj.behavior || !$.isFunction(obj.behavior)) return;
		obj.behavior();
	});
}

$(function(){ //Jquery On Ready
	var evlist = window.eventList;
	window.eventList = null;
	
	for (var i = 0; i < evlist.length; i++) {
		addEvent(evlist[i]);
	}
	
	setInterval(fireBehaviors, 500);
});

//////// Dialog! ////////

var dialogTimeoutId = 0;

function showDialog(str, pos, timeout) {
	clearTimeout(dialogTimeoutId);
	
	if (isZoomed()) {
		//JQuery's position() doesn't take into account zooming. Adjust.
		pos.top /= 2; pos.left /= 2;
	}
	
	$("#dialog-box").hide()
	.html(str)
	.css({
		"top" : /*$("#anchor").position().top +*/ pos.top + 20,
		"left": /*$("#anchor").position().left+*/ pos.left- 20,
	}).show(100);
	
	if (timeout) {
		dialogTimeoutId = setTimeout(hideDialog, timeout);
	}
}

function hideDialog() {
	$("#dialog-box").hide(100);
	clearTimeout(dialogTimeoutId);
}

$(function(){ //jQuery on Ready!
	$("#dialog-box").on("click", function(){
		hideDialog();
	});
});


//////// On Readys! ////////


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
	}).on("click", function(e){
		//TODO refine if we want to use it for actual events
		//currently fires every time the mouse is let up
		
		var offset = $("#anchor").position();
		offset.x = -Math.ceil((offset.left - e.pageX)/TILE_SIZE);
		offset.y = -Math.ceil((offset.top - e.pageY)/TILE_SIZE);
		
		console.log(offset.x, offset.y);
		
	}).on("mousewheel", function(e){
		e.preventDefault(); //Don't allow mouse-wheel scrolling
	})
});

///////// Status Screen //////////

$(function(){ //jQuery on ready : status screen setup
	$("#status-screen").addClass("tab1");
	
	$("#status-screen .btn-close").click(function(){
		$("#status-screen").hide();
	});
	
	$("#status-screen .sprite img").on("load", function(e){
		var w = $("#status-screen .sprite").width();
		var h = $("#status-screen .sprite").height();
		
		$(this).css({
			"top":  h/2 - (this.height / 2),
			"left": w/2 - (this.width / 2),
		});
	});
	
	$("#status-screen .btn-next").click(function(){
		var tab = $("#status-screen").attr("class");
		$("#status-screen").removeClass();
		
		switch (tab) {
			case "tab1": $("#status-screen").addClass("tab2"); break;
			case "tab2": $("#status-screen").addClass("tab3"); break;
			case "tab3": $("#status-screen").addClass("tab4"); break;
			case "tab4": $("#status-screen").addClass("tab1"); break;
			default: $("#status-screen").addClass("tab1"); break;
		}
	});
	
	$("#status-screen .btn-prev").click(function(){
		var tab = $("#status-screen").attr("class");
		$("#status-screen").removeClass();
		
		switch (tab) {
			case "tab1": $("#status-screen").addClass("tab4"); break;
			case "tab2": $("#status-screen").addClass("tab1"); break;
			case "tab3": $("#status-screen").addClass("tab2"); break;
			case "tab4": $("#status-screen").addClass("tab3"); break;
			default: $("#status-screen").addClass("tab1"); break;
		}
	});
});

$(function(){ //jQuery On Ready : Status Dragging
	var down_x, down_y;
	var win = $("#status-screen");
	
	function dragWindow(e) {
		if (!e) return;
		
		win.css({
			left: e.pageX + down_x,
			top : e.pageY + down_y,
		});
		return false;
	}
	
	$("#status-screen .topbar").on("mousedown", function(e){
		down_x = win.position().left - e.pageX;
		down_y = win.position().top - e.pageY;
		
		$("body").on("mousemove", dragWindow);
		e.preventDefault();
		e.stopPropagation();
		// return false;
	}).on("mouseup", function(e){
		$("body").off("mousemove", dragWindow);
		e.preventDefault();
		// return false;
	});
	
	
	$("#status-screen").on("mousedown", function(e){
		return false;
	});
})

////////// Trainer Card ///////////

$(function(){
	$("#trainer-card .btn-close").click(function(){
		$("#trainer-card").hide();
	});
	
	$("#trainer-card .sprite img").on("load", function(e){
		var w = $("#trainer-card .sprite").width();
		var h = $("#trainer-card .sprite").height();
		
		$(this).css({
			"bottom": 0,
			"left": w/2 - (this.width / 2),
		});
	});
	
	$("#trainer-card .icons img").on("load", function(e){
		var w = $(this).parent().width();
		var h = $(this).parent().height();
		
		$(this).css({
			"top":  h/2 - (this.height / 2),
			"left": w/2 - (this.width / 2),
		});
	});
	
	$("#trainer-card .btn-flip").click(function(){
		$("#trainer-card").toggleClass("front back");
	});
});

$(function(){ //jQuery On Ready : Trainer Card Dragging
	var down_x, down_y;
	var win = $("#trainer-card");
	
	function dragWindow(e) {
		if (!e) return;
		
		win.css({
			left: e.pageX + down_x,
			top : e.pageY + down_y,
		});
		return false;
	}
	
	$("#trainer-card .front, #trainer-card .back").on("mousedown", function(e){
		down_x = win.position().left - e.pageX;
		down_y = win.position().top - e.pageY;
		
		$("body").on("mousemove", dragWindow);
		e.preventDefault();
		e.stopPropagation();
		//return false;
	}).on("mouseup", function(e){
		$("body").off("mousemove", dragWindow);
		e.preventDefault();
		// return false;
	});
	
	
	$("#trainer-card button").on("mousedown", function(e){
		return false;
	});
})


