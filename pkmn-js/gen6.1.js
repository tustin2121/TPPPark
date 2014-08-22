// gen 6.1.js
// File for TPP ORAS
//

(function(){
	var date = new Date(Date.UTC(2014, 11-1, 21, 0+4));
	if (date.getTime() > new Date().getTime()) {
		showTimer("TPP ORAS starts in<br/>", date);
	} else {
		showGameClock("TPP ORAS Game Clock<br/>", date);
	}
})();