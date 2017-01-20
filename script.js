
$(document).ready(function(){
	var lastId,
	    menu = $("#banner ul"),
	    menuButton = $("#menu"),
	    menuOpen = false,
	    offsetHeight = $("#banner").outerHeight(),
	    menuItems = menu.find("a[href^='#']"),
	    contentItems = menuItems.map(function(){
	    	var item = $($(this).attr("href"));
	    	if (item.length) { return item; }
	    });
	
	function open(){
		$("#bars").css("display", "none");
		$("#collapse").css("display", "inline-block");
		menu.removeClass("hide");
		menuOpen = true;
	}
    
    function close(){
		$("#bars").css("display", "inline-block");
		$("#collapse").css("display", "none");
		menu.addClass("hide");
		menuOpen = false;
	}

    function scrollEffects(){
		var hdr = $(window).height()/2,
			fromTop = $(window).scrollTop(),
			scrolledPast = contentItems.map(function(){
				if ($(this).offset().top < fromTop+150)
					return this;
			});
		
		var current = scrolledPast[scrolledPast.length-1];
		var id = current && current.length ? current.attr("id") : "";
		   
		if(lastId !== id){
			lastId = id;
			menuItems
			.parent().removeClass("active")
			.end().filter("[href='#"+id+"']").parent().addClass("active");
		}
		
		if(fromTop > $(window).height()){
			$("#banner").addClass("sticky");
			$("#banner").attr("style", "position: fixed");
		} else {
			$("#banner").removeClass("sticky");
			$("#banner").attr("style", "position: absolute");
		}
	}
    
	menuItems.click(function(event){
	  	if(menuOpen){
	  		close();
	  	}
		var href = $(this).attr("href"),
	  		offsetTop = href === "#" ? 0 : $(href).offset().top - $("#banner").outerHeight();
  		$('html, body').stop().animate({ 
  			scrollTop: offsetTop
  		}, 300);
  		event.preventDefault();
	});
	
	menuButton.click(function(event){
		if(menuOpen){
			close();
		} else {
			open();
		}
	});
	
	scrollEffects();
	
	$(window).scroll(scrollEffects);
});