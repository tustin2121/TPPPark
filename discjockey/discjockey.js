// discjockey.js
// For loading and playing DJ Stakling's songs
//

(function(){
	var DJS_SONGS = [
		// TPP Red
		{
			name: "Praise The Helix",
			singer: "/u/ChurchofHelixChoir",
			song_post: "http://www.reddit.com/r/twitchplayspokemon/comments/1ywf7f/epic_orchestral_song_praise_the_helix_while/",
			embedsong: '<iframe style="border: 0; width: 100%; height: 120px;" src="http://bandcamp.com/EmbeddedPlayer/track=1104782738/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless><a href="http://churchofthehelixchoir.bandcamp.com/track/praise-the-helix">Praise The Helix by Church Of The Helix Choir</a></iframe>',
			localsong: "Church Of The Helix Choir - Praise The Helix.mp3",
			lyrics: "1ywf7f_PraiseHelix.html",
		},
		{
			name: "Praise The Helix (Community Remix)",
			singer: "/u/ChurchofHelixChoir",
			song_post: "http://www.reddit.com/r/twitchplayspokemon/comments/274zkq/praise_the_helix_remix_made_with_fan_submissions/",
			embedsong: '<iframe style="border: 0; width: 100%; height: 120px;" src="http://bandcamp.com/EmbeddedPlayer/track=3120654042/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless><a href="http://churchofthehelixchoir.bandcamp.com/track/p-t-helix-remix">P.T. HELIX REMIX by Church Of The Helix Choir</a></iframe>',
			localsong: "Church Of The Helix Choir - P.T. HELIX REMIX.mp3",
			lyrics: "274zkq_HelixRemix.html",
		},
		{
			name: "Bloody Sunday",
			singer: "/u/ChurchofHelixChoir",
			song_post: "http://www.reddit.com/r/twitchplayspokemon/comments/1z5fbc/church_of_the_helix_choir_bloody_sunday/",
			embedsong: '<iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/track=51282207/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless><a href="http://churchofthehelixchoir.bandcamp.com/track/bloody-sunday">Bloody Sunday by Church Of The Helix Choir</a></iframe>',
			localsong: "Church Of The Helix Choir - Bloody Sunday.mp3",
			lyrics: "1z5fbc_BloodySunday.html",
		},
		{
			name: "TwitchPlaysPokemon THE SONG",
			singer: "VoxMakers and Vulkain",
			song_post: "http://www.reddit.com/r/twitchplayspokemon/duplicates/20j8m0/french_dude_made_this_rad_song_based_on_tpp_red/",
			embedsong: '',
			localsong: "20j8m0_TPP_The_Song.mp3",
			lyrics: "20j8m0_TPP_The_Song.html",
		},
		{
			name: "All Terrain Victory",
			singer: "/u/ChurchofHelixChoir",
			song_post: "http://www.reddit.com/r/twitchplayspokemon/comments/1zsj9w/church_of_the_helix_choirall_terrain_victory_an/",
			embedsong: '<iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/track=2311570543/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless><a href="http://churchofthehelixchoir.bandcamp.com/track/all-terrain-victory">All Terrain Victory by Church Of The Helix Choir</a></iframe>',
			localsong: "Church Of The Helix Choir - All Terrain Victory.mp3",
			lyrics: "1zsj9w_AllTerrainVictory.html",
		},
		{
			name: "Welcome Home",
			singer: "/u/AgainTheSaga",
			song_post: "http://www.reddit.com/r/twitchplayspokemon/comments/24zjjp/song_welcome_home_original_lyrics_writtensung_by/",
			embedsong: '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/148418009&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>',
			localsong: "24zjjp_Welcome_Home_by_AgainTheSaga.mp3",
			lyrics: "24zjjp_WelcomeHome.html",
		},
		
		//TPP Crystal
		{
			name: "Lazor Gator",
			singer: "/u/ChurchofHelixChoir",
			song_post: "http://www.reddit.com/r/twitchplayspokemon/comments/20pgbw/the_church_of_the_helix_choirs_new_80sinspired/",
			embedsong: '<iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/track=271672259/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless><a href="http://churchofthehelixchoir.bandcamp.com/track/lazor-gator">Lazor Gator by Church Of The Helix Choir</a></iframe>',
			localsong: "Church Of The Helix Choir - Lazor Gator.mp3",
			lyrics: "20pgbw_LazorGator.html",
		},
		{
			name: "Godslayers",
			singer: "/u/ChurchofHelixChoir",
			song_post: "http://www.reddit.com/r/twitchplayspokemon/comments/26ujmd/church_of_the_helix_choir_godslayers/",
			embedsong: '<iframe style="border: 0; width: 100%; height: 120px;" src="http://bandcamp.com/EmbeddedPlayer/track=1956393064/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless><a href="http://churchofthehelixchoir.bandcamp.com/track/godslayers">Godslayers by Church Of The Helix Choir</a></iframe>',
			localsong: "Church Of The Helix Choir - Godslayers.mp3",
			lyrics: "26ujmd_Godslayers.html",
		},
		{
			name: "Admiral!",
			singer: "/u/AgainTheSaga",
			song_post: "http://www.reddit.com/r/twitchplayspokemon/comments/25zav4/song_admiral_original_lyrics_writtensung_by_me/",
			embedsong: '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/150326330&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>',
			localsong: "25zav4_Admiral.mp3",
			lyrics: "25zav4_Admiral.html",
		},
		
		//TPP Emerald
		{
			name: "Bringing Zexy Back",
			singer: "/u/ChurchofHelixChoir",
			song_post: "http://www.reddit.com/r/twitchplayspokemon/comments/28am8p/church_of_the_helix_choirbringing_zexy_back/",
			embedsong: '<iframe style="border: 0; width: 100%; height: 120px;" src="http://bandcamp.com/EmbeddedPlayer/track=1956393064/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless><a href="http://churchofthehelixchoir.bandcamp.com/track/godslayers">Godslayers by Church Of The Helix Choir</a></iframe>',
			localsong: "Church Of The Helix Choir - Bringing Zexy Back.mp3",
			lyrics: "28am8p_BringingZexyBack.html",
		},
		{
			name: "A's Psychotic Journey",
			singer: "/u/AgainTheSaga",
			song_post: "http://www.reddit.com/r/twitchplayspokemon/comments/214stc/the_ateam_parody_as_psychotic_journey_original/",
			embedsong: '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/145219960&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>',
			localsong: "214stc_ATeam.mp3",
			lyrics: "214stc_ATeam.html",
		},
		
		//TPP FireRed
		{
			name: "Daughter to Father/Alice to Bill",
			singer: "/u/AgainTheSaga",
			song_post: "http://www.reddit.com/r/twitchplayspokemon/comments/23b32r/daughter_to_fatheralice_to_bill_original_lyrics/",
			embedsong: '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/145219960&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>',
			localsong: "23b32r_Alice2Bill.mp3",
			lyrics: "23b32r_Alice2Bill.html",
		},
		//TPP Platinum
		{
			name: "I Wake",
			singer: "/u/AgainTheSaga",
			song_post: "http://www.reddit.com/r/twitchplayspokemon/comments/28eaxf/song_i_wake_solareonsunshine_original_lyricssung/",
			embedsong: '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/154812439&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>',
			localsong: "28eaxf_I_Wake_by_AgainTheSaga.mp3",
			lyrics: "28eaxf_IWake.html",
		},
		
		//TPP HeartGold
		
		//TPP Black 1
		{
			name: "I Dreamed a Run",
			lyrics: "/u/tustin2121",
			singer: "/u/AgainTheSaga",
			lyrics_post: "http://www.reddit.com/r/twitchplayspokemon/comments/28ndo9/i_dreamed_a_run_tppers_lament/",
			song_post: "http://www.reddit.com/r/twitchplayspokemon/comments/28uokg/i_dreamed_a_run_twitch_plays_pokemon_black_lyrics/",
			embedsong: '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/155609297&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>',
			localsong: "28uokg_I_Dreamed_A_Run_by_AgainTheSaga.mp3",
			lyrics: "28uokg_TPPersLament.html",
		}, 
		
		//TPP Black 2
		
//		{
//			name: "Song Name",
//			singer: "Mandatory",
//			lyrics: "IfDifferent",
//			song_post: "MandatoryURL",
//			lyrics_post: "URLIfDifferent",
//			embedsong: 'EmbedHTML',
//			localsong: "nameOfMp3File",
//			lyrics: "HtmlFileForLyrics.html",
//		},
		
	];
})();