var imgNbr = 0;
var nbrImages = 0;

function setup() {
	nbrImages = $('.small-img').length;
	//alert("Body is loaded!");
	click_sm_img("#image1");
};

// Create a function that runs when something with the small-img class is clicked.
// This function sets the src and alt attributes of the element 
// with the id of "big-img" to the src and alt attributes of the element that was clicked.
function click_sm_img(elem) {
	$("#big-img-caption").html($(elem).attr('alt'));
	$("#big-img").attr('src', $(elem).attr('src'));
	$("#big-img").attr('alt', $(elem).attr('alt'));

	imgNbr = Number(elem.slice(-1));
	disableNavButtons();
};

function disableNavButtons() {
	if (imgNbr <= 1) {
		$("#back-btn").attr("disabled", "");
	} else {
		$("#back-btn").removeAttr("disabled");
	}

	if (imgNbr >= nbrImages) {
		$("#fwd-btn").attr("disabled", "");
	} else {
		$("#fwd-btn").removeAttr("disabled");
	}
};

$(".small-img").click(function(){
	// pass an argument to this function
	click_sm_img("#" + $(this).attr('id'));
});

$("#back-btn").click(function(){
	if (imgNbr > 1) {
		imgNbr -= 1;
		click_sm_img("#image" + imgNbr.toString());
	}
});

$("#fwd-btn").click(function(){
	if (imgNbr < nbrImages) {
		imgNbr += 1;
		click_sm_img("#image" + imgNbr.toString());
	}
});

$("#circle-frame-btn").click(function(){
	$("#big-img").attr("style", "border-radius: 50%;");
});

$("#drop-frame-btn").click(function(){
	$("#big-img").attr("style", "box-shadow:50px 20px 10px black;");
});

$("#rounded-frame-btn").click(function(){
	$("#big-img").attr("style", "border-radius: 10%;");
});
