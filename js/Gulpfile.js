var gulp = require('gulp');
var modules = require('gulp-load-plugins')({});

modules.beep = require('beepbeep');

modules.swallowError = function(error) {
	modules.beep();
	console.log(error.toString());
	return this.emit('end');
};

var dir = new function(){
	this.root   = __dirname;
	this.base   = '.';
	this.folder = this.base   + '/www';
	this.dist   = '../../Go/static/js';
	
	this.js     = this.folder + '/js';
	this.dist_js    = this.dist + '/js';
};


var getTask = function getTask(task){
	var task;
	
	task = require(__dirname + '/tasks/' + task);
	
	return task(gulp, modules, dir);
};

gulp.task('usemin', getTask('usemin'));

gulp.task('build', function() {
	
	modules.sequence = require('run-sequence');
	modules.sequence(
		'usemin'
	);
});