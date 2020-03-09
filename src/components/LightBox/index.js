import React, { useContext, useState } from 'react';
import ImageContext from '../../context/ImageContext';
import './LightBox.css';
/**
 * Is a component that show the image in a model view,
 * you can navigate throw the images
 *
 */

const LightBox = props => {
  const { images } = useContext(ImageContext);
  const { isVisible, selectedImgIndex, onClose } = props;
  const [currentPosition, setNextPosition] = useState(selectedImgIndex);

  if ((images && images.length === 0) || selectedImgIndex === undefined) {
    return null;
  }

  const prev = () => {
    const position = getTheCurrentPosition(currentPosition, selectedImgIndex);
    if (position === 0) {
      setNextPosition(images.length - 1);
    } else {
      setNextPosition(position - 1);
    }
  };

  const next = () => {
    let position = getTheCurrentPosition(currentPosition, selectedImgIndex);
    if (position === images.length - 1) {
      setNextPosition(0);
    } else {
      setNextPosition(position + 1);
    }
  };

  const cleanBeforeClose = () => {
    setNextPosition(undefined);
    onClose && onClose();
  };

  const {
    position,
    image: {
      title,
      original: { webp }
    },
    count
  } = findImageAndPosition(
    getTheCurrentPosition(currentPosition, selectedImgIndex),
    images
  );

  const styleCss = isVisible ? 'lightbox open' : 'lightbox';
  return (
    <div className={styleCss}>
      <div className="lightbox-content">
        <div className="lightbox-close" onClick={cleanBeforeClose}>
          &times;
        </div>
        <img src={webp} className="lightbox-img" alt="img" onClick={next} />
        <div className="lightbox-caption">
          <span className="lightbox-text">{title}</span>
          <span className="lightbox-counter">{`${position} of ${count}`}</span>
        </div>
      </div>
      <div className="lightbox-controls">
        <div className="prev" onClick={prev}>
          &#60;
        </div>
        <div className="next" onClick={next}>
          &#62;
        </div>
      </div>
    </div>
  );
};

/**
 *
 * Is a utility to validate if the current position is not defined
 * it use the index that is passed by props
 *
 * @param currentPosition
 * @param selectedImgIndex
 */
const getTheCurrentPosition = (currentPosition, selectedImgIndex) => {
  return currentPosition !== undefined ? currentPosition : selectedImgIndex;
};

/**
 * Is a function that look in the image array to get the image
 * in that index, and return the count of all the images, the i
 * mage itself and the position to display in the light box
 *
 * @param imageIndex
 * @param images
 */

const findImageAndPosition = (imageIndex, images) => {
  return {
    position: imageIndex + 1,
    image: images[imageIndex],
    count: images.length
  };
};

export default React.memo(LightBox);
