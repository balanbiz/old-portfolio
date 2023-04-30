function initializeLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src], source[data-srcset]'),
        userWindowHeight = document.documentElement.clientHeight;

    let lazyImagesPositions = [];
    if (lazyImages.length > 0) {
        lazyImages.forEach(img => {
            if (img.dataset.src || img.dataset.srcset) {
                lazyImagesPositions.push((img.getBoundingClientRect().top + pageYOffset) - 800);
                lazyScrollCheck();
            }
        });
    }
    window.addEventListener("scroll", lazyScroll, {
        passive: true
    });

    function lazyScroll() {
        if (document.querySelectorAll('img[data-src], source[data-srcset]').length > 0) {
            lazyScrollCheck();
        }
    }

    function lazyScrollCheck() {
        let imgIndex = lazyImagesPositions.findIndex(
            item => pageYOffset > item - userWindowHeight
        );
        if (imgIndex >= 0) {
            if (lazyImages[imgIndex].dataset.src) {
                lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
                lazyImages[imgIndex].removeAttribute('data-src');
            } else if (lazyImages[imgIndex].dataset.srcset) {
                lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
                lazyImages[imgIndex].removeAttribute('data-srcset');
            }
            delete lazyImagesPositions[imgIndex];
        }
    }
}