const APIUtil = require('./api_util.js');
const FollowToggle = require ('./follow_toggle.js');

class UserSearch {
  constructor(el){
    this.$el = $(el);
    this.$input = $('nav.users-search input');
    this.$ul = $('nav.users-search ul');
    this.$input.on('input', this.handleInput.bind(this));
  }
  
  handleInput(){
    APIUtil.searchUsers(this.$input.val()).then(this.renderResults.bind(this));
  }
  
  renderResults(res){
    this.$ul.html("");
    res.forEach( user => {
      const li = $('<li>');
      const a = $('<a>');
      const followButton = $('<button>');
      followButton.addClass('follow-toggle');
      followButton.data('user-id', user.id);
      followButton.data('initial-follow-state', user.followed ? "followed" : "unfollowed");
      new FollowToggle(followButton);
      a.attr('href', `/users/${user.id}`);
      a.text(user.username);
      li.append(a);
      li.append(followButton);
      this.$ul.append(li);
    });
  }
}

module.exports = UserSearch;
