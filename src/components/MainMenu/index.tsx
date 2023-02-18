import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSound } from 'use-sound';
import BaseButton from '../BaseButton';
import './style.css';
import logo from '../../assets/logo-tron.png';
import { useStore } from '../../state';

const MainMenu = () => {
  const startGame = useStore((state) => state.startGame);
  const sound = useStore((state) => state.sound);
  const setSound = useStore((state) => state.setSound);
  const navigate = useNavigate();
  const [audio, { stop }] = useSound('/sound/drum1.mp3', { volume: 0.5 });

  const playAdio = () => {
    setSound(!sound);
  };

  useEffect(() => {
    sound ? audio() : stop();
  }, [sound]);  

  return (
    <div className='main-wrapper'>
      <img src={logo} alt='Tron-game logo' className='tron-logo' />
      <div className='main-menu'>
        <BaseButton
          btnText='Log in'
          onClickCallback={() => navigate('/auth')}
        />
        <BaseButton
          btnText='Sign up'
          onClickCallback={() => navigate('/signup')}
        />
        <BaseButton
          btnText='Anonymous play'
          onClickCallback={() => {
            navigate('/game');
            startGame();
            stop();
          }}
        />
        <p className='infotip simpleText'>
          You can play without sign-in, but your score will not be saved
        </p>
        <p className='infotip simpleText'>
          PLay music
          <BaseButton
            btnText={sound ? 'Off' : 'On'}
            onClickCallback={playAdio}
          />
        </p>
      </div>
    </div>
  );
};

export default MainMenu;
