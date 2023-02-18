import { Center, Text3D } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import { useStore } from '../../state';
import './Text.css';

const Text = () => {
  const level = useStore((state) => state.level);
  const gameStart = useStore((state) => state.gameStart);
  const loseGame = useStore((state) => state.loseGame);
  const speedUp = useStore((state) => state.speedUp);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (gameStart && !loseGame) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [gameStart, loseGame]);

  return show ? (
    <div className='text__container'>
      {level > 0 && speedUp && (
        <div className='text'>
          <h3 className='text__levelup'>LEVEL UP</h3>
        </div>
      )}
    </div>
  ) : null;
};

export default Text;
