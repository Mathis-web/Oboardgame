import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const Error = () => (
  <div className="Error">
    <p className="Error__text">Vous tombez en case <span className="Error__text__span">Erreur 404</span>.</p> 
    <p className="Error__text">Retournez à l'accueil, ne touchez pas 20.000 francs.</p>
    <p><Link to="/accueil" className="header__nav__link">Retour à l'accueil</Link></p>
  </div>
);

export default Error;
