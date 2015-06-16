var elixir = require('laravel-elixir');
var aglio = require('../');

elixir(function(mix) {
    mix.aglio(
        '_md/*.md',
        'blueprint',
        {
            extension: '.blade.php'
        }
    );
});
