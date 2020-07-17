// page loader 

let loader = document.getElementById("loader");

window.addEventListener("load", function () {

  loader.style.visibility = "hidden";

});


// to delay animations until the page loader has finished

document.body.classList.add('js-loading');

window.addEventListener("load", showPage);

function showPage() {
  document.body.classList.remove('js-loading');
}


// ===== Scroll to Top ==== 
$(window).scroll(function () {
  if ($(this).scrollTop() >= 50) { // If page is scrolled more than 50px
    $('#return-to-top').fadeIn(200); // Fade in the arrow
  } else {
    $('#return-to-top').fadeOut(200); // Else fade out the arrow
  }
});



// smooth scroll


const navbarMenu = document.querySelector('#myNav');
const navbarLinks = document.querySelectorAll('.menu__content a');


// navbarLinks.forEach(elem => elem.addEventListener('click', LinkClick));
for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener('click', LinkClick);
}


function LinkClick(event) {

  smoothScroll(event); //call to smoothScroll function 
}

function smoothScroll(event) {

  event.preventDefault();

  const targetId = event.currentTarget.getAttribute('href');
  const targetPosition = document.querySelector(targetId).offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));

    if (progress < duration) window.requestAnimationFrame(step);

  }
}

// gizma.com/easing
function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

/*Scroll to top when arrow up clicked BEGIN*/
$(window).scroll(function () {
  var height = $(window).scrollTop();
  if (height > 100) {
    $('#return-to-top').fadeIn();
  } else {
    $('#return-to-top').fadeOut();
  }
});
$(document).ready(function () {
  $("#return-to-top").click(function (event) {
    event.preventDefault();
    $("html, body").animate({
      scrollTop: 0
    }, "slow");
    return false;
  });

});
/*Scroll to top when arrow up clicked END*/


window.addEventListener('scroll', function (e) {

  const target = document.querySelectorAll('.scroll');

  var index = 0,
    length = target.length;
  for (index; index < length; index++) {

    let posX = window.pageYOffset * target[index].dataset.ratex;
    let posY = window.pageYOffset * target[index].dataset.ratey;

    target[index].style.transform = 'translate3d(' + posX + 'px,' + posY + 'px, 0px)';

  }
});

function openNav() {
  document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
};