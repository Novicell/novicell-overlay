# Novicell Overlay
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
    vendorPath + "novicell-overlay/dist/novicell-overlay.esm.js"
    ...
]
```

**HTML**
```html
    <script src="/node_modules/novicell-overlay/dist/novicell-overlay-esm.js"></script>
```

## Example



**Markup**
```html
  <div class="demo-content">
    <button id="js-overlay-trigger" class="button button--orange" data-element="#js-overlay-content"
      type="button">Selector overlay</button>
    <button data-video-id="152477009" data-type="vimeo" class="js-video-overlay-trigger button button--blue">Vimeo
      overlay</button>
    <button data-video-id="5dsGWM5XGdg" data-type="youtube" class="js-video-overlay-trigger button button--red">YouTube
      overlay</button>
  </div>

  <div class="overlay-content" id="js-overlay-content" style="display: none;">
    <h1>Seamlessly myocardinate</h1>
    <p>Rem distinctio, vero sint quas numquam optio placeat, tenetur quasi unde nobis maiores. Reiciendis veritatis
      itaque recusandae ipsa, qui error possimus illo nihil animi commodi neque beatae, dicta impedit. Laudantium.</p>
    <p>Officia quam commodi blanditiis unde perferendis repellat deleniti voluptatem consequatur repudiandae eos
      quibusdam dolorem molestias nostrum numquam maiores totam architecto, nemo provident reprehenderit labore veniam
      eius molestiae odit enim iusto.</p>
    <p>Amet dolores reiciendis modi est atque, inventore at adipisci accusamus hic necessitatibus obcaecati recusandae
      consequuntur, odit, cupiditate ad voluptas laboriosam. Blanditiis ducimus consectetur nulla voluptates rerum iusto
      quo asperiores enim!</p>
  </div>
```


Then in your javascript instantiate the overlay objects you want
**Example:**
```javascript
import NovicellOverlay from '../dist/novicell-overlay.esm.js';
document.addEventListener("DOMContentLoaded", function () {
    // Select your overlay trigger
    var trigger = document.querySelector('#js-overlay-trigger');
    trigger.addEventListener('click', function (e) {
        e.preventDefault();
        let overlayOne = new NovicellOverlay({
            selector: trigger.getAttribute('data-element'),
            className: 'selector-overlay',
            onCreate: function () {
                console.log('created');
            },
            onLoaded: function () {
                console.log('loaded');
            },
            onDestroy: function () {
                console.log('Destroyed');
            }
        })
        overlayOne.create();
    });
    // Video overlay
    var videoOverlayTriggers = document.querySelectorAll('.js-video-overlay-trigger');
    for (var i = 0; i < videoOverlayTriggers.length; i++) {
        videoOverlayTriggers[i].addEventListener('click', function (e) {
            e.preventDefault();
            var currentTrigger = e.target;
            let overlayVideo = new NovicellOverlay({
                // element: currentTrigger,
                videoId: currentTrigger.getAttribute("data-video-id"),
                type: currentTrigger.getAttribute('data-type'),
                autoplay: 1,
                className: "video-overlay",
                isVideo: true
            })
            overlayVideo.create();
        });
    }
});
```

## Possible properties
```javascript
let overlay = new NovicellOverlay({
    'videoId': '9bZkp7q19f0',                               // [string] Youtube or Vimeo video id
    'type': 'youtube',                                      // [string] 'youtube' or 'vimeo'
    'class': 'video-overlay',                               // [string] class for overlay
    'autoplay': 1,                                          // [number] 0 or 1, turns on/off autoplay for vimeo and youtube
    'selector': '#js-overlay-content',                      // [string] javascript selector for content to go in overlay (overrides video)
    'element': element.querySelector('.child-element'),     // [DOM element] DOM element for content to go in overlay (overrides video)
    'onCreate': function(){},                               // [function] runs on create
    'onLoaded': function(){},                               // [function] runs on load
    'onDestroy': function(){}                               // [function] runs on destroy
});

```
