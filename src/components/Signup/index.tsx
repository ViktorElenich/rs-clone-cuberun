import { ChangeEvent, useState } from 'react';
import BaseButton from '../BaseButton';
import BaseInput from '../BaseInput';
import './style.css';
import logo from '../../assets/logo-tron.png';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const changeLoginHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLogin(value);
  };

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  return (
    <div className='sign-up-menu'>
      <img src={logo} alt='Tron-game logo' className='tron-logo' />
      <div className='sign-up-wrapper'>
        <h1 className='titleText sign-in_text'>Sign up</h1>
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
        <BaseButton
          btnText='Sign up'
          onClickCallback={() => console.log('sign up')}
        />
      </div>
    </div>
  );
};

export default Login;
