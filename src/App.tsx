import { useMemo } from 'react';
import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei';
import { Route, Routes } from 'react-router-dom';
import { Controls, RoutesEnum } from './enums';
import Game from './components/Game';
import MainMenu from './components/MainMenu';

function App() {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.left, keys: ['ArrowLeft', 'a', 'A'] },
      { name: Controls.right, keys: ['ArrowRight', 'd', 'D'] },
    ],
    [],
  );

  return (
    <KeyboardControls map={map}>
      <Routes>
        <Route path={RoutesEnum.Home} element={<MainMenu />} />
        <Route path={RoutesEnum.Game} element={<Game />} />
      </Routes>
    </KeyboardControls>
  );
}

export default App;
