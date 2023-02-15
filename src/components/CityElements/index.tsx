import { Suspense } from 'react';
import ArchGenerate from '../Arch/ArchGenerate';
import City from '../City';
import CubeGenerationComponent from '../CubeGenerationComponent';
import EnvironmentComponent from '../EnvironmentComponent';
import Ground from '../Ground';

import LoadingGround from '../Loading/LoadingGround';
import Walls from '../Walls';

const CityElements = () => {
  return (
    <>
      <Suspense fallback={<LoadingGround />}>
        <Ground />
        <ArchGenerate />
        <CubeGenerationComponent />
        <EnvironmentComponent />
        <Walls />
        <City />
      </Suspense>
    </>
  );
};

export default CityElements;
