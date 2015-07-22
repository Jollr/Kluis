var SafeDigit = function(prev, count) {
	var value = '';
	var next = null;
	
	if (count > 1) { 
		next = new SafeDigit(this, count - 1);
	}
	
};

var Safe = function(dispatcher) {
	var digits;
	
	var initialize = function(message) {
		digits = new SafeDigit(null, message.lengthOfCode); 
	};
	
	
	dispatcher.Subscribe('Initialize', initialize);
};