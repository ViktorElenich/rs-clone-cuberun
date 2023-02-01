import { FC } from 'react';
import { btnPropsType } from '../../interface';
import './style.css';

const BaseButton: FC<btnPropsType> = (props: btnPropsType) => {
  const { btnText, onClickCallback } = props;
  return (
    <button className='btn' onClick={onClickCallback}>
      {btnText}
    </button>
  );
};
export default BaseButton;
