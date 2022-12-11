// Old Slideshow script, created without the textbook.
/*var i = 0;
var images = [];
var time = 3000;

images[0] = 'img/banner3.jpg';
images[1] = 'img/banner2.jpg';
images[2] = 'img/banner1.jpg';

function changeImg() {
    document.slide.src = images[i];

    if (i < images.length - 1) {
        i++;
    } else {
        i = 0;
    }

    setTimeout("changeImg()", time);
}

window.onload = changeImg;*/

//new slideshow script, created with JQuery
$(document).ready(function() {
    var nextSlide = $("#slides img:first-child");
    var nextCaption;
    var nextSlideSource;

    var runSlideShow = function() {
        $("#caption").fadeOut(1000);
        $("#slide").fadeOut(1000,
            function() {
                if (nextSlide.next().length == 0) {
                    nextSlide = $("#slides img:first-child");
                } else {
                    nextSlide = nextSlide.next();
                }
                nextSlideSource = nextSlide.attr("src");
                nextCaption = nextSlide.attr("alt");
                $("#slide").attr("src", nextSlideSource).fadeIn(1000);
                $("#caption").text(nextCaption).fadeIn(1000);
            }
        )
    }

    var timer1 = setInterval(runSlideShow, 5000);

    $("#slide").toggle(
        function() {
            clearInterval(timer1);
        },
        function() {
            timer1 = setInterval(runSlideShow, 5000);
        }
    )
})