# laravel-elixir-aglio

This is a wrapper around [gulp-aglio](https://www.npmjs.com/package/gulp-aglio) for Laravel Elixir.

## Install

```
npm install --save-dev laravel-elixir-aglio
```

## Usage

### Example *Gulpfile*:

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir-aglio');

elixir(function(mix) {
   mix.aglio();
});
```

#### Src

This will scan your `resources/assets/_md/` directory for all files. Instead you can choose a custom location:

```javascript
mix.aglio("markdown/*.md");
```

This will scan your `resources/assets/markdown` directory for `.md` files.

For overriding the `resources/assets` part, create a `elixir.json` and change the `assetsDir` (do not forget the trailing slash):

```javascript
{
    "assetsDir":    "resources/assets/"
}
```

#### Output
This will output the processed files to `resources/views/blueprint`. If you'd like to output to a different directory then you may override this as well:

```javascript
mix.aglio(
    "markdown/*.md",
    "blueprint"
);
```

#### Options

On the third argument you could pass gulp-aglio options and a different `extension` (the default one is `php`).

```javascript
mix.aglio(
    '_md/*.md',
    'blueprint',
    {
        template: 'default',
        extension: '.blade.php'
    }
);
```

### Laravel

```php
Route::get('/blueprint/api', function () {
   return View::make('blueprint.api') 
});
```
