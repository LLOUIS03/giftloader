import React from 'react';
/**
 * A button componetnt that revice a onClick, className and text
 */
const Button = ({ onClick, className, text }) => {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default React.memo(Button);
