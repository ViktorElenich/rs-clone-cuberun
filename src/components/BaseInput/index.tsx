import { FC } from 'react';
import { inputProps } from '../../interface';
import './style.css';

const BaseInput: FC<inputProps> = (props: inputProps) => {
  return (
    <input {...props} className='input' />
  );
};
export default BaseInput;
