class FeedsController < ApplicationController
  before_action :require_logged_in!

  LIMIT = 20

  def show
    @feed_tweets =
      current_user.feed_tweets(LIMIT, params[:max_created_at]).includes(:user)
    
    respond_to do |format|
      format.json { render json: @feed_tweets }
      format.html { render :show }
    end
  end
end
