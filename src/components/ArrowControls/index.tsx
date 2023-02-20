import { useStore } from '../../state';
import './style.css';

const ArrowControls = () => {
  const start = useStore((state) => state.gameStart);

  const loseGame = useStore((state) => state.loseGame);

  const setDirection = useStore((state) => state.setDirection);

  function changeDirectionHandler(e: React.PointerEvent<HTMLButtonElement>) {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    if (target.classList.contains('left')) {
      setDirection('left');
    } else if (target.classList.contains('right')) {
      setDirection('right');
    } else setDirection(null);
  }

  /* if (!ismobile) return <></>; */
  if (loseGame) {
    return <></>;
  }

  return (
    <div className='arrow-control__wrapper'>
      <button
        className={`arrow-control arrow__left titleText`}
        onPointerDown={(e) => changeDirectionHandler(e)}
        onPointerUp={(e) => changeDirectionHandler(e)}
      >
        {'<'}
      </button>
      <button
        className={`arrow-control arrow__left titleText`}
        onPointerDown={(e) => changeDirectionHandler(e)}
        onPointerUp={(e) => changeDirectionHandler(e)}
      >
        {'>'}
      </button>
    </div>
  );
};

export default ArrowControls;
