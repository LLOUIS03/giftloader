import React, { useContext } from 'react';
import ImageContext from '../../context/ImageContext';
import './ImageList.css';

/**
 * A compound component to show a list of images
 * organized by 3
 */

const ImageList = props => {
  const { enableTheLightBox } = props;
  const { images } = useContext(ImageContext);

  return (
    <div className="portafolio">
      <div className="container">
        <div className="row">
          <div className="portafolio-items">
            {renderImages(images, enableTheLightBox)}
          </div>
        </div>
      </div>
    </div>
  );
};

const renderImages = (images, enableTheLightBox) => {
  if (!(images && images.length > 0)) {
    return null;
  }

  return images.map((image, index) => {
    const {
      id,
      title,
      original: { webp }
    } = image;

    return (
      <div key={id} className="item">
        <img src={webp} alt="portafolio" />
        <div className="overlay">
          <h2>{title}</h2>
          <span className="fa fa-search" onClick={enableTheLightBox(index)} />
        </div>
      </div>
    );
  });
};

export default React.memo(ImageList);
