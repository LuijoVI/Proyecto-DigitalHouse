import React, { useEffect, useState } from 'react';
import style from './Categories.module.css';
import baseUrl from '../../utils/baseUrl.json';
import CategorieSkeleton from '../Skeletons/CategorieSkeleton/CategorieSkeleton';

const Categories = ({ handleFilterCategories }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(categories);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${baseUrl.url}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={style.categoriesContainer}>
      <h2>Buscar por tipo de alojamiento</h2>
      <div className={style.categoriesList}>
        {isLoading ? (
          <>
            <CategorieSkeleton />
            <CategorieSkeleton />
            <CategorieSkeleton />
            <CategorieSkeleton />
            <CategorieSkeleton />
          </>
        ) : (
          <>
            {[...categories, ...categories].map((category, idx) => (
              <div
                className={style.categoryCard}
                key={category.id + '-' + idx}
                onClick={() => handleFilterCategories(category.id)}
              >
                <img
                  className={style.categoryImage}
                  src={category.url}
                  alt={category.name}
                />
                <div className={style.categoryOverlay}>
                  <span className={style.categoryName}>{category.name}</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Categories;
