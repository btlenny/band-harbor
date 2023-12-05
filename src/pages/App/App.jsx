import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
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

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route
              path="/bands/new"
              element={<NewBandPage onCreateBand={handleCreateBand} />}
            />
            <Route
              path="/bands"
              element={<BandsListPage bands={bands} />}
            />
            <Route
              path="/"
              element={<AuthPage setUser={setUser} />}
            />
            <Route path="/spotify" element={<Spotify />} />
            <Route path="/bands/:bandId" element={<BandDetailPage />} />

          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}