import './style.css';
import { ChangeEvent, useEffect, useState } from 'react';
import BaseButton from '../BaseButton';
import BaseInput from '../BaseInput';

import logo from '../../assets/logo-tron.png';
import { checkExistentUser } from '../../utils/checkDataBase';
import { User } from '../../interface';

const SignInComponent = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [userExists, setUserExists] = useState<User | null>(null);
  const [emptyFields, setEmptyFields] = useState(false);
  const [noUser, setNoUser] = useState(false);

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
      return false;
    }
    const checkUser: User | null = await checkExistentUser(login, password);
    setUserExists(checkUser);

    if (!checkUser) {
      setNoUser(true);
    } else setNoUser(false);

    if (checkUser) {
      // redirect to Game menu timeout 3...2...1
    }
    return true;
  };

  useEffect(() => {
    if (login.trim() !== '' && password.trim() !== '') {
      setEmptyFields(false);
      setNoUser(false);
    }
  }, [login, password]);

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

          <BaseButton btnText='Sign in' onClickCallback={authHandler} />
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

export default SignInComponent;
