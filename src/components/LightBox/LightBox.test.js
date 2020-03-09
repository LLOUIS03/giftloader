import React from 'react';
import { mount } from 'enzyme';
import LightBox from './index';
import { mockImages } from '../_test_/Mock.Data';
import ImageContext from '../../context/ImageContext';

let wrapped;

beforeEach(() => {
  const onCloseLightBox = () => {
    return () => {
      console.log('Close lightBox');
    };
  };

  wrapped = mount(
    <ImageContext.Provider value={mockImages}>
      <LightBox
        isVisible={true}
        selectedImgIndex={1}
        onCloseLightBox={onCloseLightBox()}
      />
    </ImageContext.Provider>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('render correclty', () => {
  expect(wrapped.find('div.lightbox.open').length).toEqual(1);
});

it('move to the previos img', () => {
  wrapped.find('div.prev').simulate('click');
  wrapped.update();

  expect(wrapped.find('span.lightbox-text').text()).toEqual(
    'El Salvador Sandwich GIF by SubwayMX'
  );
  expect(wrapped.find('span.lightbox-counter').text()).toEqual('1 of 3');
});

it('move to the next img', () => {
  wrapped.find('div.next').simulate('click');
  wrapped.update();
  expect(wrapped.find('span.lightbox-text').text()).toEqual(
    'amores perros cine mexicano GIF'
  );
  expect(wrapped.find('span.lightbox-counter').text()).toEqual('3 of 3');
});
