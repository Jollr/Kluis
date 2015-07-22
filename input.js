var Input = function(dispatcher) {
	var initialize = function() {
		document.onkeydown = function(e) {
			if (e.keyCode == 116) { // f5
				return true;
			}
			
			if (e.keyCode >= 96 && e.keyCode <= 105) {
				dispatcher.Publish('numberTyped', { number: e.keyCode - 96 });
			}
			
			if (e.keyCode == 8) { // backspace
				Dispatcher.Publish('backspace', { });
			}
			
			return false;
		};
	};
	
	dispatcher.Subscribe('Initialize', initialize);
};