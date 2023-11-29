import { useState } from 'react';


const AddNoteForm = ({ onAddNote }) => {
    const [newNote, setNewNote] = useState('');
  
    const handleAddNote = () => {
      // Implement logic to add a new note
      onAddNote(newNote);
      setNewNote('');
    };
  
    return (
      <div>
        <h2>Add a Note</h2>
        <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
    );
  };
  
  export default AddNoteForm;