$(function() {
	var dispatcher = new Dispatcher();
	var gui = new Gui(dispatcher);
	var input = new Input(dispatcher);
	var safe = new Safe(dispatcher);
	var photos = new Photos(dispatcher);
	
	dispatcher.Publish('Initialize', { code: '704556' });
	var state = 'Initialized';

	dispatcher.Subscribe('MagicHotkey', function() {
		if (state == 'Initialized') {
			dispatcher.Publish('Start');
			state = 'Started';
		}
	});
});