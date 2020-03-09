import React from 'react';
import { mount } from 'enzyme';
import Button from '../../components/Button';

let wrapped;

beforeEach(() => {
  wrapped = mount(<Button />);
});

afterEach(() => {
  wrapped.unmount();
});

it('render correctly', () => {
  // Validate that the screen has a button
  expect(wrapped.find('button').length).toEqual(1);
});

describe('set a button name', () => {
  beforeEach(() => {
    wrapped = mount(<Button text="testing name" />);
    wrapped.update();
  });

  // Validate that the buttons contains the name that we put
  it('has a name', () => {
    expect(wrapped.find('button').text()).toEqual('testing name');
  });
});
