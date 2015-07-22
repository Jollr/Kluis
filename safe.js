var NullDigit = function(prev) {
	this.Push = function(number) { };
	this.GetValues = function() {return Immutable.List(); }
};

var SafeDigit = function(prev, count) {
	var value = null;
	var next = null;
	
	if (count > 1) { 
		next = new SafeDigit(this, count - 1);
	} else {
		next = new NullDigit(this);
	}
	
	this.Push = function(number) {
		if (value == null) {
			value = number;
		} else {
			next.Push(number);
		}
	};
	
	this.GetValues = function() {
		return next.GetValues().splice(0, 0, value);
	};
};

var Safe = function(dispatcher) {
	var digits;
	
	var numberTyped = function(message) {
		digits.Push(message.number);
		dispatcher.Publish('Number', {current: digits.GetValues()});
	};
	
	var initialize = function(message) {
		digits = new SafeDigit(null, message.lengthOfCode); 
		dispatcher.Subscribe('NumberTyped', numberTyped);
	};
	
	dispatcher.Subscribe('Initialize', initialize);
};