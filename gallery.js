let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'images.json' // Replace with actual JSON URL
let mWaitTime = 5000 // Timer interval in milliseconds

$(document).ready(() => {
  $('.details').hide()
  startTimer();
  $('.moreIndicator').click(() => {
    $('.moreIndicator').toggleClass('rot90 rot270')
    $('.details').slideToggle()
  })

  $('#nextPhoto').click(() => {
    showNextPhoto();
  })
  $('#prevPhoto').click(() => {
    showPrevPhoto();
  })

  fetchJSON()
})

// Function to fetch JSON data and store it in mImages
function fetchJSON() {
  $.ajax({
    url: mUrl,
    dataType: 'json',
    success: function (data) {
      mImages = data.images;
      swapPhoto()
    },
    error: function (xhr, status, error) {
      console.error("Failed to load")
    }
  })
}

// Function to swap and display the next photo in the slideshow
function swapPhoto() {
  let currentImage = mImages[mCurrentIndex];
  $('#photo').attr('src', currentImage.imgPath);
  $('.location').text(`Location: ${currentImage.imgLocation}`)
  $('.description').text(`Description: ${currentImage.imgDescription}`)
  $('.date').text(`Date: ${currentImage.imgDate}`)
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto() {
  startTimer();
  mCurrentIndex++;
  if (mCurrentIndex >= mImages.length) {
    mCurrentIndex = 0
  }
  swapPhoto();
}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto () {
  // Decrement mCurrentIndex and call swapPhoto()
  // Ensure it loops to the end if mCurrentIndex is less than 0
}

// Starter code for the timer function
function startTimer () {
  // Create a timer to automatically call `showNextPhoto()` every mWaitTime milliseconds
  // Consider using setInterval to achieve this functionality
  // Hint: Make sure only one timer runs at a time
}
