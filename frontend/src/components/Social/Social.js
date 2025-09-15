import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faTwitter,
  faInstagram,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import style from './Social.module.css';

const Social = ({ activeWidth }) => {
  return (
    <div
      className={`${style.social} ${activeWidth < 768 ? style.socialMenu : ''}`}
    >
      <a href="#a">
        <FontAwesomeIcon icon={faLinkedinIn} />
      </a>
      <a href="#a">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a href="#a">
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a href="#a">
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </div>
  );
};

export default Social;
