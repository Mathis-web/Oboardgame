// == Import npm
import React from 'react';

// == Import
import './style.scss';

// == Composant
const Home = () => (
  <div className="home">
    <div className="home__search">
      <p> Vous savez ce que vous cherchez ?</p>
      <input className="home__search__bar" placeholder="7 Wonders, Monopoly..." type="text" />
    </div>
    <div className="home__center">
      <div className="home__text">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <div className="home__logo">
        <p>LOGO</p>
      </div>
      <div className="home__annonces">
        <p>Annonces récentes</p>
      </div>
    </div>
    <div className="home__categories">
      <p>Catégories</p>
      <ul className="home__categories__cat">
        <li>Cat</li>
        <li>Cat</li>
        <li>Cat</li>
        <li>Cat</li>
      </ul>
    </div>
  </div>
);

// == Export
export default Home;

