import { Html } from '@react-three/drei';
import { getScore } from '../../utils';
import BaseButton from '../BaseButton';
import './style.css';

const FinishGame = () => {
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
          onClickCallback={() => console.log('try')}
          btnText='Try again!'
        />
        <BaseButton
          onClickCallback={() => console.log('main menu')}
          btnText='To main menu'
        />
      </div>
    </Html>
  );
};
export default FinishGame;
