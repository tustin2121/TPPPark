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
					$("#infodex .holo").slideDown();
				else
					$("#infodex .holo").slideUp();
			
			//$("#infodex .holo img").triggerHandler("load"); //re-fire the load event to re-center the image
			infodex._holo_on = holo;
			return;
		}
		
		infodex._folded = b;
		if (b) 
		{ //HIDE
			$('#infodex .sidedrop').stop(true).animate({ textIndent: destAngle }, { //textindent is placeholder
				duration: 2000,
				step: function(now, fx) {
					$(this).css('-webkit-transform','rotate('+now+'deg)');
				},
			});
			$("#infodex .sheet").slideUp();
			$("#infodex .page-title").hide();
			$("#infodex .tabs").slideUp();
			$("#infodex .gem").removeClass().addClass("gem");
			
			if (infodex._holo_on) {
				$("#infodex .holo").slideUp();
			}
			infodex._holo_on = false;
		} 
		else
		{ //SHOW
			$('#infodex .sidedrop').stop(true).animate({ textIndent: destAngle }, { //textindent is placeholder
				duration: 600,
				step: function(now, fx) {
					$(this).css('transform','rotate('+now+'deg)');
					$(this).css('-ms-transform','rotate('+now+'deg)');
					$(this).css('-webkit-transform','rotate('+now+'deg)');
				},
				complete: function() {
					$("#infodex .sheet").slideDown();
					$("#infodex .page-title").show();
					$("#infodex .tabs").slideDown();
					
					infodex._holo_on = holo;
					if (holo) {
						$("#infodex .holo").slideDown();
						$("#infodex .holo .sprite").stop(true).css({ height : 1, });
						$("#infodex .holo img").triggerHandler("load"); //re-fire the load event to re-center the image
					}
				},
			});
		}
	};
	
	window.infodex.displayMainMenu = function(){
		infodex.clearInfo();
		infodex.fold(false);
		$("#infodex .page-title").text("InfoDex Menu");
		$("#infodex .sheet").append(infodex._menunode);
		infodex._menunode._showNode({data: "main"});
	};
	
	window.infodex.clearInfo = function() {
		infodex._pokenode.detach();
		infodex._menunode.detach();
		
		$("#infodex .page-title").text("");
		$("#infodex .sheet").html("");
		$("#infodex .gem").removeClass().addClass("gem");
		$("#infodex .tabs").empty();
		displaySources("infodex", null);
	};
	
	window.infodex.changeHolo = function(img) {
		$("#infodex .holo .sprite").stop(true).css({ height : 1, });
		$("#infodex .holo .sprite img").attr("src", img);
	}
	
	window.infodex.displayInfo = function(opts) {
		infodex.clearInfo();
		infodex.fold(false, !!opts.sprite);
		$("#infodex .page-title").text(opts.title || "Information");
		$("#infodex .sheet").html(opts.html);
		
		if (opts.gem) $("#infodex .gem").addClass(opts.gem);
		
		infodex.changeHolo(opts.sprite);
	};
	
	window.infodex.displayTip = function(text) {
		infodex.clearInfo();
		infodex.fold(false, false);
		$("#infodex .page-title").text("Tip of the Day");
		$("#infodex .sheet").html(text).append(
			$("<a>").attr("href", "#").text("< Main Menu")
				.on("vclick", function(){ infodex.displayMainMenu(); return false; })
				.wrap("<p>").parent()
		);
	};
	
	window.infodex.displayPokemon = function(pkmn) {
		infodex.clearInfo();
		infodex.fold(false, true);
		$("#infodex .page-title").text("Pokemon Info");
		$("#infodex .sheet").append(infodex._pokenode);
		$("#infodex .gem").addClass("blue");
		
		displaySources("infodex", pkmn.sources);
		
		infodex.changeHolo(pkmn.dex);
		
		{// Info Tab
			$("#infodex .common-name").html(pkmn.name);
			$("#infodex .game-name").html(pkmn.gamename);
			$("#infodex .spec-name").html(pkmn.pokename);
			$("#infodex .ball").removeClass().addClass("ball").addClass(pkmn.ball);
			$("#infodex .ot").html(pkmn.OT);
			$("#infodex .memo").html(pkmn.memo);
			$("#infodex .caught").html(pkmn.caught);
			$("#infodex .nicknames").html(pkmn.nicknames);
			
			$("#infodex .gender").removeClass("male female");
			switch (pkmn.gender) {
				case 1: case "male":
					$("#infodex .gender").addClass("male"); break;
				case 2: case "female":
					$("#infodex .gender").addClass("female"); break;
			}
			
			if ($.isFunction(pkmn.level)) {
				var lvl = pkmn.level();
				$("#infodex .level").text(lvl);
			} else {
				$("#infodex .level").text(pkmn.level);
			}
			
			var ribbons = $("#infodex .ribbons").empty();
			if (pkmn.ribbons)
				for (var i = 0; i < pkmn.ribbons.length; i++) {
					var rb = pkmn.ribbons[i];
					if (!(rb instanceof Ribbon)) continue;
					
					$("<ribbon>").addClass(rb.cssclass)
						.html("<strong>" + rb.name + "</strong><br/>" + rb.desc)
						.appendTo(ribbons);
				}
		}
		{
			var firsttab;
			
			$("#infodex .tabs").append(firsttab =
				$("<div>").text("Info").on("vmousedown", function(){
					$("#infodex .pokeinfo > div").hide();
					$("#infodex .pokeinfo .info").show();
					$("#infodex .tabs div").removeClass();
					$(this).addClass("selected");
				})
			);
			
			$("#infodex .tabs").append(
				$("<div>").text("Lore").on("vmousedown", function(){
					$("#infodex .pokeinfo > div").hide();
					$("#infodex .pokeinfo .lore").show();
					$("#infodex .tabs div").removeClass();
					$(this).addClass("selected");
				})
			);
			
			firsttab.triggerHandler("vmousedown");
		}
		
		$("#infodex a").attr("target", "_blank");
	};
	
	window.infodex.displayTrainer = function(trainer) {
		infodex.clearInfo();
		infodex.fold(false, true);
		$("#infodex .page-title").text("Trainer Info");
		$("#infodex .sheet").append(infodex._trainernode);
		$("#infodex .gem").addClass("green");
		
		displaySources("infodex", trainer.sources);
		
		infodex.changeHolo(trainer.dex);
		
		{// Info Tab
			$("#infodex .name").html(trainer.name);
			$("#infodex .trainerid").html(trainer.idnum);
			$("#infodex .nickname").html(trainer.nickname);
			$("#infodex .altnicks").html(trainer.altnicks);
			
			$("#infodex .playtime").html(trainer.playtime);
			$("#infodex .pkdx").html(trainer.pokedex);
			$("#infodex .released").html(trainer.releasecount);
			$("#infodex .caught").html(trainer.catchcount);
			$("#infodex .e4attempts").html(trainer.e4attempts);
			$("#infodex .blackouts").html(trainer.blackouts);
			
			$("#infodex .personality").html(trainer.personality);
			$("#infodex .notable").html(trainer.notable);
			
		//	$("#infodex .gender").removeClass("male female");
		//	switch (trainer.gender) {
		//		case 1: case "male":
		//			$("#infodex .gender").addClass("male"); break;
		//		case 2: case "female":
		//			$("#infodex .gender").addClass("female"); break;
		//	}
			
			var ribbons = $("#infodex .ribbons").empty();
			if (trainer.ribbons)
				for (var i = 0; i < trainer.ribbons.length; i++) {
					var rb = trainer.ribbons[i];
					if (!(rb instanceof Ribbon)) continue;
					
					$("<ribbon>").addClass(rb.cssclass)
						.html("<strong>" + rb.name + "</strong><br/>" + rb.desc)
						.appendTo(ribbons);
				}
		}{
			var icons = $("#infodex .icons").empty();
			if (trainer.icons)
				for (var i = 0; i < trainer.icons.length; i++) {
					var rb = trainer.icons[i];
					if (!(rb instanceof Ribbon)) continue;
					
					$("<ribbon>").addClass(rb.cssclass)
						.html("<strong>" + rb.name + "</strong><br/>" + rb.desc)
						.appendTo(icons);
				}
			
			var badges = $("#infodex .badges").empty();
			if (trainer.badges)
				for (var i = 0; i < trainer.badges.length; i++) {
					var rb = trainer.badges[i];
					if (!(rb instanceof Ribbon)) continue;
					
					$("<ribbon>").addClass(rb.cssclass)
						.html("<strong>" + rb.name + "</strong><br/>" + rb.desc)
						.appendTo(badges);
				}
		}{
			var firsttab;
			
		 	function showNode(e){
				$("#infodex .trainerinfo > div").hide();
				$("#infodex .trainerinfo ."+e.data).show();
				$("#infodex .tabs div").removeClass();
				$(this).addClass("selected");
			}
			
			$("#infodex .tabs").append(firsttab =
				$("<div>").text("Info").on("vmousedown", null, "info", showNode)
			);
			$("#infodex .tabs").append(
				$("<div>").text("Badges").on("vmousedown", null, "badges", showNode)
			);
			$("#infodex .tabs").append(
				$("<div>").text("Lore").on("vmousedown", null, "lore", showNode)
			);
			
			firsttab.triggerHandler("vmousedown");
		}
	};
	
	window.infodex.displayTPPer = function(tpper) {
		infodex.clearInfo();
		infodex.fold(false, true);
		$("#infodex .page-title").text("Community Member");
		$("#infodex .sheet").append(infodex._trainernode);
		$("#infodex .gem").addClass("red");
		
		//TODO
	}
	
})();

