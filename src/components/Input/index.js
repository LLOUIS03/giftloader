import React, { useState } from 'react';
/**
 * A input component this manage the functionallity of introduce
 * text to search, look information
 */

const Input = ({ onChange, className, type, placeholder, onKeyUp }) => {
  const [input, setInput] = useState('');
  const handleChange = event => {
    onChange && onChange(event);
    const {
      target: { value }
    } = event;
    setInput(value);
  };
  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      onChange={handleChange}
      onKeyUp={onKeyUp}
      value={input}
    />
  );
};

export default React.memo(Input);
