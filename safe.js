var NullDigit = function(prev) {
	this.Pop = function() { return false; };
	this.PopBack = function() { return false; };
	this.Push = function(number) { return false; };
	this.GetLast = function() { return prev; }
	this.GetValues = function() {return Immutable.List(); }
};

var SafeDigit = function(prev, count) {
	var me = this;
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
			return true;
		} else {
			return next.Push(number);
		}
	};
	
	this.Pop = function() {
		return me.GetLast().PopBack();
	};
	
	this.PopBack = function() {
		if (value != null) {
			value = null;
			return true;
		} else {
			return prev.PopBack();
		}
	};
	
	this.GetLast = function() { return next.GetLast(); };
	
	this.GetValues = function() {
		if (value != null) {
			return next.GetValues().splice(0, 0, value);
		} else {
			return Immutable.List();
		}
	};
};

var Safe = function(dispatcher) {
	var digits;
	
	var numberTyped = function(message) {
		if (digits.Push(message.number)) { dispatcher.Publish('SafeUpdate', {current: digits.GetValues()}); }
	};
	
	var backspace = function(message) {
		if (digits.Pop()) { dispatcher.Publish('SafeUpdate', { current: digits.GetValues()}); }
	};
	
	var initialize = function(message) {
		digits = new SafeDigit(new NullDigit(null), message.lengthOfCode); 
		dispatcher.Subscribe('NumberTyped', numberTyped);
		dispatcher.Subscribe('Backspace', backspace);
	};
	
	dispatcher.Subscribe('Initialize', initialize);
};