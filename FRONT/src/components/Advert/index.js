// == Import npm
import React, { useState, useEffect } from 'react';

// == Import
import './style.scss';
import axios from 'axios';

// == Composant
const Advert = () => {
  const [advert, setAdvert] = useState({});

  const queryString = window.location.pathname;
  console.log('query :', queryString);

  useEffect(() => {
    axios
      .get(`http://34.207.234.22/api${queryString}`)
      .then((res) => {
        console.log('res :', res);
        setAdvert(res.data);
      });
  }, []);

  return (
    <div className="Advert">
      <a className="Advert__return">--Précedent</a>
      <article className="Advert__content">
        <div className="Advert__content__left">
          <img
            className="Advert__content__left__img"
            src={advert.advert.advertImage}
            alt={advert.advert.title}
          />
          <p className="Advert__content__left__text">Publiée le {advert.advert.publicationDate}</p>
          <p className="Advert__content__left__text">Par {advert.user.pseudo}</p>
          <p className="Advert__content__left__text__localisation">
            A proximités de :
          </p>
          <div className="Advert__content__left__localisation">
            <img
              className="Advert__content__left__localisation__img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7MbRrwlP4MtsSXkIG-XBxvCnAQi5NuzQpqQ&usqp=CAU"
              alt="map"
            />
            <p className="Advert__content__left__localisation__imgtext">
              {advert.localisation.city}
            </p>
          </div>
        </div>
        <div className="Advert__content__right">
          <div className="Advert__content__right__desc">
            <h1 className="Advert__content__right__desc__title">
              {advert.advert.title}
            </h1>
            <div className="Advert__content__right__desc__details">
              <div className="Advert__content__right__desc__details__category">
                {advert.category.map((obj) => (
                  <p className="Advert__content__right__desc__details__category__tag">
                    {obj.name}
                  </p>
                ))}
              </div>
              <p className="Advert__content__right__desc__details__detail">
                {advert.advert.advertSuggestedAge}
                / Edité par {advert.advert.advertAuthor}
                /<a> plus d'info</a>
              </p>
            </div>
            <p className="Advert__content__right__desc__description">{advert.advert.description}
            </p>
          </div>
          <div className="Advert__content__right__contact">
            <p className="Advert__content__right__contact__price">{advert.advert.locationPrice}€/jour</p>
            <button type="button" className="Advert__content__right__contact__button">
              Contacter {advert.user.pseudo}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

// == Export
export default Advert;
