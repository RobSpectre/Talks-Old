$.fn.extend({
  animateCss: function (animationName, intro) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $(this).addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (animationName.indexOf("Out") > -1 || animationName === 'hinge') {
        $(this).addClass('masked');
      }
    });
    return $(this);
  }
});

function processIntroSlide(slide) {
  slide.interval = window.setInterval(function() {cycleTitleHeadings(slide);}, 4000);
}

function cycleTitleHeadings(slide) {
  var titleHeadings = $(slide).find(".title h3");

  if (typeof slide.titleIndex === 'undefined' || slide.titleIndex > titleHeadings.length) {
    slide.titleIndex = 0;
  }

  $(slide).find(".visible").removeClass("visible").animateCss("bounceOutRight");
  
  $(titleHeadings[slide.titleIndex]).removeClass("masked").addClass("visible").animateCss("bounceInLeft");

  slide.titleIndex++;
}

function animateSlide(event) {
  var slide = Reveal.getCurrentSlide();
  var animation = $(event.fragment).attr("class").split(' ').slice(-3)[0];
  $(slide).children().not('h1').animateCss(animation);
}
