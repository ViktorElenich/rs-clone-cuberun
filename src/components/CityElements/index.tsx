import ArchGenerate from '../Arch/ArchGenerate';
import City from '../City';
import CubeGenerationComponent from '../CubeGenerationComponent';
import CustomEffects from '../Effects';
import EnvironmentComponent from '../EnvironmentComponent';
import Ground from '../Ground';
import Sound from '../Sound';
import Walls from '../Walls';

const CityElements = () => {
  return (
    <>
      <Ground />
      <ArchGenerate />
      <CubeGenerationComponent />
      <EnvironmentComponent />
      <CustomEffects />
      <Walls />
      <City />
      <Sound />
    </>
  );
};

export default CityElements;
