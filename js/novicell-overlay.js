'use strict';
/**
 * @name Novicell overlay
 * @desc Simple script that opens an overlay / modal with some content form either a selector or an URL
 * @author Danni Larsen (DLA), Michael Sølvsteen (MSL), Signe Helbo Poulsen (SHP), Emil Skytte Ankersen (EAN)
 * @example novicell.overlay.create({ 'selector': SELECTOR, 'url': URL,  'class':'CLASSNAME', 'onCreate': FUNCTIONNAME, 'this.onLoaded': FUNCTIONNAME, 'this.onDestroy': FUNCTIONNAME });
 * @requires none
 */

export default class NovicellOverlay {
    constructor({
        selector = null,
        className,
        onCreate,
        onLoaded,
        onDestroy,
        overlayElem = "",
        overlayContainer = "",
        overlayContent = "",
        backdrop = "",
        content = null,
        isVideo = false,
        type = "",
        videoId = null,
        element = null,
        autoplay = null
    }) {
        this.self = this;
        this.className = className;
        this.options = {};
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
        this.type = type;
        this.videoId = videoId;
        this.element = element;
        this.content = content;
        this.autoplay = autoplay;
        
        this.create = function () {
            //call onCreate callback
            if (typeof this.onCreate === 'function') {
                this.onCreate();
            }
            // Remove existing overlays
            this.destroy();

            // Check if content comes from a DOM selector
            if (
                this.hasOwnProperty('selector') &&
                this.selector !== null
            ) {
                let element = document.querySelector(this.selector);

                if (element) {
                    this.content = element.innerHTML;
                    this.constructOverlay();
                } else {
                    console.warn(
                        'novicell.overlay: element does not exist. Please provide a valid selector for use in document.querySelector.'
                    );
                    return;
                }
            }
            // Check if content comes from a HTML element
            else if (
                this.hasOwnProperty('element') &&
                this.element !== null
            ) {
                // let element = this.element;

                if (this.element) {
                    content = this.element.innerHTML;

                    this.constructOverlay();
                } else {
                    console.warn(
                        'novicell.overlay: element does not exist. Please provide a valid DOM element.'
                    );
                    return;
                }
            }
            // Or if content comes from an ID
            else if (this.hasOwnProperty('videoId')) {
                if (this.videoId !== null) {
                    let src = '';
                    this.isVideo = true;

                    if (this.type == 'vimeo') {
                        src =
                            'https://player.vimeo.com/video/' +
                            this.videoId +
                            '?autoplay=' +
                            this.autoplay;
                    } else if (this.type == 'youtube') {
                        src =
                            'https://www.youtube.com/embed/' +
                            this.videoId +
                            '?autoplay=' +
                            this.autoplay +
                            '&rel=0';
                    } else {
                        return;
                    }

                    let iframe = document.createElement('iframe');
                    iframe.setAttribute('src', src);
                    iframe.setAttribute('frameborder', 0);
                    iframe.setAttribute('allowfullscreen', '');
                    iframe.setAttribute('width', '100%');
                    iframe.setAttribute('height', '100%');

                    this.content = iframe.outerHTML;
                    this.constructOverlay();
                } else {
                    console.warn(
                        'novicell.overlay: video-id is empty. Please provide a video-id for use in video embed code (we support only Vimeo and YouTube).'
                    );
                    return;
                }
            } else {
                console.error(
                    'novicell.overlay: no content to display! Please set a selector or a url to load.'
                );
                return;
            }
        };
        this.destroy = function () {
            if (document.querySelector('#js-novi-overlay')) {
                // Remove elements
                this.overlayElem.parentElement.removeChild(this.overlayElem);
                this.backdrop.parentElement.removeChild(this.backdrop);

                // Stop listening for close overlay events
                document.removeEventListener('keyup', (e)=>{
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

        this.constructOverlay = function() {
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
        }

        this.setupBackdrop = function () {
            // Create the backdrop
            this.backdrop = document.createElement('div');
            this.backdrop.classList.add('novi-backdrop');
            this.backdrop.id = 'js-novi-backdrop';

            this.backdrop.addEventListener('click', (e)=>{
                if (
                    e.target.classList.contains('novi-overlay') ||
                    e.target.classList.contains('novi-overlay__container')
                ) {
                    this.destroy();
                }
            });

            // Add backdrop to overlay element
            document.querySelector('body').appendChild(this.backdrop);
        }

        /*
         * Helper functions for HTML elements
         */
        this.setupOverlay = function() {
            // Create the overlay
            this.overlayElem = document.createElement('div');
            this.overlayElem.classList.add('novi-overlay');
            this.overlayElem.id = 'js-novi-overlay';

            // Set class for the overlay, if set in options
            if (this.hasOwnProperty('className')) {
                this.overlayElem.classList.add(this.className);
            }

            // Add overlay to overlay element
            // document.querySelector('body').appendChild(overlayElem);
            this.backdrop.appendChild(this.overlayElem);
        }

        this.setupOverlayContainer = function() {
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
        }

        this.setupCloseButton = function() {
            // Create the button
            let btnClose = document.createElement('button');
            btnClose.classList.add('novi-overlay-close', 'button--close');
            btnClose.type = 'button';
            btnClose.id = 'js-novi-overlay-close';

            // Add eventlistener for button click
            btnClose.addEventListener('click', (e)=>{
                this.destroy();
            });

            // Add eventlistener for esc key
            document.addEventListener('keydown', (e)=>{
                if (e.keyCode === 27) {
                    this.destroy();
                }
            });

            // Add close button to overlay element
            this.overlayContent.appendChild(btnClose);
        }

        /*
         * Helper functions for getting content
         */
        this.get = function(url) {
            // Return a new promise.
            return new Promise(function (resolve, reject) {
                // Do the usual XHR stuff
                let req = new XMLHttpRequest();
                req.open('GET', url);

                req.onload = function () {
                    if (req.status >= 200 && req.status < 400) {
                        // Success!!
                        resolve(req.response);
                    } else {
                        // Error!!
                        reject(Error(req.statusText));
                    }
                };

                // Handle network errors
                req.onerror = function () {
                    reject(Error('Network Error'));
                };

                // Make the request
                req.send();
            });
        }
    }
}