import { Html } from '@react-three/drei';
import { useStore } from '../../state';
import { getScore } from '../../utils';
import BaseButton from '../BaseButton';
import './style.css';

const FinishGame = () => {
  const bike = useStore((state) => state.bike);
  const startGame = useStore((state) => state.startGame);
  const loseGame = useStore((state) => state.loseGame);
  const sendScore = useStore((state) => state.sendScoreToServer);

  if (!loseGame) {
    return <></>;
  }

  function goToGameMenu() {
    sendScore(+getScore());
    //navigate to Game Menu
  }

  const tryAgainHanler = () => {
    sendScore(+getScore());
    if (bike.current) {
      bike.current!.position.x = 0;
      bike.current!.position.z = -10;
      startGame();
    }
  };

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
        <BaseButton onClickCallback={tryAgainHanler} btnText='Try again!' />
        <BaseButton onClickCallback={goToGameMenu} btnText='To main menu' />
      </div>
    </Html>
  );
};
export default FinishGame;
