fallback-js
---

![NPM](https://img.shields.io/npm/v/@gera2ld/fallback-js.svg)
![License](https://img.shields.io/npm/l/@gera2ld/fallback-js.svg)
![Downloads](https://img.shields.io/npm/dt/@gera2ld/fallback-js.svg)

Set up fallback messages easily when browser fails running essential scripts.

### Why

In case you have an application targeting the latest browsers, you may need to notify users to upgrade their browsers if they are using an obsolete one.
With this script you can easily set up a notice when essential scripts fail.

### Basic Usage

1. Add necessary elements

   ```html
   <div id="main">
     This is the main application.
   </div>

   <div id="fallback-js" style="display: none" data-hide="#main">
     <h1>Oops</h1>
     <p>Unfortunately, your browser is too old to work for this application. Please upgrade your browser.</p>
   </div>
   <!-- Run fallback-js first -->
   <script src="fallback-js.js"></script>

   <!-- Run your main script after -->
   <script src="app.js"></script>
   ```

2. Be sure to call `FallbackJs.ok()` after your main script (`app.js` here).

   ```js
   // app.js
   // ...

   // call ok at the end
   FallbackJs.ok();
   ```

### Advanced Usage

Configurations can be overridden by assigning to `window._fallbackJs` before running `fallback-js`.

```html
<script>window._fallbackJs = {
  debug: true,
  onError: function (errors) {
    console.error(errors);
  },
};</script>
<script src="fallback-js.js"></script>
```

Available configurations are:

- debug: *boolean*, default as `false`

  Whether to show debug messages.

- selector: *string*, default as `'#fallback-js'`

  If an element is found by `document.querySelector(selector)`, it will be shown when essential scripts fail.

- timeout: *number*, default as `1000`

  Time to wait until `FallbackJs.ok()` is called.

- count: *number*, default as `1`

  The number of scripts that are supposed to run successfully and call `FallbackJs.ok()`.

- hide: *string*, default as `null`

  If specified and an element is found by `document.querySelector(hide)`, it will be hidden once scripts fail.

- onError: *function*, default as `null`

  Once scripts fail, errors will be passed to this callback. It is useful if you want to show the error details.
