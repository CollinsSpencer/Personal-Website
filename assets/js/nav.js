var $nav,
    $window,
    scrollVal,
    scrollTop;

$(function() {
  scrollVal = 0;
  $nav = $("nav");

  $(window).scroll(scroll);
});

function scroll() {
  var scrollTop = $(this).scrollTop();
  var scrollDif = scrollTop - scrollVal;
  var navOffset = parseInt($("nav").css('top'),10) - scrollTop;
  if(scrollDif < 0 && scrollTop > 0 && navOffset < -45) {
    showNav();
  } else {
    hideNav();
  }

  if(navOffset > 0) {
    stickyNav();
  }

  if (scrollTop <= 0 ) {
    $nav.css('top',0);
  }

  var docheight = $(document).height();

  if(scrollTop >= docheight - window.innerHeight) {
    showNav();
  }

  scrollVal = scrollTop;
}

function showNav() {
  if(!$nav.hasClass('sticky')) {
    $nav.css('top', -50);
    setTimeout(function(){
      $nav.addClass('sticky');
      $nav.addClass('slideIn');
      $nav.css('top',0);
    },50);
  }
}

function stickyNav() {
  if(!$nav.hasClass('sticky')) {
    $nav.css({
      'top': 0,
      'transition': 'none'
    });
    $nav.addClass('sticky');
    setTimeout(function(){
      $nav.css('transition', '');
    },50);
  }
}

function hideNav() {
  if($nav.hasClass('sticky')) {
    var currentPos = $nav.offset().top;
    $nav.removeClass('sticky');
    $nav.css("top",currentPos);
  }
}
