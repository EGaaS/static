module.exports = function (gulp, modules, dir) {
	return function() {
		return gulp.src(dir.folder + '/*.{php,html}')
		.pipe(modules.usemin({
			js: [modules.ngAnnotate(), modules.uglify()]
		}))
		.pipe(modules.replaceTask({
			patterns: [{
				match: /\"\/?js\//g,
				replacement: '"' + dir.replace + 'js/'
			}]
		}))
		.pipe(gulp.dest(dir.dist));
	};
};