import ArchGenerate from '../Arch/ArchGenerate';
import City from '../City';
import CubeGenerationComponent from '../CubeGenerationComponent';
import CustomEffects from '../Effects';
import EnvironmentComponent from '../EnvironmentComponent';
import Ground from '../Ground';
import Walls from '../Walls';

const CityElements = () => {
  return (
    <>
      <Ground />
      <ArchGenerate />
      <CubeGenerationComponent />
      <EnvironmentComponent />
      <Walls />
      <City />
      <CustomEffects />
    </>
  );
};

export default CityElements;
