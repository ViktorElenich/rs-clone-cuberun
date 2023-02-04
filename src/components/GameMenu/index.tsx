import BaseButton from '../BaseButton';
import './style.css';
import logo from '../../assets/logo-tron.png';
import { FC, useState } from 'react';
const GameMenu: FC<{ name: string | null }> = ({ name }) => {
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  return (
    <div className='game-menu__wrapper'>
      <img src={logo} alt='Tron-game logo' className='tron-logo' />
      {name && (
        <p className='simpleText game-menu__welcome'>{`Hello, ${name}!`} </p>
      )}
      {instructionsOpen ? (
        <div className='instructions__wrapper'>
          <p className='simpleText instructions__simpleText'>
            You start at 1 level
          </p>
          <p className='simpleText instructions__simpleText'>
            Every next level your speed is higher
          </p>
          <p className='simpleText instructions__simpleText'>
            You should evade blocks
          </p>
          <p className='simpleText instructions__simpleText'>
            You gain score every second without a collision
          </p>

          <p className='simpleText instructions__simpleText'>
            {`left  ⇐ `}
            <span className='instructions__accent'>A</span> /
            <span className='instructions__accent'>D</span>
            {` ⇒  right`}
          </p>
          <BaseButton
            btnText='Close'
            onClickCallback={() => setInstructionsOpen(false)}
          />
        </div>
      ) : (
        <div className='main-menu'>
          <BaseButton
            btnText='Play'
            onClickCallback={() => console.log('start game')}
          />
          <BaseButton
            btnText='Instructions'
            onClickCallback={() => setInstructionsOpen(true)}
          />
          <BaseButton
            btnText='Score'
            onClickCallback={() => console.log('got to score page')}
          />

          <BaseButton
            btnText='Quit'
            onClickCallback={() => console.log('got to the main manu')}
          />
        </div>
      )}
    </div>
  );
};

export default GameMenu;
