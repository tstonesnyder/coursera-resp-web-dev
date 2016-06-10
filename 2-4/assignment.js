// put your javascript code here
var categories_template, category_template, animal_template, slideshow_template;
var category_ddn_template, animal_ddn_template;

var current_category = animals_data.category[0];
var current_animal = current_category.animals[0];

console.log("In assignment.js");

// MERGE THE DATA WITH THE TEMPLATE AND PUT INTO THE DOM
function showTemplate(template, data, destination){
	console.log("In showTemplate");
	var html = template(data);
	$(destination).html(html);
}

function showSlideshow(){
    //console.log("in showSlideshow()");

    // Onclick event fires even if the navbar item is disabled,
    // so check for that.
    if ($("#slideshow-item").hasClass("disabled")) {
        return;
    }

    // SHOW THE SLIDESHOW TEMPLATE FOR THE CHOSEN CATEGORY
    showTemplate(slideshow_template, current_category, "#content");


    // ------------------ NAVBAR CHANGES ------------------
    // MAKE THE SLIDESHOW ITEM ACTIVE
    $(".navbar .active").removeClass("active");
    $("#slideshow-item").addClass("active");
 
    // ------------------ BREADCRUMB CHANGES ------------------
     // Deactivate category or animal breadcrumb
    $("#breadcrumb-category").removeClass("active");
    $("#breadcrumb-animal").removeClass("active");
    // Pull data out of current html, before modifying it
    var category = $("#breadcrumb-category").attr("cat-name");
    var data_id = $("#breadcrumb-category").attr("data-id");
    // Make it a (fake) link, so it looks clickable and styles properly
    $("#breadcrumb-category").html('<a href="#" data-id="' + data_id + '">' + category + '</a>');
    $("#breadcrumb-category a").click(showOneCategory);

    // Remove any existing animal in breadcrumbs
    $("#breadcrumb-animal").remove();
    // Remove any existing slideshow in breadcrumbs
    $("#breadcrumb-slideshow").remove();
    // Add the slideshow
    $(".breadcrumb").append('<li id="breadcrumb-slideshow" class="active">Slideshow</li>');

    //console.log("leaving showSlideshow()");
}


function showOneAnimal(){
	//console.log("in showOneAnimal()");

	// GET THE INDEX OF THE CHOSEN ANIMAL
	var index = $(this).data("id");

  	// UPDATE THE CURRENT ANIMAL VAR
  	current_animal = current_category.animals[index];
  	// SHOW THE CATEGORY TEMPLATE FOR THE CHOSEN CATEGORY
  	showTemplate(animal_template, current_animal, "#content");

    // ------------------ NAVBAR CHANGES ------------------
	// MAKE IT THE ANIMALS DDN ACTIVE
    $(".navbar .active").removeClass("active");
    $("#animal-ddn").addClass("active");
 
    // ------------------ BREADCRUMB CHANGES ------------------
     // Deactivate category breadcrumb
    $("#breadcrumb-category").removeClass("active");
    // Pull data out of current html, before modifying it
    // var category = $("#breadcrumb-category").html();
    var category = $("#breadcrumb-category").attr("cat-name");
    var data_id = $("#breadcrumb-category").attr("data-id");
    // Make it a (fake) link, so it looks clickable and styles properly
    $("#breadcrumb-category").html('<a href="#" data-id="' + data_id + '">' + category + '</a>');
    $("#breadcrumb-category a").click(showOneCategory);

    // Remove any existing animal or slideshow item in breadcrumbs
    $("#breadcrumb-animal").remove();
    $("#breadcrumb-slideshow").remove();
    // Add the new animal
	$(".breadcrumb").append('<li id="breadcrumb-animal" class="active" data-id="' + index + '">' + current_animal.name + '</li>');

	//console.log("leaving showOneAnimal()");
}

