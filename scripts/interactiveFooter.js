function calculateFooterHeight() {
	var svgAspectRatio = 4.75,
	currentWidth = screen.width,
	mainContainerWidth = parseInt($(".mainContainer").css("width"), 10);

	if(currentWidth > mainContainerWidth) {
		currentWidth = mainContainerWidth;
	}

	return currentWidth / svgAspectRatio;
}

function addInteractiveFooter() {
	$("#footer").css({
		"height": calculateFooterHeight().toString(),
		"padding": "10px 0"
	});

	var draw = Snap("#footer");
	// Shadow filter values: x offset, y offset, opacity
	// Other values: x offset, y offset, blur amount, color, opacity
	draw.filter(Snap.filter.shadow(0, 0, -1, 3));
	draw.filter(Snap.filter.shadow(0, 0, -1, 0));
	interactiveHeader = Snap.load("images/SVG/GlobeInteractiveFooter.svg", function(element) {
		draw.append(element);

		var buttons = Snap.selectAll(".headerButton");

		for (var i = 0; i < buttons.length; i++) {
			//Snap animation values: from, to, setter, duration, [easing], [callback]

			// TODO : seperate shadow for each button,
			// TODO : if animation interupted able carry on where left off no glitches

			buttons[i].hover(function(event) {
				var shadow = Snap($("#footer")[0]).selectAll("filter")[0];
				
				this.stop();
				this.animate({transform:"t0,0s1.1"}, 250);
				this.attr({filter: shadow});

				var element = this;
				Snap.animate(0, 100, function(value) {animateShadow(value, shadow)}, 250);
			}, function(event) {
				var shadow = Snap($("#footer")[0]).selectAll("filter")[0],
				noShadow = Snap($("#footer")[0]).selectAll("filter")[1];

				this.stop();
				this.animate({transform:"t0,0s1"}, 250, mina.bounce);

				var element = this;
				Snap.animate(100, 0, function(value) {animateShadow(value, shadow)}, 250, mina.bounce, function() {
					element.attr({filter: noShadow});
				});
			});
		}
	});
}

function animateShadow(value, filter) {
	/*On hover values: 	from--1, to-20, setter-(filter, node1, stdDeviation)
						from-0, to-100, setter-(filter, node2, dy)
						from-3, to-0.5, setter-(filter, node5, node1, slope)*/
	filter.node.children[0].attributes[0].value = remap(value, 0, 50, -1, 5);
	filter.node.children[1].attributes[1].value = value / 2;
	filter.node.children[4].children[0].attributes[0].value = remap(value, 0, 100, 1, 0.5);
}

function remap(value, from1, to1, from2, to2) {
	return (value - from1) / (to1 - from1) * (to2 - from2) + from2;
}

function animateFooter() {
	var timeline = new TimelineMax(),
	classes = [".cls-1", ".cls-2", ".cls-3", ".cls-4", ".cls-5", ".cls-6"];

	// All lines css to invisible
	$(".cls-1, .cls-2, .cls-3, .cls-4, .cls-5, .cls-6, .link").css({
		"transition": "none",
		"opacity": "0"
	});

	for (var i = 0; i < classes.length; i++) {			
		var $paths = $("#interactiveFooter " + classes[i]);

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
	new TimelineMax().to($circle, 0, {opacity: "1", delay: "2"}).to($circle, 3, {strokeDashoffset: "0", ease:Power4.easeOut});
	// Left and right line animations
	new TimelineMax().to($leftLine, 0, {opacity: "1", delay: "2.35"}).to($leftLine, 3, {strokeDashoffset: "0", ease:Power4.easeOut, yoyo:true});
	new TimelineMax().to($rightLine, 0, {opacity: "1", delay: "2.59"}).to($rightLine, 3, {strokeDashoffset: "0", ease:Power4.easeOut});

	/**********************
		Button Animations
	**********************/
	// Blog
	new TimelineMax().to($buttonLines[3], 0, {opacity:"1", delay:"2.94"}).to($buttonLines[3], 1.5, {strokeDashoffset:"0", ease:Power2.easeOut, onComplete:function() {
		new TimelineMax().to($("#blogButton .link"), 0.25, {opacity: "1"});
		$("#blogButton.headerButton").css({
			"display": "block"
		});
	}});
	// Github
	new TimelineMax().to($buttonLines[4], 0, {opacity:"1", delay:"2.48"}).to($buttonLines[4], 1.5, {strokeDashoffset:"0", ease:Power2.easeOut, onComplete:function() {	
		new TimelineMax().to($("#githubButton .link"), 0.25, {opacity: "1"});
		$("#githubButton.headerButton").css({
			"display": "block"
		});
	}});	
	// Linked in
	new TimelineMax().to($buttonLines[0], 0, {opacity:"1", delay:"2.59"}).to($buttonLines[0], 1.5, {strokeDashoffset:"0", ease:Power2.easeOut, onComplete:function() {
		new TimelineMax().to($("#linkedInButton .link"), 0.25, {opacity: "1"});
		$("#linkedInButton.headerButton").css({
			"display": "block"
		});
	}});
	// Twitter
	new TimelineMax().to($buttonLines[1], 0, {opacity:"1", delay:"3.02"}).to($buttonLines[1], 1.5, {strokeDashoffset:"0", ease:Power2.easeOut, onComplete:function() {
		new TimelineMax().to($("#twitterButton .link"), 0.25, {opacity: "1"});
		$("#twitterButton.headerButton").css({
			"display": "block"
		});
	}});
	// GooglePlus
	new TimelineMax().to($buttonLines[2], 0, {opacity:"1", delay:"3.23"}).to($buttonLines[2], 1.5, {strokeDashoffset:"0", ease:Power2.easeOut, onComplete:function() {
		new TimelineMax().to($("#googlePlusButton .link"), 0.25, {opacity: "1"});
		$("#googlePlusButton.headerButton").css({
			"display": "block"
		});
	}});		

	$("#interactiveFooter").addClass("visible");	
}