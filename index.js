var elixir = require('laravel-elixir');
var gulp = require('gulp');
var aglio = require('gulp-aglio');
var rename = require("gulp-rename");
var notify = require('gulp-notify');
var _ = require('underscore');

var Task = elixir.Task;

elixir.extend('aglio', function(src, output, options) {

	var paths = prepGulpPaths(src, output);
	paths.src.path += '.md';
	
    options = _.extend({
        template: 'default',
        extension: '.php'
    }, options);

    var extension = options.extension;

    options = _.omit(options, 'extension'); 

    new Task('aglio', function() {
        return gulp.src(paths.src.path)
            .pipe(aglio(options))
            .pipe(rename(function (path) {
                path.extname = extension
            }))
            .pipe(gulp.dest(paths.output.path))
            .on('error', notify.onError({
                title: 'Aglio Failed!',
                message: 'Failed to parse blueprint.',
                icon: __dirname + '/../laravel-elixir/icons/fail.png'
            }));
    })
	.watch(paths.src.path + '.md');
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|array} src
 * @param  {string|null}  output
 * @return {object}
 */
var prepGulpPaths = function(src, output) {
    return new elixir.GulpPaths()
        .src(src || '_md', config.assetsDir || 'resources/assets/')
        .output((config.outputDir || 'resources/views/') + (output || 'blueprint'));
};
