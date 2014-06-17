// infodex.js
// Which defines the InfoDex and it's convience functions
//

$(function(){ //jQuery on ready : status screen setup
	$("#infodex .btn-close").on("vclick", function(){
		$("#infodex").hide();
		displaySources("pkmn", null);
	});
	
	$("#infodex .sprite img").on("load", function(e){
		var w = $("#infodex .sprite").width();
		var h = $("#infodex .sprite").height();
		
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


(function(){
	window.infodex = {};
	
	window.infodex.displayInfo = function(title, text) {
		$("#infodex .page-title").text(title);
		$("#infodex .sheet").html(text);
	};
	
})();


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