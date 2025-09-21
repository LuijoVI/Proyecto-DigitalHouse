import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faInstagram,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import style from './Social.module.css';

const Social = ({ activeWidth }) => {
  return (
    <div
      className={`${style.social} ${activeWidth < 768 ? style.socialMenu : ''}`}
    >
      <a href="https://www.linkedin.com/in/luis-villalobos-736a7b20a/" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedinIn} />
      </a>
      <a href="https://www.instagram.com/luijo.vi/" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a href="https://github.com/LuiJVN" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </div>
  );
};

export default Social;
