import React, { useState } from 'react';
import Categories from '../Categories/Categories';
import style from './Home.module.css';

const Home = () => {
  const [categoriesFilter, setCategoriesFilter] = useState(null);


  //console.log('id category', categoriesFilter);

  const handleFilterCategories = (category) => {
    setCategoriesFilter(category);
  };

  return (
    <div className={style.homeContainer}>
      <Categories handleFilterCategories={handleFilterCategories} />
    </div>
  );
};

export default Home;