$(function(){
	var node = $("<div>").addClass("pokeinfo");
	
	{
		var infonode = $("<div>").addClass("info");
		node.append(infonode);
		
		infonode.append($("<section>").addClass("common-name"));
		infonode.append($("<section>").addClass("nicknames"));
		infonode.append($("<div>").addClass("spacer"));
		
		infonode.append($("<section>").addClass("gender"));
		infonode.append($("<section>").addClass("game-name"));
		infonode.append($("<section>").addClass("spec-name"));
		
		infonode.append($("<section>").addClass("level"));
		infonode.append(
			$("<section>").addClass("ballwrap").append(
				$("<div>").addClass("ball")
			)
		);
		infonode.append($("<section>").addClass("ot"));
		infonode.append($("<div>").addClass("spacer"));
		
		infonode.append($("<section>").addClass("caught"));
		infonode.append($("<section>").addClass("memo"));
		
		infonode.append($("<div>").addClass("spacer"));
		infonode.append($("<div>").addClass("ribbons"));
	}{
		var lorenode = $("<div>").addClass("lore");
		node.append(lorenode);
		
		lorenode.text("<Nothing here yet>");
	}
	
	window.infodex._pokenode = node;
});

$(function(){
	var node = $("<div>").addClass("trainerinfo");
	
	{
		var infonode = $("<div>").addClass("info");
		node.append(infonode);
		
		infonode.append($("<section>").addClass("trainerid"));
		infonode.append($("<section>").addClass("name"));
		infonode.append($("<section>").addClass("nickname"));
		infonode.append($("<section>").addClass("altnicks"));
		infonode.append($("<div>").addClass("spacer"));
		
		infonode.append($("<section>").addClass("playtime"));
		infonode.append($("<section>").addClass("pkdx"));
		
		infonode.append($("<section>").addClass("released"));
		infonode.append($("<section>").addClass("caught"));
		
		infonode.append($("<section>").addClass("e4attempts"));
		infonode.append($("<section>").addClass("blackouts"));
		
		infonode.append($("<div>").addClass("spacer"));
		
		infonode.append($("<section>").addClass("personality"));
		infonode.append($("<section>").addClass("notable"));
		
		infonode.append($("<div>").addClass("spacer"));
		infonode.append($("<div>").addClass("ribbons"));
	}{
		var snode = $("<div>").addClass("badges");
		node.append(snode);
		
		//icons of the run, with small descriptions of each, like ribbons
		
		//actual badges of the run
		//size needs to be limited, esp for Crystal and HeartGold
		
		snode.text("<Nothing here yet>");
	}{
		var snode = $("<div>").addClass("lore");
		node.append(snode);
		
		snode.text("<Nothing here yet>");
	}
	
	window.infodex._trainernode = node;
});

