var elixir = require('laravel-elixir');
var gulp = require('gulp');
var aglio = require('gulp-aglio');
var rename = require("gulp-rename");
var notify = require('gulp-notify');
var _ = require('underscore');
var utilities = require('laravel-elixir/ingredients/commands/Utilities');

elixir.extend('aglio', function(src, output, options) {

    var config = this;

    var baseDir = config.assetsDir + '_md';

    src = utilities.buildGulpSrc(src, baseDir, '**/*');

    options = _.extend({
        template: 'default',
        extension: '.php'
    }, options);

    var extension = options.extension;

    options = _.omit(options, 'extension'); 

    gulp.task('aglio', function() {
        return gulp.src(src)
            .pipe(aglio(options))
            .pipe(rename(function (path) {
                path.extname = extension
            }))
            .pipe(gulp.dest(output || 'resources/views/blueprint'))
            .on('error', notify.onError({
                title: 'Aglio Failed!',
                message: 'Failed to parse blueprint.',
                icon: __dirname + '/../laravel-elixir/icons/fail.png'
            }));
    });


    this.registerWatcher('aglio', [
        baseDir + '/**/*.md'
    ]);

    return this.queueTask('aglio');

});
