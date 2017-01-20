//$.fn.extend({
//    zigzag: function () {
//        var text = $(this).text();
//        var zigzagText = '';
//        var toggle = true; //lower/uppper toggle
//			$.each(text, function(i, nome) {
//				zigzagText += (toggle) ? nome.toUpperCase() : nome.toLowerCase();
//				toggle = (toggle) ? false : true;
//			});
//	return zigzagText;
//    }
//});

$(document).ready(function() {
	var lastId,
	    menu = $("#mainHeader"),
	    offsetHeight = $("#banner").outerHeight(),
	    menuItems = menu.find("a[href^='#']"),
	    contentItems = menuItems.map(function(){
	    	var item = $($(this).attr("href"));
	    	if (item.length) { return item; }
	    });

	menuItems.click(function(event){
	  	var href = $(this).attr("href"),
	  		offsetTop = href === "#" ? 0 : $(href).offset().top;
  		$('html, body').stop().animate({ 
  			scrollTop: offsetTop
  		}, 300);
  		event.preventDefault();
	});
	
	var scroll = ($(window).scrollTop() > $(window).height()/2) ? true : false;
	
	$(window).scroll(function() {
		var hdr = $(window).height()/2,
			fromTop = $(this).scrollTop(),
			scrolledPast = contentItems.map(function(){
				if ($(this).offset().top < fromTop+150)
					return this;
			});
		
		var current = scrolledPast[scrolledPast.length-1];
		var id = current && current.length ? current.attr("id") : "";
		   
		if (lastId !== id) {
			lastId = id;
			// Set/remove active class
			menuItems
			.parent().removeClass("active")
			.end().filter("[href='#"+id+"']").parent().addClass("active");
		}
		
		if ($(window).scrollTop() > hdr) {
			if(scroll){
				$("#content").css("width", '80%');
				$("#content").css("marginLeft", '20%');
				$("#mainHeader").animate({width: '20%'}, 200);
				$("#banner ul").animate({width: '100%'}, 200);
			}
			scroll = false;
		} else {
			if(!scroll){
				$("#content").css("width", '70%');
				$("#content").css("marginLeft", '30%');
				$("#mainHeader").animate({width: '30%'}, 200);
				$("#banner ul").animate({width: '50%'}, 200);
			}
			scroll = true;
		}
	});
});