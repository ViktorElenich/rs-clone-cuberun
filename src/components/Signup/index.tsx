import { ChangeEvent, useEffect, useState } from 'react';
import BaseButton from '../BaseButton';
import BaseInput from '../BaseInput';
import './style.css';
import logo from '../../assets/logo-tron.png';
import { addNewUser, checkExistentUser } from '../../utils/checkDataBase';
import { useStore } from '../../state';

const SignUpForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [emptyLogin, setEmptyLogin] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const changeLoginHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLogin(value);
    setEmptyLogin(false);
    setInvalidLogin(false);
  };

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setInvalidPassword(false);
  };
  async function createAccount() {
    if (login.trim() === '') {
      setEmptyLogin(true);
      return;
    }
    if (password.trim() === '') {
      setInvalidPassword(true);
      return;
    }
    setInProgress(true);
    const user = await checkExistentUser(login);
    if (user) {
      console.log(user);
      setInvalidLogin(true);
      setInProgress(false);
      return;
    }
    setInProgress(true);
    const acc = await addNewUser(login, password, 0);
    if (acc) {
      setUserCreated(true);
      // redirect to game menu
    }
    setInProgress(false);
  }
  useEffect(() => {
    if (userCreated)
      useStore.setState({
        name: login,
      });
  }, [userCreated]);

  return (
    <div className='sign-up-menu'>
      <img src={logo} alt='Tron-game logo' className='tron-logo' />
      {userCreated ? (
        <p className='titleText welcome-text'>{`Welcome back, ${login}! `}</p>
      ) : (
        <div className='sign-up-wrapper'>
          <h1 className='titleText sign-in_text'>Sign up</h1>
          <div className='input-wrapper'>
            {emptyLogin && (
              <p className='simpleText'>Not empty name is required</p>
            )}
            {invalidLogin && (
              <p className='simpleText'>Login is already in use</p>
            )}
            <BaseInput
              type='text'
              placeholder='Login...'
              value={login}
              onChange={changeLoginHandler}
            />
            {invalidPassword && (
              <p className='simpleText'>Not empty password is required</p>
            )}
            <BaseInput
              type='password'
              placeholder='Password...'
              value={password}
              onChange={changePasswordHandler}
            />
          </div>
          {inProgress ? (
            <BaseButton btnText='Processing...' onClickCallback={() => {}} />
          ) : (
            <BaseButton btnText='Sign up' onClickCallback={createAccount} />
          )}
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