function showOneCategory(){
	//console.log("in showOneCategory()");

	// GET THE INDEX OF THE CHOSEN CATEGORY
	var index = $(this).data("id");
	console.log(index);
	if (typeof index !== "undefined") {
        //alert(index);
	  	// UPDATE THE CURRENT CATEGORY VAR
	  	current_category = animals_data.category[index];
	//} else {
	//	alert("undefined");
	}

  	// SHOW THE CATEGORY TEMPLATE FOR THE CHOSEN CATEGORY
  	showTemplate(category_template, current_category, "#content");
	// SPECIFY THE FUNCTION TO RUN WHEN USER CLICKS ON AN ANIMAL IMAGE
	$(".animal-thumbnail").click(showOneAnimal);


    // ------------------ NAVBAR CHANGES ------------------
    // ENABLE THE ANIMALS DDN
    $("#animal-ddn").removeClass("disabled");
    $("#animal-ddn a").removeClass("disabled");
 	// LOAD THE ANIMAL DROPDOWN USING THE TEMPLATE
	showTemplate(animal_ddn_template, current_category, "#animal-ddn-content");
	// SPECIFY THE FUNCTION TO RUN WHEN THE USER CLICKS ON AN ITEM IN THE ANIMAL DDN
	$(".animal-ddn-item").click(showOneAnimal);

    // ENABLE THE SLIDESHOW NAVBAR ITEM
    $("#slideshow-item").removeClass("disabled");

	// MAKE THE CATEGORIES DDN ACTIVE
    $(".navbar .active").removeClass("active");
    $("#category-ddn").addClass("active");

    // ------------------ BREADCRUMB CHANGES ------------------
    // REMOVE ACTIVE FROM THE HOME BREADCRUMB
    $("#breadcrumb-home").removeClass("active");
    // Make it a (fake) link, so it looks clickable and styles properly
    $("#breadcrumb-home").html('<a href="#">Home</a>');
    $("#breadcrumb-home a").click(showAllCategories);

    // REMOVE ANY EXISTING ANIMAL OR SLIDESHOW ITEMS IN BREADCRUMBS (and don't replace them)
    $("#breadcrumb-animal").remove();
    $("#breadcrumb-slideshow").remove();
    // REMOVE ANY ANY EXISTING CATEGORY ITEM IN BREADCRUMBS
    $("#breadcrumb-category").remove();
    // Replace the category item with a new one (non-linked, store the data-id for later)
    $(".breadcrumb").append('<li id="breadcrumb-category" data-id="' + index + '" cat-name="' + current_category.name + '" class="active">' + current_category.name + '</li>');

	//console.log("leaving showOneCategory()");
}

function showAllCategories(){
	//console.log("in showAllCategories()");

	showTemplate(categories_template, animals_data, "#content");
	
	// SPECIFY THE FUNCTION TO RUN WHEN USER CLICKS ON A CATEGORY IMAGE
	$(".category-thumbnail").click(showOneCategory);

    // ------------------ NAVBAR CHANGES ------------------
	// MAKE THE HOME MENU ITEM ACTIVE
    $(".navbar .active").removeClass("active");
    $("#home-item").addClass("active");

	// DISABLE THE MENU ITEMS THAT DON'T APPLY
    $("#animal-ddn").addClass("disabled");
    // This disabled the little empty popup that you get even if the ddn is disabled.
    $("#animal-ddn a").addClass("disabled");
    $("#slideshow-item").addClass("disabled");

    // ------------------ BREADCRUMB CHANGES ------------------
    // REMOVE ALL OTHER BREADCRUMBS AND CREATE NON-LINKED HOME ENTRY
    $(".breadcrumb").html('<li id="breadcrumb-home" class="active">Home</li>');
 
	//console.log("leaving showAllCategories()");
}


// HANDLEBARS HELPER FUNCTION TO SUPPORT ADDITION
Handlebars.registerHelper("addition", function(x, y) {
    return x + y;
});


// SET UP THIS CODE TO RUN AFTER THE DOCUMENT IS FULLY LOADED
$(document).ready(function(){
	//console.log("In document.ready");

	// COMPILE ALL TEMPLATES
	var source = $("#categories-template").html();
	categories_template = Handlebars.compile(source);

	source = $("#category-template").html();
	category_template = Handlebars.compile(source);

    source = $("#animal-template").html();
    animal_template = Handlebars.compile(source);

	source = $("#slideshow-template").html();
	slideshow_template = Handlebars.compile(source);

	source = $("#category-ddn-template").html();
	category_ddn_template = Handlebars.compile(source);

	source = $("#animal-ddn-template").html();
	animal_ddn_template = Handlebars.compile(source);


    // SPECIFY THE FUNCTION TO RUN WHEN USER CLICKS ON THE HOME ITEM ON NAVBAR
    $("#home-item").click(showAllCategories);
	// SPECIFY THE FUNCTION TO RUN WHEN USER CLICKS ON THE SLIDESHOW ITEM ON NAVBAR
	$("#slideshow-item").click(showSlideshow);
    

	// LOAD THE CATEGORY DROPDOWN USING THE TEMPLATE
	showTemplate(category_ddn_template, animals_data, "#category-ddn-content");
	// SPECIFY THE FUNCTION TO RUN WHEN USER CLICKS ON A CATEGORY IN THE CATEGORY DROPDOWN
	$(".category-ddn-item").click(showOneCategory);


	// START WITH CATEGORY TEMPLATE VISIBLE
	showAllCategories();


    // TWEAK TO FIX COLLAPSIBLE NAVBAR THAT WON'T COLLAPSE AFTER SELECTING MENU ITEM
    $(document).on('click','.navbar-collapse.in',function(e) {
        // if( $(e.target).is('a') && ( $(e.target).attr('class') != 'dropdown-toggle' ) ) {
        if( $(e.target).is('a') ) {
            $(this).collapse('hide');
        }
    });
});