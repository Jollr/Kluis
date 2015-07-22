var Input = function(dispatcher) {
	var initialize = function() {
		document.onkeydown = function(e) {
			if (e.keyCode === 116 || e.keyCode === 122) { // f5, f11
				return true;
			}
			
			if (e.keyCode >= 48 && e.keyCode <= 57) { // number
				dispatcher.Publish('NumberTyped', { number: e.keyCode - 48 });
			}
			
			if (e.keyCode == 8) { // backspace
				dispatcher.Publish('Backspace', { });
			}
			
			return false;
		};
	};
	
	dispatcher.Subscribe('Initialize', initialize);
};