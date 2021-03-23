// == Import npm
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// == Import
import profil from './profile.svg';

import './style.scss';

// == Composant
const Profil = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get('http://34.207.234.22/api/profil')
      .then((res) => setUser(res.data));
  }, []);

  return (
    <div className="profil">
      <div className="profil__picture">
        <h1 className="profil__picture__title">Profil</h1>
        <img className="profil__picture__img" src={profil} alt="react logo" />
      </div>
      <div className="profil__info">
        <div className="profil__info__h2">
          <span className="profil__info__label">Pseudo :</span>
          <span className="profil__info__bar">{user.pseudo}</span>
        </div>
        <div className="profil__info__h2">
          <span className="profil__info__label">Nom :</span>
          <span className="profil__info__bar">{user.lastname}</span>
        </div>
        <div className="profil__info__h2">
          <span className="profil__info__label">Prénom :</span>
          <span className="profil__info__bar">{user.firstname}</span>
        </div>
        <div className="profil__info__h2">
          <span className="profil__info__label">Adresse email :</span>
          <span className="profil__info__bar">{user.email}</span>
        </div>
        <div className="profil__info__h2">
          <span className="profil__info__label">Numéro de téléphone :</span>
          <span className="profil__info__bar">{user.phoneNumber}</span>
        </div>
        <div className="profil__info__h2">
          <span className="profil__info__label">Ville :</span>
          <span className="profil__info__bar">{user.city}</span>
        </div>
      </div>
      <div className="profil__links">
        <Link
          to="/modifier-profil"
          className="profil__info__buttons"
        > Modifier Profil
        </Link>
        <Link
          to="/user-adverts"
          className="profil__info__buttons"
        > Modifier ses Annonces
        </Link>
        <Link
          to="/supprimer-profil"
          className="profil__info__buttons"
        > Supprimer son profil
        </Link>
      </div>

    </div>
  );
};

// == Export
export default Profil;
