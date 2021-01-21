# Novicell Overlay
**Simple script that can open an overlay / modal**

## Usage

Written in pure Vanilla JS, it has *no dependencies*. It ships with a sample POST-CSS file, for easy implementation with the [novicell-frontend setup](https://github.com/Novicell/novicell-frontend). Use the styles for inspiration and then make your own styles.

### Install with npm

```bash
npm install novicell-overlay
```

## Setup

First include the dependency in your project's js file:
```javascript
import NovicellOverlay from 'novicell-overlay';
```

And css (optional)
```css
@import '../../node_modules/novicell-overlay/css/novicell.overlay.css';
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

Then call the `overlay.create()`-method when you need to open the overlay.

**Example:**
```javascript
import NovicellOverlay from 'novicell-overlay';
// import NovicellOverlay from 'novicell-overlay.esm.js';//
document.addEventListener('DOMContentLoaded', () => {
    // Select your overlay trigger
    const trigger = document.querySelector('#js-overlay-trigger');
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const overlayOne = new NovicellOverlay({
            selector: '#flafOverlay',
            className: 'selector-overlay',
            videoId: 'Bs3RLRF5akk',
            type: 'youtube',
            disableTracking: true,
            onCreate() {
                console.log('created');
            },
            onLoaded() {
                console.log('loaded');
            },
            onDestroy() {
                console.log('Destroyed');
            },
        });
        overlayOne.create();
    });
});

```

## Options
```javascript
const overlay = new NovicellOverlay({
    'videoId': '9bZkp7q19f0',                               // [string] Youtube or Vimeo video id
    'isVideo': true                                         // [boolean] Determines if video. Default is false
    'type': 'youtube',                                      // [string] 'youtube' or 'vimeo'
    'disableTracking': true,                                // [boolean] Disable tracking from video hosts. Default is false
    'className': 'video-overlay',                           // [string] class for overlay
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

The Novicell Overlay is licensed under the MIT license. (http://opensource.org/licenses/MIT)