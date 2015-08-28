var Gui = function(dispatcher) {
	var elements = Immutable.Map([['start', $('#start')], ['kluis', $('#kluis')], ['solved', $('#kluis-open')]]);
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
	
	var onSolved = function(message) {
		show('solved');
		
		// var randomString = function() {
			// var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
			// var string_length = 8;
			// var randomstring = '';
			// for (var i=0; i<string_length; i++) {
				// var rnum = Math.floor(Math.random() * chars.length);
				// randomstring += chars.substring(rnum,rnum+1);
			// }
			// document.randform.randomfield.value = randomstring;
		// }
		
		//$('#open-image').attr('src','img/kluis openen.gif?x=' + randomString())
		$('#open-image').attr('src','kluis openen.gif');
	};
	
	var initialize = function(message) {
		show('kluis');
		dispatcher.Subscribe('SafeUpdate', onSafeUpdate);
		dispatcher.Subscribe('NumberTyped', onNumberTyped);
		dispatcher.Subscribe('Backspace', onSolved);
	};
	
	hideAll();
	dispatcher.Subscribe('Initialize', initialize);
};