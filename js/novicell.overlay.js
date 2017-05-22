'use strict';
/**
 * @name Novicell overlay
 * @desc Simple script that opens an overlay / modal with some content form either a selector or an URL
 * @author Danni Larsen (DLA), Michael Sølvsteen (MSL), Signe Helbo Poulsen (SHP)
 * @example novicell.overlay.create({ 'selector': SELECTOR, 'url': URL,  'class':'CLASSNAME', 'onCreate': FUNCTIONNAME, 'onLoaded': FUNCTIONNAME, 'onDestroy': FUNCTIONNAME });
 * @requires none
 */

var novicell = novicell || {};

novicell.overlay = novicell.overlay || new function () {
    var self = this;
    var options = {};
    var overlayElem;
    var overlayContent;
    var overlayScroll;
    var backdrop;
    var content;
    var onCreate;
    var onLoaded;
    var onDestroy;

    this.create = function (opts) {
        var self = this;
        // Set global options
        options = opts;

        // Call onCreate callback
        if (typeof options.onCreate === 'function') {
            options.onCreate();
        }

        // Remove existing overlays
        self.destroy();

        // Check if content comes from a HTML element
        if (options.hasOwnProperty('selector') && options.selector !== null) {
            var element = document.querySelector(options.selector);
            
            if (element) {
                content = element.innerHTML;
                constructOverlay();
            } else {
                console.warn('novicell.overlay: element does not exist. Please provide a valid selector for use in document.querySelector.');
                return;
            }
        }
        // Or if content comes from an URL
        else if (options.hasOwnProperty('url')) {
            if (options.url !== null) {
                get(options.url).then(function (response) {
                    content = response;
                    constructOverlay();
                }, function (error) {
                    console.error("novicell.overlay:", error);
                });
            } else {
                console.warn('novicell.overlay: url is empty. Please provide a url for use in xhr request.');
                return;
            }
        }
        // If nothing is working, send error to the console
        else {
            console.error('novicell.overlay: no content to display! /n Please set a selector or a url to load.')
            return;
        }
    };

    this.destroy = function () {
        if(document.querySelector('#js-novi-overlay')) {
            // Remove elements
            overlayElem.parentElement.removeChild(overlayElem);
            backdrop.parentElement.removeChild(backdrop);

            // Stop listening for close overlay events
            document.removeEventListener('keyup', self.destroy);

            // Remove class on body
            document.documentElement.classList.remove('no-scroll', 'novi-overlay--open');

            // Call onDestroy callback
            if (typeof options.onDestroy === 'function') {
                options.onDestroy();
            }
        }
    };

    function constructOverlay() {
        // Create backdrop
        setupBackdrop();

        // Create the overlay
        setupOverlay();

        // Create content for overlay
        setupOverlayContent();

        // Create close button
        setupCloseButton();

        // Add class to body-element
        document.documentElement.classList.add('no-scroll');

        // Call onLoaded callback
        if (typeof options.onLoaded === 'function') {
            options.onLoaded();
        }
    };

    function setupBackdrop() {
        // Create the backdrop
        backdrop = document.createElement('div');
        backdrop.classList.add('novi-backdrop');
        backdrop.id = 'js-novi-backdrop';

        backdrop.addEventListener('click', function(e){
            if(e.target.classList.contains('novi-overlay') || e.target.classList.contains('novi-overlay__content')) {
                self.destroy();
            }
        });

        // Add backdrop to overlay element
        document.querySelector('body').appendChild(backdrop);
    };

    /*
     * Helper functions for HTML elements
     */
    function setupOverlay() {
        // Create the overlay
        overlayElem = document.createElement('div');
        overlayElem.classList.add('novi-overlay');
        overlayElem.id = 'js-novi-overlay';

        // Set class for the overlay, if set in options
        if (options.hasOwnProperty('class')) {
            overlayElem.classList.add(options.class);
        }

        // Add overlay to overlay element
        // document.querySelector('body').appendChild(overlayElem);
        backdrop.appendChild(overlayElem);
    };

    function setupOverlayContent() {
        // Create content for overlay
        overlayContent = document.createElement('div');
        overlayContent.classList.add('novi-overlay__content');

        // Create scroll element
        overlayScroll = document.createElement('div');
        overlayScroll.classList.add('novi-overlay__scroll');

        // Set content
        overlayScroll.innerHTML = content;
        overlayContent.appendChild(overlayScroll);

        // Add overlayContent to overlay element
        overlayElem.appendChild(overlayContent);
    };

    function setupCloseButton() {
        // Create the button
        var btnClose = document.createElement('button');
        btnClose.classList.add('novi-overlay-close', 'button--close');
        btnClose.type = 'button';
        btnClose.id = 'js-novi-overlay-close';

        // Add eventlistener for button click
        btnClose.addEventListener('click', self.destroy);

        // Add eventlistener for esc key
        document.addEventListener('keydown', function (e) {
            if (e.keyCode === 27) {
                self.destroy();
            }
        });

        // Add close button to overlay element
        overlayScroll.appendChild(btnClose);
    };

    /*
     * Helper functions for getting content
     */
    function get(url) {
        // Return a new promise.
        return new Promise(function (resolve, reject) {
            // Do the usual XHR stuff
            var req = new XMLHttpRequest();
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
                reject(Error("Network Error"));
            };

            // Make the request
            req.send();
        });
    };

}();