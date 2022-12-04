import React from 'react';
import {useState} from 'react';

export const CheckboxWithLabel = ({labelOn, labelOff}) => {
  const [isChecked, setIsChecked] = useState(false);

  const onChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      {isChecked ? labelOn : labelOff}
    </label>
  );
};
CheckboxWithLabel.propTypes = {
  labelOn: PropTypes.string.isRequired,
  labelOff: PropTypes.string.isRequired,
};
