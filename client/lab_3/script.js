/* eslint-disable max-len */
/*
  Welcome to Javascript!

  This file contains parts of a simple script to make your carousel work.
  Please feel free to edit away - the main version of this with all the notes is safely stored elsewhere
*/
/* eslint-enable max-len */
// set our first slide's position to "0", the opening position in an array
let slidePosition = 0;

// gather a reference to every slide we're using via the class name and querySelectorAll
const slides = document.querySelectorAll('.carousel_item');

// change that "NodeList" into a Javascript "array", to get access to "array methods"
const slidesArray = Array.from(slides);

// Figure out how many slides we have available
const totalSlides = slidesArray.length;

function updateSlidePosition() {
  
  slidesArray.forEach((carousel_item) => carousel_item.classList.add('hidden'))
  slidesArray.forEach((carousel_item) => carousel_item.classList.remove('visible'))
  slidesArray[slidePosition].classList.remove('hidden')
  slidesArray[slidePosition].classList.add('visible')
  // outside your .forEach,
  // add a 'visible' class to the slide at the current slidePosition in slides
}

function moveToNextSlide() {
  updateSlidePosition();
  if (slidePosition === 3) {
    slidePosition = 0
    return slidePosition
  } else {
    slidePosition += 1
    return slidePosition
  }
}

function moveToPrevSlide() {

  updateSlidePosition();
  if (slidePosition === 0) {
    slidePosition = 3
    return slidePosition
  } else {
    slidePosition -= 1
    return slidePosition
  }
}

/*
  These two functions have been assigned via "addEventListener"
  to the elements accessed by the "querySelector" set to the class name on each
*/
document.querySelector('.next') // Get the appropriate element (<button class="next">)
  .addEventListener('click', () => { // set an event listener on it - when it's clicked, do this callback function
    console.log('clicked next'); // let's tell the client console we made it to this point in the script
    moveToNextSlide(); // call the function above to handle this
  });

  document.querySelector('.prev') // Get the appropriate element (<button class="next">)
  .addEventListener('click', () => { // set an event listener on it - when it's clicked, do this callback function
    console.log('clicked prev'); // let's tell the client console we made it to this point in the script
    moveToPrevSlide(); // call the function above to handle this
  });
// Paying close attention to the above queryselector, write one that fires
// when you want a "prev" slide