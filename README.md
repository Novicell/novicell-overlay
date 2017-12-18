# Novicell Overlay
**Simple script that can open an overlay / modal**

## Usage

Written in pure Vanilla JS, it has *no dependencies*. It ships with a sample LESS file, for easy implementation with the [novicell-frontend setup](https://github.com/Novicell/novicell-frontend). Use the styles for inspiration and then make your own styles.

### Install with npm

```bash
npm install novicell-overlay --save
```

## Setup

First include the js file in your js bundle or in your HTML:

**JS bundle**
```javascript
scripts: [
    vendorPath + "novicell-overlay/js/novicell.overlay.js"
    ...
]
```

**HTML**
```html
    <script src="/node_modules/novicell-overlay/js/novicell.overlay.js"></script>
```

## Example

Set

**Markup**
```html

```


Then call the `novicell.overlay.set()`-method when you need to open the overlay.
**Example:**
```javascript
// Waiting for the DOM to load
document.addEventListener("DOMContentLoaded", function () {

    // Select your overlay trigger
    var trigger = document.querySelector('#js-overlay-trigger');
    
    trigger.addEventListener('click', function(e){
    e.preventDefault();

    novicell.overlay.create({
            'selector': trigger.getAttribute('data-element'),
            'class': 'selector-overlay',
            "onCreate": function() { console.log('created'); },
            "onLoaded": function() { console.log('loaded'); },
            "onDestroy": function() { console.log('Destroyed'); }
        });
    });

    // Video overlay
    var videoOverlayTriggers = document.querySelectorAll('.js-video-overlay-trigger');

    for (var i = 0; i < videoOverlayTriggers.length; i++) {
        videoOverlayTriggers[i].addEventListener('click', function(e){
            e.preventDefault();

            var currentTrigger = e.target;

            novicell.overlay.create({
            'videoId': currentTrigger.getAttribute('data-video-id'),
            'type': currentTrigger.getAttribute('data-type'),
            'class': 'video-overlay'
            });
        });
    }

});
```

## Extension

When extending the script, make sure to make a singleton for the `novicell` and the `novicell.overlay` objects before adding your own methods.

```javascript
'use strict';

var novicell = novicell || {};
novicell.overlay = novicell.overlay || {};
novicell.overlay.extentions = novicell.overlay.extentions || new function () {
    this.test = function() {
        console.log('test');
    };
}();
```
Next you need to include your js-files in your js bundle or in your HTML, and then call the `init`-method from your `master.js`.
Make sure to load you:

**JS bundle**
```javascript
scripts: [
    vendorPath + "novicell-overlay/js/novicell.overlay.js"
    projectPath + "/components/novicell.overlay.extentions.js"
    ...
]
```

**HTML**
```html
    <script src="/node_modules/novicell-overlay/js/novicell.overlay.js"></script>
    <script src="/scripts/components/novicell.overlay.extentions.js"></script>
```

Then call the `test`-method from your `master.js`:
```javascript

document.addEventListener("DOMContentLoaded", function() {
    novicell.overlay.init();
    novicell.overlay.extentions.test();
    ...
});
```