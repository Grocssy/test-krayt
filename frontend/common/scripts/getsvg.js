$.get("svg/svg-sprite.svg", function(data) {
	var sprite = document.createElement("div");
	sprite.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
	$("body").prepend(sprite);
});