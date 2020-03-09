import React from 'react';
import { mount } from 'enzyme';
import ImageList from './index';
import { mockImages } from '../_test_/Mock.Data';
import ImageContext from '../../context/ImageContext';

let wrapped;

beforeEach(() => {
  const enableTheLightBox = index => {
    return () => {
      console.log('index', index);
    };
  };
  wrapped = mount(
    <ImageContext.Provider value={mockImages}>
      <ImageList enableTheLightBox={enableTheLightBox} />
    </ImageContext.Provider>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('render correctly', () => {
  expect(wrapped.html()).toContain('portafolio');
});

it('render the three items', () => {
  expect(wrapped.find('div.item').length).toEqual(3);
});

it('render the three overlay divs', () => {
  expect(wrapped.find('div.overlay').length).toEqual(3);
});
