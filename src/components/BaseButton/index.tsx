import { FC } from 'react';
import './style.css';

type btnPropsType = {
  btnText: string;
  onClickCallback: () => void;
};
const BaseButton: FC<btnPropsType> = (props: btnPropsType) => {
  const { btnText, onClickCallback } = props;
  return (
    <button className='btn' onClick={onClickCallback}>
      {btnText}
    </button>
  );
};
export default BaseButton;
