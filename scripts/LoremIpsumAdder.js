var loremIpsum = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet arcu ut quam tempus elementum. Maecenas congue odio elit, vel tincidunt purus elementum vitae. Proin sit amet augue ornare, efficitur orci lobortis, sollicitudin dui. Morbi eget lacinia nibh, non vehicula nibh. Praesent pellentesque ultricies dui, vitae ultrices libero pharetra sit amet. In hac habitasse platea dictumst. Donec bibendum dictum lectus, nec dapibus orci. Curabitur malesuada eros sed nisi tempor ornare.",
"Vestibulum efficitur molestie consequat. In vulputate a augue vel consectetur. Ut a volutpat justo. Nam eu porttitor massa. Sed a fringilla turpis. Duis rutrum dapibus lorem nec volutpat. Sed pellentesque, odio at rhoncus viverra, erat libero elementum erat, scelerisque lacinia libero ex non mi.",
"In sed dolor risus. Vestibulum posuere elit mi, ac faucibus odio convallis nec. Donec augue sapien, mollis et finibus non, mollis vitae lacus. Phasellus ac massa porta magna placerat congue. Etiam aliquam dui massa, eu commodo orci imperdiet non. Vivamus scelerisque facilisis neque, semper fermentum turpis tempus sit amet. Aenean dapibus, lectus sit amet blandit tincidunt, tortor erat placerat nibh, vitae porttitor mi lorem vel ipsum. Phasellus fringilla orci eu magna auctor iaculis in nec velit. Ut quis lacus vitae orci porttitor auctor. Aenean et massa id eros consequat porta. Mauris placerat blandit nunc a pharetra. Etiam egestas fringilla suscipit. In nisi ligula, mattis sed nisi maximus, laoreet posuere urna. Curabitur euismod dignissim mauris eget vehicula.",
"Nullam lectus mauris, sodales ut mi et, dapibus semper purus. Nullam vel luctus turpis, ac elementum turpis. Pellentesque dignissim lacus a dolor tristique, in ornare neque sodales. Mauris at leo ex. Nunc fringilla lorem non ex pretium, quis imperdiet turpis volutpat. Duis sit amet diam vulputate, ullamcorper lorem porta, condimentum augue. Nulla nec leo in augue posuere imperdiet sed vitae urna. Integer ut tortor eget magna sodales consectetur eget ut diam. Suspendisse in risus eu diam sollicitudin fermentum a eget justo. Nam consectetur turpis sit amet eros placerat, nec blandit ipsum fermentum. Nunc facilisis dolor vitae est rhoncus, at tempor orci vulputate. Pellentesque elementum et neque ut maximus.",
"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec cursus arcu quis bibendum aliquam. Quisque sollicitudin nec nunc at vehicula. Mauris facilisis, libero nec malesuada gravida, odio sapien facilisis dolor, vitae rutrum elit elit eget est. Nullam consectetur risus enim, sit amet lobortis lorem hendrerit eget. In a nulla non nibh auctor tristique. Ut venenatis augue sit amet faucibus condimentum. Nullam ac felis diam."],
fragment = document.createDocumentFragment(),
paragraphs = [];

for (var i = 0; i < loremIpsum.length; i++) {
	var p = document.createElement("p");
	var t = document.createTextNode(loremIpsum[i]);
	p.appendChild(t);
	paragraphs.push(p);

	//fragment.appendChild(document.createElement("p").appendChild(document.createTextNode(loremIpsum[i])));
}

for (var i = 0; i < paragraphs.length; i++) {
	fragment.appendChild(paragraphs[i]);
}

function addLoremIpsum(elementClassName) {
	var element = document.getElementsByClassName(elementClassName);

	for (var i = 0; i < element.length; i++) {
		var fragClone = fragment.cloneNode(true);
		element[i].appendChild(fragment);
		fragment = fragClone.cloneNode(true);
	}
}