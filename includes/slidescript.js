function plusSlides(n, container) {
    var slides = container.getElementsByClassName("mySlides");
    for(var i = 0; i < slides.length; i++) {
	if (slides[i].style.display == "block")
	    break;
    }
    showSlides(i + n, container);
}

function showSlides(n, container) {
    var i;
    var slides = container.getElementsByClassName("mySlides");
    var slideIndex = n;
    if (n >= slides.length) {slideIndex = 0;}
    if (n < 0) {slideIndex = slides.length - 1}
    for (i = 0; i < slides.length; i++) {
	slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}

