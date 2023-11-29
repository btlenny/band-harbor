import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';
import Notes from '../../components/Notes/Notes'; // Create a NotesList component
import AddNoteForm from '../../components/AddNoteForm/AddNoteForm'; //
import { getNotes, addNote } from '../../utilities/notes-service'; // Make sure to adjust the path based on your project structure


export default function App() {
  const [user, setUser] = useState(getUser());
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch user's notes when the component mounts
    if (user) {
      fetchUserNotes();
    }
  }, [user]);

  const fetchUserNotes = async () => {
    try {
      // Fetch user's notes from the backend
      const userNotes = await getNotes(user._id); // Replace with your actual API call
      setNotes(userNotes);
    } catch (error) {
      console.error('Error fetching user notes:', error);
    }
  };

  const handleAddNote = async (newNoteText) => {
    try {
      // Add a new note for the logged-in user
      const newNote = await addNote(user._id, newNoteText); // Replace with your actual API call
      setNotes((prevNotes) => [...prevNotes, newNote]);
    } catch (error) {
      console.error('Error adding a new note:', error);
    }
  };


  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route
              path="/orders"
              element={
                <>
                  <OrderHistoryPage />
                  <Notes notes={notes} />
                  <AddNoteForm onAddNote={handleAddNote} />
                </>
              }
            />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}