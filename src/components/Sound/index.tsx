import { PositionalAudio } from '@react-three/drei';
import { useStore } from '../../state';

const Sound = () => {
  const gameStart = useStore((state) => state.gameStart);
  const sound = useStore((state) => state.sound);
  return gameStart && sound ? (
    <PositionalAudio
      url='/sound/Daft_Punk_-_End_Of_Line.mp3'
      loop
      distance={1}
      autoplay
    />
  ) : null;
};

export default Sound;
