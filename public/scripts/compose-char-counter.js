$(document).ready(() => {
  $('#tweetInput').on('input', function () {
    const maxChars = 140;
    const tweetText = $(this).val();
    const counter = $(this).siblings('.counter');
    counter.text(maxChars - tweetText.length);
    if (tweetText.length > 140) {
      counter.css('color', 'red');
    } else {
      counter.css('color', 'black');
    }
  });
});

