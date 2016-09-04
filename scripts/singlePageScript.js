$(document).ready(function() {
	// Try and load SVGs, if fail load PNGs if fail, use ugly buttons or something to maintain functionality
	/*try {
		console.log("Setting up filters");

		setUpSVGFilters();

		console.log("Filters set up successfully");

		try {
			console.log("Loading SVG social buttons");

			loadFollowButtonsSVG();	

			console.log("SVG social buttons loaded successfully");
		} catch(err) {
			console.log(err);
			console.log("Failed to load SVG social buttons");
			try {
				console.log("Loading PNG social buttons");

				loadFollowButtonsPNG();

				console.log("PNG social buttons loaded successfully");
			} catch(err) {
				console.log(err);
				console.log("Failed to load PNG social buttons");
			}
		}
		try {
			console.log("Loading SVG back arrow button");

			loadBackArrowSVG();

			console.log("SVG back arrow button loaded successfully");
		} catch(err) {
			console.log(err);
			console.log("Failed to load SVG back arrow button");
			try {
				console.log("Loading PNG back arrow button");

				loadBackArrowPNG();

				console.log("PNG back arrow button loaded successfully");
			} catch(err) {
				console.log(err);
				console.log("Failed to load back arrow button");
			}
		}
	} catch(err) {
		try {
			loadFollowButtonsPNG();
		} catch(err) {

		}
		try {
			loadBackArrowPNG();
		} catch(err) {
			
		}
	}*/
	
	setUpButtons();
	setUpProjectButtons();
	setUpGalleryButtons();
	setUpBackgroundImage();
});

$(window).resize(function() {
	resizeBackgroundImage();
});

function setUpSVGFilters() {
	var draw = Snap("#filters");
	draw.filter(Snap.filter.shadow(0, 0, -1, 3));
	draw.filter(Snap.filter.shadow(0, 0, -1, 0));
}

function loadFollowButtonsSVG() {
	// Main SVG drawing area
	var svgId = "#follow-buttons",
		draw = Snap(svgId);
	// Filenames
	var followButtons = Snap.load("images/SVG/FollowButtonsSmall1.svg", function(fragment) {
		//draw.append(fragment);	
		draw.append(fragment);
		/*draw.filter(Snap.filter.shadow(0, 0, -1, 3));
		draw.filter(Snap.filter.shadow(0, 0, -1, 0));*/

		var buttons = Snap.selectAll("#follow-buttons-svg > .svg-button"),
			scale = 1,
			timeUp = 150,
			timeDown = 250,
			transformUp = "t0,0s" + (scale + 0.1),
			transformDown = "t0,0s" + scale;	

		for (var i = 0; i < buttons.length; i++) {
			buttons[i].transform("t0,0s" + scale);
			//Snap animation values: from, to, setter, duration, [easing], [callback]
			buttons[i].hover(function(event) {
				var shadow = Snap($("#filters")[0]).selectAll("filter")[0];
				
				this.animate({transform: transformUp}, timeUp);
				this.attr({filter: shadow});

				Snap.animate(0, 100, function(value) {animateShadow(value, shadow)}, timeUp);
			}, function(event) {
				var shadow = Snap($("#filters")[0]).selectAll("filter")[0],
				noShadow = Snap($("#filters")[0]).selectAll("filter")[1];

				this.animate({transform: transformDown}, timeDown, mina.bounce);

				var element = this;
				Snap.animate(100, 0, function(value) {animateShadow(value, shadow)}, timeDown, mina.bounce, function() {
					element.attr({filter: noShadow});
				});
			});
		}	
	});

	$("#follow-buttons").appendTo($(".follow-buttons-container"));
}

