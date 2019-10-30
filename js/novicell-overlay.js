
/**
 * @name Novicell overlay
 * @desc Simple script that opens an overlay / modal with some content form either a selector or an URL
 * @author Danni Larsen (DLA), Trine Banke Brenneche (TBB), Signe Helbo Poulsen (SHP), Emil Skytte Ankersen (EAN), Henrik Schütze (HSC)
 * @example novicell.overlay.create({ 'selector': SELECTOR, 'url': URL,  'class':'CLASSNAME', 'pathCloseIcon':'/dist/icons/icons.svg#close', closeButtonText:'Luk',onCreate': FUNCTIONNAME, 'this.onLoaded': FUNCTIONNAME, 'this.onDestroy': FUNCTIONNAME });
 * @requires none
 */

export default class NovicellOverlay {
  constructor({
    selector = null,
    className,
    onCreate,
    onLoaded,
    onDestroy,
    overlayElem = '',
    overlayContainer = '',
    overlayContent = '',
    backdrop = '',
    content = null,
    isVideo = false,
    videoType = '',
    videoId = null,
    element = null,
    autoplay = null,
    pathCloseIcon = null,
    closeButtonText = null,
  }) {
    this.className = className;
    this.selector = selector;
    this.overlayElem = overlayElem;
    this.overlayContainer = overlayContainer;
    this.overlayContent = overlayContent;
    this.backdrop = backdrop;
    this.content = content;
    this.onCreate = onCreate;
    this.onLoaded = onLoaded;
    this.onDestroy = onDestroy;
    this.isVideo = isVideo;
    this.videoType = videoType;
    this.videoId = videoId;
    this.element = element;
    this.content = content;
    this.autoplay = autoplay;
    this.pathCloseIcon = pathCloseIcon;
    this.closeButtonText = closeButtonText;

    this.create = function create() {
      console.log(1);
      // call onCreate callback
      if (typeof this.onCreate === 'function') {
        this.onCreate();
      }
      // Remove existing overlays
      this.destroy();
      console.log(2);

      // Check if content comes from a DOM selector
      console.log(Object.prototype.hasOwnProperty.call(this, 'selector'));
      if (
        Object.prototype.hasOwnProperty.call(this, 'selector')
                && this.selector !== null
      ) {
        const currElement = document.querySelector(this.selector);
        console.log(3);

        if (currElement) {
          this.content = currElement.innerHTML;
          this.constructOverlay();
        } else {
          console.warn(
            'novicell.overlay: element does not exist. Please provide a valid selector for use in document.querySelector.'
          );
        }
      } else if (
      // Check if content comes from a HTML element
        Object.prototype.hasOwnProperty.call(this, 'element')
                && this.element !== null
      ) {
        // let element = this.element;

        if (this.element) {
          this.content = this.element.innerHTML;

          this.constructOverlay();
        } else {
          console.warn(
            'novicell.overlay: element does not exist. Please provide a valid DOM element.'
          );
        }
      } else if (this.videoId) {
        // Or if content comes from an ID
        let src = '';
        this.isVideo = true;
        if (this.videoType === 'vimeo') {
          src = `https://player.vimeo.com/video/${this.videoId}?autoplay=${this.autoplay}&loop=1&muted=1`;
        } else if (this.videoType === 'youtube') {
          src = `https://www.youtube.com/embed/${this.videoId}?autoplay=${this.autoplay}&rel=0`;
        } else {
          return;
        }
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', src);
        iframe.setAttribute('frameborder', 0);
        iframe.setAttribute('allow', 'autoplay');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '100%');
        this.content = iframe.outerHTML;
        this.constructOverlay();
      }
    };
    this.destroy = function destroy() {
      if (document.querySelector('#js-novi-overlay')) {
        // Remove elements
        this.overlayElem.parentElement.removeChild(this.overlayElem);
        this.backdrop.parentElement.removeChild(this.backdrop);

        // Stop listening for close overlay events
        document.removeEventListener('keyup', () => {
          this.destroy();
        });

        // Remove class on body
        document.documentElement.classList.remove(
          'no-scroll',
          'novi-overlay--open'
        );

        // Reset video letiable
        this.isVideo = false;

        // Call this.onDestroy callback
        if (typeof this.onDestroy === 'function') {
          this.onDestroy();
        }
      }
    };

