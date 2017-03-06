// facebook-helpers.js
// This file holds all of the functions that interact with the facebook api

import { postFbToken, getUserByPassword } from './dartmap-api';

export function fbAsyncInit() {
  // Initialize the facebook SDK
  window.fbAsyncInit = () => {
    window.FB.init({
      appId: '240355553073589',
      cookie: true,   // enable cookies to allow the server to access
                      // the session
      xfbml: true,    // parse social plugins on this page
      version: 'v2.8', // use version 2.8
    });
  };

  // Load the SDK asynchronously
  (function loadFbSdk(d, s, id) {
    // const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    const js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    document.head.appendChild(js);
    // fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

function handleFbResponse(fbResponse, callbackFunc, login) {
  const FB = window.FB;
  if (fbResponse.status === 'connected') {
    if (fbResponse.authResponse.userID) {
      // if (login) {
      postFbToken((jwt) => {
        callbackFunc({ jwt });
      }, fbResponse.authResponse);
      // }
      getUserByPassword((userInfo) => {
        const fbUserImageUrl = `/${fbResponse.authResponse.userID}/picture?type=large`;
        FB.api(fbUserImageUrl, (graphResponse) => {
          let fbProfPicUrl = null;
          if (graphResponse && !graphResponse.error) {
            fbProfPicUrl = graphResponse.data.url;
          }
          callbackFunc({ userInfo, fbResponse, fbProfPicUrl });
        });
      }, fbResponse.authResponse.userID);
    }
  } else {
    callbackFunc({ fbResponse });
  }
}

export function getFbLoginStatus(dispatch, successAction) {
  const FB = window.FB;
  FB.getLoginStatus((response) => {
    handleFbResponse(response, (payload) => {
      dispatch({ type: successAction, payload });
    }, false);
  });
}

export function fbLogin(dispatch, successAction) {
  const FB = window.FB;
  FB.getLoginStatus((r) => {
    if (r.status === 'connected') {
      handleFbResponse(r, (payload) => {
        dispatch({ type: successAction, payload });
      }, true);
    } else {
      FB.login((response) => {
        if (response.status === 'connected') {
          handleFbResponse(response, (payload) => {
            dispatch({ type: successAction, payload });
          }, true);
        } else if (response.status === 'not_authorized') {
          console.log('user is logged in, but has not authorized our app');
        } else {
          console.log('user is not logged into facebook');
        }
      });
    }
  });
}

export function fbLogout(dispatch, successAction) {
  const FB = window.FB;
  FB.logout((response) => {
    dispatch({ type: successAction, payload: null });
  });
}
