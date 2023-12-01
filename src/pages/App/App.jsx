import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewBandPage from '../NewBandPage/NewBandPage';
import BandsListPage from '../BandsListPage/BandsListPage';
import NavBar from '../../components/NavBar/NavBar';


export default function App() {
  const [user, setUser] = useState(getUser());


  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/bands/new" element={<NewBandPage />} />
            <Route path="/bands" element={<BandsListPage />} />
            <Route path="/" element={<AuthPage  />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}