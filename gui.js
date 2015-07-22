var Gui = function(dispatcher) {
	var elements = Immutable.Map([['start', $('#start')], ['kluis', $('#kluis')]]);
	var numDigits = 0;
	
	var hideAll = function() {
		elements.map(function(x) {x.hide();});
	};
	
	var show = function(elem) {
		hideAll();
		elements.get(elem).show();
	};

	var onNumber = function(message) {
		var update = function(n) {
			$($('.digitBox')[n]).html(message.current.get(n));
		};
		Immutable.Range(0, numDigits).forEach(update);
	};
	
	var initialize = function(message) {
		numDigits = message.lengthOfCode;
		var digitBox = "<div class='digitBox'></div>";
		Immutable
			.Repeat(digitBox, numDigits)
			.forEach(function(x) { $('#kluis').append(x); });
		
		show('kluis');
		dispatcher.Subscribe('Number', onNumber);
	};
	
	hideAll();
	dispatcher.Subscribe('Initialize', initialize);
	
};