import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import AppScreen from '../AppScreen';
import { act } from 'react-dom/test-utils';
import { MOCK_DATA_1, MOCK_DATA_2 } from './AppScreen.dataMock';

let wrapped;
/**
 * Create a moxios instance to mock the services call to test
 */
beforeEach(() => {
  moxios.install();
  moxios.stubRequest(
    'gifs/search?limit=21&offset=0&q=ryan&api_key=WNVOvRPA4483oBfSy1PJ6AI7mhyQibCu',
    {
      status: 200,
      response: MOCK_DATA_1
    }
  );
  moxios.stubRequest(
    'gifs/search?limit=21&offset=21&q=ryan&api_key=WNVOvRPA4483oBfSy1PJ6AI7mhyQibCu',
    {
      status: 200,
      response: MOCK_DATA_2
    }
  );
});
/**
 * Uninstall the moxios services
 */
afterEach(() => {
  moxios.uninstall();
});

describe('can render correctly', () => {
  beforeEach(async () => {
    await act(async () => {
      wrapped = mount(<AppScreen />);
    });
  });

  afterEach(async () => {
    await act(async () => {
      wrapped.unmount();
    });
  });

  it('render correctly', () => {
    expect(wrapped.find('div.newsletter').length).toEqual(1);
  });

  it('add a parameter to look information to the services', async done => {
    await act(async () => {
      wrapped
        .find('input.form-control')
        .simulate('change', { target: { value: 'ryan' } });
      wrapped.update();
    });

    await act(async () => {
      wrapped.find('button.btn').simulate('click');
    });

    moxios.wait(() => {
      act(() => {
        wrapped.update();
      });

      // We validate that the services returns all the information
      expect(wrapped.find('div.item').length).toEqual(21);

      act(() => {
        done();
      });
    });
  });

  it('open the lightbox', async done => {
    await act(async () => {
      wrapped
        .find('input.form-control')
        .simulate('change', { target: { value: 'ryan' } });
      wrapped.update();
    });

    await act(async () => {
      wrapped.find('button.btn').simulate('click');
    });

    moxios.wait(() => {
      act(() => {
        wrapped.update();
      });

      // Get the first element and  open the light box
      const image = wrapped.find('div.item').slice(0, 1);
      image.find('span.fa.fa-search').simulate('click');
      wrapped.update();

      // Validate that the light box is open correctly
      expect(wrapped.find('div.lightbox.open').length).toEqual(1);
      expect(wrapped.find('span.lightbox-counter').text()).toEqual('1 of 21');
      act(() => {
        done();
      });
    });
  });

  it('navigate on the lightbox', async done => {
    await act(async () => {
      wrapped
        .find('input.form-control')
        .simulate('change', { target: { value: 'ryan' } });
      wrapped.update();
    });

    await act(async () => {
      wrapped.find('button.btn').simulate('click');
    });

    moxios.wait(() => {
      act(() => {
        wrapped.update();
      });

      // Get the first element and  open the light box
      const image = wrapped.find('div.item').slice(0, 1);
      image.find('span.fa.fa-search').simulate('click');
      wrapped.update();

      // Validate that the light box is open correctly
      expect(wrapped.find('div.lightbox.open').length).toEqual(1);
      expect(wrapped.find('span.lightbox-counter').text()).toEqual('1 of 21');

      // Navigate to the next element
      wrapped.find('div.next').simulate('click');
      wrapped.update();

      // Validate if the footer move correctly
      expect(wrapped.find('span.lightbox-counter').text()).toEqual('2 of 21');

      // Navigate to the prev element
      wrapped.find('div.prev').simulate('click');
      wrapped.update();

      // Validate if the footer move correctly
      expect(wrapped.find('span.lightbox-counter').text()).toEqual('1 of 21');

      act(() => {
        done();
      });
    });
  });

  it('close the lightbox', async done => {
    await act(async () => {
      wrapped
        .find('input.form-control')
        .simulate('change', { target: { value: 'ryan' } });
      wrapped.update();
    });

    await act(async () => {
      wrapped.find('button.btn').simulate('click');
    });

    moxios.wait(() => {
      act(() => {
        wrapped.update();
      });

      // Get the first element and  open the light box
      const image = wrapped.find('div.item').slice(0, 1);
      image.find('span.fa.fa-search').simulate('click');
      wrapped.update();

      // Validate that the light box is open correctly
      expect(wrapped.find('div.lightbox.open').length).toEqual(1);
      expect(wrapped.find('span.lightbox-counter').text()).toEqual('1 of 21');

      //Find and click the close span on the light box
      wrapped.find('div.lightbox-close').simulate('click');
      wrapped.update();

      // Validate that the lightbox is closed
      expect(wrapped.find('div.lightbox.open').length).toEqual(0);

      act(() => {
        done();
      });
    });
  });
});
