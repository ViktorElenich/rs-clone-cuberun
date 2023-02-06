import { useMemo } from "react";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
import { Controls } from "./enums";
import Game from "./components/Game";

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
      <Game />
    </KeyboardControls>
  );
}

export default App;
