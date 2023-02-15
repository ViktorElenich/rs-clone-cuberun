import { Html } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../state';
import { getScore } from '../../utils';
import BaseButton from '../BaseButton';
import './style.css';

const FinishGame = () => {
  const loseGame = useStore((state) => state.loseGame);
  const navigate = useNavigate();

  if (!loseGame) {
    return <></>;
  }

  return (
    <Html
      as='div'
      wrapperClass='window-loses-wrapper'
      className='window-loses'
      zIndexRange={[0, 0]}
      transform={false}
      translate={'no'}
      sprite
    >
      <h1 className='window-loses__header'>No wonder you lost.</h1>
      <h2>You score: {getScore()}</h2>
      <div className='window-loses__wrapper-btn'>
        <BaseButton
          onClickCallback={() => navigate('/')}
          btnText='To main menu'
        />
      </div>
    </Html>
  );
};
export default FinishGame;
