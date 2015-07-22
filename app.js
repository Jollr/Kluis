$(function() {
	var dispatcher = new Dispatcher();
	var gui = new Gui(dispatcher);
	dispatcher.Publish('Initialize', {});
});