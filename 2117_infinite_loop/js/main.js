// FAM Logistics Custom Scripts

function getOffSet() {
    let _offset = 450;
    const windowHeight = window.innerHeight;

    if (windowHeight > 500) {
        _offset = 400;
    }
    if (windowHeight > 680) {
        _offset = 300
    }
    if (windowHeight > 830) {
        _offset = 210;
    }

    return _offset;
}

function setParallaxPosition($doc, multiplier, $object) {
    const offset = getOffSet();
    const from_top = $doc.scrollTop(),
        bg_css = 'center ' + (multiplier * from_top - offset) + 'px';
    $object.css({"background-position": bg_css});
}

// Parallax function
// Adapted based on https://codepen.io/roborich/pen/wpAsm
const background_image_parallax = function ($object, multiplier, forceSet) {
    multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
    multiplier = 1 - multiplier;
    const $doc = $(document);

    if (forceSet) {
        setParallaxPosition($doc, multiplier, $object);
    } else {
        $(window).scroll(function () {
            setParallaxPosition($doc, multiplier, $object);
        });
    }
};

const background_image_parallax_2 = function ($object, multiplier) {
    multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
    multiplier = 1 - multiplier;
    const $doc = $(document);
    $object.css({"background-attachment": "fixed"});

    $(window).scroll(function () {
        if ($(window).width() > 768) {
            const firstTop = $object.offset().top,
                pos = $(window).scrollTop(),
                yPos = Math.round((multiplier * (firstTop - pos)) - 186);

            const bg_css = 'center ' + yPos + 'px';

            $object.css({"background-position": bg_css});
        } else {
            $object.css({"background-position": "center"});
        }
    });
};

$(function () {
    // Hero Section - Background Parallax
    background_image_parallax($(".tm-parallax"), 0.30, false);
    background_image_parallax_2($("#contact"), 0.80);
    background_image_parallax_2($("#certifications"), 0.80);

    // Handle window resize
    window.addEventListener('resize', function () {
        background_image_parallax($(".tm-parallax"), 0.30, true);
    }, true);

    // Detect window scroll and update navbar
    $(window).scroll(function (e) {
        if ($(document).scrollTop() > 120) {
            $('.tm-navbar').addClass("scroll");
        } else {
            $('.tm-navbar').removeClass("scroll");
        }
    });

    // Close mobile menu after click 
    $('#tmNav a').on('click', function () {
        $('.navbar-collapse').removeClass('show');
    })

    // Scroll to the corresponding section with animation
    $('#tmNav').singlePageNav({
        'easing': 'easeInOutExpo',
        'speed': 600
    });

    // Add smooth scrolling to all links
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 600, 'easeInOutExpo', function () {
                window.location.hash = hash;
            });
        }
    });

    // Initialize certifications carousel
    $('.tm-certifications-carousel').slick({
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});
