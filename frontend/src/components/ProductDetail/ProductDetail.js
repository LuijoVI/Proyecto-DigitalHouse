import React, { useContext, useState } from 'react';
import style from './ProductDetail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import ProductPolicies from '../ProductPolicies/ProductPolicies';
import ProductFeatures from '../ProductFeatures/ProductFeatures';
import ProductDescription from '../ProductDescription/ProductDescription';
import ProductGallery from '../ProductGallery/ProductGallery';
import ProductHeader from '../ProductHeader/ProductHeader';
import useWindowSize from '../../hooks/useWindowSize';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../context/UserContext';

const ProductDetail = ({
  id,
  name,
  description,
  city,
  image: images,
  attributes,
  policiesSite,
  policiesSecurityAndHealth,
  policiesCancellation,
}) => {
  const [stateModal, setStateModal] = useState(false);
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const { userJwt, loginUser } = useContext(userContext); //provisorio, realizar bien la validacion y redireccion (ver button abajo)

  const toggleModal = () => {
    setStateModal(!stateModal);
  };

  const desktop = width < 1333 ? false : true;

  const redirectToLogin = () => {
    loginUser({ jwt: false, redirect: true });
    navigate('/login');
  };

  return (
    <div className={style.container}>
      <ProductHeader />

      <section className={style.locationScoreContainer}>
        <div className={style.locationContainer}>
          <FontAwesomeIcon icon={faLocationDot} />
          <div className={style.location}>
            <p>Buenos Aires, Ciudad Autonoma de Buenos Aires, Argentina.</p>
            <p className={style.locationDistance}>{city.name}</p>
          </div>
        </div>
        <div className={style.productScore}>
          <div>
            <p>Muy bueno</p>
            <FontAwesomeIcon className={style.productStars} icon={faStar} />
            <FontAwesomeIcon className={style.productStars} icon={faStar} />
            <FontAwesomeIcon className={style.productStars} icon={faStar} />
            <FontAwesomeIcon className={style.productStars} icon={faStar} />
            <FontAwesomeIcon className={style.productStars} icon={faStar} />
          </div>
          <span className={style.scoreNumber}>8</span>
        </div>
      </section>

      <section className={style.galleryContainer}>
        <ProductGallery {...{ desktop, images, toggleModal }} />
      </section>

      <ProductDescription {...{ name, description }} />
      <ProductFeatures {...{ attributes }} />
      <ProductPolicies
        policies={{
          policiesSite,
          policiesSecurityAndHealth,
          policiesCancellation,
        }}
      />
      {desktop && (
        <Modal
          state={stateModal}
          changeState={setStateModal}
          showHeader={false}
          showOverlay={true}
          padding={false}
        >
          <ImageGallery images={images} />
        </Modal>
      )}
    </div>
  );
};

export default ProductDetail;
