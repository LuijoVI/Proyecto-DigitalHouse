import React, { useContext, useState } from 'react';
import style from './Search.module.css';
import Calendar from './Calendar/Calendar';
import SelectCity from './SelectCity/SelectCity';
import { dateRangeContext } from '../../context/DateRangeContext';

const Search = ({ handleSearch }) => {
  const [city, setCity] = useState(null);
  const { rangeDate } = useContext(dateRangeContext);

  const getCity = (valueCity) => {
    setCity(valueCity);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(city, rangeDate);
  };

  const handleReset = () => {
    setCity(null);
    handleSearch(null, [null, null]);
  };

  return (
    <div className={style.searchContainer}>
      <h1 className={style.searchTitle}>
        Encuentra el lugar perfecto para tus vacaciones
      </h1>
      <form className={style.searchForm} onSubmit={handleSubmit}>
        <SelectCity getCity={getCity} />
        <Calendar />
        <button type="submit" className={`btn btn2 ${style.searchBtn}`}>Buscar</button>
        <button type="button" className={`btn btn2 ${style.searchBtn}`} onClick={handleReset} style={{marginLeft: '10px'}}>Restaurar filtros</button>
      </form>
    </div>
  );
};

export default Search;
