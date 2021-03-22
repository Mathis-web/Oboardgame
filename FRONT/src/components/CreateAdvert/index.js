// == Import npm
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//import store from 'src/store';

// == Import
import './style.scss';

//const state = store.getState();
// == Composant
function CreateAdvert({
  //onSubmitFormAdvert,
  isLogged,
  loggedMessage,
}) {
  //const state = store.getState();
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [locationPrice, setLocationPrice] = useState();
  const [gameAvgDuration, setGameAvgDuration] = useState();
  const [gameMinPlayers, setGameMinPlayers] = useState();
  const [gameMaxPlayers, setGameMaxPlayers] = useState();
  const [gameSuggestedAge, setGameSuggestedAge] = useState();
  const [gameAuthor, setGameAuthor] = useState();
  const [gameReleaseYear, setGameReleaseYear] = useState();
  const [city, setCity] = useState();
  const [description, setDescription] = useState();
  const [categories, setCategories] = useState();
  const [gameTitle, setGameTitle] = useState();

  const send = (event) => {
    event.preventDefault();
    const categoriesName = [{ name: categories }];
    const data = new FormData();
    data.append('title', title);
    data.append('gameTitle', gameTitle);
    data.append('locationPrice', locationPrice);
    data.append('gameAvgDuration', gameAvgDuration);
    data.append('gameMinPlayers', gameMinPlayers);
    data.append('gameMaxPlayers', gameMaxPlayers);
    data.append('gameSuggestedAge', gameSuggestedAge);
    data.append('image', file);
    data.append('gameAuthor', gameAuthor);
    data.append('gameReleaseYear', gameReleaseYear);
    data.append('city', city);
    data.append('description', description);
    data.append('categories', JSON.stringify(categoriesName));
    axios.post('http://34.207.234.22/api/create-advert', data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log('response', response);
        alert('Votre annonce est maintenant en ligne');
      })
      .catch(() => alert("Echec de l'envoi"));
  };

  return (
    <div className="CreateAdvert">
      {!isLogged && (
        <div className="Login__form__logged">
          <p className="Login__form__message">
            {loggedMessage}
          </p>
        </div>
      )}
      {isLogged && (
        <>
          <h1 className="CreateAdvert__title">Création d'annonce</h1>
          <p className="CreateAdvert__subtitle"> Mieux vous décrirez votre jeu, plus vous aurez de chances de le louer</p>
          <form className="CreateAdvert__form" encType="multipart/form-data" onSubmit={send}>
            <input
              className="CreateAdvert__form__title"
              type="text"
              label="Nom de l'annonce"
              name="title"
              placeholder="Titre de votre annonce"
              onChange={(event) => {
                const value = event.target.value;
                console.log('value input', value);
                setTitle(value);
              }}
            />
            <input
              className="CreateAdvert__form__title"
              type="text"
              label="Nom du jeu"
              name="gameTitle"
              placeholder="Nom du jeu"
              onChange={(event) => {
                const { value } = event.target;
                console.log('value input 2eme champ', value);
                setGameTitle(value);
              }}
            />
            <input
              className="CreateAdvert__form__title"
              type="text"
              label="Prix de la location"
              name="locationPrice"
              placeholder="Prix"
              onChange={(event) => {
                const { value } = event.target;
                setLocationPrice(value);
              }}
            />
            <input
              className="CreateAdvert__form__title"
              type="text"
              label="Durée moyenne d'une partie"
              name="gameAvgDuration"
              placeholder="Durée moyenne du jeu"
              onChange={(event) => {
                const { value } = event.target;
                setGameAvgDuration(value);
              }}
            />
            <input
              className="CreateAdvert__form__title"
              type="text"
              label="Nombre de joueurs-min"
              name="gameMinPlayers"
              placeholder="Nombre de joueurs-min"
              onChange={(event) => {
                const { value } = event.target;
                setGameMinPlayers(value);
              }}
            />
            <input
              className="CreateAdvert__form__title"
              type="text"
              label="Nombre de joueurs-max"
              name="gameMaxPlayers"
              placeholder="Nombre de joueurs-max"
              onChange={(event) => {
                const { value } = event.target;
                setGameMaxPlayers(value);
              }}
            />
            <input
              className="CreateAdvert__form__title"
              type="text"
              label="Age minimum"
              name="gameSuggestedAge"
              placeholder="Age suggéré"
              onChange={(event) => {
                const { value } = event.target;
                setGameSuggestedAge(value);
              }}
            />
            <input
              className="CreateAdvert__form__title"
              type="file"
              label="Inserer une image"
              name="advertImage"
              acept=".jpg"
              placeholder="Choisissez une image"
              onChange={(event) => {
                const file = event.target.files[0];
                setFile(file);
              }}
            />
            <input
              className="CreateAdvert__form__title"
              type="text"
              label="Ville"
              name="city"
              placeholder="Ville"
              onChange={(event) => {
                const { value } = event.target;
                setCity(value);
              }}
            />
            <textarea
              className="CreateAdvert__form__textarea"
              rows="10"
              placeholder="Description complémentaire"
              onChange={(event) => {
                const { value } = event.target;
                setDescription(value);
              }}
            />
            <input
              className="CreateAdvert__form__title"
              type="text"
              label="Auteur"
              name="gameAuthor"
              placeholder="Auteur"
              onChange={(event) => {
                const { value } = event.target;
                console.log('auteur', value);
                setGameAuthor(value);
              }}
            />
            <input
              className="CreateAdvert__form__title"
              type="text"
              label="Categories"
              name="categories"
              placeholder="Catégories"
              onChange={(event) => {
                const { value } = event.target;
                setCategories(value);
              }}
            />
            <input
              className="CreateAdvert__form__title"
              type="text"
              label="Année de sortie"
              name="gameReleaseYear"
              placeholder="Année de sortie du jeu"
              onChange={(event) => {
                const { value } = event.target;
                setGameReleaseYear(value);
              }}
            />
            <button type="submit" className="CreateAdvert__form__button">Poster l'annonce</button>
          </form>
        </>
      )}
    </div>
  );
}

CreateAdvert.propTypes = {
  isLogged: PropTypes.bool,
  // onSubmitFormAdvert: PropTypes.func.isRequired,
  loggedMessage: PropTypes.string,

};
CreateAdvert.defaultProps = {
  loggedMessage: 'Vous devez vous connecter',
  isLogged: false,
};

// == Export
export default CreateAdvert;
