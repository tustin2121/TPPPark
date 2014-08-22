// _usernames.js
// A file specifically for defining the patrons in the stadium
//

(function(){
	// Common functions for dialog
	
	function wrap(pre, post) { 
		if (post === undefined)
			return function(){ return pre + " " + this.lastChant + " " + pre; } 
		else
			return function(){ return pre + " " + this.lastChant + " " + post; } 
	}
	
	function random() { //varargs
		var strings = Array.prototype.slice.call(arguments);
		return function(){
			var index = Math.floor(Math.random() * strings.length);
			return strings[index];
		}
	}
	
	////// Patron Dex //////
	var NAMED_PATRONS = [
	 	//remember, positive numbers need to be 0 based, not 1 based like the image
		{ name: "tustin2121",		style: -2,   favorite: 156,},
		{ name: "carlotta4th",		style: -1,   },
		{ name: "VillainousWattson",style: -3,   dialog: "WAHAHAHAHAHAHA!"},
		{ name: "Faithfulforce",	style:  0  , dialog: wrap("BloodTrail", "") },
		{ name: "HedgemazeExpo",	style: 42-1, },
		{ name: "Everyle", 			style: 17-1, },
		{ name: "FruityParfait",	style: 23-1, },
		{ name: "inabox44",			style: 30-1, },
		{ name: "BigFatMantis",		style: 16-1, }, //prefers to be a scyther sprite
		{ name: "0ddd",				style: 40-1, },
		{ name: "TheObserver99",	style: 33-1, },
		{ name: "Xellotath", 		style:  8-1, },
		{ name: "Spoon_rhythm", 	style: 19-1, },
		{ name: "Poksonkirmar", 	style: 26-1, },
		{ name: "CiderTW", 			style: 14-1, },
		{ name: "MakeOurDay", 		style: 41-1, },
		{ name: "meowmeowmi", 		style: 15-1, },
		{ name: "Bladeseed", 		style: 28-1, },
		{ name: "Sledgehammmmer", 	style: 29-1, },
		{ name: "Kelcyus", 			style: 20-1, },
		{ name: "cobaltPoisoning", 	style: 43-1, },
		{ name: "SleepDenied", 		style: 33-1, },
		{ name: "xxtzkzxx", 		style: 16-1, },
		{ name: "Spankler", 		style: 43-1, },
		{ name: "Z72z", 			style: 25-1, },
		{ name: "Jelkaz", 			style: 36-1, dialog: "<dger>ヽ༼ຈل͜ຈ༽ﾉ</dger> VICTORY RIOT <dger>ヽ༼ຈل͜ຈ༽ﾉ</dger>", },
		{ name: "Zhadeblade", 		style: 41-1, },
		{ name: "DraymondDarksteel",style: 43-1, },
		{ name: "FeedTheOx", 		style: 25-1, },
		{ name: "ShadeSoul", 		style: 25-1, },
		{ name: "tubaman656", 		style:  3-1, },
		{ name: "TheOmegalpha", 	style: 16-1, },
		{ name: "Hafkie", 			style: 27-1, },
		{ name: "HelixGuideUs", 	style: 33-1, },
		{ name: "misko91", 			style: 43-1, },
		{ name: "s_SoNick", 		style: 10-1, },
		{ name: "SUPERCOW7", 		style: 33-1, },
		{ name: "Khisaella", 		style: 13-1, },
		{ name: "teamvistatech", 	style: 41-1, },
		{ name: "GroundCtrl27", 	style: 16-1, },
		{ name: "Joshpho", 			style: 24-1, },
		{ name: "boolerex", 		style: 39-1, },
		{ name: "TheLakAttack", 	style: 44-1, },
		{ name: "GlitcherRed", 		style: 43-1, },
		{ name: "notnowhoney", 		style: 44-1, },
		{ name: "LupinTheIIII", 	style: 26-1, },
		{ name: "jigsawmonster", 	style: 16-1, },
		{ name: "Xaixas", 			style: 14-1, dialog: wrap("Kreygasm") },
		{ name: "theRayeGun", 		style: 41-1, },//dialog: "!bet 100 red", },
		{ name: "toto2379", 		style: 20-1, },
		{ name: "sirguyman", 		style: 27-1, },
		{ name: "FluffyTamerMarill",style: 20-1, }, //u/Clarkarius
		{ name: "Soulweaver91", 	style: 15-1, },
		{ name: "MrVaidd", 			style:  1-1, dialog: "<dger>ᕕ( ᐛ )ᕗ</dger> DANCE RIOT <dger>ᕕ( ᐛ )ᕗ</dger>",},
		{ name: "renzantar", 		style: 41-1, },
		{ name: "nasian_",	 		style: 41-1, },
		{ name: "shotgunninja", 	style: 22-1, },
		{ name: "pokechampjoey ", 	style: 43-1, },
		{ name: "Nick-Tr", 			style: 42-1, },
		{ name: "PokemonGod777", 	style: 27-1, },//dialog: random("HELLO", "WORLD", "AND", "ALL")},
		{ name: "Sparkray", 		style: 39-1, },
		{ name: "Zeldafoof", 		style: 37-1, },
		{ name: "Mayorofpyroland", 	style: 38-1, dialog: "This stadium is TENATTATEN!",},
		{ name: "jacobstx", 		style: 43-1, },
		
		{ name: "sohippy", 			style: 25-1, },
		// { name: "", 		style: -1, },
		// { name: "", 		style: -1, },
		// { name: "", 		style: -1, },
		// { name: "", 		style: -1, },
		// { name: "", 		style: -1, },
	];
	
	////// Random Names //////
	var RANDOM_NAMES = [
		// Pulled from the chat at various moments in time:
		"pikayoutwo", "mojo120", "gammaception", "16bitlink", "pastramiok", "cannified", "crinias", "clemywall", "rowena19", 
		"charrasculdi", "davetrain14", "thefminorscale", "teamotei", "cruentusdeus", "sidneyjks", "gmatt0", "sa24mi02", 
		"raberaff", "marksmanonthego", "ota_kun", "sir_roflcopter", "eksereles", "ellindsey", "zolan007", "indigoblack", 
		"reykardwhitewolf", "gadzek", "saturdayknight2", "lacexwarrior", "pooooookey", "fronsislol", "hex151", "garfinator5",
		"battleonroute", "nuniruro", "iantern", "kobocolla", "fishycheeze", "teras_ode", "tempylol", "yapok96", "16bitlink", 
		"ogolcromgog", "thexxxmgpackxxx", "lukasgc15", "justtyperight", "iambulletproof1", "indigoblack", "mawarumawaru", 
		"castformer", "gordout", "kareemabduljabbarr", "yuudachin", "3fullmetal6739", "burritobomb257", "lexbutts", "linkara19",
		"magnificentjosh", "kuddel6", "murdim", "kingofredlions_", "kuroko1710", "xredleaf", "fishycheeze", "goldenzephyr5", 
		"kiba_inuzuka_akamaru", "11wizard", "heyyouwhiteboy", "ultra_mc", "kalebpresley", "reddylion", "thexxxmgpackxxx", 
		"janggun100", "woopertrooper", "tempylol", "rollbuster", "zonextreme", "passiveengie", "kosukeueki", "thebigdf74",
		"jonathan282", "thisnamehasbeentakenn", "mr_tumtums", "angryponcho", "lesqualala06", "crunchy_lime", "weneedtofistmisty", 
		"4dname", "theunconscionable", "colonelcrunch33", "hella_norcal", "ksrgaming", "fishamanp", "politicalmetrics", "peralejok",
		"worthlesskoridian", "burbalax", "z33k33", "mimilikescake", "pokemonplayspokemon", "justshootitfox", "slimoleq", "ryziken", 
		"jrat12345", "nifflerfloo", "cyborg_nausicaa", "shinysapphire", "0000map", "bhboehlert", "umpa1", "bdawg104", "maotegin", 
		"scotticus626", "drazule", "drross14", "lazyredsmurf", "sealmore", "ptcollins08", "xxfedoramasterxx", "rainesworld", 
		"magnusdau", "arcrequiem", "overpowernico", "jaannzz", "seaway1024", "fenderxbender", "fanman777", "slsvcn", 
		"xxfedoramasterxx", "inferno44", "blazegaming1", "milkdeliveryguy", "coboltnp", "quoctopus", "slimoleq", "cs1energypyre", 
		"cthaws", "redwings13400", "itdoesntmatte", "faithfulforce", "empressofsnow", "thrownoway", "penguinstein", 
		"geosspone", "i_cant_believe_you_all", "junewind", "mjbaker", "potatosaladdressing", "mo40o2naliz", "cakedayisbirthday", 
		"alifen", "erassus", "nidoking_armx", "basedazumarill", "our_lord_helix_the_great", "arazioman", "101100111000", 
		
		// Requested additions:
		"chaoticcookie39", "abiyoru", "222phantom", "Onamuk", "BettingBetter", "UltraMew", "Jacobjr1", "Blademan9999",
		"Deny_Craft", "addgro_ove", "Mudkiplikeaboss",
	];
	
	window.stadium.NAMED_PATRONS = NAMED_PATRONS;
	window.stadium.RANDOM_NAMES = RANDOM_NAMES;
})();

