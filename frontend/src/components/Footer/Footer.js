import React from 'react';
import Social from '../Social/Social';
import style from './Footer.module.css';

const Footer = () => {
  return (
    <div className={style.footerContainer}>
      <p>©App web de demostracion para Digital House</p>
      <Social />
    </div>
  );
};

export default Footer;
