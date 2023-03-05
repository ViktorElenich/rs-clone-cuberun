import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseButton from '../BaseButton';
import BaseInput from '../BaseInput';
import logo from '../../assets/logo-tron.png';
import { User } from '../../interface';
import { useStore } from '../../state';
import './style.css';
import { RoutesEnum } from '../../enums';

const AuthForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [userExists, setUserExists] = useState<User | null>(null);
  const [emptyFields, setEmptyFields] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const navigate = useNavigate();

  const store = useStore();

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
    const checkUser: User | null = await store.checkExistentUser(login);

    if (!checkUser) {
      setNoUser(true);
    } else {
      const status = await store.authorizeUser(login, password);
      if (status === 401) {
        setWrongPassword(true);
        setInProgress(false);
        return;
      }

      if (status >= 200 && status < 300) {
        setUserExists(checkUser);
      }
    }
    setInProgress(false);
  };
  function makePassVisible() {
    if (passVisible) {
      setPassVisible(false);
    } else {
      setPassVisible(true);
    }
  }

  useEffect(() => {
    if (login.trim() !== '' && password.trim() !== '') {
      setEmptyFields(false);
      setNoUser(false);
      setWrongPassword(false);
    }
  }, [login, password]);
  useEffect(() => {
    if (userExists) {
      useStore.setState({
        name: userExists?.name,
        score: userExists?.score,
      });
      setTimeout(() => navigate(RoutesEnum.GameMenu), 2000);
    }
  }, [userExists]);

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
              type={passVisible ? 'text' : 'password'}
              placeholder='Password...'
              value={password}
              onChange={changePasswordHandler}
            />
            <div
              role='presentation'
              onClick={makePassVisible}
              className={
                passVisible
                  ? 'visibility-control visibility-control_visible'
                  : 'visibility-control'
              }
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
                  navigate(`${RoutesEnum.Signup}`);
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