(function(){
	//Community Center TPPers
	
	addEvent(new TPPer({
		name: "Tustin",
		name_twitch: "tustin2121",
		name_reddit: "tustin2121",
		title: "Slayer of C-Gear",
		role: "Creator of TPPPark",
		description: "",
		
		icon : "joey",
		spritesheet: "",
		sprite: 0,
		
		/* (Nominated by /u/chaoticcookie39)
		First post. I NOMINATE YOU /u/tustin2121
		Twitch Username: I actually don't know it....
		Role: TPP Park Creator + All around great community player
		One of the biggest contributors on this subreddit. He made TPP Park and still updates it continuously today. He also is responsible for this whole community part of the park!
		Sprite: /u/tustin2121 you obviously can choose. I can't open the sprite link at work :/
		Icon: Your choice :)...Joey?
		*/
	}));
	
	addEvent(new TPPer({
		name: "Carlotta",
		name_twitch: "carlottathe4th",
		name_reddit: "carlotta4th",
		title: "",
		role: "Sprite Artist, Artist of TPPPark",
		description: "",
		
		icon : "digrat",
		spritesheet: "",
		sprite: 0,
		
		/* (Nominated by /u/Kelcyus)
		Also, although I'm guessing she is included either way, I nominate /u/Carlotta4th
		The amazing sprite artist that has give us so many great custom sprites for all our often zany TPP creations.
		*/
	}));
	
	addEvent(new TPPer({
		name: "Streamer",
	//	name_twitch: "",
	//	name_reddit: "",
		title: "Streamer-Spenpai",
		role: "Creator of TwitchPlaysPokemon",
		description: "",
		
		icon : "tppicon",
		spritesheet: "",
		sprite: 0,
		
		/* (Nominated by /u/confettibin)
		Not sure if possible, but /u/BasedStreamerSenpai<3 ^(Citation Needed)
		Role: Streamer
		Twitch: TwitchPlaysPokemon
		The streamer started streaming the stream back in February and viewers began to stream in. He's faithfully run the stream since, and has promised to do so as long as interest remains. Though he's gotten in a few arguments, he's managed to generally keep to community happy and run the stream in a professional manner at the same time.
		Icon: This.
		Sprite: Arceus.
		*/
	}));
	
	
	
	
})();