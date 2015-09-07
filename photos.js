var Photos = function(dispatcher) {
	var interval;
	var timePerPhoto = 3000;
	var photoInterval = 5*60*1000; // 5 minutes
	var code;

	var cancel = function() {
		window.clearInterval(interval);
	};

	var showPhotos = function () {
		var counter = 1;
		var instanceInterval;
		dispatcher.Publish('ShowPhoto', {counter: counter});

		var onTrigger = function() {
			if (counter < code.length) {
				counter++;
				dispatcher.Publish('ShowPhoto', {counter: counter})
			} else {
				dispatcher.Publish('EndPhotos', {});
				window.clearInterval(instanceInterval);
			}
		};

		instanceInterval = window.setInterval(onTrigger, timePerPhoto);
	};

	var initialize = function(message) {
		dispatcher.Subscribe('Solved', cancel);
		dispatcher.Subscribe('WrongSolution', cancel);
		code = message.code;
	};

	var start = function(message) {
		interval = window.setInterval(showPhotos, photoInterval);
		showPhotos();
	};
	
	dispatcher.Subscribe('Initialize', initialize);
	dispatcher.Subscribe('Start', start);
};