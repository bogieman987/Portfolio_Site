$(window).ready(function() {
	loadBackArrow();
	loadFollowButtons();
	setUpButtons();
	setUpProjectButtons();
	setUpGalleryButtons();
	setUpBackgroundImage();
});

$(window).resize(function() {
	resizeBackgroundImage();
});

function loadBackArrow() {
	var svgId = "#back-arrow";
	var draw = Snap(svgId);
	Snap.load("images/SVG/ArrowSmall.svg", function(fragment) {
		draw.append(fragment);

		var button = Snap.selectAll("#arrow-svg > .svg-button"),
			scale = 1,
			timeUp = 150,
			timeDown = 250,
			transformUp = "t0,0s" + (scale + 0.1),
			transformDown = "t0,0s" + scale;	

		button[0].hover(function(event) {
			var shadow = Snap($("#follow-buttons")[0]).selectAll("filter")[0];
			
			this.animate({transform: transformUp}, timeUp);
			this.attr({filter: shadow});

			Snap.animate(0, 100, function(value) {animateShadow(value, shadow)}, timeUp);
		}, function(event) {
			var shadow = Snap($("#follow-buttons")[0]).selectAll("filter")[0],
			noShadow = Snap($("#follow-buttons")[0]).selectAll("filter")[1];

			this.animate({transform: transformDown}, timeDown, mina.bounce);

			var element = this;
			Snap.animate(100, 0, function(value) {animateShadow(value, shadow)}, timeDown, mina.bounce, function() {
				element.attr({filter: noShadow});
			});
		});
	});
}

function loadFollowButtons() {
	// Main SVG drawing area
	var svgId = "#follow-buttons",
		draw = Snap(svgId);
	// Shadow filters, one with and one without
	draw.filter(Snap.filter.shadow(0, 0, -1, 3));
	draw.filter(Snap.filter.shadow(0, 0, -1, 0));
	// Filenames
	var followButtons = Snap.load("images/SVG/FollowButtonsSmall.svg", function(fragment) {
		//draw.append(fragment);	
		draw.append(fragment);

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
				var shadow = Snap($(svgId)[0]).selectAll("filter")[0];
				
				this.animate({transform: transformUp}, timeUp);
				this.attr({filter: shadow});

				Snap.animate(0, 100, function(value) {animateShadow(value, shadow)}, timeUp);
			}, function(event) {
				var shadow = Snap($(svgId)[0]).selectAll("filter")[0],
				noShadow = Snap($(svgId)[0]).selectAll("filter")[1];

				this.animate({transform: transformDown}, timeDown, mina.bounce);

				var element = this;
				Snap.animate(100, 0, function(value) {animateShadow(value, shadow)}, timeDown, mina.bounce, function() {
					element.attr({filter: noShadow});
				});
			});
		}	
	});
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
		backgroundHeight = backgroundWidth * 0.75;
	
	$("#background-image").ready(function() {
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
	});
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

	var backArrow = $("#back-arrow");
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