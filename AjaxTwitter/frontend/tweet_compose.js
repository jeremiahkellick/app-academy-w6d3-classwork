const APIUtil = require('./api_util.js');

class TweetCompose {
  constructor(el) {
    this.$el = $(el);
    this.$el.on('submit', this.submit.bind(this));
    this.$inputs = $('form.tweet-compose :input');
  }
  
  submit(event){
    event.preventDefault();
    const data = this.$el.serializeJSON();
    this.$inputs.prop('disabled', true);
    APIUtil.createTweet(data)
      .then(this.handleSuccess.bind(this));
  }
  
  clearInput() {
    this.$inputs.each(function() {
      if (this.type === "textarea" || this.type === "select-one") {
        $(this).val('');
      }
    });
  }
  
  handleSuccess(res) {
    this.clearInput();
    this.$inputs.prop('disabled', false);
  }
}


module.exports = TweetCompose;