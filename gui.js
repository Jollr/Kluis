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
		$('#kluisDigits').html(message.current.reduce(function(x, y) {return 10*x + y;}));
	};
	
	var initialize = function(message) {
		show('kluis');
		dispatcher.Subscribe('Number', onNumber);
	};
	
	hideAll();
	dispatcher.Subscribe('Initialize', initialize);
	
};