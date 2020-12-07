import { Button } from '@material-ui/core';
import React from 'react';
import { actionTypes } from '../../contexts/contextUser/reducer';
import { useStateValue } from '../../contexts/contextUser/UserStateProvider';
import { useViewport } from '../../contexts/contextViewport';
import { auth, provider } from '../../firebase';
import './Login.scss';

export default function Login() {
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();
  // eslint-disable-next-line no-unused-vars
  const { windowWidth, breakpoint } = useViewport();
  let token = '';

  const signIn = () => {
    if (windowWidth > 1200) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          // console.log(result)
          token = result.credential.accessToken;
          dispatch({
            type: actionTypes.SET_USER,
            payload: result.user,
          });
        })
        // eslint-disable-next-line no-alert
        .catch((error) => alert(error.message));
    } else {
      auth.signInWithRedirect(provider);
    }
  };

  console.log(token);

  const initApp = () => {
    auth
      .getRedirectResult()
      .then((result) =>
        dispatch({
          type: actionTypes.SET_USER,
          payload: result.user,
        })
      )
      .catch((error) => alert(error.message));
  };

  window.onload = function () {
    initApp();
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://www.shareicon.net/data/512x512/2016/07/10/119959_whatsapp_512x512.png"
          alt=""
        />
        <div className="login__text">
          <h1>Sign in to Whatsapp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
