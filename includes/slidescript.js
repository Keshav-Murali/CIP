//var slideIndex = 1;
//showSlides(slideIndex);

// Next/previous controls
function plusSlides(n, container) {
    var slides = container.getElementsByClassName("mySlides");
    for(var i = 0; i < slides.length; i++) {
	if (slides[i].style.display == "block")
	    break;
    }
    showSlides(i + n, container);
}

// Thumbnail image controls
//function currentSlide(n) {
//  showSlides(slideIndex = n);
//}

function showSlides(n, container) {
    var i;
    var slides = container.getElementsByClassName("mySlides");
    var slideIndex = n;
//  var dots = .getElementsByClassName("dot");
    if (n >= slides.length) {slideIndex = 0;}
    if (n < 0) {slideIndex = slides.length - 1}
    for (i = 0; i < slides.length; i++) {
	slides[i].style.display = "none";
    }
    //  for (i = 0; i < dots.length; i++) {
    //      dots[i].className = dots[i].className.replace(" active", "");
    //  }
    slides[slideIndex].style.display = "block";
    //  dots[slideIndex-1].className += " active";
}

