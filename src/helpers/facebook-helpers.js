import { postFbToken, getUserByPassword } from './dartmap-api';

var fbProfileImageUrl = null;
var fbLoginStatus = null;
var userInfo = null;

export function fbAsyncInit() {
  window.fbAsyncInit = function () {
    FB.init({
      appId: '240355553073589',
      cookie: true,   // enable cookies to allow the server to access
                      // the session
      xfbml: true,    // parse social plugins on this page
      version: 'v2.8', // use version 2.8
    });
  };

  // Load the SDK asynchronously
  (function (d, s, id) {
    // const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    const js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    document.head.appendChild(js);
    // fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

export function processLoggedInUser(fbLoginStatus) {
  // if (window.location.href.indexOf('jwt') < 0) {
  //   const jwtResponse = postFbToken(fbLoginStatus.authResponse);
  //   setTimeout(() => {
  //     if (jwtResponse.responseText) {
  //       window.location.replace("http://localhost:8080/?jwt=" + jwtResponse.responseText);
  //     }
  //   }, 1000);
  // } else if (fbLoginStatus.authResponse.userID) {
  if (fbLoginStatus.authResponse.userID) {
    if (fbLoginStatus.authResponse.userID) {
      getUserByPassword(user => setUser(user), fbLoginStatus.authResponse.userID);
    }
    const fbUserUrl = `/${fbLoginStatus.authResponse.userID}/picture`;
    FB.api(
      fbUserUrl,
      handleImageResponse
    );
  }
}

export function setFbLoginStatus() {
  FB.getLoginStatus((response) => {
    fbLoginStatus = response;
  });
}

export function getFbLoginStatus() {
  return fbLoginStatus;
}

export function handleFbLoginClick() {
  FB.getLoginStatus((response) => {
    if (!(response.status === 'connected')) {
      FB.login();
    } else {
      fbLoginStatus = response;
    }
  });
}

export function getFbProfileImageUrl() {
  return fbProfileImageUrl;
}

export function getFbUserInfo() {
  return userInfo;
}

export function fbLogout() {
  FB.logout();
}

function handleImageResponse(resp) {
  if (resp && !resp.error) {
    fbProfileImageUrl = resp.data.url;
  }
}

function setUser(user) {
  userInfo = user;
}