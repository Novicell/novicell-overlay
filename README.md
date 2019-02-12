# Novicell Overlay
**Simple script that can open an overlay / modal**

## Usage

Written in pure Vanilla JS, it has *no dependencies*. It ships with a sample POST-CSS file, for easy implementation with the [novicell-frontend setup](https://github.com/Novicell/novicell-frontend). Use the styles for inspiration and then make your own styles.

### Install with npm

```bash
npm install novicell-overlay --save
```

## Setup

First include the dependency in your project's js file:
```javascript
import { overlay } from 'novicell-overlay';
```

And css
```css
@import '../../node_modules/novicell-overlay/css/novicell.overlay.css';
```

## Example

**Markup**

```html
<button id="js-overlay-trigger" class="button button--orange" data-element="#js-overlay-content" type="button">Selector overlay</button>
<button data-video-id="152477009" data-type="vimeo" class="js-video-overlay-trigger button button--blue">Vimeo overlay</button>
<button data-video-id="5dsGWM5XGdg" data-type="youtube" class="js-video-overlay-trigger button button--red">YouTube overlay</button>

<div class="overlay-content" id="js-overlay-content" style="display: none;">
    <h1>Seamlessly myocardinate</h1>
    <p>Rem distinctio, vero sint quas numquam optio placeat, tenetur quasi unde nobis maiores.</p>
    <p>Officia quam commodi blanditiis unde perferendis repellat deleniti voluptatem consequatur</p>
    <p>Amet dolores reiciendis modi est atque, inventore at adipisci accusamus hic necessitatibus</p>
</div>
```

Then call the `overlay.create()`-method when you need to open the overlay.

**Example:**
```javascript

import { overlay } from 'novicell-overlay';

// Waiting for the DOM to load
document.addEventListener('DOMContentLoaded', function () {

    // Select your overlay trigger
    const trigger = document.querySelector('#js-overlay-trigger');
    
    trigger.addEventListener('click', function(e){
    e.preventDefault();

    overlay.create({
            'selector': trigger.getAttribute('data-element'),
            'class': 'selector-overlay',
            'onCreate': function() { console.log('created'); },
            'onLoaded': function() { console.log('loaded'); },
            'onDestroy': function() { console.log('Destroyed'); }
        });
    });

    // Video overlay
    const videoOverlayTriggers = document.querySelectorAll('.js-video-overlay-trigger');

    for (let i = 0; i < videoOverlayTriggers.length; i++) {
        videoOverlayTriggers[i].addEventListener('click', function(e){
            e.preventDefault();

            let currentTrigger = e.target;

            overlay.create({
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
overlay.create({
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

## Contribution

Looking to contribute something? Here's how you can help. Please take a moment to review our [contribution guidelines](https://github.com/Novicell/novicell-frontend/wiki/Contribution-guidelines) in order to make the contribution process easy and effective for everyone involved.

## License

The Novicell Frontend is licensed under the MIT license. (http://opensource.org/licenses/MIT)