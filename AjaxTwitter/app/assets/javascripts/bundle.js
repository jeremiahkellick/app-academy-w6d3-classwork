/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

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


/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");

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


/***/ }),

/***/ "./frontend/tweet_compose.js":
/*!***********************************!*\
  !*** ./frontend/tweet_compose.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");

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

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
const UserSearch = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js");
const TweetCompose = __webpack_require__(/*! ./tweet_compose.js */ "./frontend/tweet_compose.js");


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


/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");
const FollowToggle = __webpack_require__ (/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");

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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map