$(function(){
	var node = $("<div>").addClass("mainmenu");
	
	function showNode(e) {
		$("#infodex .mainmenu > div").hide();
		$("#infodex .mainmenu > ."+e.data).show();
		
		if (e.preventDefault)
			e.preventDefault();
	}
	
	{
		var snode = $("<div>").addClass("main");
		node.append(snode);
		
		snode.append($("<p>").text("Thank you for choosing the InfoDex 110. Please select from the following list of options, or click on something in the park for more information. Click the gem in the top corner to close or open the InfoDex."));
		var menulist = $("<ul>");
		snode.append(menulist)
		
		menulist.append(
			$("<a>").text("Help Menu").on("vclick", null, "help", showNode)
				.attr("href", "#").wrap("<li>").parent()
		);
		menulist.append(
			$("<a>").text("List of Interesting Locations").on("vclick", null, "jump", showNode)
				.attr("href", "#").wrap("<li>").parent()
		);
		menulist.append(
			$("<a>").text("Update Message Archive").on("vclick", null, "update", showNode)
				.attr("href", "#").wrap("<li>").parent()
		);
	}
	
	{
		var snode = $("<div>").addClass("help");
		node.append(snode);
		
		snode.text("This section is currently incomplete. We're sorry for the inconvience.");
		snode.prepend($("<a>").text("< Return to Main Menu").on("vclick", null, "main", showNode).attr("href", "#").wrap("<p>").parent());
	}
	
	{
		var snode = $("<div>").addClass("jump");
		node.append(snode);
		
		snode.prepend($("<a>").text("< Main Menu").on("vclick", null, "main", showNode).attr("href", "#").wrap("<p>").parent());
		
		snode.append($("<p>").text("Click the following links to jump to a common point of interest."));
		var menulist = $("<ul>");
		snode.append(menulist)
		
		menulist.append(
			$("<a>").text("The Church of Helix").attr("href", "#loc=8,8").wrap("<li>").parent()
		);
		menulist.append(
			$("<a>").text("Pokemon Stadium").attr("href", "#loc=82,-27").wrap("<li>").parent()
		);
		menulist.append(
			$("<a>").text("Community Center").attr("href", "#loc=126,9").wrap("<li>").parent()
		);
		menulist.append(
			$("<a>").text("Anarchy Quagmire").attr("href", "#loc=159,-248").wrap("<li>").parent()
		);
	}
	
	{
		infodex.__updateIndex = 0;
		
		var snode = $("<div>").addClass("update");
		node.append(snode);
		
		//snode.text("This section is currently incomplete. We're sorry for the inconvience.");
		snode.append( $("<a>").text("< Main Menu").on("vclick", null, "main", showNode).attr("href", "#").wrap("<p>").parent() );
		
	}
	
	node._showNode = showNode;
	
	window.infodex._menunode = node;
});


