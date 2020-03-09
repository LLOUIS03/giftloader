import React, { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import './Header.css';

/**
 * A compound component that is show on
 * the top of the page, it can be used
 * to look information on the service
 */

const Header = props => {
  const { searchValue } = props;
  const [value, setValue] = useState('');

  const onChangeInput = event => {
    const { value } = event.target;
    setValue(value);
  };

  /**
   *  We look the value on the service, when the onClick
   *  event is executed on the find button
   */
  const onSubmit = async event => {
    event.preventDefault();
    searchValue && (await searchValue(value));
    setValue('');
  };

  /**
   * We use the onKeyUp event to manage when the user press enter
   * search on the service the current value
   */
  const onKeyUp = async event => {
    event.preventDefault();
    const { keyCode } = event;
    if (keyCode === 13 && !!value) {
      searchValue && (await searchValue(value));
      setValue('');
    }
  };
  return (
    <div className="newsletter">
      <div className="container">
        <div className="row-flex">
          <div className="content">
            <h2>FIND YOUR FAVORITE GIFT</h2>
            <div className="input-group">
              <Input
                type="text"
                className="form-control"
                placeholder="Enter the name"
                onChange={onChangeInput}
                onKeyUp={onKeyUp}
                value={value}
              />
              <span className="input-group-btn">
                <Button className="btn" onClick={onSubmit} text="Find" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Header);
