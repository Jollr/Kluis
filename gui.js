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

	var onNumberTyped = function(message) {
		$('#digitButton-' + message.number).addClass('pressed');
		window.setTimeout(function() {$('#digitButton-' + message.number).removeClass('pressed');}, 200)
	};
	
	var onSafeUpdate = function(message) {
		var reduced = message.current.reduce(function(x, y) {return 10*x + y;});
		if (!reduced) { reduced = ''; }
		$('#kluisDigits').html(reduced);		
	};
	
	var initialize = function(message) {
		show('kluis');
		dispatcher.Subscribe('SafeUpdate', onSafeUpdate);
		dispatcher.Subscribe('NumberTyped', onNumberTyped);
	};
	
	hideAll();
	dispatcher.Subscribe('Initialize', initialize);
};