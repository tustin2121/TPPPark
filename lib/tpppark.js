// tpppark.js

var USE_AJAX_MAP_LOADING = false;
var ZBASE = 10000;

var TILE_SIZE = 16;

function isZoomed() {
	return $("body").hasClass("x2");
}

function setZoomed(b) {
	if (b) {
		$("body").addClass("x2");
		TILE_SIZE = 32;
		
		if (!CSS.supports("image-rendering") || !CSS.supports("-ms-interpolation-mode")) {
			displayFootnote("Your browser does not support properly rendering the zoomed view "+
				"of TPPPark. Your image may appear blurry. Browsers with known support: Firefox, "+
				"IE, Opera (Not Chrome, annoyingly).");
		}
		
	} else {
		$("body").removeClass("x2");
		TILE_SIZE = 16;
		
		displayFootnote();
	}
}

function displayFootnote(str) {
	if (str) {
		$("#ui .footnote").html(str).slideDown();
	} else {
		$("#ui .footnote").slideUp();
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
		var ret = loadBG.mapLimits(x, y);
		if (ret === false) {
			_addSection("img/map/main_missing.png", x, y);
			return;
		} else if (typeof ret == "string") {
			_addSection("img/map/"+ret+".png", x, y);
			return;
		} //else, continue
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
//NOTE! If the map ever expands, CHANGE THIS!!
loadBG.mapLimits = function(x, y){
	if (y >=  0 && y <=  6 && x >=  0 && x <=  7) return true; //Main Park
	if (y >=  1 && y <=  4 && x >=  4 && x <= 10) return true; //Stadium Clearing
	if (y >= -1 && y <=  0 && x >= -6 && x <= -5) return true; //Mt Pantheon
	if (y >=-13 && y <=-11 && x >= 12 && x <= 15) return true; //Anarchy Quagmire
	
	if (y == 10) return "missing_waters_edge_"+(((x%4)+4)%4);
	if (y > 10) return "missing_water";
	return false; //normal forests
}

function centerOnTile(x, y, animate) {
	var scrw = $("body").width() / 2;
	var scrh = $("body").height() / 2;
	
	x = (x) * TILE_SIZE;
	y = (y) * TILE_SIZE;
	
	if (typeof animate != "number")
		animate = (animate)? 3000:0;
	
	$("#anchor").animate({
		left: -x + scrw, top: -y + scrh,
	}, { 
		duration: animate,
		progress : function(p, percent) {
			checkLoadOverViewArea();
		}
	});
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

//////// Hash Linking! /////////

var currHash = null;

function checkHash(){
	var hash = window.location.hash.substr(1);
	if (currHash == hash) return;
	
	currHash = hash;
	
	var kvpairs = currHash.split("&");
	for (var i = 0; i < kvpairs.length; i++) {
		var kv = kvpairs[i].split("=");
		switch(kv[0]){
			case "loc": {
				if (!/^(-?\d+),(-?\d+)$/.test(kv[1])) continue;
				var l = kv[1].split(",");
				// if ($("start-skrim").css("opacity") == 1)
				// 	centerOnTile(l[0], l[1], false); //jump if hidden?
				// else
					centerOnTile(l[0], l[1], 2000);
			} break;
		}
	}
}

$(function(){
	$(window).on("hashchange", checkHash);
	
	checkHash();
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
			"z-index" : ZBASE + obj.y,
		}).appendTo("#anchor");
		
		dom.find(".reflection").parent().css("z-index", -100000 + obj.y);
		
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
	$("#dialog-box").on("vclick", function(){
		hideDialog();
	});
});


//////// On Readys! ////////
var isDragging = 0;
var clickmode = 0; //0 = normal, 1 = placing pin

$(function(){ //jQuery On Ready : dragging code
	var down_x, down_y;
	var last_x, last_y;
	var anchor_x, anchor_y; //where the anchor is at start of dragging
	var anchor = $("#anchor");
	
	function dragGroundEvent(e) {
		if (!e) return;
		var delta_x = down_x - e.pageX;
		var delta_y = down_y - e.pageY;
		
		if (Math.abs(delta_x) > 10 || Math.abs(delta_y) > 10) 
			isDragging++;
		
		anchor.stop().css({ //stop any animations going
			left: anchor_x - delta_x,
			top : anchor_y - delta_y,
		});
		
		checkLoadOverViewArea();
		
		last_x = e.pageX; last_y = e.pageY;
	}
	
	$("body").on("vmousedown", function(e){
		down_x = e.pageX; down_y = e.pageY;
		anchor_x = anchor.offset().left;
		anchor_y = anchor.offset().top;
		isDragging = 0;
		
		$("body").on("vmousemove", dragGroundEvent);
		e.preventDefault();
		
	}).on("vmouseup mouseenter mouseleave", function(e){
		$("body").off("vmousemove", dragGroundEvent);
		e.preventDefault();
		checkLoadOverViewArea();
		
	}).on("mousewheel", function(e){
		e.preventDefault(); //Don't allow mouse-wheel scrolling
	})
	
	//And some specifically mobile code:
	$(document).on("touchmove", function(e){
		e.preventDefault(); //don't allow in browser scrolling when dragging on the ground
	});
	// $(".ui.sidebar").on("touchmove", function(e){
	// 	e.stopPropagation(); //but do allow it on the sidebar
	// });
});

$(function(){ //On Ready : ui hooks
	
	$("#uibtn-center").on("vclick", function(){
		centerOnTile(8, 8, true);
		return false;
	});
	
	$("#uibtn-zoom").on("vclick", function(){
		var centerX = $("body").width()/2;
		var centerY = $("body").height()/2;
		
		var offset = $("#anchor").position();
		offset.x = -Math.ceil((offset.left - centerX)/TILE_SIZE);
		offset.y = -Math.ceil((offset.top - centerY)/TILE_SIZE);
		
		if (isZoomed()) {
			setZoomed(false);
			$("#uibtn-zoom").attr("src", "img/ui/zoom-in.png");
		} else {
			setZoomed(true);
			$("#uibtn-zoom").attr("src", "img/ui/zoom-out.png");
		}
		
		centerOnTile(offset.x, offset.y);
		return false;
	});
});

$(function(){
	var pinEvent = new Event({
		name : "<Pin Event>",
		x: 8, y: 8,
		sprite: "img/ui/pin.png",
		
		hidePin : function(){
			this.domElement.find(".main").hide();
		},
		
		plopPin: function(){
			var img = this.domElement.find(".main");
			
			img.css("bottom", 16).fadeIn(400).animate({
				bottom: 20,
			}, 200).animate({
				bottom: 0,
			}, { duration: 500, easing: 'easeInCubic' });
		},
		
		showBorder: function(b){
			if (b) {
				this.domElement.css({
					border: "1px black solid",
					margin: "1px",
				});
			} else {
				this.domElement.css({
					border: "0px black solid",
					margin: "0px",
				});
			}
		},
		
		doClick: function(e) {
			var offset = $("#anchor").position();
			offset.x = -Math.ceil((offset.left - e.pageX)/TILE_SIZE);
			offset.y = -Math.ceil((offset.top - e.pageY)/TILE_SIZE);
			
			pinEvent.domElement.css({
				left: offset.x*16, top: offset.y*16,
			});
			
			pinEvent.showBorder(false);
			pinEvent.plopPin();
			
			console.log(offset.x, offset.y);
			clickmode = 0;
			window.location.hash = "loc="+offset.x+","+offset.y;
			$("body").off("mousemove", pickSquareEvent);
		}
	});
	addEvent(pinEvent);
	
	pinEvent.hidePin();
	
	//Placing Pins!
	$("#uibtn-pin").on("click", function(){
		if (clickmode == 0) {
			clickmode = 1;
			
			pinEvent.hidePin();
			pinEvent.showBorder(true);
			
			$("body").on("mousemove", pickSquareEvent);
		} else {
			clickmode = 0;
			
			pinEvent.showBorder(false);
			window.location.hash = "";
			
			$("body").off("mousemove", pickSquareEvent);
		}
		return false;
	}).on("tap", function(){
		displayFootnote("Pinning is not supported on touch-driven devices;"+
			" too many bugs to work properly.");
		
		setTimeout(function(){
			displayFootnote(false);
		}, 5000);
		return false;
	});
	
	$("body").on("click", function(e){
		if (isDragging || clickmode != 1) return true;
		
		//PLACE PIN!
		pinEvent.doClick(e);
	});
	
	function pickSquareEvent(e){
		if (!e) return;
		
		var offset = $("#anchor").position();
		offset.x = -Math.ceil((offset.left - e.pageX)/TILE_SIZE);
		offset.y = -Math.ceil((offset.top - e.pageY)/TILE_SIZE);
		
		pinEvent.domElement.css({
			left: offset.x*16, top: offset.y*16,
		});
	}	
});


//Bottom sources
function displaySources(sclass, sourceArr) {
	if (sourceArr == null) {
		$("#curr-sources > ."+sclass).remove();
		return;
	}
	
	var sources = "";
		
	$.each(sourceArr, function(key, val){
		if (/^http:\/\//.test(val)) {
			sources += "<a target='_blank' href='"+val+"'>"+key+"</a><br/>";
		} else {
			console.warn("Source for '"+key+"' is not an http link! ==> "+val);
			sources += key + ": "+val+"<br/>";
		}
	});
	
	// if (!sources) console.error("No sources listed for event: "+this.name);
	
	if (!$("#curr-sources > ."+sclass).length) 
		$("#curr-sources").append("<span class='"+sclass+"'></span>");
	$("#curr-sources > ."+sclass).html(sources);
	// $("#status-screen .sources").html(sources);
}

///////// Status Screen //////////

$(function(){ //jQuery on ready : status screen setup
	$("#status-screen").addClass("tab1");
	
	$("#status-screen .btn-close").on("vclick", function(){
		$("#status-screen").hide();
		displaySources("pkmn", null);
	});
	
	$("#status-screen .sprite img").on("load", function(e){
		var w = $("#status-screen .sprite").width();
		var h = $("#status-screen .sprite").height();
		
		$(this).css({
			"top":  h/2 - (this.height / 2),
			"left": w/2 - (this.width / 2),
		});
	});
	
	$("#status-screen .btn-next").on("vclick", function(){
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
	
	$("#status-screen .btn-prev").on("vclick", function(){
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
	
	$("#status-screen .topbar").on("vmousedown", function(e){
		down_x = win.position().left - e.pageX;
		down_y = win.position().top - e.pageY;
		
		$("body").on("vmousemove", dragWindow);
		e.preventDefault();
		e.stopPropagation();
		// return false;
	}).on("vmouseup", function(e){
		$("body").off("vmousemove", dragWindow);
		e.preventDefault();
		// return false;
	});
	
	
	$("#status-screen").on("vmousedown", function(e){
		return false;
	});
})

////////// Trainer Card ///////////

$(function(){
	$("#trainer-card .btn-close").on("vclick", function(){
		$("#trainer-card").hide();
		displaySources("trainer", null);
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
	
	$("#trainer-card .btn-flip").on("vclick", function(){
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
	
	$("#trainer-card .front, #trainer-card .back").on("vmousedown", function(e){
		down_x = win.position().left - e.pageX;
		down_y = win.position().top - e.pageY;
		
		$("body").on("vmousemove", dragWindow);
		e.preventDefault();
		e.stopPropagation();
		//return false;
	}).on("vmouseup", function(e){
		$("body").off("vmousemove", dragWindow);
		e.preventDefault();
		// return false;
	});
	
	
	$("#trainer-card button").on("vmousedown", function(e){
		return false;
	});
})

////////////// Intro Sequence //////////////

$(function(){
	var initialDone = $.cookie("initialIntro");
	
	if (!initialDone) { //don't do the initial intro again if it can be helped
		$("#start-screen").hide().fadeIn(2000).delay(7000).fadeOut(3000);
		$("#start-screen img").hide().delay(4000).fadeIn(2000);
		$("#start-skrim").delay(8000).fadeOut(3000);
		
		$.cookie("initialIntro", "done");
	} else {
		$("#start-screen").delay(1500).fadeOut(3000);
		$("#start-skrim").delay(500).fadeOut(3000);
	}
	
});
