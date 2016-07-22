function scrollToSection(event, element) {
	event.preventDefault();

	var yPos = $(element).position().top - 100;

	TweenMax.to(window, 1.5, {scrollTo:{y:yPos, autoKill:false}, ease:Power2.easeOut});
}