function loadFollowButtonsPNG() {
	var innerContainer = document.createElement("div");
	$(innerContainer).addClass("follow-buttons-inner-container").appendTo($(".follow-buttons-container"));
	// no button container for buutons so can scale perfectly
	var blogB = document.createElement("div"),
		githubB = document.createElement("div"),
		linkedInB = document.createElement("div"),
		twitterB = document.createElement("div"),
		googleB = document.createElement("div");

		$(blogB).attr({
			"id": "blog-button"
		}).addClass("social-button-png").appendTo($(".follow-buttons-inner-container"));
		$(githubB).attr({
			"id": "github-button"
		}).addClass("social-button-png").appendTo($(".follow-buttons-inner-container"));
		$(linkedInB).attr({
			"id": "linked-in-button"
		}).addClass("social-button-png").appendTo($(".follow-buttons-inner-container"));
		$(twitterB).attr({
			"id": "twitter-button"
		}).addClass("social-button-png").appendTo($(".follow-buttons-inner-container"));
		$(googleB).attr({
			"id": "google-plus-button"
		}).addClass("social-button-png").appendTo($(".follow-buttons-inner-container"));


	var blogL = document.createElement("a"),
		githubL = document.createElement("a"),
		linkedInL = document.createElement("a"),
		twitterL = document.createElement("a"),
		googleL = document.createElement("a");

		$(blogL).attr({
			"id":"blog-link",
			"href":"https://ryanairth.blogspot.ie/"
		}).addClass("link").appendTo($("#blog-button"));
		$(githubL).attr({
			"id":"github-link",
			"href":"https://github.com/bogieman987"
		}).addClass("link").appendTo($("#github-button"));
		$(linkedInL).attr({
			"id":"linked-in-link",
			"href":"https://www.linkedin.com/in/RyanAirth"
		}).addClass("link").appendTo($("#linked-in-button"));
		$(twitterL).attr({
			"id":"twitter-link",
			"href":"https://twitter.com/bogieman987"
		}).addClass("link").appendTo($("#twitter-button"));
		$(googleL).attr({
			"id":"google-plus-link",
			"href":"https://plus.google.com/u/0/+RyanAirth987"
		}).addClass("link").appendTo($("#google-plus-button"));

	var blog = document.createElement("img"),
		github = document.createElement("img"),
		linkedIn = document.createElement("img"),
		twitter = document.createElement("img"),
		google = document.createElement("img");

		$(blog).attr({
			"src":"images/Buttons/SocialButtonsBlog.png",
			"alt":"Blog Icon"
		}).addClass("social-button-icon").appendTo($("#blog-link"));
		$(github).attr({
			"src":"images/Buttons/SocialButtonsGithub.png",
			"alt":"Github Logo"
		}).addClass("social-button-icon").appendTo($("#github-link"));
		$(linkedIn).attr({
			"src":"images/Buttons/SocialButtonsLinkedIn.png",
			"alt":"LinkedIn Logo"
		}).addClass("social-button-icon").appendTo($("#linked-in-link"));
		$(twitter).attr({
			"src":"images/Buttons/SocialButtonsTwitter.png",
			"alt":"Twitter Logo"
		}).addClass("social-button-icon").appendTo($("#twitter-link"));
		$(google).attr({
			"src":"images/Buttons/SocialButtonsGooglePlus.png",
			"alt":"Google Plus Logo"
		}).addClass("social-button-icon").appendTo($("#google-plus-link"));
}

function loadBackArrowSVG() {
	var svgId = "#back-arrow";
	var draw = Snap(svgId);
	Snap.load("images/SVG/ArrowSmall1.svg", function(fragment) {
		draw.append(fragment);

		var button = Snap.selectAll("#arrow-svg > .svg-button"),
			scale = 1,
			timeUp = 150,
			timeDown = 250,
			transformUp = "t0,0s" + (scale + 0.1),
			transformDown = "t0,0s" + scale;	

		button[0].hover(function(event) {
			var shadow = Snap($("#filters")[0]).selectAll("filter")[0];
			
			this.animate({transform: transformUp}, timeUp);
			this.attr({filter: shadow});

			Snap.animate(0, 100, function(value) {animateShadow(value, shadow)}, timeUp);
		}, function(event) {
			var shadow = Snap($("#filters")[0]).selectAll("filter")[0],
			noShadow = Snap($("#filters")[0]).selectAll("filter")[1];

			this.animate({transform: transformDown}, timeDown, mina.bounce);

			var element = this;
			Snap.animate(100, 0, function(value) {animateShadow(value, shadow)}, timeDown, mina.bounce, function() {
				element.attr({filter: noShadow});
			});
		});
	});

	$("#back-arrow").css({"width": "64px", "height": "64px", "float": "left"}).appendTo($(".project-back-arrow-container"));
}

function loadBackArrowPNG() {
	var backArrowContainer = document.createElement("div");


	var backArrow = document.createElement("img");

	$(backArrow).attr({
		"id": "back-arrow",
		"src":"images/Buttons/ArrowLeft.png",
		"alt":"Link to blog"
	}).addClass("project-back-arrow").appendTo($(".project-back-arrow-container"));
}

function animatePortfolioContentChange() {

}

function animateShadow(value, filter) {
	/*On hover values: 	from--1, to-20, setter-(filter, node1, stdDeviation)
						from-0, to-100, setter-(filter, node2, dy)
						from-3, to-0.5, setter-(filter, node5, node1, slope)*/
	filter.node.children[0].attributes[0].value = remap(value, 0, 100, -1, 2);
	//filter.node.children[1].attributes[1].value = value / 5;
	filter.node.children[1].attributes[1].value = remap(value, 0, 100, 0, 10);
	filter.node.children[4].children[0].attributes[0].value = remap(value, 0, 100, 1, 0.5);
}

