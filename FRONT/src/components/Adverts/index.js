// == Import npm
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// == Import
import './style.scss';
import axios from 'axios';

// == Composant
const Adverts = () => {
  const [adverts, setAdverts] = useState([]);
  const [filteredAdverts, setFilteredAdverts] = useState([]);

  useEffect(() => {
    axios
      .get('http://34.207.234.22/api/alladverts')
      .then((res) => {
        setAdverts(res.data);
        setFilteredAdverts(res.data);
      });
  }, []);

  const inputSearch = (e) => {
    e.preventDefault();
    console.log('Valeur search : ', adverts.filter((obj) => obj.advert.title.toLowerCase().includes(e.target.value.toLowerCase())));
    setFilteredAdverts(adverts.filter((obj) =>
      obj.advert.title.toLowerCase().includes(e.target.value.toLowerCase())));
  };
  console.log('Adverts :', adverts);

  return (
    <div className="Adverts">
      <h1 className="Adverts__title">Les annonces</h1>
      <div className="Adverts__home__search">
        <p> Vous savez ce que vous cherchez ?</p>
        <input
          onChange={inputSearch}
          className="Adverts__home__search__bar"
          placeholder="7 Wonders, Monopoly..."
          type="text"
        />
      </div>
      <div className="Adverts__container">
        {filteredAdverts.map((obj) => (
          <Link
            to={`adverts/${obj.advert.id}`}
            key={obj.advert.id}
            className="Adverts__container__advert"
          >
            <div className="Adverts__container__advert__img__container">
              <img className="Adverts__container__advert__img__container__img" src={obj.advert.advertImage} alt={obj.advert.id} />
            </div>
            <div>
              <h2 className="Adverts__container__advert__title">{obj.advert.title}</h2>
              <div className="Adverts__container__advert__details">
                <p className="Adverts__container__advert__details__detail">{obj.localisation.city}</p>
                <p className="Adverts__container__advert__details__detail">{obj.advert.locationPrice} €</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
// == Export
export default Adverts;
