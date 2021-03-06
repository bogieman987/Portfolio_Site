function addFollowButtons() {
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

function animateShadow(value, filter) {
	/*On hover values: 	from--1, to-20, setter-(filter, node1, stdDeviation)
						from-0, to-100, setter-(filter, node2, dy)
						from-3, to-0.5, setter-(filter, node5, node1, slope)*/
	filter.node.children[0].attributes[0].value = remap(value, 0, 100, -1, 2);
	//filter.node.children[1].attributes[1].value = value / 5;
	filter.node.children[1].attributes[1].value = remap(value, 0, 100, 0, 10);
	filter.node.children[4].children[0].attributes[0].value = remap(value, 0, 100, 1, 0.5);
}

function remap(value, from1, to1, from2, to2) {
	return (value - from1) / (to1 - from1) * (to2 - from2) + from2;
}

var ShadowFilter = {
	getDefaultShadowFilter: function() {
		return Snap.filter.shadow(0, 0, -1, 3);
	}
};

var NoShadowFilter = {
	getFlatShadowFilter: function() {
		return Snap.filter.shadow(0, 0, -1, 0);
	}
}