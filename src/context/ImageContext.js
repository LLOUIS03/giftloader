import React, { useReducer } from 'react';
import { ADD_IMAGES, SET_NEW_IMAGES } from '../const';

const ImageContext = React.createContext();

const ImageReducer = (state, action) => {
  switch (action.type) {
    case ADD_IMAGES:
      return [...state, ...action.payload];
    case SET_NEW_IMAGES:
      return [...action.payload];
    default:
      return state;
  }
};

export const ImageProvider = ({ children }) => {
  const [images, dispatch] = useReducer(ImageReducer, []);

  const addImages = images => {
    dispatch({ type: ADD_IMAGES, payload: images });
  };

  const cleanAndSetImages = images => {
    dispatch({ type: SET_NEW_IMAGES, payload: images });
  };

  return (
    <ImageContext.Provider value={{ addImages, cleanAndSetImages, images }}>
      {children}
    </ImageContext.Provider>
  );
};

export default ImageContext;
