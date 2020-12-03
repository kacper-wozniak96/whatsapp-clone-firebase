import { Button } from '@material-ui/core';
import React from 'react';
import { actionTypes } from '../../contexts/contextUser/reducer';
import { useStateValue } from '../../contexts/contextUser/UserStateProvider';
import { auth, provider } from '../../firebase';
import './Login.scss';

export default function Login() {
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        // console.log(result)
        dispatch({
          type: actionTypes.SET_USER,
          payload: result.user,
        })
      )
      // eslint-disable-next-line no-alert
      .catch((error) => alert(error.message));
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
