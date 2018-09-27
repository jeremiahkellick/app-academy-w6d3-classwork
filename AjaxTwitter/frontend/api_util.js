const APIUtil = {
  followUser: id => {
    return APIUtil.followRequest(id, "POST");
  },

  unfollowUser: id => {
    return APIUtil.followRequest(id, "DELETE");
  },
  
  followRequest: (id, method) => {
    return $.ajax({
      method: method,
      url: `/users/${id}/follow`,
      dataType: 'JSON'
    });
  },
  
  searchUsers: (queryVal, success) => {
    return $.ajax({
      method: 'GET',
      url: '/users/search',
      dataType: 'JSON',
      data:{
        query: queryVal
      }
    });
  },
  
  createTweet: (data) => {
    return $.ajax({
      method: 'POST',
      url: '/tweets',
      dataType: 'JSON',
      data: data
    });
  }
};





module.exports = APIUtil;
