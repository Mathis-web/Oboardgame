// == Import npm
import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import logo from "../../../img/Logo_phase_3_Complet.svg";

// == Import
import './style.scss';

// == Composant
const Header = ({ isLogged }) => (
  <div className="header">
    <div className="header__logo">
      <Link className="header__logo__container" to="accueil">
        <img className="header__logo__svg" src={logo} alt="Logo O'boardgame" />
      </Link>
    </div>
    <nav className="header__nav">
      <Link to="/accueil" className="header__nav__link">Accueil</Link>
      <Link to="/annonces" className="header__nav__link">Annonces</Link>
      <Link to="/creer-une-annonce" className="header__nav__link">Créer une annonce</Link>
      {isLogged && <Link to="/profil" className="header__nav__link">Mon profil</Link>}
      <Link to="/connexion" className="header__nav__link--connexion">{!isLogged ? 'Se connecter' : 'Se déconnecter'}</Link>
    </nav>
  </div>
);
Header.propTypes = {
  isLogged: PropTypes.bool,
};

Header.defaultProps = {
  isLogged: false,
};
// == Export
export default Header;
