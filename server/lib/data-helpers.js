

const ObjectId = require('mongodb').ObjectId;
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets(callback) {
      db.collection('tweets').find().toArray(callback);
    },

    toggleLike(tweetId, callback) {
      db.collection('tweets').update({ _id : ObjectId(tweetId) }, { $inc: { likes: 1 } }, callback);
    },
  };
};