    this.constructOverlay = function constructOverlay() {
      // Create backdrop
      this.setupBackdrop();

      // Create the overlay
      this.setupOverlay();

      // Create content for overlay
      this.setupOverlayContainer();

      // Create close button
      this.setupCloseButton();

      // Add class to body-element
      document.documentElement.classList.add('no-scroll');

      // Call this.onLoaded callback
      if (typeof this.onLoaded === 'function') {
        this.onLoaded();
      }
    };

    this.setupBackdrop = function setupBackdrop() {
      // Create the backdrop
      this.backdrop = document.createElement('div');
      this.backdrop.classList.add('novi-backdrop');
      this.backdrop.id = 'js-novi-backdrop';

      this.backdrop.addEventListener('click', (e) => {
        if (
          e.target.classList.contains('novi-overlay')
                    || e.target.classList.contains('novi-overlay__container')
        ) {
          this.destroy();
        }
      });

      // Add backdrop to overlay element
      document.querySelector('body').appendChild(this.backdrop);
    };

    /*
         * Helper functions for HTML elements
         */
    this.setupOverlay = function setupOverlay() {
      // Create the overlay
      this.overlayElem = document.createElement('div');
      this.overlayElem.classList.add('novi-overlay');
      this.overlayElem.id = 'js-novi-overlay';

      // Set class for the overlay, if set in options
      if (Object.prototype.hasOwnProperty.call(this, 'className')) {
        this.overlayElem.classList.add(this.className);
      }

      // Add overlay to overlay element
      // document.querySelector('body').appendChild(overlayElem);
      this.backdrop.appendChild(this.overlayElem);
    };

    this.setupOverlayContainer = function setupOverlayContainer() {
      // Create content for overlay
      this.overlayContainer = document.createElement('div');
      this.overlayContainer.classList.add('novi-overlay__container');

      // Create scroll element
      this.overlayContent = document.createElement('div');
      this.overlayContent.classList.add('novi-overlay__content');

      if (this.isVideo) {
        this.overlayContent.classList.add('novi-overlay__content--video');
      }

      // Set content
      this.overlayContent.innerHTML = this.content;
      this.overlayContainer.appendChild(this.overlayContent);

      // Add overlayContainer to overlay element
      this.overlayElem.appendChild(this.overlayContainer);
    };

    this.setupCloseButton = function setupCloseButton() {
      // Create the button
      const btnClose = document.createElement('button');
      btnClose.classList.add('novi-overlay-close', 'button--close');
      btnClose.type = 'button';
      btnClose.id = 'js-novi-overlay-close';


      if (this.pathCloseIcon) {
        const closeButtonIcon = document.createElement('span');
        closeButtonIcon.classList.add('novi-overlay-close__icon');

        const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgIcon.classList.add('svg-icon', 'novi-overlay-close__svg');

        const svgUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        svgUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.pathCloseIcon);

        svgIcon.appendChild(svgUse);
        closeButtonIcon.appendChild(svgIcon);
        btnClose.classList.add('novi-overlay-close--custom-icon');
        btnClose.appendChild(closeButtonIcon);
      } else {
        const svgIcon = document.createElement('span');
        svgIcon.classList.add('novi-overlay-close__default-icon');
        btnClose.appendChild(svgIcon);
      }
      //   btnClose.appendChild(closeButtonIcon);

      if (this.closeButtonText) {
        const text = document.createElement('span');
        text.classList.add('novi-overlay-close__text');
        text.innerText = this.closeButtonText;
        btnClose.appendChild(text);
      }

      // Add eventlistener for button click
      btnClose.addEventListener('click', () => {
        this.destroy();
      });

      // Add eventlistener for esc key
      document.addEventListener('keydown', (e) => {
        if (e.keyCode === 27) {
          this.destroy();
        }
      });
      console.log('btnClose', btnClose);
      // Add close button to overlay element
      this.overlayContent.appendChild(btnClose);
    };

    /*
         * Helper functions for getting content
         */
    this.get = function get(url) {
      // Return a new promise.
      return new Promise(((resolve, reject) => {
        // Do the usual XHR stuff
        const req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function onload() {
          if (req.status >= 200 && req.status < 400) {
            // Success!!
            resolve(req.response);
          } else {
            // Error!!
            reject(Error(req.statusText));
          }
        };

        // Handle network errors
        req.onerror = function onerror() {
          reject(Error('Network Error'));
        };

        // Make the request
        req.send();
      }));
    };
  }
}
