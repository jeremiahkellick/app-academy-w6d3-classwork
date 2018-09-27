const APIUtil = require('./api_util.js');

class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = this.$el.data('user-id');
    this.followState = this.$el.data('initial-follow-state');
    this.render();
    this.$el.on('click', this.handleClick.bind(this));
  }
  
  render() {
    if (this.followState === "followed") {
      this.$el.text("Unfollow!");
    } else {
      this.$el.text("Follow!");
    }
  }
  
  toggleFollowState() {
    this.followState = this.followState === "followed" ? "unfollowed" : "followed";
    this.render();
    this.$el.prop('disabled', false);
  }
  
  handleClick(event) {
    event.preventDefault();
    this.$el.prop('disabled', true);
    // const method = this.followState === "followed" ? "DELETE" : "POST";
    if (this.followState === 'followed'){
      APIUtil.unfollowUser(this.userId).then(this.toggleFollowState.bind(this));
    } else {
      APIUtil.followUser(this.userId).then(this.toggleFollowState.bind(this));
    }
  }
}

module.exports = FollowToggle;
