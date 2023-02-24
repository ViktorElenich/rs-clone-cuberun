import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseButton from '../BaseButton';
import logo from '../../assets/logo-tron.png';
import './style.css';
import { RoutesEnum } from '../../enums';
import { useStore } from '../../state';

const GameMenu: FC<{ name: string | null }> = ({ name }) => {
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const navigate = useNavigate();

  const startGame = useStore((state) => state.startGame);
  const quitGame = useStore((state) => state.quitGame);

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
        <div className='game-menu__main-menu'>
          <BaseButton
            btnText='Play'
            onClickCallback={() => {
              startGame();
              navigate(`${RoutesEnum.Game}`);
            }}
          />
          <BaseButton
            btnText='Instructions'
            onClickCallback={() => setInstructionsOpen(true)}
          />
          <BaseButton
            btnText='Score'
            onClickCallback={() => navigate(`${RoutesEnum.Score}`)}
          />

          <BaseButton
            btnText='Quit'
            onClickCallback={() => {
              quitGame();
              navigate(`${RoutesEnum.Home}`);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default GameMenu;
