import React from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import style from './ProductGallery.module.css';

const ProductGallery = ({ desktop, images, toggleModal }) => {
  return (
    // <section className={style.galleryContainer}>
    <>
      {desktop ? (
        <div style={{width: '100%', height: '100%'}}>
          <div className="galleryMainImageWrapper" style={{width: '100%', height: '70%'}}>
            <img
              className="galleryMainImage"
              src={images[0]?.url}
              alt="foto principal"
              style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px 10px 0 0'}}
            />
          </div>
          <div className="galleryThumbnails" style={{display: 'flex', width: '100%', height: '30%', gap: '8px', marginTop: '8px'}}>
            {images.slice(1, 5).map((image, idx) => (
              <img
                key={image.id || idx}
                className="galleryThumbnailImage"
                src={image.url}
                alt={`miniatura ${idx+1}`}
                style={{flex: 1, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0 0 8px 8px', cursor: 'pointer'}}
                onClick={toggleModal}
              />
            ))}
            <button
              type="button"
              className={style.viewMoreText}
              onClick={toggleModal}
              style={{position: 'absolute', right: 16, bottom: 16, zIndex: 2}}
            >
              Ver más
            </button>
          </div>
        </div>
      ) : (
        <ImageGallery images={images.slice(0, 5)} />
      )}
      {/* </section> */}
    </>
  );
};

export default ProductGallery;
