function readMore() {
    var dots = document.getElementById('dots');
    var moreText = document.getElementById('more');
    var btnText = document.getElementById('readTogglerBtn');

    if (dots.style.display === 'none') {
        dots.style.display = 'inline';
        btnText.innerHTML = 'Read more &darr;';
        moreText.style.display = 'none';
    }
    else {
        dots.style.display = 'none';
        btnText.innerHTML = 'Read less &uarr;';
        btnText.style.display = 'none'; // display 'Read less' btn
        moreText.style.display = 'inline';
    }
}

function fadeSplashOnScroll() {
    const CHECKPOINT = 840;
    const splashScreen = document.getElementById('splashScreen');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= CHECKPOINT) {
            opacity = 1 - currentScroll / CHECKPOINT;
        } else {
            opacity = 0;
        }
        splashScreen.style.opacity = opacity;
    });
}

const lookbookModal = document.getElementById('lookbook-modal');
function closeLookbook() {
    lookbookModal.style.display = 'none';
}
function lookbookInit() {
    document.getElementById('lookbook-display').addEventListener('click', () => lookbookModal.style.display = 'flex');
    document.getElementById('lookbook-navigate-right').addEventListener('click', () => plusDivs(1));
    document.getElementById('lookbook-navigate-left').addEventListener('click', () => plusDivs(-1));
    document.addEventListener('keydown', e => {
        /* change lookbook only when active  */
        if (lookbookModal.style.display === 'flex') {
            stepLookbook(e);
        }
    })   
}

function stepLookbook(e) {
    if (e.keyCode == '37') {
        plusDivs(-1);
    }
    else if (e.keyCode == '39') {
        plusDivs(1);
    }
    else if (e.keyCode == '27') {
        closeLookbook();
    } else {
        e.preventDefault();
    }
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName('mySlides');
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
    }
    x[slideIndex - 1].style.display = 'block';
}

function setupLookBook() {
    showDivs(slideIndex);
}

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function activeNavSection() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            if (entry.intersectionRatio > 0) {
                const allLinks = document.querySelectorAll(`.nav li[data-target]`);
                allLinks.forEach(link => link.classList.remove('active'));
                document.querySelector(`.nav li[data-target="${id}"]`).classList.add('active');
            } else {
                document.querySelector(`.nav li[data-target="${id}"]`).classList.remove('active');
            }
        });
    });
    /* Track all sections that have an `id` applied */
    document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
    });
}

function triggerClipboard() {
    if (ClipboardJS.isSupported()) {
        new ClipboardJS('#copyEmail');
    }
    tippy('[data-tippy-content]',
        {
            allowHTML: true,
            trigger: 'click',
            // TODO: @artivilla figure out why leaving doesn't close the tipper
            // onTrigger(instance, e) {
            //     if (e.type === 'mouseleave') {
            //         instance.hide();
            //     }
            // },
        });
}

function crossFadeCoverArt() {
    const elem = document.querySelector('.cover-art > img');
    elem.addEventListener('mouseenter', function () {
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth ||
        document.body.clientWidth;
        if (viewportWidth > 1136) {
            elem.setAttribute('src', 'assets/cover-art-back.png');
        }
    })
    elem.addEventListener('mouseleave', function () {
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth ||
            document.body.clientWidth;
        if (viewportWidth > 1136) {
            elem.setAttribute('src', 'assets/cover-art-front.png');
        }
    })
}

/* scrollToArea is a func to find all class="scrollTo" and use data-targets to route to matching Ids */
/* data-offset (optional) used to adjust negative top margins */
function scrollToArea() {
    var links = document.querySelectorAll('.scrollTo');
    for (let i of links) {
        const elem = i.getAttribute("data-target");
        if (elem !== '') {
            i.addEventListener("click", handleButtonClick);
        }
    }
    function handleButtonClick(e) {
        const target = e.currentTarget.getAttribute('data-target');
        const BREAK_700 = 700;
        const BREAK_1000 = 1000;
        const viewport = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let dataOffset = e.currentTarget.getAttribute('data-offset');
        let XSOffset = e.currentTarget.getAttribute('data-offset-xs');
        /* defaults to desktop offset and smart selects mobile and tablets, can override with data-offset-xs attributes */
        let shiftOffset = dataOffset;
        if (viewport < BREAK_700) { // mobile viewports
            shiftOffset = XSOffset ? XSOffset : dataOffset + 100;
        } else if (viewport > BREAK_700 && viewport < BREAK_1000) { // tablet viewports
            shiftOffset = dataOffset + 80;
        } else {
            shiftOffset = dataOffset;
        }
        const el = document.getElementById(target)
        var offsetTop = el.offsetTop;
        if (el) {
            window.scroll({ top: offsetTop - shiftOffset, left: 0, behavior: 'smooth' });
        }
    }
}

function conditionalLookbookFeatures() {
    const overlayNavigators = document.getElementsByClassName('sec-lookbook-overlay');
    const smallNavigators = document.getElementsByClassName('sec-lookbook-knob');
    if (hasTouchScreen) {
        /*hide large navigational sections*/
        for (var item of overlayNavigators) {
            item.style.display = 'none';
        }
    } else {
        /*hide small navigational sections*/
        for (var item of smallNavigators) {
            item.style.display = 'none';
        }
        
    }
}

var touchScreenEvaluated = false;
var hasTouchScreen = false;
function evaluateTouchScreen(cb) {
    if (touchScreenEvaluated) {
        cb();
    }
    if ("maxTouchPoints" in navigator) {
        hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
        hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
        var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
        if (mQ && mQ.media === "(pointer:coarse)") {
            hasTouchScreen = !!mQ.matches;
        } else if ('orientation' in window) {
            hasTouchScreen = true; // deprecated, but good fallback
        } else {
            // Only as a last resort, fall back to user agent sniffing
            var UA = navigator.userAgent;
            hasTouchScreen = (
                /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
            );
        }
    }
    cb();
}

var slideIndex = 1;
ready(function () {
    evaluateTouchScreen(conditionalLookbookFeatures);
    fadeSplashOnScroll();
    setupLookBook();
    activeNavSection();
    triggerClipboard();
    crossFadeCoverArt();
    scrollToArea();
    lookbookInit();
})


// Utility funcs
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}