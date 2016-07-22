function calculateHeaderHeight() {
	var svgAspectRatio = 4.75,
	currentWidth = screen.width,
	mainContainerWidth = parseInt($(".mainContainer").css("width"), 10);

	if(currentWidth > mainContainerWidth) {
		currentWidth = mainContainerWidth;
	}

	return currentWidth / svgAspectRatio;
}
function addInteractiveHeader() {
	$("#header").css({
		"height": calculateHeaderHeight().toString()
	});

	var draw = Snap("#header"),
		interactiveHeader = Snap.load("images/SVG/InteractiveHeader.svg", function(element) {
		draw.append(element);

		var buttons = Snap.selectAll(".headerButton");

		for (var i = 0; i < buttons.length; i++) {
			buttons[i].hover(function(elem) {
				this.animate({transform:"t0,0s1.1"}, 250, mina.bounce);
			}, function(elem) {
				this.animate({transform:"t0,0s1"}, 250, mina.bounce);
			});
		}
	});
}

function animateHeader() {
	var timeline = new TimelineMax(),
	classes = [".cls-1", ".cls-2", ".cls-3", ".cls-4", ".cls-5", ".cls-6"];

	// All lines css to invisible
	$(".cls-1, .cls-2, .cls-3, .cls-4, .cls-5, .cls-6").css({
		"transition": "none",
		"opacity": "0"
	});

	for (var i = 0; i < classes.length; i++) {			
		var $paths = $("#interactiveHeader " + classes[i]);

		$paths.css({
			"transition": "none",
			"opacity": "0"
		});

		// Set up strokes and initials settings for the individual elements
		for (var j = 0; j < $paths.length; j++) {
			var length = 0;
			// Not all paths are circles, as such, getTotalLength fails so we need to catch the exception and carry on
			try {
				length = $paths[j].getTotalLength();
			} catch(err) {
				console.log("Can't get total length! Element not a path. Element is type: " + $paths[j].tagName);
				continue;
			}
			// Set the dash array and offset to the length of the path	
			TweenMax.set($paths[j], {strokeDasharray:(length + " " + length), strokeDashoffset:length});
			// Trigger a layout so styles are calculated & the browser picks up the starting position before animating
			$paths[j].getBoundingClientRect();	
		}

		// Define our transition for the brain lines
		switch($paths.attr("class")) {		
			case "cls-2":
			case "cls-3":
			case "cls-5":
				new TimelineMax().to($paths, 0, {opacity: "1"}).to($paths, 2, {strokeDashoffset: "0", ease:Linear.noEase});
				break;
			case "cls-4":
				new TimelineMax().to($paths, 0, {opacity: "1", delay: "1.5"}).to($paths, 2, {strokeDashoffset: "0", ease:Linear.noEase});
				break;
		}
	}

	var $circle = $("#circle .cls-1"),
		$leftLine = $("#leftLine"),
		$rightLine = $("#rightLine"),
		$buttonLines = $("#buttonLines").children();

	// Remove previous transition for left line
	$leftLine.css({
		"transition": "none"
	});
	// Remove previous transition for right line
	$rightLine.css({
		"transition": "none"
	});
	// Remove previous transition for button lines
	$buttonLines.css({
		"transition": "none"
	});
	// Set visibility of button lines and the buttons themselves
	$(".link .cls-1 ,.link .cls-6").css({
		"opacity": "1"
	});

	/**********************
		Line Animations
	**********************/

	// Circle animation
	new TimelineMax().to($circle, 0, {opacity: "1", delay: "3.16"}).to($circle, 3, {strokeDashoffset: "0", ease:Power4.easeOut});
	// Left and right line animations
	new TimelineMax().to($leftLine, 0, {opacity: "1", delay: "3.51"}).to($leftLine, 3, {strokeDashoffset: "0", ease:Power4.easeOut, yoyo:true});
	new TimelineMax().to($rightLine, 0, {opacity: "1", delay: "3.75"}).to($rightLine, 3, {strokeDashoffset: "0", ease:Power4.easeOut});

	/**********************
		Button Animations
	**********************/
	// Blog
	new TimelineMax().to($buttonLines[3], 0, {opacity:"1", delay:"4.1"}).to($buttonLines[3], 1.5, {strokeDashoffset:"0", ease:Power2.easeOut, onComplete:function() {
		new TimelineMax().to($("#blogButton .link"), 0.25, {opacity: "1"});
		$("#blogButton.headerButton").css({
			"display": "block"
		});
	}});
	// Github
	new TimelineMax().to($buttonLines[4], 0, {opacity:"1", delay:"3.64"}).to($buttonLines[4], 1.5, {strokeDashoffset:"0", ease:Power2.easeOut, onComplete:function() {	
		new TimelineMax().to($("#githubButton .link"), 0.25, {opacity: "1"});
		$("#githubButton.headerButton").css({
			"display": "block"
		});
	}});	
	// Linked in
	new TimelineMax().to($buttonLines[0], 0, {opacity:"1", delay:"3.75"}).to($buttonLines[0], 1.5, {strokeDashoffset:"0", ease:Power2.easeOut, onComplete:function() {
		new TimelineMax().to($("#linkedInButton .link"), 0.25, {opacity: "1"});
		$("#linkedInButton.headerButton").css({
			"display": "block"
		});
	}});
	// Twitter
	new TimelineMax().to($buttonLines[1], 0, {opacity:"1", delay:"4.18"}).to($buttonLines[1], 1.5, {strokeDashoffset:"0", ease:Power2.easeOut, onComplete:function() {
		new TimelineMax().to($("#twitterButton .link"), 0.25, {opacity: "1"});
		$("#twitterButton.headerButton").css({
			"display": "block"
		});
	}});
	// GooglePlus
	new TimelineMax().to($buttonLines[2], 0, {opacity:"1", delay:"4.39"}).to($buttonLines[2], 1.5, {strokeDashoffset:"0", ease:Power2.easeOut, onComplete:function() {
		new TimelineMax().to($("#googlePlusButton .link"), 0.25, {opacity: "1"});
		$("#googlePlusButton.headerButton").css({
			"display": "block"
		});
	}});			
}