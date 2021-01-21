import NovicellOverlay from '../dist/novicell-overlay.esm.js';

document.addEventListener("DOMContentLoaded", function () {
    // Select your overlay trigger
    let trigger = document.querySelector('#js-overlay-trigger');
    
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
    let videoOverlayTriggers = document.querySelectorAll('.js-video-overlay-trigger');
    
    for (let i = 0; i < videoOverlayTriggers.length; i++) {
        videoOverlayTriggers[i].addEventListener('click', (e) => {
            e.preventDefault();
            let currentTrigger = e.target;
            let overlayVideo = new NovicellOverlay({
                // element: currentTrigger,
                videoId: currentTrigger.getAttribute("data-video-id"),
                type: currentTrigger.getAttribute('data-type'),
                autoplay: 1,
                className: "video-overlay",
                isVideo: true,
                disableTracking: currentTrigger.getAttribute('data-disable-tracking')
            })
            overlayVideo.create();
        });
    }
});