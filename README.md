# Novicell Overlay

[![Greenkeeper badge](https://badges.greenkeeper.io/Novicell/novicell-overlay.svg)](https://greenkeeper.io/)

**Simple script that can open an overlay / modal**

## Usage

Written in pure Vanilla JS, it has *no dependencies*. It ships with a sample POST-CSS file, for easy implementation with the [novicell-frontend setup](https://github.com/Novicell/novicell-frontend). Use the styles for inspiration and then make your own styles.

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



**Markup**
```html
<button id="js-overlay-trigger" class="button button--orange" data-element="#js-overlay-content" type="button">Selector overlay</button>
<button data-video-id="152477009" data-type="vimeo" class="js-video-overlay-trigger button button--blue">Vimeo overlay</button>
<button data-video-id="5dsGWM5XGdg" data-type="youtube" class="js-video-overlay-trigger button button--red">YouTube overlay</button>

<div class="overlay-content" id="js-overlay-content" style="display: none;">
    <h1>Seamlessly myocardinate</h1>
    <p>Rem distinctio, vero sint quas numquam optio placeat, tenetur quasi unde nobis maiores. Reiciendis veritatis itaque recusandae ipsa, qui error possimus illo nihil animi commodi neque beatae, dicta impedit. Laudantium.</p>
    <p>Officia quam commodi blanditiis unde perferendis repellat deleniti voluptatem consequatur repudiandae eos quibusdam dolorem molestias nostrum numquam maiores totam architecto, nemo provident reprehenderit labore veniam eius molestiae odit enim iusto.</p>
    <p>Amet dolores reiciendis modi est atque, inventore at adipisci accusamus hic necessitatibus obcaecati recusandae consequuntur, odit, cupiditate ad voluptas laboriosam. Blanditiis ducimus consectetur nulla voluptates rerum iusto quo asperiores enim!</p>
</div>
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
            'class': 'video-overlay',
            'autoplay': 1
            });
        });
    }

});
```

## Options
```javascript
novicell.overlay.create({
    'videoId': "9bZkp7q19f0",           // [string] Youtube or Vimeo video id
    'type': "youtube",                  // [string] "youtube" or "vimeo"
    'class': "video-overlay",           // [string] class for overlay
    'autoplay': 1,                      // [number] 0 or 1, turns on/off autoplay for vimeo and youtube
    'selector': "#js-overlay-content",  // [string] javascript selector for content to go in overlay (overrides video)
    "onCreate": function(){},           // [function] runs on create
    "onLoaded": function(){},           // [function] runs on load
    "onDestroy": function(){}           // [function] runs on destroy
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