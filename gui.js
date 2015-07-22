var Gui = function(dispatcher) {
	var elements = Immutable.Map([['start', $('#start')], ['kluis', $('#kluis')]]);
	
	var hideAll = function() {
		elements.map(function(x) {x.hide();});
	};
	
	var show = function(elem) {
		hideAll();
		elements.get(elem).show();
	};
	
	
	
	var onNumber = function(message) {
		$('#kluis').html('test');
	};
	
	var initialize = function() {
		show('kluis');
		dispatcher.Subscribe('Number', onNumber);
	};
	
	hideAll();
	dispatcher.Subscribe('Initialize', initialize);
	
};