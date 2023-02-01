import BaseButton from '../BaseButton';
import './style.css';
import logo from '../../assets/logo-tron.png';
const MainMenu = () => {
  return (
    <div className='main-wrapper'>
      <img src={logo} alt='Tron-game logo' className='tron-logo' />
      <div className='main-menu'>
        <BaseButton
          btnText='Log in'
          onClickCallback={() => console.log('navigate to log in form')}
        />
        <BaseButton
          btnText='Sign up'
          onClickCallback={() => console.log('navigate to sign up form')}
        />
        <BaseButton
          btnText='Anonymous play'
          onClickCallback={() => console.log('navigate to game menu page')}
        />
        <p className='infotip simpleText'>
          You can play without sign-in, but your score will not be saved
        </p>
      </div>
    </div>
  );
};

export default MainMenu;
