$(function() {
	var dispatcher = new Dispatcher();
	var gui = new Gui(dispatcher);
	var input = new Input(dispatcher);
	var safe = new Safe(dispatcher);
	
	dispatcher.Publish('Initialize', { lengthOfCode: 6});
});