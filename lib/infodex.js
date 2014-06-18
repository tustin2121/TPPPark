// infodex.js
// Which defines the InfoDex and it's convience functions
//

(function(){
	window.infodex = {
		_folded : false,
		_holo_on: true,
	};
	
	window.infodex.fold = function(b, holo) {
		var destAngle = -90 * !!b;
		
		if (infodex._folded == b) {
			if (infodex._holo_on != holo)
				if (holo) 
					$("#infodex .holo").fadeIn();
				else
					$("#infodex .holo").fadeOut();
			
			$("#infodex .holo").trigger("load"); //re-fire the load event to re-center the image
			infodex._holo_on = holo
			return;
		}
		
		infodex._folded = b;
		if (b) 
		{ //HIDE
			$('#infodex .sidedrop').animate({ textIndent: destAngle }, { //textindent is placeholder
				duration: 2000,
				step: function(now, fx) {
					$(this).css('-webkit-transform','rotate('+now+'deg)');
				},
			});
			$("#infodex .sheet").slideUp();
			$("#infodex .page-title").hide();
			
			if (infodex._holo_on) {
				$("#infodex .holo").fadeOut();
			}
			infodex._holo_on = false;
		} 
		else
		{ //SHOW
			$('#infodex .sidedrop').animate({ textIndent: destAngle }, { //textindent is placeholder
				duration: 800,
				step: function(now, fx) {
					$(this).css('-webkit-transform','rotate('+now+'deg)');
				},
				complete: function() {
					$("#infodex .sheet").slideDown();
					$("#infodex .page-title").show();
					
					infodex._holo_on = holo;
					if (holo) {
						$("#infodex .holo").fadeIn();
					}
				},
			});
		}
	};
	
	window.infodex.displayMainMenu = function(){
		infodex.clearInfo();
		infodex.fold(false);
		$("#infodex .page-title").text("InfoDex Menu");
		$("#infodex .sheet").html("");
	};
	
	window.infodex.clearInfo = function() {
		infodex._pokenode.detach();
		
		$("#infodex .page-title").text("");
		$("#infodex .sheet").html("");
		$("#infodex .gem").removeClass().addClass("gem");
		displaySources("infodex", null);
	};
	
	window.infodex.displayInfo = function(title, text) {
		infodex.clearInfo();
		infodex.fold(false);
		$("#infodex .page-title").text(title);
		$("#infodex .sheet").html(text);
	};
	
	window.infodex.displayPokemon = function(pkmn) {
		infodex.clearInfo();
		infodex.fold(false, true);
		$("#infodex .page-title").text("Pokemon Info");
		$("#infodex .sheet").append(infodex._pokenode);
		$("#infodex .gem").addClass("blue");
		
		$("#infodex .common-name").html(pkmn.name);
		$("#infodex .game-name").html(pkmn.gamename);
		$("#infodex .spec-name").html(pkmn.pokename);
		$("#infodex .ball").removeClass().addClass("ball").addClass(pkmn.ball);
		$("#infodex .ot").html(pkmn.OT);
		$("#infodex .memo").html(pkmn.memo);
		$("#infodex .caught").html(pkmn.caught);
		$("#infodex .nicknames").html(pkmn.nicknames);
		$("#infodex .holo img").attr("src", pkmn.dex);
		
		$("#infodex .gender").removeClass("male female");
		switch (pkmn.gender) {
			case 1: case "male":
				$("#infodex .gender").addClass("male"); break;
			case 2: case "female":
				$("#infodex .gender").addClass("female"); break;
		}
		
		displaySources("infodex", pkmn.sources);
		
		if ($.isFunction(pkmn.level)) {
			var lvl = pkmn.level();
			$("#infodex .level").text(lvl);
		} else {
			$("#infodex .level").text(pkmn.level);
		}
		
		var ribbons = $("#infodex .ribbon").empty();
		if (pkmn.ribbons)
			for (var i = 0; i < pkmn.ribbons.length; i++) {
				var rb = pkmn.ribbons[i];
				if (!(rb instanceof Ribbon)) continue;
				
				$("<section>").addClass(rb.cssclass)
					.html("<strong>" + rb.name + "</strong><br/>" + rb.desc)
					.appendTo(ribbons);
			}
		
		$("#infodex a").attr("target", "_blank");
	};
	
})();

