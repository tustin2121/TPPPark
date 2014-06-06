// stadium.js
// File for the Stadium events (during TPP Platinum)
// 

//Stadium Manager GO!
(function(){
	var SCREEN_W = 54;
	var SCREEN_H = 33;
	
	var STATE_RIOTING = 1; //ヽ༼ຈل͜ຈ༽ﾉ RIOT ヽ༼ຈل͜ຈ༽ﾉ
	var STATE_DECIDING = 5; //deciding on battlers
	var STATE_VOTING = 10;
	var STATE_BATTLING = 20;
	var STATE_WINNINGS = 30;
	var STATE_HELIX_PRAISE = 100; //༼ つ ◕_◕ ༽つ PRAISE HELIX ༼ つ ◕_◕ ༽つ
	
	var chatterDom = [];
	var chatterContainer;
	
	var redvotes = [];
	var bluevotes = [];
	
	var redfavor = 0;
	var bluefavor = 0;
	
	var redPokes = [], redNextPokes = [];
	var bluePokes = [], blueNextPokes = [];
	
	var redDom = [];
	var blueDom = [];
	
	var redCurrMon = null;
	var blueCurrMon = null;
	
	var initialState = STATE_DECIDING;
	var currState = 0;
	var countdown = 0;
	
	var eventlist = [];
	var eventIntervalId = 0;
	
	window.parseStadiumHash = function(value){
		var args = value.split(";");
		
		var state = args.shift();
		if (state) {
			switch(state) {
				case "empty": goToState(-1); break;
				case "riot": initialState = STATE_RIOTING; break;
				case "helix": initialState = STATE_HELIX_PRAISE; break;
			}
		}
		
		for (var i = 0; i < args.length; i++) {
			switch (args[i][0]) { //first char of the string
				case "r": //Red team
					redNextPokes = redNextPokes.concat(getPokesFromHash(args[i]));
					break;
				case "b": //blue team
					blueNextPokes = blueNextPokes.concat(getPokesFromHash(args[i]));
					break;
			}
		}
		
		if (currState != 0)
			goToState(initialState);
	}
	
	function getPokesFromHash(value) {
		value = value.substr(1); //chomp first char
		
		var ids = [];
		var vals = value.split(",");
		for (var i = 0; i < vals.length; i++) {
			if (!$.isNumeric(vals[i])) continue;
			var id = Math.floor(vals[i]);
			if (id <= 0 || id > POKEMON.length) continue;
			ids.push(id-1);
		}
		return ids;
	}
	
	////////////////////////////////////////////////////////////////////////////
	
	function testScreenSupport() {
		var canvas = $("<canvas>");
		if (!(canvas[0].getContext && canvas[0].getContext('2d')))
			return false;
		return true;
	}
	
	function doStadium() {
		if (currState == 0) doInit();
		
		//this = the stadium entrance event
		if (this._isActive && !eventIntervalId) {
			//If the stadium was kicked back into active, activate all of its events
			eventIntervalId = setInterval(fireStadiumBehaviors, 250);
			console.log("Stadium activate!", eventIntervalId);
		}
		
		if (countdown > 0) countdown--;
		
		switch(currState) {
			case STATE_DECIDING: doDeciding(); break;
			case STATE_VOTING: doVoting(); break;
			case STATE_BATTLING: doBattle(); break;
			case STATE_WINNINGS: doWinnings(); break;
			
			case STATE_RIOTING:
			case STATE_HELIX_PRAISE: doRioting(); break;
		}
	}
	
	function checkStadiumActive() {
		if (!this._isActive && eventIntervalId) {
			//halt stadium events when outside the active area
			clearInterval(eventIntervalId);
			eventIntervalId = 0;
			console.log("Stadium deactivate!");
		}
	}
	
	function doInit() {
		//Create people randomly!
		for (var x = 70; x <= 95; x++) {
			//Skip stairs
			if (x == 71 || x == 79 || x == 86 || x == 94) continue;
			for (var y = -37; y <= -31; y++) {
				if (x > 79 && x < 86 && y < -34) continue; //skip screen area
				
				var shouldSpawn = Math.random();
				if (shouldSpawn > 0.90) continue; //randomly skip patrons
				
				var patron = null;
				if (NAMED_PATRONS.length && shouldSpawn > 0.60 - Math.max(8-Math.abs(82-x), 0)*0.01) { //spawn predefed patrons sometimes
					var pnum = Math.floor(Math.random() * NAMED_PATRONS.length);
					var np = NAMED_PATRONS.splice(pnum, 1)[0];
					
					patron = new Patron({
						name : np.name,
						style : np.style,
						dialog: np.dialog,
						x: x, y: y,
					});
				}
				
				if (!patron) { 
					var pnum = Math.floor(Math.random() * RANDOM_NAMES.length);
					var name = RANDOM_NAMES.splice(pnum, 1)[0];
					
					patron = new Patron({
						name : name,
						style : Math.floor(Math.random()*44),
						x: x, y: y,
					});
				}
				
				addEvent(patron);
				eventlist.push(patron);
			}
		}
		
		var chat;
		for (var i = 0; i < 10; i++) {
			chat = $("<div>").addClass("stadium-chatter");
			chatterContainer.append(chat);
			chatterDom.push(chat);
		}
		
		//Create the combatants!
		var pkmn;
		pkmn = new Combatant({ team: 1, x: 91, y: -28 });
		addEvent(pkmn); eventlist.push(pkmn); redDom.push(pkmn);
		pkmn = new Combatant({ team: 1, x: 92, y: -27 });
		addEvent(pkmn); eventlist.push(pkmn); redDom.push(pkmn);
		pkmn = new Combatant({ team: 1, x: 93, y: -26 });
		addEvent(pkmn); eventlist.push(pkmn); redDom.push(pkmn);
		
		pkmn = new Combatant({ team: 2, x: 74, y: -28 });
		addEvent(pkmn); eventlist.push(pkmn); blueDom.push(pkmn);
		pkmn = new Combatant({ team: 2, x: 73, y: -27 });
		addEvent(pkmn); eventlist.push(pkmn); blueDom.push(pkmn);
		pkmn = new Combatant({ team: 2, x: 72, y: -26 });
		addEvent(pkmn); eventlist.push(pkmn); blueDom.push(pkmn);
		
		if (!testScreenSupport()) //Screen doesn't work! RIOT!
			goToState(STATE_RIOTING);
		else
			goToState(initialState);
	}
	
	function fireStadiumBehaviors() {
		$.each(eventlist, function(i, obj){
			if (!obj.stadiumBehavior || !$.isFunction(obj.stadiumBehavior)) return;
			obj.stadiumBehavior();
		});
	}
	
	function doDeciding() {
		while (redNextPokes.length && redPokes.length < 3) {
			redPokes.push(redNextPokes.shift());
		}
		while (blueNextPokes.length && bluePokes.length < 3) {
			bluePokes.push(blueNextPokes.shift());
		}
		
		var team = redPokes;
		if (team.length == 3) team = bluePokes;
		if (team.length < 3) {
			
			var rnd; 
			while (true) {
				rnd = Math.floor(Math.random()*POKEMON.length);
				
				var poke = POKEMON[rnd];
				if (poke.forbidden) continue; //try again for a not forbidden pokemon
				if (team[0] && team[0] == rnd) continue; //same pokemon, try again
				if (team[1] && team[1] == rnd) continue; //same pokemon, try again
				
				team.push(rnd);
				break;
			}
		} else {
			//decide team favor number now
			var red = [ POKEMON[ redPokes[0]], POKEMON[ redPokes[1]], POKEMON[ redPokes[2]] ];
			var blue= [ POKEMON[bluePokes[0]], POKEMON[bluePokes[1]], POKEMON[bluePokes[2]] ];
			
			redfavor  = calcFavor(red, blue);
			bluefavor = calcFavor(blue, red);
			
			console.log("Red Team: ", red[0].name, red[1].name, red[2].name, redfavor);
			console.log("Blue Team: ", blue[0].name, blue[1].name, blue[2].name, bluefavor);
			
			redDom[0].setPokemon(redPokes[0]);
			redDom[1].setPokemon(redPokes[1]);
			redDom[2].setPokemon(redPokes[2]);
			
			blueDom[0].setPokemon(bluePokes[0]);
			blueDom[1].setPokemon(bluePokes[1]);
			blueDom[2].setPokemon(bluePokes[2]);
			
			goToState(STATE_VOTING);
			return;
		}
		
		countdown = 4;
	}
	
	function doVoting() {
		if (Math.random() > 0.8) { //random voting
			placeBet(Math.random() > 0.5);
		}
		
		if (countdown <= 0) goToState(STATE_BATTLING);
	}
	
	function doBattle() {
		//Battle Manager determines going to Winnings state 
	}
	
	function doWinnings() {
		if (countdown <= 0) { //Battle Cleanup
			cleanupBattle();
			
			goToState(STATE_DECIDING);
		} 
	}
	
	function doRioting() {
		if (redfavor || bluefavor) cleanupBattle();
		if (countdown == 0) goToState(STATE_DECIDING);
	}
	
	function cleanupBattle() {
		if (!(redfavor || bluefavor)) return;
		
		redCurrMon = null; blueCurrMon = null;
		redfavor = bluefavor = 0;
		
		redvotes = [];
		bluevotes = [];
		redPokes = []; 
		bluePokes = [];
		
		for (var i = 0; i < 3; i++) {
			redDom[i].domElement.fadeOut(500);
			blueDom[i].domElement.fadeOut(500);
		}
		
		lastBattleAction = 0;
	}
	
	function calcFavor(myTeam, oppTeam) {
		var overall = 1;
		
		for (var i = 0; i < 3; i++) {
			var poke = myTeam[i];
			var pokefavor = 1;
			
			//check my type 1 versus opponents' types 1 and 2
			var type1 = poke.type;
			for (var j = 0; j < 3; j++) {
				var oppPoke = oppTeam[j];
				
				var type2 = oppPoke.type;
				var f = TYPECHART[type1][type2];
				
				var type2 = oppPoke.type2;
				if (type2 !== null)
					f *= TYPECHART[type1][type2];
				
				pokefavor *= Math.max(f, 0.25);
			}
			
			pokefavor *= poke.favor; //factor in overall favor
			
			overall *= pokefavor;
		}
		return overall;
	}
	
	
	function goToState(state) {
		currState = state;
		switch (state) {
			case STATE_DECIDING: 
				//10% of the time, just randomly riot for a while :P
				if (Math.random() > 0.9) {
					countdown = 120 + Math.floor(Math.random()*120); //1-2 minutes
					currState = STATE_RIOTING;
					console.log("ヽ༼ຈل͜ຈ༽ﾉ RIOT ヽ༼ຈل͜ຈ༽ﾉ");
				} else {
					//normally:
					countdown = 4; //2 seconds between decisions
				}
				break;
			case STATE_VOTING: 
				countdown = 120; //1 minute (in 0.5 sec increments)
				break;
			case STATE_BATTLING:
				countdown = -1; //disabled
				break;
			case STATE_WINNINGS:
				countdown = 30; //15 seconds
				break;
			case STATE_RIOTING:
				countdown = -1; //disabled
				break;
			case STATE_HELIX_PRAISE:
				countdown = 120 + Math.floor(Math.random()*120); //1-2 minutes
				break;
		}
	}
	
	function placeBet(force) {
		var split = redfavor / (redfavor + bluefavor);
		var n = Math.random();// * 65535;
		var red = n < split; //if the random number hits below the favor split, its a red vote
		
		if (force !== undefined) red = force;
		
		//var red = Math.floor((rnd * 3019) % 2)+1;
		if (red) {
			var index = Math.floor((n*49631) % redvotes.length);
			redvotes.splice(index, 0, Math.floor(n * 65565) % 3019);
		} else {
			var index = Math.floor((n*49631) % bluevotes.length);
			bluevotes.splice(index, 0, Math.floor(n * 65565) % 3019);
		}
		
		return (red)? TEAM_RED : TEAM_BLUE;
	}
	
	function submitChatter(msg) {
		if (Math.random() > 0.5) return; //outright reject half of the requests
		var chat = chatterDom.shift();
		if (!chat) return; //no available chatter messages, ignore request
		
		chat
			.html(msg)
			.css({
				left: (Math.random()*80) + "%",
				top: (Math.random()*100) + "%",
			}).show().delay(1200).fadeOut(10, function(){
				chatterDom.push(chat); //return this to the queue
			});
	}
	
	//////////// Battle Manager! /////////////
	
	var lastBattleAction = 0;
	var lastBattleTeam = 0;
	var lastBattleHax = 0;
	
	var TEAM_RED = 1;
	var TEAM_BLUE = 2;
	var TEAM_BOTH = 3;
	
	//Sub states during battle
	var BATTLE_SEND = 1;
	var BATTLE_FAINTS = 2;
	
	var BATTLE_ATK_STATCHANGE = 8;
	var BATTLE_ATK_NO_EFFECT = 9;
	var BATTLE_ATK_MISSES = 10;
	var BATTLE_ATK_HIT_INEFF = 11;
	var BATTLE_ATK_HIT_NORM = 12;
	var BATTLE_ATK_HIT_SUPER = 13;
	var BATTLE_ATK_HIT_CRIT = 14;
	
	var BATTLE_HAX_NO_EFFECT = 20;
	var BATTLE_HAX_MISSES = 21;
	var BATTLE_HAX_HIT_INEFF = 22;
	var BATTLE_HAX_HIT_NORM = 23;
	var BATTLE_HAX_HIT_SUPER = 24;
	var BATTLE_HAX_HIT_CRIT = 25;
	
	var BATTLE_FINISHED = 100;
	
	_bt_Cooldown = 0;
	_bt_turn = 0;
	
	function battleManager() {
		if (currState != STATE_BATTLING) return;
		if (_bt_Cooldown > 0) {
			_bt_Cooldown--; return;
		}
		
		if (redCurrMon == null) { //send out mon!
			redCurrMon = _chooseNextMon(redDom);
			if (!redCurrMon) 
				return _endBattle(false);
			
			_anim_sendMon(true, redCurrMon);
			lastBattleTeam = TEAM_RED;
			lastBattleAction = BATTLE_SEND;
			return;
		}
		
		if (blueCurrMon == null) { //send out mon!
			blueCurrMon = _chooseNextMon(blueDom);
			if (!blueCurrMon) 
				return _endBattle(true);
			
			_anim_sendMon(false, blueCurrMon);
			lastBattleTeam = TEAM_BLUE;
			lastBattleAction = BATTLE_SEND;
			return;
		}
		
		//check HP here!
		if (redCurrMon.hp <= 0) {
			_anim_faintMon(redCurrMon);
			redCurrMon = null;
			lastBattleTeam = TEAM_RED;
			lastBattleAction = BATTLE_FAINTS;
			
			if (blueCurrMon) blueCurrMon.victories++;
		}
		if (blueCurrMon.hp <= 0) {
			_anim_faintMon(blueCurrMon);
			blueCurrMon = null;
			lastBattleTeam = TEAM_BLUE;
			lastBattleAction = BATTLE_FAINTS;
			
			if (redCurrMon) redCurrMon.victories++;
		}
		if (!redCurrMon && !blueCurrMon)
			lastBattleTeam = TEAM_BOTH;
		//separate the return from fainting, so both can do so at the same time
		if (!redCurrMon || !blueCurrMon) return; 
		
		
		if (_bt_turn == 0) { //red's turn
			lastBattleTeam = TEAM_RED;
			_determineHit(true);
			
			_bt_turn = 1;
			
		} else { //blue's turn
			lastBattleTeam = TEAM_BLUE;
			_determineHit(false);
			
			_bt_turn = 0;
		}
		
		
		function _determineHit(red) {
			var me, opp;
			_bt_Cooldown = 3 *4; //cooldown now, so we will have consistant cooldown no matter where we return from
			
			if (red) {
				me = redCurrMon; opp = blueCurrMon;
			} else {
				me = blueCurrMon; opp = redCurrMon;
			}
			var p_me = POKEMON[me.pokemon];
			var p_opp = POKEMON[opp.pokemon];
			
			var baseDamage = 0;
			var attkType = 0;
			var rnd = Math.floor(Math.random()*4); //Detemine the type of move
			
			//special case for magikarp
			if (p_me.hax == "splash") {
				rnd = rnd >> 1; //div by 2
				if (rnd > 0) rnd = 3; //Tackle or Splash only
			} 
			//special case for metapod
			if (p_me.hax == "harden") {
				rnd = 3; //ALWAYS harden
			} 
			
			lastBattleHax = 0;
			switch (rnd) {
				case 0: //Normal move
					baseDamage = 40; //base 40 attack
					attkType = Normal;
					break;
				case 1: //Type 1 move
					baseDamage = 60;
					attkType = p_me.type;
					break;
				case 2: //Type 2 move (or more powerful Type 1, if no 2nd type)
					if (p_me.type2) {
						baseDamage = 80;
						attkType = p_me.type;
					} else {
						baseDamage = 60;
						attkType = p_me.type;
					}
					break;
				case 3: //Hax (or Hax of their type if none defined)
					if (_performHax(red, me, opp)) {
						return; //all hax handing is in there
					} else {
						//no hax to perform! Do random status move that we don't emulate here!
						//TODO
						console.log((red)?"Red":"Blue", "Status!", damage, "Action:", lastBattleAction);
						_anim_monStatus(me);
						lastBattleAction = BATTLE_ATK_STATCHANGE;
						return;
					}
					break;
			}
			
			var damage = 0, multiplier = 1;
			if (baseDamage) {
				multiplier = TYPECHART[attkType][p_opp.type];
				if (p_opp.type2)
					multiplier *= TYPECHART[attkType][p_opp.type2];
				
				if (multiplier < 1) lastBattleAction = BATTLE_ATK_HIT_INEFF;
				else if (multiplier > 1) lastBattleAction = BATTLE_ATK_HIT_SUPER;
				else lastBattleAction = BATTLE_ATK_HIT_NORM;
			}
			
			if (multiplier == 0) { //by type, multiplier already went to 0
				lastBattleAction = BATTLE_ATK_NO_EFFECT;
			} 
			else if (rnd < 3) { //hax will do their own calculations
				var r = Math.random();
				if (r < 0.0625) { //critical hits = 
					multiplier *= 2;
					lastBattleAction = BATTLE_ATK_HIT_CRIT;
				} 
				else if (r > 0.89) { //miss chance
					multiplier *= 0;
					lastBattleAction = BATTLE_ATK_MISSES;
				}
			}
			
			damage = baseDamage * multiplier;
			
			console.log((red)?"Red":"Blue", "Attacks!", damage, "Type:", rnd, "Mul:", multiplier, "Action:", lastBattleAction);
			
			_anim_monAttack(red, me);
			_anim_monHit(!red, opp, multiplier, function(){
				opp.hp -= damage;
			});
		}
		
		function _endBattle(red){
			lastBattleAction = BATTLE_FINISHED;
			lastBattleTeam = (red)? TEAM_RED : TEAM_BLUE;
			
			//If the helix swept all three opponent pokemon, the crowd breaks out into PRAISE HELIX mode
			if ((redCurrMon && (POKEMON[redCurrMon.pokemon].id == 138 || POKEMON[redCurrMon.pokemon].id == 139) && redCurrMon.victories == 3)
			 || (blueCurrMon && (POKEMON[blueCurrMon.pokemon].id == 138 || POKEMON[blueCurrMon.pokemon].id == 139) && blueCurrMon.victories == 3))
			{
				goToState(STATE_HELIX_PRAISE);
			}
			
			goToState(STATE_WINNINGS);
		}
		
		function _chooseNextMon(list) {
			for (var i = 0; i < list.length; i++) {
				if (list[i].hp > 0) {
					return list[i];
				}
			}
			return null;
		}
		function _anim_sendMon(red, event) {
			var x = ((red)? 84 : 81) * 16;
			var y = -27 * 16;
			event.domElement.animate({
				left: x, top: y,
			}, 600);
			event.domAnim
				.animate({ bottom: 16, }, 300)
				.animate({ bottom:  0, }, 300);
			_bt_Cooldown = 3 *4;
		}
		function _anim_faintMon(event) {
			event.domElement.fadeOut(400);
			event.domAnim.animate({ bottom:  -10, }, 400);
			
			_bt_Cooldown = 3 *4;
		}
		
		function _anim_monAttack(red, event) {
			event.domAnim
				.animate({ left: 8 * ((red)?-1:1), }, 150)
				.animate({ left:  0, }, 150);
		}
		function _anim_monHit(red, event, multiplier, hurtCallback) {
			var knockback = 8 * multiplier;
			var returnTime = 300;// * multiplier;
			
			event.domAnim
				.delay(200)
				.animate({ 
					left: knockback * ((red)?1:-1), 
					bottom: (multiplier > 0)?-3:0,
					// transform: "rotate("+(20 * (red)?1:-1 )+")",
				}, 200)
				.queue(function(){
					hurtCallback();
					$(this).dequeue();
				})
				.delay(1000)
				.animate({ 
					left: 0,
					bottom: 0,
					// transform: "rotate(0)",
				}, returnTime);
		}
		
		function _anim_monStatus(event) {
			event.domAnim
				.animate({ bottom: 5, }, 150)
				.animate({ bottom: 0, }, 150)
				.animate({ bottom: 5, }, 150)
				.animate({ bottom: 0, }, 150);
		}
		
		function _getHaxForType(type) {
			switch (type) {
				case Normal: 	return null;
				case Fighting:	return null;
				case Flying:	return "fly";
				case Poison:	return "poison";
				case Ground:	return "earthquake";
				case Rock:		return null;
				case Bug:		return "confusion";
				case Ghost:		return "curse";
				case Steel:		return null;
				case Fire:		return "burn";
				case Water:		return null;
				case Grass:		return null;
				case Electric:	return "para"; //paralysis - don't want to spell
				case Psychic:	return null;
				case Ice:		return "freeze";
				case Dragon:	return null;
				case Dark:		return null;
			}
			return null;
		}
		
		function _calcHaxDamage(attkType, base, p_opp, opts) {
			var damage = 0, multiplier = 1;
			var critChance = (opts.critChance !== undefined)? opts.critChance : 0.0625;
			var accuracy = opts.accuracy || 0.90;
			if (base) {
				multiplier = TYPECHART[attkType][p_opp.type];
				if (p_opp.type2)
					multiplier *= TYPECHART[attkType][p_opp.type2];
				
				if (multiplier < 1) lastBattleAction = BATTLE_HAX_HIT_INEFF;
				else if (multiplier > 1) lastBattleAction = BATTLE_HAX_HIT_SUPER;
				else lastBattleAction = BATTLE_HAX_HIT_NORM;
			}
			
			if (multiplier == 0) { //by type, multiplier already went to 0
				lastBattleAction = BATTLE_HAX_NO_EFFECT;
			} 
			else {
				var r = Math.random();
				if (r < critChance) { //critical hits = 
					multiplier *= 2;
					lastBattleAction = BATTLE_HAX_HIT_CRIT;
				} 
				else if (r > accuracy) { //miss chance
					multiplier *= 0;
					lastBattleAction = BATTLE_HAX_MISSES;
				}
			}
			
			damage = base * multiplier;
			
			return { damage: damage, multiplier: multiplier };
		}
		
		
		function _performHax(red, me, opp) {
			var p_me = POKEMON[me.pokemon];
			var p_opp = POKEMON[opp.pokemon];
			
			var hax = p_me.hax;
			if (!hax) hax = _getHaxForType(p_me.type);
			if (!hax) hax = _getHaxForType(p_me.type2);
			
			lastBattleHax = hax;
			switch(hax) {
				case "posion": break;
				case "burn": break;
				case "para": break;
				case "freeze": break;
				case "sleep": break;
				case "rest":  break;//heal + sleep 2 turns
				
				case "curse": break;
				case "confusion": break;
				case "perish song": break;
				case "rollout": {
					var moveturn = 0;//;
					var res = _calcHaxDamage(Rock,
						 30 * Math.pow(2, moveturn), //2^0 = 1 (30), 2^1 = 2 (60), 2^2 = 4 (120), 2^3 = 8 (240), 2^4 = 16 (480)
						 p_opp, {accuracy : 90});
					
					if (res.damage > 0) me.moveturn++;
					else me.moveturn = 0;
				} break;
				
				case "earthquake": {
					var arena = $(".stadium-arena-element .main");
					var pos = { left: -176, }; //arena.position();
					
					var res = _calcHaxDamage(Ground, 100, p_opp, {accuracy : 100});
					
					me.domAnim
						.animate({ bottom: 10 }, 300)
						.delay(500)
						.animate({ bottom: 0 }, 1000);
					
					$(arena).delay(400)
						.animate({ left: pos.left - 5 }, 50)
						.animate({ left: pos.left + 5 }, 50)//1
						.animate({ left: pos.left - 5 }, 50)
						.animate({ left: pos.left + 5 }, 50)//2
						.animate({ left: pos.left - 5 }, 50)
						.animate({ left: pos.left + 5 }, 50)//3
						.animate({ left: pos.left - 5 }, 50)
						.animate({ left: pos.left + 4 }, 50)//4
						.animate({ left: pos.left + 5 }, 50)
						.animate({ left: pos.left - 5 }, 50)//5
						.animate({ left: pos.left + 5 }, 50)
						.animate({ left: pos.left - 5 }, 50)//6
						.animate({ left: pos.left + 5 }, 50)
						.animate({ left: pos.left - 5 }, 50)//7
						.animate({ left: pos.left + 5 }, 50)
						.animate({ left: pos.left - 5 }, 50)//8
						.animate({ left: pos.left - 3 }, 50)
						.animate({ left: pos.left + 2 }, 50)//900
						.animate({ left: pos.left }, 50)
						.queue(function(){
							opp.hp -= res.damage;
							$(this).dequeue();
						});
					
					if (res.damage > 0) {
						opp.domAnim.delay(400)
							.animate({ left:  8 * res.multiplier }, 150)
							.animate({ left: -8 * res.multiplier }, 150)
							.animate({ left:  8 * res.multiplier }, 150)
							.animate({ left: -8 * res.multiplier }, 150)
							.animate({ left:  8 * res.multiplier }, 150)
							.animate({ left: -8 * res.multiplier }, 150)
							.animate({ left:  0}, 400);
					}
					
					return true;
				} break;
				case "fly": break;
				case "heal": break;
				case "explode": break;
				case "horndrill": break;
				case "metronome": break;
				
				case "splash": {
					me.domAnim
						.animate({ bottom: 16, left:  0, }, { duration: 1000, easing: 'easeInBounce' })
						.animate({ bottom: 0,  left:  0, }, { duration: 1000, easing: 'easeOutBounce' });
				} break;
				case "harden": {
					me.moveturn++;
					if (me.moveturn > 30) {
						lastBattleHax = "struggle"; //The struggle is real
						
						opp.domAnim
							.animate({ left:  8 }, 150)
							.animate({ left: -8 }, 150)
							.animate({ left:  8 }, 150)
							.animate({ left: -8 }, 150)
							.animate({ left:  0 }, 150);
						
						_anim_monHit(!red, opp, 1, function(){
							opp.hp -= 50; //typeless damage, no type calc
							me.hp -= 25; //half damage recoil
						});
					} else {
						opp.domAnim
							.animate({ bottom: 5 }, 150)
							.animate({ bottom: 0 }, 150);
					}
					return true;
				} break;
				
			}
			return null;
		}
		
		
	}
	
	// for (var i = 0; i < 200; i++) placeBet(true);
	// for (var i = 0; i < 180; i++) placeBet(false);
	
	/////////// Patron Definition ////////////
	
	function Patron(opts) {
		if (!(this instanceof Patron))
			return new Patron(opts);
		
		Event.call(this, opts);
	}
	
	Patron.fn = Patron.prototype = new Event({
		name : "<Patron>",
		sprite: 1, 
		
		direction : 0, //0 = down, 1 = up, 2 = left, 3 = right
		style : 0,
		
		delayBehaviorTimer : 0,
		domImage : null,
		team : null, //1 = red, 2 = blue
		
		lastChant : "<dger>ヽ༼ຈل͜ຈ༽ﾉ</dger> STADIUM OR RIOT <dger>ヽ༼ຈل͜ຈ༽ﾉ</dger>",
		dialog: null,
		favorite: -1,
		
		updateImage : function() {
			var x = -this.direction * 16;
			var y = -this.style * 22;
			
			this.domImage.css({
				"background-position" : x+"px "+y+"px",
			});
		},
		
		stadiumBehavior : function() {
			switch(currState) {
				case STATE_DECIDING: {
					this.team = 0;
					
					var r = Math.floor(Math.random()*16);
					this.direction = (r < 4)?r:0;
					
				} break;
					
				case STATE_VOTING: {
					this.delayBehaviorTimer--;
					if (this.delayBehaviorTimer > 0) break;
					
					if (this.team) {
						this.direction = 0;
						break;
					} 
					
					var r = Math.floor(Math.random()*8);
					this.direction = (r < 4)?r:0;
					
					var bet = Math.random();
					// console.log(bet, (countdown/120));
					if (bet > (countdown/120.0)*2) {
						this.team = placeBet();
						
						var betAmt = Math.floor(Math.pow(Math.floor(bet * 4721) % 2.5, 10) + 100);
						if (betAmt > 1000) betAmt = Math.floor(betAmt / 100) * 100;
						this.lastChant = "!bet "+(betAmt)+" "+((this.team == TEAM_RED)?"red":"blue");
						submitChatter(this.lastChant);
					}
					
					this.delayBehaviorTimer = Math.random()*10;
				} break;
				
				case STATE_BATTLING: {
					this.direction = 0;
					
					this.reactToBattle();
					
					this.delayBehaviorTimer = Math.random()*4;
				} break;
				
				case STATE_WINNINGS: {
					var chat = "";
					var rnd = Math.random();
					if (this.team == lastBattleTeam) {
						var winningMon = (lastBattleTeam == TEAM_RED)? redCurrMon : blueCurrMon;
						
						if ((lastBattleTeam == TEAM_RED && redCurrMon.victories == 3)
						  ||(lastBattleTeam == TEAM_BLUE && blueCurrMon.victories == 3))
						{
							var name = POKEMON[winningMon.pokemon].name;
							switch (Math.floor(rnd * 1553) % 10) {
								case 0: chat = "Kreygasm "+name.toUpperCase()+" SWEEP Kreygasm"; break;
								case 1: chat = "DAT "+name.toUpperCase()+" SWEEP"; break;
								case 2: chat = "<dger>ヽ༼ຈل͜ຈ༽ﾉ</dger> "+name.toUpperCase()+" SWEEP <dger>ヽ༼ຈل͜ຈ༽ﾉ</dger>"; break;
								case 3: chat = "SWEEPING UP HERE!"; break;
								//default: break out
							}
						}
						
						if (!chat) {
							switch (Math.floor(rnd * 8)) {
								case 0: chat = "<dger>♫ ┌༼ຈلຈ༽┘ ♪</dger> victory dance  <dger>♫ ┌༼ຈلຈ༽┘ ♪</dger>"; break;
								case 1: chat = "THANK YOU FOR THE MONEY!"; break;
								case 2: chat = "MONEY Kreygasm"; break;
								case 3: chat = "THANK YOU FOR MONEY "+((lastBattleTeam == TEAM_RED)?"BLUE":"RED")+" TEAM!"; break;
								case 4: chat = "No longer in the 100 CLUB!"; break;
								case 4: chat = "GIMMIE MY MONEY!!"; break;
								default:chat = "I HAVE MONEY!"; break;
							}
						}
						
					} else {
						switch (Math.floor(rnd * 8)) {
							case 0: chat = "Back in the 100 club..."; break;
							case 1: chat = "RIP in peace Money"; break;
							case 2: chat = "I lost my money!"; break;
							case 3: chat = "Never go al in..."; break;
							case 4: chat = "NOOOOOOOOOO"; break;
							case 5: chat = "noooooooooooooooo"; break;
							case 6: chat = "Noooooo!!"; break;
							default:chat = "My money! No!"; break;
						}
					}
					
					this.lastChant = chat;
					submitChatter(chat);
				} break;
				
				case STATE_RIOTING: {
					this.delayBehaviorTimer--;
					if (this.delayBehaviorTimer > 0) break;
					
					var r = Math.floor(Math.random()*32);
					this.direction = (r < 16)?r>>2:0;
					
					if (r % 4 == 0) {
						this.domImage.delay(Math.floor(Math.random()*200))
						.animate({
							bottom: 5,
						}, 150).animate({
							bottom: 0,
						}, 150);
						
						submitChatter("ヽ༼ຈل͜ຈ༽ﾉ RIOT ヽ༼ຈل͜ຈ༽ﾉ");
					}
					
					this.delayBehaviorTimer = Math.random()*4;
				} break;
				
				case STATE_HELIX_PRAISE: {
					this.delayBehaviorTimer--;
					if (this.delayBehaviorTimer > 0) break;
					
					var r = Math.floor(Math.random()*32);
					if (r < 4) this.direction = r;
					else if (this.x < 79) this.direction = 3; //look towards middle screen
					else if (this.x > 86) this.direction = 2;
					else this.direction = 1;
					
					if (r % 4 == 0) {
						submitChatter("༼ つ ◕_◕ ༽つ PRAISE HELIX ༼ つ ◕_◕ ༽つ");
					}
					
					this.delayBehaviorTimer = Math.random()*4;
				}
			}
			
			this.updateImage();
		},
		
		getDomElement : function() {
			if (this.domElement) return this.domElement;
			
			var base = $("<div>").addClass("event-base").attr("name", this.name);
			var img = this._createImageTag();
			
			base.append(img);
			
			this._applyShadow(base);
			
			this.domImage = img;
			this._storeElement(base);
			return base;
		},
		
		_createImageTag : function() {
			var eventobj = this;
			
			var img = $("<div>").addClass("main person")
				.css({
					position : "absolute",
					"background-image": "url(img/trainers/stadium_patrons.png)",
					bottom: -2,
				}).on("vclick", function(e){
					console.log("Patron click!");
					eventobj.doClick();
				});
			
			if (this.style < 0) { //custom patrons are in the negatives, convert for use
				img.css("background-image", "url(img/trainers/custom_patrons.png)");
				this.style = -this.style - 1;
			}
			return img;
		},
		
		doClick : function(){
			var text = this.name+": "+this.determineDialog();
			
			timeout = Math.max(4800, text.length * 80); //time out based on text length
			showDialog(text, this.domElement.position(), timeout);
		},
		
		determineDialog : function() {
			if (this.dialog) {
				if ($.isFunction(this.dialog))
					return this.dialog();
				else
					return this.dialog;
			}
			
			switch (currState) {
				case STATE_RIOTING:
					return "<dger>ヽ༼ຈل͜ຈ༽ﾉ</dger> RIOT <dger>ヽ༼ຈل͜ຈ༽ﾉ</span>";
				case STATE_HELIX_PRAISE:
					return "<dger>༼ つ ◕_◕ ༽つ</dger> PRAISE HELIX <dger>༼ つ ◕_◕ ༽つ</dger>";
			}
			
			if (this.lastChant)
				return this.lastChant;
			
			return "<dger>ヽ༼ຈل͜ຈ༽ﾉ</dger> RIOT <dger>ヽ༼ຈل͜ຈ༽ﾉ</dger>";
		},
		
		reactToBattle : function() {
			// this.direction = !(lastBattleTeam == this.team);
			
			if (Math.random() > 0.04) return; //don't do anything 96 percent of the time
			
			var myTeam = lastBattleTeam == this.team;
			var actPokemon = (lastBattleTeam == TEAM_RED)? redCurrMon : blueCurrMon; //TODO adjust for TEAM_BOTH
			
			var pkdata = (actPokemon)? POKEMON[actPokemon.pokemon] : {};
			var name = _getPokeName(pkdata);
			
			var rnd = Math.random();
			var chant = "";
			
			//Build chant
			switch (lastBattleAction) {
				case BATTLE_SEND:
					if (!myTeam) return; //don't react if not my team
					
					switch (Math.floor(rnd * 8)) {
						case 0: chant = "GET 'EM "+name.toUpperCase()+"!"; break;
						case 1: chant = name.toUpperCase()+" SWEEP"; break;
						case 3: chant = "BASED "+name.toUpperCase(); break;
						case 4: chant = "Not "+name+"!"; break;
						case 5: chant = "YEAH "+name.toUpperCase()+"!"; break;
						case 6: chant = name+" will get 'em!"; break;
						case 7: chant = "Get em "+name+"!"; break;
						default:chant = "GO "+name.toUpperCase()+""; break;
					}
					
					break;
				case BATTLE_FAINTS: 
					if (myTeam) {
						if (!chant) {
							switch (Math.floor(rnd * 10)) {
								case 0: chant = "NOOOOOOOOOOOO"; break;
								case 1: chant = "ヽ༼ຈل͜ຈ༽ﾉ RIOT ヽ༼ຈل͜ຈ༽ﾉ"; break;
								case 2: chant = "nooooooooo"; break;
								case 3: chant = "Nooooo"; break;
								case 4: chant = "NOOOOOOOOOOOOOOOOOOOOOO"; break;
								case 5: chant = "noooooooooooooooo"; break;
								case 6: chant = "ggggg"; break;
								case 7: chant = "NOOOOOOOOO"; break;
								case 8: chant = "<dger>( ╯ᐛ )╯︵ ┻━┻</dger>"; break;
								case 9: chant = "RIP FailFish"; break;
								case 10:chant = " GG BloodTrail"; break;
							}
						}
					} else {
						var winningPokemon = (lastBattleTeam == TEAM_RED)? blueCurrMon : redCurrMon;
						
						var pkdata = POKEMON[winningPokemon.pokemon];
						var name = _getPokeName(pkdata);
						
						if (winningPokemon.victories > 1) {
							switch (Math.floor(rnd * 487) % 10) {
								case 0: chant = name.toUpperCase()+" SWEEP?!"; break;
								case 1: chant = name+" Sweep!!"; break;
								case 2: chant = "TIME FOR "+name.toUpperCase()+" SWEEP"; break;
								case 3: chant = "ヽ༼ຈل͜ຈ༽ﾉ "+name.toUpperCase()+" HYPE ヽ༼ຈل͜ຈ༽ﾉ"; break;
								case 4: chant = "THE SWEEP IS REAL"; break;
								case 5: chant = "SWEEP HYPE"; break;
							}
						}
						
						if (!chant) {
							switch (Math.floor(rnd * 10)) {
								case 0: chant = name.toUpperCase()+" HYPE"; break;
								case 1: chant = "HURRAH "+name.toUpperCase()+" ヽ༼ຈل͜ຈ༽ﾉ"; break;
								case 2: chant = name.toUpperCase()+" SWEEP?"; break;
								case 3: chant = "Yes!"; break;
								case 4: chant = "YES!"; break;
								case 5: chant = "GOOOOOO!!"; break;
								case 6: chant = "HYPE"; break;
								case 7: chant = "Kreygasm"; break;
								case 8: chant = "Kreygasm Kreygasm"; break;
								case 8: chant = "TEH URN?!"; break;
							}
						}
					}
					
					break;
				case BATTLE_ATK_HIT_CRIT: 
					if (myTeam) {
						switch (Math.floor(rnd * 3)) {
							case 0: chant = "DAT CRIT!"; break;
							case 1: chant = "CRIT!!!"; break;
							case 2: chant = "YESSSSSSSSSSSSSSS!"; break;
						}
						break;
					} else {
						switch (Math.floor(rnd * 3)) {
							case 0: chant = "DAT CRIT!"; break;
							case 1: chant = name.toUpperCase()+" 2 STRONK PLS NERF!"; break;
							case 2: chant = "NOOOOOO!"; break;
						}
						break;
					}
				
				case BATTLE_ATK_MISSES:
					if (!myTeam) {
						switch (Math.floor(rnd * 3)) {
							case 0: chant = "CLUTCH!"; break;
							case 1: chant = "MISSED!"; break;
							case 2: chant = "!"; break;
						}
					}
					break;
				case BATTLE_ATK_STATCHANGE:
					if (myTeam) {
						switch (Math.floor(rnd * 5)) {
							case 0: chant = "NOOOOOOOOOOO!"; break;
							case 1: chant = "ATTACK!!"; break;
							case 2: chant = "MUST STAT MORE! Kreygasm"; break;
							case 3: chant = "NOOOOOOOO! SwiftRage"; break;
							case 4: chant = "! SwiftRage"; break;
						}
					}
				case BATTLE_ATK_NO_EFFECT:
					if (myTeam) {
						switch (Math.floor(rnd * 5)) {
							case 0: chant = "NOOOOOOOOOOO!"; break;
							case 1: chant = "DO SOMETHING ELSE!!"; break;
							case 2: chant = "That won't work!"; break;
							case 3: chant = "SwiftRage"; break;
						}
					} else {
						switch (Math.floor(rnd * 5)) {
							case 0: chant = "Go on! Keep doing it!"; break;
							case 1: chant = "It doesn't affect!"; break;
							case 2: chant = "lol"; break;
							case 3: chant = "LOLOLOLOLOL"; break;
						}
					}
					
				//CLUTCH!
				//TODO: Heal = "CHEATER!!"
			}
			
			// if (!chant) { //generic chants
			// 	switch (Math.floor(rnd * 1873) % 2) {
			// 		case 0: chant = name+" Intensifies"; break; //"undefined Intesifies"
			// 		case 1: chant = name.toUpperCase()+" Kreygasm"; break;
			// 	}
			// }
			
			this.lastChant = chant;
			submitChatter(chant);
			this.domImage.delay(Math.floor(rnd*200))
				.animate({ bottom: 5, }, 150)
				.animate({ bottom: 0, }, 150)
				.animate({ bottom: 5, }, 150)
				.animate({ bottom: 0, }, 150);
			
			function _getPokeName(pkdata) {
				var name = pkdata.name;
				
				if (pkdata.chant) {
					if (pkdata.chant.length > 1) {
						var id = Math.floor(rnd * 4157) % pkdata.chant.length;
						name = pkdata.chant[id];
					} else {
						name = pkdata.chant[0];
					}
				}
				return name;
			}
		},
	});

/*
LORD HELIX Kreygasm 
Kreygasm LORD HELIX Kreygasm 
 */
	
	/////////// Combatant Definition ////////////
	
	function Combatant(opts) {
		if (!(this instanceof Combatant))
			return new Combatant(opts);
		
		Event.call(this, opts);
		
		this.org_x = this.x;
		this.org_y = this.y;
	}
	
	Combatant.fn = Combatant.prototype = new Event({
		name : "<Combatant>",
		sprite: 1,
		org_x: 0, org_y: 0, //original location, for reset
		
		team : 0, //1=red, 2=blue
		pokemon : 0,
		hp:200,
		
		victories : 0, //number of pokemon this combatant took down, for "SWEEP!" reactions
		moveturn : 0, //for tracking multi-turn hax, like Fly and Rollout
		status : 0, //for when afflicted by status conditions, like Para, Sleep, Poison, Burn, etc
		
		animstep: 0,
		
		delayBehaviorTimer : 0,
		domImage : null,
		dimAnim : null,
		
		setPokemon : function(num){
			this.pokemon = num;
			this.reset();
			this.updateImage();
			this.domElement.show();
		},
		
		reset : function(){
			this.x = this.org_x;
			this.y = this.org_y;
			this.hp = 200;
			this.victories = 0;
			
			if (POKEMON[this.pokemon].hp)
				this.hp = POKEMON[this.pokemon].hp;
			
			this.domElement.css({
				left: this.x * 16,
				top: this.y * 16,
			});
		},
		
		updateImage : function() {
			var pkmn = POKEMON[this.pokemon];
			var bg_x = (this.pokemon % 16) * 32;
			var bg_y = Math.floor(this.pokemon / 16) * 32;
			var spbg = POKEMON[this.pokemon].spbg;
			
			this.domImage.css({
				width: (spbg)?64:32, height: (spbg)?64:32,
				left: -((spbg)?32:16) + 8,
				"background-position": (spbg)?spbg : ("-"+bg_x+"px -"+bg_y+"px"),
			});
		},
		
		stadiumBehavior : function() {
			switch(currState) {
				case STATE_VOTING:
					this.animstep = (this.animstep+1) % 4;
					this.domImage.css("bottom", (this.animstep < 2)?-1: 0);
					break;
				case STATE_BATTLING: break; //DON'T TOUCH! handled by battle manager!
				case STATE_WINNINGS:
					this.animstep = (this.animstep+1) % 4;
					if (this.animstep != 0) break;
					if (this.team == TEAM_RED && lastBattleTeam == TEAM_RED
					|| this.team == TEAM_BLUE && lastBattleTeam == TEAM_BLUE) {
						this.domAnim
							.animate({bottom: 8}, 200)
							.animate({bottom: 0}, 200);
					}
					break;
			}
			
			//this.updateImage();
		},
		
		getDomElement : function() {
			if (this.domElement) return this.domElement;
			
			var base = $("<div>").addClass("event-base").attr("name", this.name);
			var img = this._createImageTag();
			
			base.append(img);
			
			this._applyShadow(base);
			
			this._storeElement(base);
			base.hide();
			return base;
		},
		_createImageTag : function() {
			var eventobj = this;
			
			var img = $("<div>").addClass("main")
				.css({
					position : "absolute",
					width: 32, height: 32,
					"background-image": "url(img/bld/stadium_pokemon.png)",
					bottom: 0,
				}).on("vclick", function(e){
					console.log("Patron click!");
					eventobj.doClick();
				});
			
			if (this.team == 2) { //blue team is flipped
				img.css({
					"transform": "scale(-1, 1)",
					"-ms-transform": "scale(-1, 1)",
					"-webkit-transform": "scale(-1, 1)",
				});
			}
			
			this.domImage = img;
			this.domAnim = $("<div>").addClass("helper").append(img);
			
			return this.domAnim;
		},
	});
	
	/////// Screen event definition ///////
	
	window.requestAnimationFrame = window.requestAnimationFrame || window.moxRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	
	function Screen(opts){
		if (!(this instanceof Screen))
			return new Screen(opts);
		
		Event.call(this, opts);
		this.behavior = this.drawScreen;
		
		// var _this = this;
		// this.intervalID = setInterval(function(){ _this.drawScreen(); }, 100);
	}
	Screen.fn = Screen.prototype = new Event({
		name : "<Screen>",
		sprite : 1, //we supply our own sprite
		
		canvas : null,
		context : null,
		broken : false,
		
		domImage : null,
		// intervalID : 0,
		animRequestID : 0,
		
		_createImageTag : function() {
			var eventobj = this;
			
			var img = $("<div>").addClass("main")
				.css({
					position : "absolute",
					"background-image": "url(img/bld/Stadium_screen.png)",
					top : -16 - this.z,
					left : -16,
					width: 64, height: 48,
				});
			this.domImage = img;
			
			var canvas = $("<canvas width='"+SCREEN_W+"px' height='"+SCREEN_H+"px'>");
			if (!(canvas[0].getContext && canvas[0].getContext('2d'))) {
				//No canvas support, show broken screen
				this.broken = true;
				img.css("background-position", "0px -48px");
				return img;
			}
			
			canvas.css({
				position: "absolute",
				left: 5, top: 8,
				// "background-color" : "blue",
			}).appendTo(img);
			this.canvas = canvas;
			this.context = canvas[0].getContext('2d');
			
			// $("<div>").addClass("debug").css({position: "absolute", top: "40"});
			return img;
		},
		
		drawScreen : function() {
			var _this = this;
			if (this.broken) return;
			
			var ctx = this.context;
			ctx.clearRect(0, 0, SCREEN_W, SCREEN_H);
			
			if (currState == STATE_RIOTING) { showAltScreen(1); return; }
			if (currState == STATE_HELIX_PRAISE) { showAltScreen(2); return; }
			else { showAltScreen(0); }
			
			switch (currState) {
				case STATE_BATTLING: 
					if (!this.animRequestID)
					this.animRequestID = requestAnimationFrame(drawHP);
					break;
				case STATE_RIOTING: showRiotScreen(); break;
				case -1: break;
				default: drawBetting(); break;
			}
			
			function showAltScreen(alt) {
				if (_this.sprite == alt) return;
				_this.domImage.css("background-position", "0px -"+(48*alt)+"px");
				_this.sprite = alt; //flag
			}
			
			function drawBetting() {
				ctx.fillStyle = "red";
				ctx.fillRect(SCREEN_W-10, 0, 10, 3);
				
				ctx.fillStyle = "blue";
				ctx.fillRect(0, 0, 10, 3);
				
				ctx.fillStyle = "white";
				
				//red side bet
				var i = (redvotes.length ? (redvotes.length > 8? 7 : 4) : 2);
				ctx.fillRect(SCREEN_W-10-1-i, 1, i, 2);
				
				//blue side bet
				i = (bluevotes.length ? (bluevotes.length > 8? 7 : 4) : 2);
				ctx.fillRect(11, 1, i, 2);
				
				//middle ratio
				ctx.fillRect(SCREEN_W/2-2, 1, 4, 2);
				
				__names(bluevotes, 0, 4);
				__names(redvotes, SCREEN_W/2+1, 4);
				
				//Now filling out the names
				function __names(array, x, y) {
					ctx.save();
					ctx.translate(x, y);
					
					for (var i = 0; i < array.length; i++) {
						var n = array[i];
						switch(Math.floor(n)%6) {
							case 0:
							case 1: ctx.fillStyle = "#ffffff"; break; //red
							case 2: ctx.fillStyle = "#ac7fc9"; break; //crystal
							case 3: ctx.fillStyle = "#25c36e"; break; //emerald
							case 4: ctx.fillStyle = "#f1993e"; break; //firered
							case 5: ctx.fillStyle = "#7e8080"; break; //platinum
						}
						
						var nameW = Math.floor((1/30)*(n % 20)*(n % 25)+5); //(n % 20)+5;
						ctx.fillRect(0, i, nameW, 1);
						
						ctx.fillStyle = "white";
						ctx.fillRect(SCREEN_W/2-4, i, 3, 1);
						
						//gained or lost: #bbbbbb
						
						ctx.fillStyle = "#777777";
						ctx.fillRect(SCREEN_W/2-7, i, 3, 1);
					}
					
					ctx.restore();
				}
			}
			
			if (!_this.hpstored) {
				_this.hpstored = {
					redDelay : 20, redPos : 54, redHP: 0, redMax: 0, redName: "",
					blueDelay : 20, bluePos : -44, blueHP: 0, blueMax : 0, blueName: "",
				};
			}
			function drawHP() {
				var s = _this.hpstored;
				ctx.clearRect(0, 0, SCREEN_W, SCREEN_H);
				
				if (blueCurrMon) {
					if (s.blueDelay > 0) s.blueDelay--;
					else if (s.bluePos < 0) s.bluePos += 2;
					
					if (blueCurrMon.hp > s.blueHP) s.blueHP++;
					else if (blueCurrMon.hp < s.blueHP) s.blueHP--;
					
					if (!s.blueMax) {
						s.blueHP = blueCurrMon.hp;
						s.blueMax = POKEMON[blueCurrMon.pokemon].hp || 200;
						s.blueName = POKEMON[blueCurrMon.pokemon].name;
					}
				} else {
					if (s.blueDelay < 20) s.blueDelay++;
					else if (s.bluePos > -44) s.bluePos -= 2;
					
					s.blueHP = s.blueMax = 0;
				}
				if (s.bluePos > -44) {
					ctx.save();
					ctx.translate(s.bluePos, 1);
					
					ctx.beginPath();
					ctx.moveTo(-2, 0);
					ctx.lineTo(44, 0);
					ctx.lineTo(34, 15);
					ctx.lineTo(-2, 15);
					ctx.closePath();
					
					ctx.fillStyle = "#a6d4ff";
					ctx.strokeStyle = "1px solid #0d4f8d";
					ctx.fill();
					ctx.stroke();
					
					//HP Bar
					ctx.fillStyle = "#506858";
					ctx.fillRect(0,  9, 44, 4);
					
					var percent = Math.max((s.blueMax)? s.blueHP / s.blueMax : 0, 0);
					if (percent > 0.5) 
						ctx.fillStyle = "#70f8a8";
					else if (percent > 0.2)
						ctx.fillStyle = "#f8e038";
					else
						ctx.fillStyle = "#f85838";
					ctx.fillRect(0, 10, 44*percent, 2);
					
					ctx.font = "8px sans-serif";
					ctx.fillStyle = "black";
					ctx.fillText(s.blueName, 2, 8);
					
					ctx.restore();
				}
				
				if (redCurrMon) {
					if (s.redDelay > 0) s.redDelay--;
					else if (s.redPos > 10) s.redPos -= 2;
					
					if (redCurrMon.hp > s.redHP) s.redHP++;
					else if (redCurrMon.hp < s.redHP) s.redHP--;
					
					if (!s.redMax) {
						s.redHP = redCurrMon.hp;
						s.redMax = POKEMON[redCurrMon.pokemon].hp || 200;
						s.redName = POKEMON[redCurrMon.pokemon].name;
					}
				} else {
					if (s.redDelay < 20) s.redDelay++;
					else if (s.redPos < 54) s.redPos += 2;
					
					s.redHP = s.redMax = 0;
				}
				if (s.redPos < 54) {
					ctx.save();
					ctx.translate(s.redPos, 17);
					
					ctx.beginPath();
					ctx.moveTo(46, 0);
					ctx.lineTo(0, 0);
					ctx.lineTo(10, 15);
					ctx.lineTo(46, 15);
					ctx.closePath();
					
					ctx.fillStyle = "#ffa6a6";
					ctx.strokeStyle = "1px solid #8d0d0d";
					ctx.fill();
					ctx.stroke();
					
					//HP Bar
					ctx.fillStyle = "#506858";
					ctx.fillRect(0,  9, 44, 4);
					
					var percent = Math.max((s.redMax)? s.redHP / s.redMax : 0, 0);
					if (percent > 0.5) 
						ctx.fillStyle = "#70f8a8";
					else if (percent > 0.2)
						ctx.fillStyle = "#f8e038";
					else
						ctx.fillStyle = "#f85838";
					ctx.fillRect(0, 10, 44*percent, 2);
					
					ctx.font = "8px sans-serif";
					ctx.fillStyle = "black";
					ctx.fillText(s.redName, 7, 8);
					
					ctx.restore();
				}
				
				// $(".ui.creditnote").html("DEBUG: blue="+((blueCurrMon)?POKEMON[blueCurrMon.pokemon].name:"<none>")+" red="+((redCurrMon)?POKEMON[redCurrMon.pokemon].name:"<none>")+
				// 	"<br/>bd="+s.blueDelay+" bp="+s.bluePos+" bhp="+s.blueHP+"<br/>rd="+s.redDelay+" rp="+s.redPos+" rhp="+s.redHP);
				
				if (currState == STATE_BATTLING) {
					requestAnimationFrame(drawHP);
				} else {
					_this.animRequestID = 0;
				}
			}
		}
	});
	
	////////////////////////////////////////
	{
		//definitions of events!
		addEvent(new Building({
			name: "Pokemon Stadium 2 (Ext)",
			sprite: "img/bld/Stadium_ext.png",
			x : 76, y : -17,
			warp_x: 176, warp_y: 368,
			
			getDomElement : function(){
				var base = Building.fn.getDomElement.call(this);
				chatterContainer = $("<div>").addClass("staidum-chatter-container").appendTo(base);
				return base;
			},
			
			_createImageTag : function() {
				var img = Building.fn._createImageTag.call(this);
				img.css("pointer-events", "none");
				return img;
			},
		}));
		
		addEvent(new Building({
			name: "Pokemon Stadium 2 (Seating)",
			sprite: "img/bld/Stadium_seating.png",
			x : 80, y : -39,
			warp_x: 192, warp_y: 0,
		}));
		
		var b = new Building({
			name: "Pokemon Stadium 2 (Arena)",
			sprite: "img/bld/Stadium_arena.png",
			x : 79, y : -30,
			warp_x: 176, warp_y: 8,
			
			getDomElement : function(){
				var base = Building.fn.getDomElement.call(this);
				base.addClass("stadium-arena-element");
				return base;
			},
			
			stadiumBehavior : battleManager,
		});
		addEvent(b);
		eventlist.push(b);
		
		b = new Building({
			name: "Pokemon Stadium 2 (Entrance)",
			sprite: "img/bld/Stadium_entrance.png",
			x : 82, y : -14,
			warp_x: 144, warp_y: 48,
			
			activeZone: {
				left: 65, right: 100,
				top: -40, bottom: -17,
			},
			
			behavior : doStadium,
			stadiumBehavior : checkStadiumActive,
		});
		addEvent(b);
		eventlist.push(b);
		
		addEvent(new Screen({
			x: 82, y: -16, z: 4*16,
		}));
		
		addEvent(new Screen({
			x: 82, y: -36,
		}));
		
	}
	
	/////////////////////////////////////////////////////////
	//Large Dexes that I don't want at the TOP of the file
	/////////////////////////////////////////////////////////
	
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
		// { name: "", 		style: -1, },
		// { name: "", 		style: -1, },
		// { name: "", 		style: -1, },
	];
	
	////// Random Names //////
	// Pulled from the chat at various moments in time
	var RANDOM_NAMES = [
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
		//requested additions
		"chaoticcookie39", "abiyoru", "222phantom", "Onamuk", "BettingBetter", "UltraMew", "Jacobjr1", "Blademan9999",
		"Deny_Craft", "addgro_ove", "Mudkiplikeaboss",
	];

	////// Types //////
	var Normal = 0, Fighting = 1, Flying = 2, Poison = 3, Ground = 4, Rock = 5, Bug = 6, Ghost = 7, Steel = 8, 
		Fire = 9, Water = 10, Grass = 11, Electric = 12, Psychic = 13, Ice = 14, Dragon = 15, Dark = 16;
	
	var TYPECHART = [ //as per Gens 2 to 5, according to Bulbapedia
	//	 Nm   Fi   Fl   Ps   Gr   Rk   Bg   Gh   St   Fr   Wr   Gr   El   Ps   Ic   Dr   Dk (Defending type / Attacking type)
		[ 1 ,  1 ,  1 ,  1 ,  1 , 0.5,  1 ,  0 , 0.5,  1 ,  1 ,  1 ,  1 ,  1 ,  1 ,  1 ,  1 ], // Normal
		[ 2 ,  1 , 0.5, 0.5,  1 ,  2 , 0.5,  0 ,  2 ,  1 ,  1 ,  1 ,  1 , 0.5,  2 ,  1 ,  2 ], // Fight
		[ 1 ,  2 ,  1 ,  1 ,  1 , 0.5,  2 ,  1 , 0.5,  1 ,  1 ,  2 , 0.5,  1 ,  1 ,  1 ,  1 ], // Flying
		[ 1 ,  1 ,  1 , 0.5, 0.5, 0.5,  1 , 0.5,  0 ,  1 ,  1 ,  2 ,  1 ,  1 ,  1 ,  1 ,  1 ], // Poison
		[ 1 ,  1 ,  0 ,  2 ,  1 ,  2 , 0.5,  1 ,  2 ,  2 ,  1 , 0.5,  2 ,  1 ,  1 ,  1 ,  1 ], // Ground
		[ 1 , 0.5,  2 ,  1 , 0.5,  1 ,  2 ,  1 , 0.5,  2 ,  1 ,  1 ,  1 ,  1 ,  2 ,  1 ,  1 ], // Rock
		[ 1 , 0.5, 0.5, 0.5,  1 ,  1 ,  1 , 0.5, 0.5, 0.5,  1 ,  2 ,  1 ,  2 ,  1 ,  1 ,  2 ], // Bug
		[ 0 ,  1 ,  1 ,  1 ,  1 ,  1 ,  1 ,  2 , 0.5,  1 ,  1 ,  1 ,  1 ,  2 ,  1 ,  1 , 0.5], // Ghost
		[ 1 ,  1 ,  1 ,  1 ,  1 ,  2 ,  1 ,  1 , 0.5, 0.5, 0.5,  1 , 0.5,  1 ,  2 ,  1 ,  1 ], // Steel
		[ 1 ,  1 ,  1 ,  1 ,  1 , 0.5,  2 ,  1 ,  2 , 0.5, 0.5,  2 ,  1 ,  1 ,  2 , 0.5,  1 ], // Fire
		[ 1 ,  1 ,  1 ,  1 ,  2 ,  2 ,  1 ,  1 ,  1 ,  2 , 0.5, 0.5,  1 ,  1 ,  1 , 0.5,  1 ], // Water
		[ 1 ,  1 , 0.5, 0.5,  2 ,  2 , 0.5,  1 , 0.5, 0.5,  2 , 0.5,  1 ,  1 ,  1 , 0.5,  1 ], // Grass
		[ 1 ,  1 ,  2 ,  1 ,  0 ,  1 ,  1 ,  1 ,  1 ,  1 ,  2 , 0.5, 0.5,  1 ,  1 , 0.5,  1 ], // Electric
		[ 1 ,  2 ,  1 ,  2 ,  1 ,  1 ,  1 ,  1 , 0.5,  1 ,  1 ,  1 ,  1 , 0.5,  1 ,  1 ,  0 ], // Psychic
		[ 1 ,  1 ,  2 ,  1 ,  2 ,  1 ,  1 ,  1 , 0.5, 0.5, 0.5,  2 ,  1 ,  1 , 0.5,  2 ,  1 ], // Ice
		[ 1 ,  1 ,  1 ,  1 ,  1 ,  1 ,  1 ,  1 , 0.5,  1 ,  1 ,  1 ,  1 ,  1 ,  1 ,  2 ,  1 ], // Dragon
		[ 1 , 0.5,  1 ,  1 ,  1 ,  1 ,  1 ,  2 , 0.5,  1 ,  1 ,  1 ,  1 ,  2 ,  1 ,  1 , 0.5], // Dark
	];
	
	////// Pokedex //////
	var POKEMON = [
		{ id : 001, name: "Bulbasaur"	, type: Grass,		type2: Poison, 	favor: 1.2},
		{ id : 002, name: "Ivysaur"		, type: Grass,		type2: Poison, 	favor: 1},
		{ id : 003, name: "Venusaur"	, type: Grass,		type2: Poison, 	favor: 1},
		{ id : 004, name: "Charmander"	, type: Fire,		type2: null, 	favor: 1},
		{ id : 005, name: "Charmeleon"	, type: Fire,		type2: null, 	favor: 1},
		{ id : 006, name: "Charizard"	, type: Fire,		type2: Flying, 	favor: 1},
		{ id : 007, name: "Squirtle"	, type: Water,		type2: null, 	favor: 1},
		{ id : 008, name: "Wartortle"	, type: Water,		type2: null, 	favor: 1},
		{ id : 009, name: "Blastoise"	, type: Water,		type2: null, 	favor: 1},
		{ id : 010, name: "Caterpie"	, type: Bug,		type2: null, 	favor: 1},
		{ id : 011, name: "Metapod"		, type: Bug,		type2: null, 	favor: 0.6, hax: "harden",},
		{ id : 012, name: "Butterfree"	, type: Bug,		type2: Flying, 	favor: 1},
		{ id : 013, name: "Weedle"		, type: Bug,		type2: Poison, 	favor: 1},
		{ id : 014, name: "Kakuna"		, type: Bug,		type2: Poison, 	favor: 0.5, hax: "harden",},
		{ id : 015, name: "Beedrill"	, type: Bug,		type2: Poison, 	favor: 1},
		{ id : 016, name: "Pidgey"		, type: Normal,		type2: Flying, 	favor: 1},
		{ id : 017, name: "Pidgeotto"	, type: Normal,		type2: Flying, 	favor: 1.3, chant: ["Bird Jesus", "Brian"] },
		{ id : 018, name: "Pidgeot"		, type: Normal,		type2: Flying, 	favor: 1.4, chant: ["Bird Jesus", "Brian"] },
		{ id : 019, name: "Rattata"		, type: Normal,		type2: null, 	favor: 1},
		{ id : 020, name: "Raticate"	, type: Normal,		type2: null, 	favor: 1},
		{ id : 021, name: "Spearow"		, type: Normal,		type2: Flying, 	favor: 1},
		{ id : 022, name: "Fearow"		, type: Normal,		type2: Flying, 	favor: 1},
		{ id : 023, name: "Ekans"		, type: Poison,		type2: null, 	favor: 1},
		{ id : 024, name: "Arbok"		, type: Poison,		type2: null, 	favor: 1},
		{ id : 025, name: "Pikachu"		, type: Electric,	type2: null, 	favor: 1},
		{ id : 026, name: "Raichu"		, type: Electric,	type2: null, 	favor: 1},
		{ id : 027, name: "Sandshrew"	, type: Ground,		type2: null, 	favor: 1},
		{ id : 028, name: "Sandslash"	, type: Ground,		type2: null, 	favor: 1},
		{ id : 029, name: "Nidoran♀"	, type: Poison,		type2: null, 	favor: 1},
		{ id : 030, name: "Nidorina"	, type: Poison,		type2: null, 	favor: 1},
		{ id : 031, name: "Nidoqueen"	, type: Poison,		type2: Ground, 	favor: 1},
		{ id : 032, name: "Nidoran♂"	, type: Poison,		type2: null, 	favor: 1},
		{ id : 033, name: "Nidorino"	, type: Poison,		type2: null, 	favor: 1},
		{ id : 034, name: "Nidoking"	, type: Poison,		type2: Ground, 	favor: 1},
		{ id : 035, name: "Clefairy"	, type: Normal,		type2: null, 	favor: 1, hax:"metronome" },
		{ id : 036, name: "Clefable"	, type: Normal,		type2: null, 	favor: 1, hax:"metronome" },
		{ id : 037, name: "Vulpix"		, type: Fire,		type2: null, 	favor: 1},
		{ id : 038, name: "Ninetales"	, type: Fire,		type2: null, 	favor: 1},
		{ id : 039, name: "Jigglypuff"	, type: Normal,		type2: null, 	favor: 1, hax:"sleep" },
		{ id : 040, name: "Wigglytuff"	, type: Normal,		type2: null, 	favor: 1, hax:"sleep" },
		{ id : 041, name: "Zubat"		, type: Poison,		type2: Flying, 	favor: 1},
		{ id : 042, name: "Golbat"		, type: Poison,		type2: Flying, 	favor: 1},
		{ id : 043, name: "Oddish"		, type: Grass,		type2: Poison, 	favor: 1},
		{ id : 044, name: "Gloom"		, type: Grass,		type2: Poison, 	favor: 1, chant: ["Cabbage", "Gloom"] },
		{ id : 045, name: "Vileplume"	, type: Grass,		type2: Poison, 	favor: 1, chant: ["Cabbage", "Vileplume"] },
		{ id : 046, name: "Paras"		, type: Bug,		type2: Grass, 	favor: 1},
		{ id : 047, name: "Parasect"	, type: Bug,		type2: Grass, 	favor: 1},
		{ id : 048, name: "Venonat"		, type: Bug,		type2: Poison, 	favor: 1},
		{ id : 049, name: "Venomoth"	, type: Bug,		type2: Poison, 	favor: 1},
		{ id : 050, name: "Diglett"		, type: Ground,		type2: null, 	favor: 1},
		{ id : 051, name: "Dugtrio"		, type: Ground,		type2: null, 	favor: 1},
		{ id : 052, name: "Meowth"		, type: Normal,		type2: null, 	favor: 1},
		{ id : 053, name: "Persian"		, type: Normal,		type2: null, 	favor: 1},
		{ id : 054, name: "Psyduck"		, type: Water,		type2: null, 	favor: 1},
		{ id : 055, name: "Golduck"		, type: Water,		type2: null, 	favor: 1},
		{ id : 056, name: "Mankey"		, type: Fighting,	type2: null, 	favor: 1},
		{ id : 057, name: "Primeape"	, type: Fighting,	type2: null, 	favor: 1},
		{ id : 058, name: "Growlithe"	, type: Fire,		type2: null, 	favor: 1},
		{ id : 059, name: "Arcanine"	, type: Fire,		type2: null, 	favor: 1},
		{ id : 060, name: "Poliwag"		, type: Water,		type2: null, 	favor: 1},
		{ id : 061, name: "Poliwhirl"	, type: Water,		type2: null, 	favor: 1},
		{ id : 062, name: "Poliwrath"	, type: Water,		type2: Fighting,favor: 1},
		{ id : 063, name: "Abra"		, type: Psychic,	type2: null, 	favor: 1},
		{ id : 064, name: "Kadabra"		, type: Psychic,	type2: null, 	favor: 1.4},
		{ id : 065, name: "Alakazam"	, type: Psychic,	type2: null, 	favor: 1.5},
		{ id : 066, name: "Machop"		, type: Fighting,	type2: null, 	favor: 1},
		{ id : 067, name: "Machoke"		, type: Fighting,	type2: null, 	favor: 1},
		{ id : 068, name: "Machamp"		, type: Fighting,	type2: null, 	favor: 1},
		{ id : 069, name: "Bellsprout"	, type: Grass,		type2: Poison, 	favor: 1},
		{ id : 070, name: "Weepinbell"	, type: Grass,		type2: Poison, 	favor: 1},
		{ id : 071, name: "Victreebel"	, type: Grass,		type2: Poison, 	favor: 1},
		{ id : 072, name: "Tentacool"	, type: Water,		type2: Poison, 	favor: 1},
		{ id : 073, name: "Tentacruel"	, type: Water,		type2: Poison, 	favor: 1},
		{ id : 074, name: "Geodude"		, type: Rock,		type2: Ground, 	favor: 1},
		{ id : 075, name: "Graveler"	, type: Rock,		type2: Ground, 	favor: 1, hax: "rollout" },
		{ id : 076, name: "Golem"		, type: Rock,		type2: Ground, 	favor: 1},
		{ id : 077, name: "Ponyta"		, type: Fire,		type2: null, 	favor: 1},
		{ id : 078, name: "Rapidash"	, type: Fire,		type2: null, 	favor: 1},
		{ id : 079, name: "Slowpoke"	, type: Water,		type2: Psychic,	favor: 1},
		{ id : 080, name: "Slowbro"		, type: Water,		type2: Psychic,	favor: 1},
		{ id : 081, name: "Magnemite"	, type: Electric,	type2: Steel, 	favor: 1},
		{ id : 082, name: "Magneton"	, type: Electric,	type2: Steel, 	favor: 1},
		{ id : 083, name: "Farfetch'd"	, type: Normal,		type2: Flying, 	favor: 1.1, chant: ["DUX"] },
		{ id : 084, name: "Doduo"		, type: Normal,		type2: Flying, 	favor: 1},
		{ id : 085, name: "Dodrio"		, type: Normal,		type2: Flying, 	favor: 1},
		{ id : 086, name: "Seel"		, type: Water,		type2: null, 	favor: 1},
		{ id : 087, name: "Dewgong"		, type: Water,		type2: Ice, 	favor: 1, hax:"rest", chant: ["Restgong", "Dewgong"] },
		{ id : 088, name: "Grimer"		, type: Poison,		type2: null, 	favor: 1},
		{ id : 089, name: "Muk"			, type: Poison,		type2: null, 	favor: 1},
		{ id : 090, name: "Shellder"	, type: Water,		type2: null, 	favor: 1},
		{ id : 091, name: "Cloyster"	, type: Water,		type2: Ice, 	favor: 1},
		{ id : 092, name: "Gastly"		, type: Ghost,		type2: Poison, 	favor: 1},
		{ id : 093, name: "Haunter"		, type: Ghost,		type2: Poison, 	favor: 1},
		{ id : 094, name: "Gengar"		, type: Ghost,		type2: Poison, 	favor: 1},
		{ id : 095, name: "Onix"		, type: Rock,		type2: Ground, 	favor: 1, hp:300},
		{ id : 096, name: "Drowzee"		, type: Psychic,	type2: null, 	favor: 1},
		{ id : 097, name: "Hypno"		, type: Psychic,	type2: null, 	favor: 1},
		{ id : 098, name: "Krabby"		, type: Water,		type2: null, 	favor: 1},
		{ id : 099, name: "Kingler"		, type: Water,		type2: null, 	favor: 1},
		{ id : 100, name: "Voltorb"		, type: Electric,	type2: null, 	favor: 1, hax:"explode" },
		{ id : 101, name: "Electrode"	, type: Electric,	type2: null, 	favor: 1, hax:"explode" },
		{ id : 102, name: "Exeggcute"	, type: Grass,		type2: Psychic,	favor: 1},
		{ id : 103, name: "Exeggutor"	, type: Grass,		type2: Psychic,	favor: 1},
		{ id : 104, name: "Cubone"		, type: Ground,		type2: null, 	favor: 1},
		{ id : 105, name: "Marowak"		, type: Ground,		type2: null, 	favor: 1},
		{ id : 106, name: "Hitmonlee"	, type: Fighting,	type2: null, 	favor: 1, chant: ["C3KO"] },
		{ id : 107, name: "Hitmonchan"	, type: Fighting,	type2: null, 	favor: 1},
		{ id : 108, name: "Lickitung"	, type: Normal,		type2: null, 	favor: 1},
		{ id : 109, name: "Koffing"		, type: Poison,		type2: null, 	favor: 1, hax:"explode" },
		{ id : 110, name: "Weezing"		, type: Poison,		type2: null, 	favor: 1, hax:"explode" },
		{ id : 111, name: "Rhyhorn"		, type: Ground,		type2: Rock, 	favor: 1, hax:"horndrill" },
		{ id : 112, name: "Rhydon"		, type: Ground,		type2: Rock, 	favor: 1, hax:"horndrill" },
		{ id : 113, name: "Chansey"		, type: Normal,		type2: null, 	favor: 1, hax:"heal" },
		{ id : 114, name: "Tangela"		, type: Grass,		type2: null, 	favor: 1},
		{ id : 115, name: "Kangaskhan"	, type: Normal,		type2: null, 	favor: 1},
		{ id : 116, name: "Horsea"		, type: Water,		type2: null, 	favor: 1},
		{ id : 117, name: "Seadra"		, type: Water,		type2: null, 	favor: 1},
		{ id : 118, name: "Goldeen"		, type: Water,		type2: null, 	favor: 1},
		{ id : 119, name: "Seaking"		, type: Water,		type2: null, 	favor: 1},
		{ id : 120, name: "Staryu"		, type: Water,		type2: null, 	favor: 1},
		{ id : 121, name: "Starmie"		, type: Water,		type2: Psychic,	favor: 1},
		{ id : 122, name: "Mr. Mime"	, type: Psychic,	type2: null, 	favor: 1},
		{ id : 123, name: "Scyther"		, type: Bug,		type2: Flying, 	favor: 1},
		{ id : 124, name: "Jynx"		, type: Ice,		type2: Psychic,	favor: 1},
		{ id : 125, name: "Electabuzz"	, type: Electric,	type2: null, 	favor: 1},
		{ id : 126, name: "Magmar"		, type: Fire,		type2: null, 	favor: 1},
		{ id : 127, name: "Pinsir"		, type: Bug,		type2: null, 	favor: 1},
		{ id : 128, name: "Tauros"		, type: Normal,		type2: null, 	favor: 1},
		{ id : 129, name: "Magikarp"	, type: Water,		type2: null, 	favor: 0.09, hax:"splash" },
		{ id : 130, name: "Gyarados"	, type: Water,		type2: Flying, 	favor: 1.05},
		{ id : 131, name: "Lapras"		, type: Water,		type2: Ice, 	favor: 1, hax:"perish song", hp: 250},
		{ id : 132, name: "Ditto"		, type: Normal,		type2: null, 	favor: 1, forbidden: true}, //don't want to program ditto's transform... O_o
		{ id : 133, name: "Eevee"		, type: Normal,		type2: null, 	favor: 1},
		{ id : 134, name: "Vaporeon"	, type: Water,		type2: null, 	favor: 1},
		{ id : 135, name: "Jolteon"		, type: Electric,	type2: null, 	favor: 1},
		{ id : 136, name: "Flareon"		, type: Fire,		type2: null, 	favor: 1, chant: ["False Prophet", "The False Prophet"] },
		{ id : 137, name: "Porygon"		, type: Normal,		type2: null, 	favor: 1},
		{ id : 138, name: "Omanyte"		, type: Rock,		type2: Water, 	favor: 2.0, chant: ["Helix", "Lord Helix"] },
		{ id : 139, name: "Omastar"		, type: Rock,		type2: Water, 	favor: 2.1, chant: ["Helix", "Lord Helix"] }, //༼ つ ◕_◕ ༽つ PRAISE HELIX ༼ つ ◕_◕ ༽つ after a full team helix sweep
		{ id : 140, name: "Kabuto"		, type: Rock,		type2: Water, 	favor: 1.9, chant: ["Dome"] },
		{ id : 141, name: "Kabutops"	, type: Rock,		type2: Water, 	favor: 2.0, chant: ["Dome"] },
		{ id : 142, name: "Aerodactyl"	, type: Rock,		type2: Flying, 	favor: 1.6, chant: ["Amber"] },
		{ id : 143, name: "Snorlax"		, type: Normal,		type2: null, 	favor: 1.9, hp:350},
		{ id : 144, name: "Articuno"	, type: Ice,		type2: Flying, 	favor: 1.8},
		{ id : 145, name: "Zapdos"		, type: Electric,	type2: Flying, 	favor: 1.8},
		{ id : 146, name: "Moltres"		, type: Fire,		type2: Flying, 	favor: 1.8},
		{ id : 147, name: "Dratini"		, type: Dragon,		type2: null, 	favor: 1.1},
		{ id : 148, name: "Dragonair"	, type: Dragon,		type2: null, 	favor: 1.4},
		{ id : 149, name: "Dragonite"	, type: Dragon,		type2: Flying, 	favor: 1.7, chant: ["Katie", "Dragonite"] },
		{ id : 150, name: "Mewtwo"		, type: Psychic,	type2: null, 	favor: 1, forbidden: true},
		{ id : 151, name: "Mew"			, type: Psychic,	type2: null, 	favor: 2, chant: ["Marc", "Mew", "Karl Marc"], forbidden: true },
		{ id : 152, name: "Chikorita"	, type: Grass,		type2: null, 	favor: 1},
		{ id : 153, name: "Bayleef"		, type: Grass,		type2: null, 	favor: 1},
		{ id : 154, name: "Meganium"	, type: Grass,		type2: null, 	favor: 1},
		{ id : 155, name: "Cyndaquil"	, type: Fire,		type2: null, 	favor: 1},
		{ id : 156, name: "Quilava"		, type: Fire,		type2: null, 	favor: 1},
		{ id : 157, name: "Typhlosion"	, type: Fire,		type2: null, 	favor: 1},
		{ id : 158, name: "Totodile"	, type: Water,		type2: null, 	favor: 1.2, chant: ["LazorGator", "Gatoraide", "The Gator", "Gator"] },
		{ id : 159, name: "Croconaw"	, type: Water,		type2: null, 	favor: 1.5, chant: ["LazorGator", "Gatoraide", "The Gator", "Gator"] },
		{ id : 160, name: "Feraligatr"	, type: Water,		type2: null, 	favor: 1.8, chant: ["LazorGator", "Gatoraide", "The Gator", "Gator"] },
		{ id : 161, name: "Sentret"		, type: Normal,		type2: null, 	favor: 1.2, chant: ["Admiral"] },
		{ id : 162, name: "Furret"		, type: Normal,		type2: null, 	favor: 1},
		{ id : 163, name: "Hoothoot"	, type: Normal,		type2: Flying, 	favor: 1},
		{ id : 164, name: "Noctowl"		, type: Normal,		type2: Flying, 	favor: 1},
		{ id : 165, name: "Ledyba"		, type: Bug,		type2: Flying, 	favor: 1},
		{ id : 166, name: "Ledian"		, type: Bug,		type2: Flying, 	favor: 1},
		{ id : 167, name: "Spinarak"	, type: Bug,		type2: Poison, 	favor: 1},
		{ id : 168, name: "Ariados"		, type: Bug,		type2: Poison, 	favor: 1},
		{ id : 169, name: "Crobat"		, type: Poison,		type2: Flying, 	favor: 1.1},
		{ id : 170, name: "Chinchou"	, type: Water,		type2: Electric,favor: 1},
		{ id : 171, name: "Lanturn"		, type: Water,		type2: Electric,favor: 1},
		{ id : 172, name: "Pichu"		, type: Electric,	type2: null, 	favor: 0.9},
		{ id : 173, name: "Cleffa"		, type: Normal,		type2: null, 	favor: 0.8},
		{ id : 174, name: "Igglybuff"	, type: Normal,		type2: null, 	favor: 0.8},
		{ id : 175, name: "Togepi"		, type: Normal,		type2: null, 	favor: 0.8},
		{ id : 176, name: "Togetic"		, type: Normal,		type2: Flying, 	favor: 1},
		{ id : 177, name: "Natu"		, type: Psychic,	type2: Flying, 	favor: 1},
		{ id : 178, name: "Xatu"		, type: Psychic,	type2: Flying, 	favor: 1},
		{ id : 179, name: "Mareep"		, type: Electric,	type2: null, 	favor: 1},
		{ id : 180, name: "Flaaffy"		, type: Electric,	type2: null, 	favor: 1},
		{ id : 181, name: "Ampharos"	, type: Electric,	type2: null, 	favor: 1},
		{ id : 182, name: "Bellossom"	, type: Grass,		type2: null, 	favor: 1},
		{ id : 183, name: "Marill"		, type: Water,		type2: null, 	favor: 1, hax:"rollout", chant:["M4", "M4rill"] },
		{ id : 184, name: "Azumarill"	, type: Water,		type2: null, 	favor: 1, hax:"rollout", chant:["M4", "M4rill"] },
		{ id : 185, name: "Sudowoodo"	, type: Rock,		type2: null, 	favor: 1},
		{ id : 186, name: "Politoed"	, type: Water,		type2: null, 	favor: 1, hax:"perish song" },
		{ id : 187, name: "Hoppip"		, type: Grass,		type2: Flying, 	favor: 1},
		{ id : 188, name: "Skiploom"	, type: Grass,		type2: Flying, 	favor: 1},
		{ id : 189, name: "Jumpluff"	, type: Grass,		type2: Flying, 	favor: 1},
		{ id : 190, name: "Aipom"		, type: Normal,		type2: null, 	favor: 1},
		{ id : 191, name: "Sunkern"		, type: Grass,		type2: null, 	favor: 1},
		{ id : 192, name: "Sunflora"	, type: Grass,		type2: null, 	favor: 1},
		{ id : 193, name: "Yanma"		, type: Bug,		type2: Flying, 	favor: 1},
		{ id : 194, name: "Wooper"		, type: Water,		type2: Ground, 	favor: 1, hp:250},
		{ id : 195, name: "Quagsire"	, type: Water,		type2: Ground, 	favor: 1},
		{ id : 196, name: "Espeon"		, type: Psychic,	type2: null, 	favor: 1.7, hax:"attract", chant: ["Burrito"]},
		{ id : 197, name: "Umbreon"		, type: Dark,		type2: null, 	favor: 1},
		{ id : 198, name: "Murkrow"		, type: Dark,		type2: Flying, 	favor: 1},
		{ id : 199, name: "Slowking"	, type: Water,		type2: Psychic,	favor: 1},
		{ id : 200, name: "Misdreavus"	, type: Ghost,		type2: null, 	favor: 1},
		{ id : 201, name: "Unown"		, type: Psychic,	type2: null, 	favor: 1.1},
		{ id : 202, name: "Wobbuffet"	, type: Psychic,	type2: null, 	favor: 1, hax:"counter",},
		{ id : 203, name: "Girafarig"	, type: Normal,		type2: Psychic,	favor: 1},
		{ id : 204, name: "Pineco"		, type: Bug,		type2: null, 	favor: 1},
		{ id : 205, name: "Forretress"	, type: Bug,		type2: Steel, 	favor: 1},
		{ id : 206, name: "Dunsparce"	, type: Normal,		type2: null, 	favor: 1},
		{ id : 207, name: "Gligar"		, type: Ground,		type2: Flying, 	favor: 1},
		{ id : 208, name: "Steelix"		, type: Steel,		type2: Ground, 	favor: 1.7, hp:300, chant: ["Solid Snake", "Steelix"], spbg:"-448px -480px" },
		{ id : 209, name: "Snubbull"	, type: Normal,		type2: null, 	favor: 1},
		{ id : 210, name: "Granbull"	, type: Normal,		type2: null, 	favor: 1},
		{ id : 211, name: "Qwilfish"	, type: Water,		type2: Poison, 	favor: 1},
		{ id : 212, name: "Scizor"		, type: Bug,		type2: Steel, 	favor: 1},
		{ id : 213, name: "Shuckle"		, type: Bug,		type2: Rock, 	favor: 1},
		{ id : 214, name: "Heracross"	, type: Bug,		type2: Fighting,favor: 1},
		{ id : 215, name: "Sneasel"		, type: Dark,		type2: Ice, 	favor: 1},
		{ id : 216, name: "Teddiursa"	, type: Normal,		type2: null, 	favor: 1},
		{ id : 217, name: "Ursaring"	, type: Normal,		type2: null, 	favor: 1},
		{ id : 218, name: "Slugma"		, type: Fire,		type2: null, 	favor: 1},
		{ id : 219, name: "Magcargo"	, type: Fire,		type2: Rock, 	favor: 1},
		{ id : 220, name: "Swinub"		, type: Ice,		type2: Ground, 	favor: 1},
		{ id : 221, name: "Piloswine"	, type: Ice,		type2: Ground, 	favor: 1},
		{ id : 222, name: "Corsola"		, type: Water,		type2: Rock, 	favor: 1},
		{ id : 223, name: "Remoraid"	, type: Water,		type2: null, 	favor: 1},
		{ id : 224, name: "Octillery"	, type: Water,		type2: null, 	favor: 1},
		{ id : 225, name: "Delibird"	, type: Ice,		type2: Flying, 	favor: 1},
		{ id : 226, name: "Mantine"		, type: Water,		type2: Flying, 	favor: 1},
		{ id : 227, name: "Skarmory"	, type: Steel,		type2: Flying, 	favor: 1},
		{ id : 228, name: "Houndour"	, type: Dark,		type2: Fire, 	favor: 1},
		{ id : 229, name: "Houndoom"	, type: Dark,		type2: Fire, 	favor: 1},
		{ id : 230, name: "Kingdra"		, type: Water,		type2: Dragon, 	favor: 1},
		{ id : 231, name: "Phanpy"		, type: Ground,		type2: null, 	favor: 1},
		{ id : 232, name: "Donphan"		, type: Ground,		type2: null, 	favor: 1},
		{ id : 233, name: "Porygon2"	, type: Normal,		type2: null, 	favor: 1},
		{ id : 234, name: "Stantler"	, type: Normal,		type2: null, 	favor: 1},
		{ id : 235, name: "Smeargle"	, type: Normal,		type2: null, 	favor: 1},
		{ id : 236, name: "Tyrogue"		, type: Fighting,	type2: null, 	favor: 1},
		{ id : 237, name: "Hitmontop"	, type: Fighting,	type2: null, 	favor: 1},
		{ id : 238, name: "Smoochum"	, type: Ice,		type2: Psychic, favor: 1},
		{ id : 239, name: "Elekid"		, type: Electric,	type2: null, 	favor: 1},
		{ id : 240, name: "Magby"		, type: Fire,		type2: null, 	favor: 1},
		{ id : 241, name: "Miltank"		, type: Normal,		type2: null, 	favor: 1},
		{ id : 242, name: "Blissey"		, type: Normal,		type2: null, 	favor: 1},
		{ id : 243, name: "Raikou"		, type: Electric,	type2: null, 	favor: 1.2},
		{ id : 244, name: "Entei"		, type: Fire,		type2: null, 	favor: 0.9},
		{ id : 245, name: "Suicune"		, type: Water,		type2: null, 	favor: 1.2},
		{ id : 246, name: "Larvitar"	, type: Rock,		type2: Ground, 	favor: 1},
		{ id : 247, name: "Pupitar"		, type: Rock,		type2: Ground, 	favor: 1},
		{ id : 248, name: "Tyranitar"	, type: Rock,		type2: Dark, 	favor: 1},
		{ id : 249, name: "Lugia"		, type: Psychic,	type2: Flying, 	favor: 2, forbidden:true, spbg:"-240px -480px"},
		{ id : 250, name: "Ho-Oh"		, type: Fire,		type2: Flying, 	favor: 2, forbidden:true, spbg:"-336px -480px"},
		{ id : 251, name: "Celebi"		, type: Psychic,	type2: Grass, 	favor: 1.6, forbidden:true,},
	];
	
})();