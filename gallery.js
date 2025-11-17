let mCurrentIndex = 0;
let mImages = [];
const mUrl = 'images.json';
let mWaitTime = 7000;

// PAGE READY
$(document).ready(() => {
  $('.details').hide();
  startTimer();

  // Initialize arrow animation with custom arrows
  initArrowAnimation();

  $('.moreIndicator').click(() => {
    $('.moreIndicator').toggleClass('rot90 rot270');
    $('.details').slideToggle();
  });

  $('#nextPhoto').click(() => showNextPhoto());
  $('#prevPhoto').click(() => showPrevPhoto());

  fetchJSON();
});

// --- Arrow Animation with JS (starts as X in center) ---
function initArrowAnimation() {
  const $prev = $('#prevPhoto'); // x-arrow-left.png
  const $next = $('#nextPhoto'); // x-arrow-right.png

  const navWidth = $('#nav').width();
  const arrowWidth = $prev.width();

  // Start arrows in center as an X with different rotations
  $prev.css({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%) rotate(45deg)',
    opacity: 0
  });

  $next.css({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%) rotate(-45deg)',
    opacity: 0
  });

  // Fade in
  $prev.animate({ opacity: 1 }, 300);
  $next.animate({ opacity: 1 }, 300);

  // Animate to final positions
  setTimeout(() => {
    // --- Left arrow moves to left and faces left ---
    $prev.animate({ left: 0, top: 0 }, {
      duration: 1000,
      step: function() {
        // rotate during animation for smooth effect
        $(this).css('transform', 'rotate(180deg)');
      },
      complete: function() {
        // Ensure final rotation is exactly facing left
        $(this).css({ position: '', left: '', top: '', transform: 'rotate(180deg)', opacity: '' });
      }
    });

    // --- Right arrow moves to right and faces right ---
    $next.animate({ left: navWidth - arrowWidth, top: 0 }, {
      duration: 1000,
      step: function() {
        $(this).css('transform', 'rotate(0deg)');
      },
      complete: function() {
        // Ensure final rotation is exactly facing right
        $(this).css({ position: '', left: '', top: '', transform: 'rotate(0deg)', opacity: '' });
      }
    });
  }, 500); // delay 0.5s for fade-in
}

// Fetch JSON
function fetchJSON() {
  $.ajax({
    url: mUrl,
    dataType: 'json',
    success: function (data) {
      mImages = data.images;
      swapPhoto();
    },
    error: function () {
      console.error("Failed to load JSON");
    }
  });
}

// Swap displayed photo
function swapPhoto() {
  let currentImage = mImages[mCurrentIndex];
  $('#photo').attr('src', currentImage.imgPath);
  $('.location').text(`Class: ${currentImage.imgLocation}`);
  $('.description').text(`Name: ${currentImage.imgDescription}`);
  $('.date').text(`Powers: ${currentImage.imgDate}`);
}

// Next photo
function showNextPhoto() {
  startTimer();
  mCurrentIndex++;
  if (mCurrentIndex >= mImages.length) mCurrentIndex = 0;
  swapPhoto();
}

// Previous photo
function showPrevPhoto() {
  startTimer();
  mCurrentIndex--;
  if (mCurrentIndex < 0) mCurrentIndex = mImages.length - 1;
  swapPhoto();
}

// Auto-advance timer
let mTimer;
function startTimer() {
  if (mTimer) clearInterval(mTimer);
  mTimer = setInterval(() => {
    showNextPhoto();
  }, mWaitTime);
}
