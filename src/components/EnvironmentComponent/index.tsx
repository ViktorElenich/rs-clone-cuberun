import { useTexture } from "@react-three/drei";
import { BackSide, MirroredRepeatWrapping } from "three";
import skyStars from "../../assets/stars.jpg";

const EnvironmentComponent = () => {
  const texture = useTexture([skyStars]);
  texture[0].wrapS = MirroredRepeatWrapping;
  texture[0].wrapT = MirroredRepeatWrapping;
  texture[0].repeat.set(4, 4);
  texture[0].anisotropy = 16;
  return (
    <mesh scale={100}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial side={BackSide} color={'#16265c'} map={texture[0]} />
    </mesh>
  );
};
export default EnvironmentComponent;
