// fanfic.js
// For loading and displaying Burrito's fanfiction entries
//

(function(){
	var BURRITO_STORIES = [
		{src:"20hht3", name: "PART 9: The Aftermath", author: "/u/FirePrince", },
		{src:"1zp0kg", name: "The Last Moments of Omelette", author: "/u/aaronman4772", },
		{src:"208vf2", name: "After defeating Lance, the true battle has only begun: the battle to defeat the gods.", author: "/u/jables1138", },
		{src:"22wm1p", name: "So a Chairman, a Hyperbug, and a Flamesplash walk off of a lunar mountain...", author: "/u/thefreightrain", },
		{src:"23ig75", name: "Shellock Holmes, The Beggining", author: "/u/l4zyhero", },
		{src:"23q7ds", name: "Altaria, Rise", author: "/u/RemiosR", },
		{src:"23nv0q", name: "Time to Go", author: "/u/Lavaros", },
		{src:"22ak5m", name: "C3 waits in vain for M4's return", author: "/u/tustin2121", },
		{src:"23v47n", name: "The Freedom of Fire and Water", author: "/u/Lavaros", },
		{src:"209wz8", name: "Meanwhile on Route 30...", author: "/u/tustin2121", },
		{src:"1yt0fi", name: '"Legendary," they called me: The story of AA-j, the vengeful god', author: "/u/also_hyakis", },
		{src:"25n7hh", name: "Size doesn't matter...?", author: "/u/tioko", },
		{src:"20c06s", name: "FirePrince's Crystal Story Part 1", author: "/u/FirePrince", },
		{src:"25pxc9", name: "The Night After", author: "/u/yewchung", },
		{src:"212vtn", name: "One last story...", author: "/u/TheOmegalpha", },
		{src:"25mgy0", name: "Steven-Senpai Part 1: An Emerald Story", author: "/u/Epicnights", },
		{src:"1zuji8", name: "My Own Theory On the Fates of the Admiral and the Prince (A Little Story Fragment)", author: "/u/KingdomXathers", },
		// {src:"", name: "", author: "/u/", },
		// {src:"", name: "", author: "/u/", },
	];
	
	function loadBurritoStory(index) {
		if (index === undefined) {
			index = Math.floor(Math.random() * BURRITO_STORIES.length);
		}
		
		var story = BURRITO_STORIES[index];
		$.ajax("fanfic/"+story.src+".html", {
			dataType : "html",
			success : function(data) {
				$("#buritto-frame .content").html(data).scrollTop(0);
			},
			error : function(xhr) {
				$("#buritto-frame .content").html("<center>An error occured retrieving data from the server.</center>").scrollTop(0);
			},
		});
		
		var props = {};
		props["Story by "+story.author] = "http://redd.it/"+story.src;
		displaySources("burrito-story", props);
		
		var win = $("#buritto-frame");
		
		centerOnTile(62, 32, 2000);
		var shouldCenter = !win.is(":visible");
		win.fadeIn(1000);
		
		if (shouldCenter){
			//To properly get the width/height of the frame, it needs to be visible
			//which is why this is run after it is fading in
			var scrw = $("body").width() / 2;
			var scrh = $("body").height() / 2;
			
			var x = scrw - win.width()/2;
			var y = scrh - win.height()/2;
			
			console.log(win.width(), win.height());
			
			win.css({
				top: y, left: x,
			})
		}
	}
	window.loadBurritoStory = loadBurritoStory;
	
})();

$(function(){ //jQuery On Ready : Burrito Window Dragging
	var down_x, down_y;
	var win = $("#buritto-frame");
	
	function dragWindow(e) {
		if (!e) return;
		
		win.css({
			left: e.pageX + down_x,
			top : e.pageY + down_y,
		});
		return false;
	}
	
	$("#buritto-frame").on("vmousedown vmouseup mousewheel", function(e){
		e.stopPropagation();
		//We want to allow defaults here, for selection and scrolling
	});
	
	$("#buritto-frame .frame, #buritto-frame .frame").on("vmousedown", function(e){
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
	
	$("#buritto-frame button").on("vmousedown", function(e){
		return false;
	});
	
	$("#buritto-frame .btn-close").on("vmousedown", function(e){
		win.fadeOut(500);
		displaySources("burrito-story", null);
	});
})