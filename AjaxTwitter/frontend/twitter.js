const FollowToggle = require('./follow_toggle.js');
const UserSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');


$(() => {
  $('button.follow-toggle').each(function() {
    new FollowToggle(this);
  });
  
  $('nav.users-search').each(function() {
    new UserSearch(this);
  });
  
  $('form.tweet-compose').each(function() {
    new TweetCompose(this);
  });
});
