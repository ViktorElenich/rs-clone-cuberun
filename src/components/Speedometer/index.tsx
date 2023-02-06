import { Html } from "@react-three/drei";
import { useStore } from "../../state";
import { useEffect, useState } from "react";
import { getScore, getSpeed } from "../../utils";
import { addEffect } from "@react-three/fiber";
import "./Speedometer.css";


const Speedometer = () => {
  const start = useStore((state) => state.gameStart);
  const level = useStore((state) => state.level);
  const [speed, setSpeed] = useState('');
  const [score, setScore] = useState('');

  useEffect(() => addEffect(() => {
    setSpeed(getSpeed());
    setScore(getScore());
  }))

  return (
    <Html
      as='div'
      wrapperClass='dashboard'
      zIndexRange={[0, 0]}
      transform={false}
      translate={'no'}
      sprite
      style={{
        width: '20rem',
        transition: 'all 0.1s',
        opacity: start ? 1 : 0,
        transform: `scale(${start ? 0.5 : 1})`
      }}
    >
      <h2 className="dashboard__title">LEVEL</h2>
      <h2 className="dashboard__number">{level + 1}</h2>
      <h2 className="dashboard__title">KM/H</h2>
      <h2 className="dashboard__number">{speed}</h2>
      <h2 className="dashboard__title">SCORE</h2>
      <h2 className="dashboard__number">{score}</h2>
    </Html>
  );
}

export default Speedometer;