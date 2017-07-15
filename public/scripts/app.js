/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 

$(document).ready(() => {
  // HELPER FUNCTIONS

  function escape(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function textInputVerified() {
    const textInput = $('#tweetInput').val();
    const textInputLength = textInput.length;
    if (textInputLength === 0) {
      swal('Oops...', 'You need to enter some text to submit!', 'error');
      return false;
    } else if (textInputLength > 140) {
      swal('Oops...', 'You have too many characters, try shortening it!', 'error');
      return false;
    }
    return true;
  }

  // FUNCTIONS: CREATION/RENDER OF TWEETS

  function createTweetElement(tweetData) {
    const html = `
    <article class="tweet">
      <header>
        <img class="avatar" src="${tweetData.user.avatars.small}">
        <span class="username">${tweetData.user.name}</span>
        <span class="handle">${tweetData.user.handle}</span>
      </header>
      <p>${escape(tweetData.content.text)}</p>
      <footer>
        <span>
              ${moment(tweetData.created_at).fromNow()}    
        </span>
        <img class="tweetButtons" src="/images/flag.png">
        <img class="tweetButtons" src="/images/arrows.png">
        <img class="tweetButtons tweetLike" src="/images/like.png" data-tweetId="${tweetData._id}" data-liked="false">
        <span>likes: ${tweetData.likes}</span>
      </footer>
    </article>`;
    return html;
  }
// Tweet data varible name

  function renderTweets(tweetData, executeAfter) {
    let allTweets = '';
    for (const tweet in tweetData) {
      const renderedTweet = createTweetElement(tweetData[tweet]);
      allTweets = renderedTweet + allTweets;
    }
    $('.feed').empty().append(allTweets);
    if (executeAfter) {
      executeAfter();
    }
  }

  function loadTweets(executeAfter) {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success(tweetData) {
        renderTweets(tweetData, executeAfter);
      },
    });
  }

  // SUBMIT OF NEW TWEETS via AJAX

  function submitTweet(e) {
    e.preventDefault();
    const tweetData = $(this).serialize();
    if (textInputVerified()) {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: tweetData,
        success(data) {
          $('#tweetInput').val('');
          $('#charCounter').text(140);
          loadTweets();
        },
      });
    }
  }

  $('#submit-tweet').on('submit', submitTweet);


  // SUBMIT LIKING OF NEW TWEET

  function submitLike(e) {
    const tweetLikeBtn = $(e.target);
    const tweetId = tweetLikeBtn.data('tweetid');
    const likeStatus = tweetLikeBtn.data('liked');

    if (!likeStatus) {
      $.ajax({
        method: 'POST',
        url: '/tweets/likes',
        data: { tweetId },
        success(data) {
          loadTweets(() => {
            $(`.tweetLike[data-tweetId="${tweetId}"]`).data('liked', true);
          });
        },
      });
    }
  }

  $('.feed').on('click', '.tweetLike', submitLike);

  // CALLING FUNCTION & SCRIPTS

  loadTweets();

  $('#compose').on('click', (e) => {
    e.stopPropagation();
    $('.new-tweet').slideToggle();
    $('#tweetInput').focus();
  });
});
