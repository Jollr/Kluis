var Input = function(dispatcher) {
	var initialize = function() {
		document.onkeydown = function(e) {
			if (e.keyCode == 116 || e.keyCode == 122) { // f5 of f11
				return true;
			}
			
			if (e.keyCode >= 96 && e.keyCode <= 105) { // number
				dispatcher.Publish('numberTyped', { number: e.keyCode - 96 });
			}
			
			if (e.keyCode == 8) { // backspace
				dispatcher.Publish('backspace', { });
			}
			
			return false;
		};
	};
	
	dispatcher.Subscribe('Initialize', initialize);
};