sliderInt = 1;
sliderNext = 2;

$(document).ready(function() {
  $("#slider > img#1").fadeIn(300);
  startSlider();
});

function startSlider() {
  count = $("#slider > img").length;
  //Had to debug this a bit as vidguide used .size() instead of .length

  loop = setInterval(function() {

  /*Set interval does [whatever] at specified intervals
  It takes (Expression, IntervalInMilliseconds)
  If you want to only do [whatever] once, use setTimeout */
    if(sliderNext > count){
      sliderNext = 1;
      //sliderInt = 1; // He included this line but seems unnecessary, see below for why
    }

    $("#slider > img").fadeOut(300);
    $("#slider > img#" + sliderNext).fadeIn(300);

    sliderInt = sliderNext; //This is why. sliderInt would reset to 1 here anyway.
    sliderNext = sliderNext + 1;
  }, 3000)

}

$('.left').on('click', function() {
  newSlide = sliderInt - 1;
  showSlide(newSlide);
});

$('.right').on('click',  function() {
  newSlide = sliderInt + 1;
  showSlide(newSlide);
});

/*

Commenting out the below to try to re-do it without having the onclick in the HTML.
Also because I just learned to how to the syntax above.

Anyway nice seems to work.

function prev(){
  newSlide = sliderInt - 1;
  showSlide(newSlide);
}

function next() {
  newSlide = sliderInt + 1;
  showSlide(newSlide);
}
*/

function stopLoop() {
  window.clearInterval(loop); // This refers to the interval we created and set equal to loop above
}

function showSlide(id) {
  stopLoop();
  if(id > count){
    id = 1;
  } else if(id < 1) {
    id = count;
  }

  $("#slider > img").fadeOut(300);
  $("#slider > img#" + id).fadeIn(300);

  sliderInt = id;
  sliderNext = id + 1;
  startSlider();

}

$("#slider > img").hover(
  function() {
    stopLoop();
  },
  function() {
    startSlider(); // .hover takes (handlerIn, handlerOut), like mouseenter/leave
  }
)
