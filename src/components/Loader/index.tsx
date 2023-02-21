import { Html } from '@react-three/drei';
import './style.css';

const Loader = () => (
  <Html
    as='div'
    wrapperClass='loader'
    zIndexRange={[0, 0]}
    transform={false}
    translate={'no'}
    sprite
  >
    <div className='preloader'>
      <span className='titleText loader-text'>Loading...</span>
    </div>
  </Html>
);

export default Loader;
