/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//TODO: Test Cross Site Scripting

$(document).ready(() => {

  function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


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
        <span>${tweetData.created_at}</span>
      </footer>
    </article>`;
    return html;
  }

  function renderTweets(tweetData) {
    let allTweets = '';
    for (const tweet in tweetData) {
      const renderedTweet = createTweetElement(tweetData[tweet]);
      allTweets += renderedTweet;
    }
    $('.feed').append(allTweets);
  }

  function loadTweets() {
    let renderedTweets = '';
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (tweetData) {
        renderTweets(tweetData);
      }
    });
  };

loadTweets();


});





