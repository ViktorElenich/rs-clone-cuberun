import { useMemo } from 'react';
import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei';
import { Route, Routes } from 'react-router-dom';
import { Controls, RoutesEnum } from './enums';
import Game from './components/Game';
import MainMenu from './components/MainMenu';
import AuthForm from './components/AuthForm';
import Signup from './components/Signup';
import ScoreTable from './components/ScoreTable';
import GameMenu from './components/GameMenu';
import { useStore } from './state';

function App() {
  const username = useStore((state) => state.name);
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
        <Route
          path={RoutesEnum.GameMenu}
          element={<GameMenu name={username} />}
        />
        <Route path={RoutesEnum.Game} element={<Game />} />
        <Route path={RoutesEnum.Auth} element={<AuthForm />} />
        <Route path={RoutesEnum.Signup} element={<Signup />} />
        <Route path={RoutesEnum.Score} element={<ScoreTable />} />
      </Routes>
    </KeyboardControls>
  );
}

export default App;
