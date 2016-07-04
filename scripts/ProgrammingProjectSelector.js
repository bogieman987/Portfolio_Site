var tabOpen = false,
	lastContentTab,
	tempLocation = $("#temp");

function resetLocation(element, location) {
	TweenMax.to(element, 0, {x:(location), opacity:1});
}

function openProjectLanguage(event, languageName) {
	event.preventDefault();

	// Declare all variables
	var tabContent, tabLinks, projects, contentContainer, contentSlider;

	/**************************************************************
							Visibilty
	***************************************************************/
	// Get all elements with class="tabContent" and hide them
	tabContent = $(".tabContent");
	tabContent.css("display", "none");
	// Get all elements with class="tabLinks" and remove the class "active"
	tabLinks = $(".tabLinks");
	tabLinks.attr("class").replace(" active", "");
	// Add the "active" class to the link that opened the tab
	event.currentTarget.className += " active";
	// Unhide contentContainer
	contentContainer = $("#contentContainer");
	contentContainer.css("display", "block");

	/**************************************************************
						Experimental Animation
	***************************************************************/
	
	var currentLanguageDOM = $("#" + languageName),
		contentSlider =	$("#contentSlider"),
		timeline = new TimelineMax(),
		subTimeline = new TimelineMax(),
		resetAmount = "1%";

	currentLanguageDOM.css("display", "block");
	currentLanguageDOM.appendTo(contentSlider);
	
	if(tabOpen) {
		if(lastContentTab.attr("id") != currentLanguageDOM.attr("id")) {
			lastContentTab.css("display", "block");

			console.log(lastContentTab.attr("id") + ", " + currentLanguageDOM.attr("id"));

			timeline.add(TweenMax.to(lastContentTab, 2, {x:"-101%", opacity:0, ease:Back.easeIn, onComplete:function() {
				lastContentTab.css("display", "none");

				lastContentTab.appendTo(tempLocation);

				resetLocation(lastContentTab, resetAmount);

				lastContentTab = currentLanguageDOM;
			}}));

			TweenMax.to(currentLanguageDOM, 0, {paddingleft: "6px", paddingright: "6px"});

			subTimeline.add(TweenMax.to(currentLanguageDOM, 2, {x:"-101%", ease:Back.easeIn, onComplete:function() {

				TweenMax.to(currentLanguageDOM, 0, {x:"0%"});
			}}));

			timeline.add(subTimeline, "-=2");
		}
	} else {
		$(".tabContent").each(function() {
			resetLocation(this, resetAmount);
		});
		resetLocation(currentLanguageDOM, "100%");

		timeline.add(TweenMax.to(contentContainer, 2, {height:"100%", ease:Bounce.easeOut, opacity:1}));

		tabOpen = true;

		subTimeline.add(TweenMax.to(currentLanguageDOM, 2, {x:"0%", ease:Back.easeOut, onComplete:function() {

			lastContentTab = currentLanguageDOM;
		}}));

		timeline.add(subTimeline, "-=1.5");
	}	
}