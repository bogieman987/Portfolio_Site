var tabOpen = false;

var previousContentTab;

function openProjectLanguage(event, languageName) {
	// Declare all variables
	var tabContent, tabLinks, projects, contentContainer;

	/**************************************************************
							Visibilty
	***************************************************************/
	// Get all elements with class="tabContent" and hide them
	tabContent = document.getElementsByClassName("tabContent");
	for (var i = 0; i < tabContent.length; i++) {
		tabContent[i].style.display = "none";
	}

	// Get all elements with class="tabLinks" and remove the class "active"
	tabLinks = document.getElementsByClassName("tabLinks");
	for (var i = 0; i < tabLinks.length; i++) {
		tabLinks[i].className = tabLinks[i].className.replace(" active", "");
	}
	// Add the "active" class to the link that opened the tab
	event.currentTarget.className += " active";
	// Unhide contentContainer
	contentContainer = document.getElementById("contentContainer");
	contentContainer.style.display = "block";

	/**************************************************************
							Animation
	***************************************************************/

	if(!tabOpen && !(contentContainer.className.indexOf(" dropDownAnim") > -1)) {
		contentContainer.className += " dropDownAnim";

		tabOpen = true;
	}

	if(tabOpen) {
		// Remove all instances of slideInLeft
		for (var i = 0; i < tabContent.length; i++) {
			tabContent[i].className = tabContent[i].className.replace(" slideInLeft", "");
			tabContent[i].className = tabContent[i].className.replace(" slideOutLeft", "");
		}

		if(previousContentTab != null) {
			//previousContentTab.style.display = "block";
			//previousContentTab.className += " slideOutLeft";
		}
		
		// TODO - Might have to use absolute positioning, or relative perhaps
		document.getElementById(languageName).style.display = "block";
		document.getElementById(languageName).className += " slideInLeft";

		previousContentTab = document.getElementById(languageName);

		// Logging
		console.log("tabContent length: " + tabContent.length);

		for (var i = 0; i < tabContent.length; i++) {
			console.log("tabContent: " + tabContent[i].id + ", classes: " + tabContent[i].className);
		}

		console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	}				
}