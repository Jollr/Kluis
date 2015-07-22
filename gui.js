var Gui = function(dispatcher) {
	var elements = Immutable.Map([['start', $('#start')], ['kluis', $('#kluis')]]);
	
	var hideAll = function() {
		elements.map(function(x) {x.hide();});
	};
	
	var show = function(elem) {
		hideAll();
		elements.get(elem).show();
	};
	
	var initialize = function() {
		show('kluis');
	};
	
	hideAll();
	dispatcher.Subscribe('Initialize', initialize);
};