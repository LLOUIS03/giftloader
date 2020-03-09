import React from 'react';
import { mount } from 'enzyme';
import Header from './index';
import Input from '../../components/Input';
import Button from '../../components/Button';

let wrapped;

beforeEach(() => {
  wrapped = mount(<Header />);
});

afterEach(() => {
  wrapped.unmount();
});

it('render correctly', () => {
  expect(wrapped.find(Input).length).toEqual(1);
  expect(wrapped.find(Button).length).toEqual(1);
});

it('contains a header name FIND YOUR FAVORITE GIFT', () => {
  expect(wrapped.find('h2').text()).toEqual('FIND YOUR FAVORITE GIFT');
});

it('contains a input with a form-control className', () => {
  expect(wrapped.find(Input).html()).toContain('form-control');
});

it('contains a input with a place holder Enter the name', () => {
  expect(wrapped.find(Input).html()).toContain('Enter the name');
});

it('contains a button with a find text', () => {
  expect(wrapped.find('button').html()).toContain('button');
});

it('contains a button named find', () => {
  expect(wrapped.find('button').text()).toEqual('Find');
});

it('contains a button the class name', () => {
  expect(wrapped.find('button').html()).toContain('btn');
});
