$('.filters ul li').click(function() {
    $('.filters ul li').removeClass('active');
    $(this).addClass('active');

    var data = $(this).attr('data-filter');
    $grid.isotope({
        filter: data
    })
});


var $grid = $(".grid").isotope({
    itemSelector: ".all",
    percentPosition: true,
    masonry: {
        columnWidth: ".all"
    }
})

var counted = 0;
$(window).scroll(function() {

    var oTop = $('#counter').offset().top - window.innerHeight;
    if (counted == 0 && $(window).scrollTop() > oTop) {
        $('.count').each(function() {
            var $this = $(this),
                countTo = $this.attr('data-count');
            $({
                countNum: $this.text()
            }).animate({
                    countNum: countTo
                },

                {

                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                        //alert('finished');
                    }

                });
        });
        counted = 1;
    }

});



window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("Navbar").style.backgroundColor = "white";
        document.getElementById("Navbar").style.padding = "5px 10px";
        document.getElementById("NavElement1").style.color = "#202020";
        document.getElementById("NavElement2").style.color = "#202020";
        document.getElementById("NavElement3").style.color = "#202020";
        document.getElementById("NavElement4").style.color = "#202020";
        document.getElementById("NavElement5").style.color = "#202020";
        document.getElementById("Navbar").style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)';
        document.getElementById("Navbar").style.transition = ".3s";

    } else {
        document.getElementById("Navbar").style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        document.getElementById("NavElement1").style.color = "white";
        document.getElementById("NavElement2").style.color = "white";
        document.getElementById("NavElement3").style.color = "white";
        document.getElementById("NavElement4").style.color = "white";
        document.getElementById("NavElement5").style.color = "white";
        document.getElementById("Navbar").style.transition = ".5s";
        document.getElementById("Navbar").style.padding = "10px 15px";
        document.getElementById("Navbar").style.boxShadow = 'none';
    }
}



// swiper    
var mySwiper = new Swiper('.swiper-container', {
    effect: '',
    loop: false,
    speed: 1000,
    slidesPerView: 1,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: 'true'
    },



});



(function($) {

    // Animate bar menu
    $('.hamburger-menu').on('click', function() {
        $('.bar').toggleClass('animate');
        if ($('body').hasClass('open-menu')) {
            $('body').removeClass('open-menu');
        } else {
            $('body').toggleClass('open-menu');
        }
    });

    // Close menu when press esc
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $('.bar').removeClass('animate');
            $('body').removeClass('open-menu');
        }
    });


})(jQuery);
var timeOnSlide = 2,
    // the time each image will remain static on the screen, measured in seconds
    timeBetweenSlides = 1,
    // the time taken to transition between images, measured in seconds

    // test if the browser supports animation, and if it needs a vendor prefix to do so
    animationstring = 'animation',
    animation = false,
    keyframeprefix = '',
    domPrefixes = 'Webkit Moz O Khtml'.split(' '),
    // array of possible vendor prefixes
    pfx = '',
    slidy = document.getElementById("slidy");
if (slidy.style.animationName !== undefined) { animation = true; }
// browser supports keyframe animation w/o prefixes

if (animation === false) {
    for (var i = 0; i < domPrefixes.length; i++) {
        if (slidy.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
            pfx = domPrefixes[i];
            animationstring = pfx + 'Animation';
            keyframeprefix = '-' + pfx.toLowerCase() + '-';
            animation = true;
            break;
        }
    }
}

if (animation === false) {
    // animate in JavaScript fallback
} else {
    var images = slidy.getElementsByTagName("img"),
        firstImg = images[0],
        // get the first image inside the "slidy" element.
        imgWrap = firstImg.cloneNode(false); // copy it.
    slidy.appendChild(imgWrap); // add the clone to the end of the images
    var imgCount = images.length, // count the number of images in the slide, including the new cloned element
        totalTime = (timeOnSlide + timeBetweenSlides) * (imgCount - 1), // calculate the total length of the animation by multiplying the number of _actual_ images by the amount of time for both static display of each image and motion between them
        slideRatio = (timeOnSlide / totalTime) * 100, // determine the percentage of time an induvidual image is held static during the animation
        moveRatio = (timeBetweenSlides / totalTime) * 100, // determine the percentage of time for an individual movement
        basePercentage = 100 / imgCount, // work out how wide each image should be in the slidy, as a percentage.
        position = 0, // set the initial position of the slidy element
        css = document.createElement("style"); // start marking a new style sheet
    css.type = "text/css";
    css.innerHTML += "#slidy { text-align: left; margin: 0; font-size: 0; position: relative; width: " + (imgCount * 100) + "%;  }\n"; // set the width for the slidy container
    css.innerHTML += "#slidy img { float: left; width: " + basePercentage + "%; }\n";
    css.innerHTML += "@" + keyframeprefix + "keyframes slidy {\n";
    for (i = 0; i < (imgCount - 1); i++) { // 
        position += slideRatio; // make the keyframe the position of the image
        css.innerHTML += position + "% { left: -" + (i * 100) + "%; }\n";
        position += moveRatio; // make the postion for the _next_ slide
        css.innerHTML += position + "% { left: -" + ((i + 1) * 100) + "%; }\n";
    }
    css.innerHTML += "}\n";
    css.innerHTML += "#slidy { left: 0%; " + keyframeprefix + "transform: translate3d(0,0,0); " + keyframeprefix + "animation: " + totalTime + "s slidy infinite; }\n"; // call on the completed keyframe animation sequence
    document.body.appendChild(css); // add the new stylesheet to the end of the document
}