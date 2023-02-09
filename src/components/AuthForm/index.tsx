import './style.css';
import { ChangeEvent, useEffect, useState } from 'react';
import BaseButton from '../BaseButton';
import BaseInput from '../BaseInput';

import logo from '../../assets/logo-tron.png';
import { authorizeUser, checkExistentUser } from '../../utils/checkDataBase';
import { User } from '../../interface';
import { useStore } from '../../state';
import { log } from 'console';

const AuthForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [userExists, setUserExists] = useState<User | null>(null);
  const [emptyFields, setEmptyFields] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const sub = useStore.subscribe(console.log);

  const changeLoginHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLogin(value);
  };

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };
  const authHandler = async () => {
    if (login.trim() === '' || password.trim() === '') {
      setEmptyFields(true);
      return;
    }
    setInProgress(true);
    const checkUser: User | null = await checkExistentUser(login);

    if (!checkUser) {
      setNoUser(true);
    } else {
      if (checkUser.password === password) {
        await authorizeUser(login, password);
        setWrongPassword(false);
        setUserExists(checkUser);
        console.log(userExists);
      } else {
        setWrongPassword(true);
      }
      useStore.setState({
        name: userExists?.name,
        score: userExists?.score,
      });
    }
    setInProgress(false);
  };

  useEffect(() => {
    if (login.trim() !== '' && password.trim() !== '') {
      setEmptyFields(false);
      setNoUser(false);
    }
  }, [login, password]);

  useEffect(() => {
    console.log('inProgress', inProgress);
  }, [inProgress]);

  return (
    <div className='signin-menu'>
      <img src={logo} alt='Tron-game logo' className='tron-logo' />

      {userExists ? (
        <p className='titleText welcome-text'>{`Welcome back, ${userExists.name}! `}</p>
      ) : (
        <div className='signin-menu_wrapper'>
          <h1 className='titleText signin-menu_text'>Sign in</h1>
          <div className='input-wrapper'>
            <BaseInput
              type='text'
              placeholder='Login...'
              value={login}
              onChange={changeLoginHandler}
            />
            <BaseInput
              type='password'
              placeholder='Password...'
              value={password}
              onChange={changePasswordHandler}
            />
          </div>
          {emptyFields && (
            <p className='simpleText'>Please enter login and password</p>
          )}
          {wrongPassword && <p className='simpleText'>Wrong password!</p>}
          {inProgress ? (
            <BaseButton btnText='Processing...' onClickCallback={() => {}} />
          ) : (
            <BaseButton btnText='Sign in' onClickCallback={authHandler} />
          )}

          {noUser && (
            <div className='noUser-wrapper'>
              <p className='simpleText'>No user found</p>
              <p className='simpleText less-important-text'>
                Please enter correct login or password
              </p>
              <p className='simpleText less-important-text'>or</p>
              <BaseButton
                btnText='Sign up'
                onClickCallback={() => {
                  console.log('sign up');
                  // go to sign-up form
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthForm;
