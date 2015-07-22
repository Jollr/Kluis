$(function() {
	var dispatcher = new Dispatcher();
	var gui = new Gui(dispatcher);
	var input = new Input(dispatcher);
	
	dispatcher.Publish('Initialize', {});
});