$(function(){ //jQuery on ready : status screen setup
	$("#infodex .gem").on("vclick", function(){
		if (infodex._folded) {
			infodex.displayMainMenu();
		} else {
			// infodex.clearInfo();
			infodex.fold(true);
		}
	});
	
	$("#infodex .holo img").on("load", function(e){
		var w = $("#infodex .holo").width();
		var h = $("#infodex .holo").height();
		
		$(this).css({
			// "top":  h/2 - (this.height / 2),
			"left": w/2 - (this.width / 2),
		})
		
		$("#infodex .holo .sprite").stop(true).delay(500).animate({
			height: 132,
		}, 600);
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
		"<p>You can move this window around by clicking and dragging either of the two solid red parts in the top left corner. You can close the InfoDex by clicking the circular gem.</p>",
		"<p>You can <em>always</em> find sources to sprites and other assets currently shown or selected in the bottom left corner of the screen. If you find YOUR piece of art in here, and it IS NOT sourced, or you'd like to change the link, feel free to contact Tustin via the feedback thread or reddit messaging.</p>",
		"<p>The Helix hieroglyphic icon on the right side will return you to the Church of Helix in the center of the park at any time.</p>",
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
	var hereBefore = $.cookie("hereBefore");
	
	if (!hereBefore) {
		infodex.displayTip(
			"<p>Click and drag anywhere to move around.</p>"+
			"<p>Click on things to interact or see more information.</p>"+
			"<p>What secrets can <em>you</em> find?</p>"+
			"<p>Sources for currently selected items will appear in the bottom left corner of the screen, with links if relevant.</p>");
		
		$.cookie("hereBefore", { expires: 7 }); //expires in 7 days
	} else {
		var tipindex = Math.floor(Math.random() * TIPS.length);
		
		infodex.displayTip(TIPS[tipindex]);
	}
	
});