function setUpBackgroundImage() {
	var backgroundWidth = screen.innerWidth,
		backgroundHeight = backgroundWidth * 0.75,
		bgImage = document.createElement("img");

	$(bgImage).appendTo($("body")).css({"display":"none"}).attr({"src": "images/Background.png", "id": "bg-image"}).on("load", function() {
		$("#bg-image").remove();
		$("body").css({
			"background": "url(images/Background.png)",
			"background-repeat": "no-repeat",	
			"background-size": backgroundWidth + "px " + backgroundHeight + "px",
			"background-position": "center top",
			"z-index": "1",
			"width": "100%",
			"height": "100%"
		});
		$("#background-image").remove();
		console.log("setting bg on load");
		removeLoadingScreen(100);
	}).on("error", function() {
		$("#bg-image").remove();
		$("body").css({
			"background": "#1c54c7"
		});
		console.log("setting bg on error");
		removeLoadingScreen(0);
	});
}

function removeLoadingScreen(miliseconds) {
	setTimeout(function() {
		$("#loader").remove();
		$(".main-container").css({
			"display":"block"
		});
	}, miliseconds);
}

function getBackgroundDimentions() {
	return $(".main-container").css("height") * 1.333 + $(".main-container").css("height");
}

function resizeBackgroundImage() {
	var backgroundWidth = screen.innerWidth,
		backgroundHeight = backgroundWidth * 0.75;
		
	$("body").css({
		"background-size": backgroundWidth + "px " + backgroundHeight + "px"
	});
}

function setPortfolioContent(contentType) {		
	$(".content-container .portfolio-content").appendTo($("#hidden-content"));

	switch(contentType) {
		case "about":
			$("#about-content").appendTo($(".content-container"));
			break;
		case "projects":
			$("#projects-content").appendTo($(".content-container"));
			break;
		case "contact":
			$("#contact-content").appendTo($(".content-container"));
			break;
	}
}

function setUpButtons() {
	$("#about-button").addClass("nav-button-current");

	var buttons = $(".content-nav-button");

	buttons.on("click", function(event) {
		var button = $(this);

		if(setButtonState(button, ".content-nav-button")) {
			setPortfolioContent(button.attr("id").split("-")[0]);
		}
	});

	buttons = $(".projects-nav-button");
	buttons.on("click", function(event) {
		var button = $(this);
		
		if(setButtonState(button, ".projects-nav-button")) {

		}
	});
}

function setButtonState(button, type) {
	if(!(button.hasClass("nav-button-current"))) {
		$(type).removeClass("nav-button-current");
		button.addClass("nav-button-current");	

		return true;					
	}

	return false;
}

function setUpProjectButtons() {
	// Reformat
	var projectPreviews = $(".project-preview");
	$(projectPreviews.get(0)).addClass("content-nav-button-left");
	$(projectPreviews.get(projectPreviews.length - 1)).addClass("content-nav-button-right");

	$(".project-preview").on("click", function(event) {
		onProjectPreviewClick(event, $(this));
	});

	var backArrow = $("#back-arrow, .project-back-arrow");
	backArrow.on("click", function(event) {
		onBackArrowClick(event, $(this));
	});
	backArrow.css("display", "none");
}

function setUpGalleryButtons() {
	var buttons = $(".gallery-preview-image");

	buttons.on("click", function(event) {
		onPreviewImageClick(event, $(this));
	})
}


function remap(value, from1, to1, from2, to2) {
	return (value - from1) / (to1 - from1) * (to2 - from2) + from2;
}

var shadowFilter = {
	getDefaultShadowFilter: function() {
		return Snap.filter.shadow(0, 0, -1, 3);
	}
};

var noShadowFilter = {
	getFlatShadowFilter: function() {
		return Snap.filter.shadow(0, 0, -1, 0);
	}
}

function onProjectPreviewClick(event, project) {
	$(".projects-selector").appendTo("#hidden-content");

	var projectId = project.attr("id");
	var projectName = projectId.substring(0, projectId.indexOf("-preview"));

	$("#" + projectName).appendTo($("#projects-content"));

	$(".project-name").html(project.data("projectName"));

	$("#back-arrow").css("display", "block");
}

function onBackArrowClick(event, arrow) {
	arrow.css("display", "none");

	$(".portfolio-content > .projects-multicol").appendTo($("#projects"));
	$(".projects-selector").appendTo($("#projects-content"));
	$(".project-name").html("Projects");
}

function onCurrentImageHover(event) {
	// Show arrows
}

function onCurrentImageClick(event) {
	// Pop image out
}

function onPreviewImageClick(event, image) {
	// TODO - animate on change
	if(!image.hasClass("gallery-preview-current")) {
		console.log("clicked");
		console.log(image);

		var source = image.children().attr("src"),
			alt = image.children().attr("alt"),
			className = image.children().attr("class"),
			currentImage = $(".gallery-current-image." + className);
		currentImage.attr({"src" : source, "alt" : alt});

		$(".gallery-preview-current." + className).removeClass("gallery-preview-current");

		image.addClass("gallery-preview-current");
	}				
}