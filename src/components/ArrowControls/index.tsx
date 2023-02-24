import { useStore } from '../../state';
import './style.css';

const ArrowControls = () => {
  const loseGame = useStore((state) => state.loseGame);

  const setDirection = useStore((state) => state.setDirection);

  function goLeft() {
    setDirection('left');
  }
  function goRight() {
    setDirection('right');
  }
  function goStraight() {
    setDirection(null);
  }

  if (loseGame) {
    return <></>;
  }

  return (
    <div className='arrow-control__wrapper'>
      <button
        className={`arrow-control arrow__left titleText`}
        onPointerDown={() => goLeft()}
        onPointerUp={() => goStraight()}
      >
        {'<'}
      </button>
      <button
        className={`arrow-control arrow__left titleText`}
        onPointerDown={() => goRight()}
        onPointerUp={() => goStraight()}
      >
        {'>'}
      </button>
    </div>
  );
};

export default ArrowControls;
