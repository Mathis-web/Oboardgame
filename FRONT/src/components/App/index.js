// == Import npm
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


// == Import
import Header from 'src/containers/Header';
import Footer from 'src/components/Footer';
import Home from 'src/components/Home';
import LegalNotes from 'src/components/LegalNotes';
import AboutUs from 'src/components/AboutUs';
import Contact from 'src/containers/Contact';
import Adverts from 'src/components/Adverts';
import Advert from 'src/containers/Advert';
import UserManagement from 'src/components/UserManagement';
import Login from 'src/containers/Login';
import SignIn from 'src/containers/SignIn';
import Profil from 'src/components/Profil';
import AdminDashboard from 'src/components/AdminDashboard';
import UserDashboard from 'src/components/UserDashboard';
import CreateAdvert from 'src/containers/CreateAdvert';
import UpdateAdvert from 'src/containers/UpdateAdvert';
import DeleteAdvert from 'src/containers/DeleteAdvert';
import UpdateProfil from 'src/containers/UpdateProfil';
import DeleteProfil from 'src/containers/DeleteProfil';
import Error from 'src/components/Error';
import UserAdverts from '../UserAdverts';


import './styles.scss';

const App = () => {
  console.log('app init');
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/accueil">
            <Home />
          </Route>
          <Route path="/mentions-legales">
            <LegalNotes />
          </Route>
          <Route path="/a-propos-de-nous">
            <AboutUs />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/annonces">
            <Adverts />
          </Route>
          <Route path="/adverts/:id">
            <Advert />
          </Route>
          <Route path="/gestion-utilisateur">
            <UserManagement />
          </Route>
          <Route path="/connexion">
            <Login />
          </Route>
          <Route path="/creer-compte">
            <SignIn />
          </Route>
          <Route path="/profil">
            <Profil />
          </Route>
          <Route path="/tableau-de-bord-admin">
            <AdminDashboard />
          </Route>
          <Route path="/tableau-de-bord-utilisateur">
            <UserDashboard />
          </Route>
          <Route path="/creer-une-annonce">
            <CreateAdvert />
          </Route>
          <Route path="/modifier-une-annonce">
            <UpdateAdvert />
          </Route>
          <Route path="/supprimer-une-annonce">
            <DeleteAdvert />
          </Route>
          <Route path="/modifier-profil">
            <UpdateProfil />
          </Route>
          <Route path="/supprimer-profil">
            <DeleteProfil />
          </Route>
          <Route path="/user-adverts">
            <UserAdverts />
          </Route>
          <Error />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

// == Export
export default App;
