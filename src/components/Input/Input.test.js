import React from 'react';
import { mount } from 'enzyme';
import Input from './index';

let wrapped;

beforeEach(() => {
  wrapped = mount(<Input />);
});

afterEach(() => {
  wrapped.unmount();
});

it('has an input', () => {
  expect(wrapped.find('input').length).toEqual(1);
});

describe('the input change', () => {
  beforeEach(() => {
    wrapped
      .find('input')
      .simulate('change', { target: { value: 'testing case 1' } });
    wrapped.update();
  });

  it('has a input that users can type in', () => {
    expect(wrapped.find('input').prop('value')).toEqual('testing case 1');
  });
});
