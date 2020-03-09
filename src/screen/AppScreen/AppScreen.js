import React, { useState, useContext, useEffect } from 'react';
import GiphyService from './GiphyService';
import Header from '../../components/Header';
import ImageContext from '../../context/ImageContext';
import ImageList from '../../components/ImageList';
import LightBox from '../../components/LightBox';
import Button from '../../components/Button';
import {
  canTopButtonShow,
  scrollWindowsToTop,
  onCloseLightBox
} from './AppScreenUtils';
import { ImageProvider } from '../../context/ImageContext';
import { createImageStruct } from '../../utils';
import './AppScreen.css';

/**
 * Main screen to combine all the components to
 * display the header to look information, the
 * images to display, and the light box
 */

const AppScreen = () => {
  // Define that state variable and service variable
  const service = new GiphyService();
  const [state, setState] = useState({
    value: undefined,
    searchedValue: undefined,
    offset: 1,
    showTopButton: false
  });
  const [isVisibleLightBox, setVisibleLightBox] = useState(false);
  const [selectedImgIndex, setSelectedImgIndex] = useState(undefined);
  const { addImages, cleanAndSetImages } = useContext(ImageContext);

  /**
   * this function is used to set visible the light box and set the selected images
   * we use a closure in this case to store the index of the images, to call directly
   * in the array to get the acces O(1)
   */
  const enableTheLightBox = selectedImageId => {
    return () => {
      setSelectedImgIndex(selectedImageId);
      setVisibleLightBox(true);
    };
  };

  /**
   * this function validate the previos value of the
   * showTopButton state, to prevent extra renders
   * when we are scrolling down on the images.
   */
  const setShowTopButtonState = value => {
    const { showTopButton } = state;
    if (showTopButton !== !!value) {
      setState({ ...state, showTopButton: value });
    }
  };

  /**
   * In this function we look up the data from the Giphy api
   * provided a value, this function should call the first time
   * when you look for a value
   */
  const searchImagesByValue = async value => {
    try {
      const { images, count } = await searchValue(value);

      cleanAndSetImages(images);
      setState({ value: undefined, searchedValue: value, offset: count });
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * In this function we look up the data from the Giphy api
   * provided for a stored value but in diferente page, this
   * function is used when you are scrolling on the page
   */
  const searchImagesByPage = async () => {
    try {
      const { offset, searchedValue } = state;
      const { images, count } = await searchValue(searchedValue, offset);

      addImages(images);
      setState({ ...state, offset: offset + count });
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * In this function you manage the scroll from the page,
   * it calculate when you are on the bottom and call the api with
   * next parameter
   */

  const onScroll = async () => {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      await searchImagesByPage();
    }

    if (document.documentElement.scrollTop > 20) {
      setShowTopButtonState(true);
    } else {
      setShowTopButtonState(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return function clean() {
      window.removeEventListener('scroll', onScroll);
    };
  });

  /**
   *
   * This is a generic function to wrapper the Giphy service call,
   * create a more simple data structure to use in the screen
   *
   * @param value
   * @param page
   */
  const searchValue = async (value, page) => {
    const result = await service.findGift(value, page);

    const {
      data: {
        data,
        pagination: { count }
      }
    } = result;

    const images = data.map(image => {
      return createImageStruct(image);
    });

    return { images, count };
  };

  return (
    <>
      <Header searchValue={searchImagesByValue} />
      <ImageList enableTheLightBox={enableTheLightBox} />
      <LightBox
        isVisible={isVisibleLightBox}
        selectedImgIndex={selectedImgIndex}
        onClose={onCloseLightBox(setVisibleLightBox, setSelectedImgIndex)}
      />
      <Button
        className={canTopButtonShow(state.showTopButton)}
        text="Top"
        onClick={scrollWindowsToTop(setShowTopButtonState)}
      />
    </>
  );
};

export default () => {
  return (
    <ImageProvider>
      <AppScreen />
    </ImageProvider>
  );
};