$(function(){
	var node = $("<div>");
	node.append($("<section>").addClass("common-name"));
	node.append($("<section>").addClass("game-name"));
	node.append($("<section>").addClass("spec-name"));
	node.append($("<section>").addClass("gender"));
	node.append($("<div>").addClass("ball"));
	node.append($("<section>").addClass("level"));
	
	node.append($("<section>").addClass("ot"));
	node.append($("<section>").addClass("caught"));
	node.append($("<section>").addClass("nicknames"));
	node.append($("<section>").addClass("memo"));
	
	node.append($("<div>").addClass("ribbons"));
	
	window.infodex._pokenode = node;
});


$(function(){ //jQuery on ready : status screen setup
	$("#infodex .gem").on("vclick", function(){
		if (infodex._folded) {
			infodex.displayMainMenu();
		} else {
			infodex.clearInfo();
			infodex.fold(true);
		}
	});
	
	$("#infodex .holo img").on("load", function(e){
		var w = $("#infodex .holo").width();
		var h = $("#infodex .holo").height();
		
		$(this).css({
			"top":  h/2 - (this.height / 2),
			"left": w/2 - (this.width / 2),
		});
	});
	
});

$(function(){ //jQuery On Ready : Status Dragging
	var down_x, down_y;
	var win = $("#infodex");
	
	function dragWindow(e) {
		if (!e) return;
		
		win.css({
			left: e.pageX + down_x,
			top : e.pageY + down_y,
		});
		return false;
	}
	
	$("#infodex .topbar, #infodex .sidedrop").on("vmousedown", function(e){
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
	
	
	$("#infodex .sheet, #infodex .page-title").on("vmousedown", function(e){
		return false;
	});
});


$(function(){
	var TIPS = [
		"<p>You can move this window around by clicking and dragging either of the two solid red parts in the top left corner.</p>",
		"<p>The magnifying glass on the right side will zoom in to 2x the size. If you are using Chrome, however, this will look fuzzy due to a technical limitation.</p>",
		"<p>The pin on the right side will allow you to link to a specific location in the park.</p>",
		"<p>Warp points will light up with a red arrow if you roll over them with the mouse. They will take you to an offshoot area of the park if you click on them.</p>",
		//"<p>The Stadium holds a contest between the protagonists every Wednesday.</p>",
		"<p>The patrons in the stadium do actually bet, and they will cheer for the team they bet for.</p>",
		"<p>There's a lot more patrons in the stadium than you can see and click on. When you reload this page, they will be sitting in different places, and different ones will be visible to you.</p>",
		"<p>Have you checked out Burrito's computer? If you click on it, one of his fanfictions will appear. Every fanfiction in the computer was written by someone on the subreddit. Check the sources area for links.</p>",
		"<p>The park occasionally celebrates events, such as its memorial to Bloody Sunday every 11th day of the run.</p>",
		//"<p></p>",
		//"<p></p>",
		//"<p></p>",
		//"<p></p>",
		//"<p></p>",
	];
	
	//Tip of the Day!
	var firstTime = $.cookie("firstTime");
	
	if (firstTime) {
		infodex.displayInfo("Tip of the Day", 
			"<p>Click and drag anywhere to move around.</p>"+
			"<p>Click on things to interact or see more information.</p>"+
			"<p>What secrets can <em>you</em> find?</p>"+
			"<p>Sources for currently selected items will appear in the bottom left corner of the screen, with links if relevant.</p>");
		
		$.cookie("firstTime", { expires: 7 }); //expires in 7 days
	} else {
		var tipindex = Math.floor(Math.random() * TIPS.length);
		
		infodex.displayInfo("Tip of the Day", TIPS[tipindex]);
	}
	
});