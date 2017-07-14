/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 * TODO:
 * [X] Add: "Flag", "Re-tweet" and "Like" icons upon hovering over the tweet, on the right
 * [X] Update: Compose button
 * [ ] Check: Final ESLint and Self Code Review
 *     [ ] Check: Remove Comments and Review var names
 * [ ] Check: Code Review
 * [ ] Check: Run on mentor computer
 * [ ] Stretch: Create 'like' functionality
 * [ ] Stretch: Create user login
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
        <img class="tweetButtons tweetLike" src="/images/like.png" data-tweetId="${tweetData._id}">
      </footer>
    </article>`;
    return html;
  }
//Tweet data varible name

  function renderTweets(tweetData) {
    let allTweets = '';
    for (const tweet in tweetData) {
      const renderedTweet = createTweetElement(tweetData[tweet]);
      allTweets = renderedTweet + allTweets;
    }
    $('.feed').empty().append(allTweets);
  }

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success(tweetData) {
        renderTweets(tweetData);
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


  //SUBMIT LIKING OF NEW TWEET
  //   function submitLike(e) {
  //   e.preventDefault();
  //   const tweetData = $(this).serialize();
  //   if (textInputVerified()) {
  //     $.ajax({
  //       method: 'POST',
  //       url: '/tweets',
  //       data: tweetData,
  //       success(data) {
  //         $('#tweetInput').val('');
  //         $('#charCounter').text(140);
  //         loadTweets();
  //       },
  //     });
  //   }
  // }

  function submitLike(e) {
    const tweetLikeBtn = $(e.target);
    console.log(tweetLikeBtn);
    const tweetId = tweetLikeBtn.data("tweetid");
    console.log('tweetid', tweetId);
      $.ajax({
      method: 'POST',
      url: '/likes',
      data: tweetId,
      success(data) {
        $('#tweetInput').val('');
        $('#charCounter').text(140);
        loadTweets();
      },
    });
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
