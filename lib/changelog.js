// changelog.js
// Defining the "previous updates" to the park, for reference by the infodex
// This is also where the script on the main page will look
//

(function(){
	window.changelog = [];
	
	function add(date, message) {
		window.changelog.push({ date: date, message: message });
	}
	
	//Changelog goes from Most recent to Lease recent
	// Insert updates below this line

//changes:
//Trainer dexes
//arrow key movement thanks to Pigu-A

	
add("6-18-2014", 
	"<p>Oh, finally. I fixed up the park since when I flipped it over. My bad.</p> "+
	"<p>But hey, Look! There's an \"InfoDex\" now. This technology based on the Pokedex will be replacing the separate windows for pokemon and trainer information. This allows me to include more information for these, including much more information for our protagonist trainers!</p>"+
	"<p>And we have a few new pokemon from HeartGold in the park now! No, not Kenya yet. From what the newcomers tell me, he's delivering mail along the route instead of, you know, actually riding the train to the Park.</p>"+
	"<p>Meanwhile, ground has been broken for the Community Center. Nominations are still a thing, head over to <a href='http://redd.it/27yop9'>this thread</a> to nominate someone. Please follow the rules and make sure to check if someone is nominated first. You'll have to click the link at this time that shows up to 500 comments, as there's more than 200 in there right now.</p>"+
	"<p>Inb4 KENYA OR RIOT</p>"
);

add('6-16-2014',
	"(╯°□°)╯︵ ʞɹɐԀ ԀԀ┴"
);

add("6-12-2014",
	'<p><a href="#loc=66,-15" style="color:white;">DELELELELELELE WOOOOOOOOOP!</a></p>'
);

add("6-4-2014",
	"<p>Many random fixes! The images that were hosted on Bulbapedia are now hosted here, so hopefully the problem with vanishing pokedex images will be solved!</p>"+
	"<p>Good news! We just got word that Kenya is on the train over. He's very late, but he WILL get the mail delivered! Soon!</p>"+
	"<p>But, in the meantime, what's Red doing there? Looks like he's setting up for something. And what's Joey and AJ doing? It looks like something is on the horizon...</p>"+
	"<p>(Yes, this Bloody Sunday memorial is one day off when it should be. I didn\'t have it finished in time, and so I just adjusted the clock by a day so you all could see this.)</p>"
);

add("5-24-2014",
	"<p>Hey, I've got a place to put update information that isn't the reddit thread anymore! Click the button in the top left to close this for the remainder of your browser session.</p>"+
	"<p>Look! Burrito is back from the depths of the PokeMart, and he's got a computer that isn't evil! Looks like he's typing on it. I wonder what he's doing...</p>"+
	"<p>Oh, and hey! It's C3 powering her computer! Wait, no it's not, that's just Apostropi disgused as C3 again. I wonder where C3 is...</p>"+
	"<p>And the False Prophet has returned with Burrito, except... she got caught up in a heated discussion with Bird Jesus. I wonder how long they'll be at it.</p>"
);

add("5-22-2014",
	"<p>Hey, look who arrived on the train! Moonbat and Steve arrived and brought a lovely archway with them! 006, Solareon, Sunshine, and their baby arrived as well and have taken the spot that Burrito and the original False Prophet were taking up in the lovely southeast flowerbed.</p>"+
	"<p>Meanwhile, Burrito dragged the False Prophet inside the pokemart to help grab something. Something about attempting to find a computer that wasn't made by Bill. I'm sure they'll be back shortly. :)</p>"
);

add("5-21-2014",
	"<p>Added more stadium patrons!</p>"+
	"Also since we have over 50 (!!) predefined patrons now, I upped the chance that they'll appear in the stadium, instead of a generic face with a name attached. Before it was something like 5%, now it's more like 40%."+
	'Also, I added "harden" to the list of "hax" in the stadium, though... I didn\'t test it yet... o___o ...also needs crowd reactions (something along the lines of "BATTLE OF THE CENTURY!").'+
	"Altaria and Airadome arrived via train moments ago. Airadome was off finding Altaria, from what I'm told. ;)"+
	"And bug fixes! Thank you all for finding these! (Two stadium bugs are still not fixed, including wrong names on pokemon and super HP bars for Lapras and Snorlax.)"
);

add("5-20-2014",
	"<p>/u/tustin2121 and /u/carlotta4th present:<br/>"+
	"<strong>Twitch Plays Pokemon Park!</strong></p>"+
	"<p>When the former banner got taken down (it now sits at the bottom of the page) I said, \"I want to make something like that!\" And I began work on this then and there. That was THE WHOLE PLATINUM RUN AGO!! O_o</p>"+
	"<p>Along the way, I got the attention of /u/carlotta4th, who was doing her own TPP town in image form. She saw my version and decided the interactivity I was providing was superior than what she was doing (though I think I lack her attention to decoration that she put into her town). She decided to collaborate with me, and about 90% of the custom sprites herein are created or animated by her. <strong>Give her some love as well.</strong> <3</p>"+
	"<p>I tried to find sprite art of many different artists for each pokedex entry herein. Some of the art features within are done by /u/Fiirewaffle, /u/Aleksandair, /u/Parkmayn, /u/NoPenNameGirl, and several others. There will be a link crediting every artist's work at the bottom of the screen when the work is on screen. This link will mention their reddit username and link to the reddit post or blog post where I retrieved the art.</p>"+
	"<p>The park is not final by any means. I know I'm missing some pokemon from previous generations still, and I want to add more buildings and areas! If you find anything off, incorrect, or missing, feel free to comment!</p>"+
	"<p>Developed in Chrome and Firefox, though each has their downsides (for one, Chrome doesn't do the zoom well). Has touch support for tablet users! Though it may run slowly on tablet devices (there's a lot of stuff in here! O_o).</p>"

);
	
})();