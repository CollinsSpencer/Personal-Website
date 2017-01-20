$("#banner").click(function() {
    $("#logo").slideDown("slow", function() {
    // Animation complete.
  });
});


var t = $(".title");
    ts = "titleScrolled";
    hdr = $(window).height();

$("body").scroll(function() {
  if( $(this).scrollTop() > 30 ) {
    t.addClass(ts);
  } else {
    t.removeClass(ts);
  }
});