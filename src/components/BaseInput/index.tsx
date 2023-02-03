import { FC } from 'react';
import { inputProps } from '../../interface';
import './style.css';

const BaseInput: FC<inputProps> = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className='input'
    />
  );
};
export default BaseInput;
