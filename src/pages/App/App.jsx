import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser, getUserName } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewBandPage from '../NewBandPage/NewBandPage';
import BandsListPage from '../BandsListPage/BandsListPage';
import NavBar from '../../components/NavBar/NavBar';
import Spotify from '../Spotify/Spotify';
import BandDetailPage from '../BandsDetailPage/BandsDetailPage';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [bands, setBands] = useState([]);
 
  const handleCreateBand = (newBand) => {
    // Update the bands state with the new band
    setBands([...bands, newBand]);
  };

  const currentuser = user;
  console.log(currentuser);

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} currentuser={currentuser}/>
          <Routes>
            <Route
              path="/bands/new"
              element={<NewBandPage onCreateBand={handleCreateBand} currentuser={currentuser}/>}
            />
            <Route
              path="/bands"
              element={<BandsListPage bands={bands} currentuser={currentuser}/>}
            />
            <Route
              path="/"
              element={<AuthPage setUser={setUser} />}
            />
            <Route path="/spotify" element={<Spotify />} />
            <Route path="/bands/:bandId" element={<BandDetailPage currentuser={currentuser}/>} />

          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}