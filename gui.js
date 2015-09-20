var Gui = function(dispatcher) {
	var elements = Immutable.Map([['start', $('#start')], ['photos', $('#photos')], ['kluis', $('#kluis')], ['wrong', $('#explosie')], ['solved', $('#kluis-open')]]);
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
		$('#open-image').hide();
		$('#open-animation').show();
		$('#open-animation').attr('src','kluis openen.gif');

		var flip = function() {
			$('#open-image').show();
			$('#open-animation').hide();
		};

		window.setTimeout(flip, 4800);
	};

	var onWrongSolution = function(message) {
		show('wrong');
		$('#explosie-image').attr('src', 'BOEM.gif');

		var hideExplosion = function() {
			hideAll();
		};

		window.setTimeout(hideExplosion, 3950);
	};

	var initSubmit = function() {
		var submit = function() {
			dispatcher.Publish('Submit', {});
		};
		$('#open-button').click(submit);
	};

	var showPhoto = function(message) {
		show('photos');
		$('#photo-image').attr('src', message.counter + '.png');
	};
	
	var endPhotos = function(message) {
		show('kluis');
	};

	var initialize = function(message) {
		show('start');
		initSubmit();
		dispatcher.Subscribe('ShowPhoto', showPhoto);
		dispatcher.Subscribe('EndPhotos', endPhotos);
		dispatcher.Subscribe('SafeUpdate', onSafeUpdate);
		dispatcher.Subscribe('NumberTyped', onNumberTyped);
		dispatcher.Subscribe('Solved', onSolved);
		dispatcher.Subscribe('WrongSolution', onWrongSolution);
	};
	
	hideAll();
	dispatcher.Subscribe('Initialize', initialize);
};