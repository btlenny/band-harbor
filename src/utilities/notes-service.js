const notesData = [
    { id: 1, text: 'Note 1' },
    { id: 2, text: 'Note 2' },
    // ... other notes
  ];
  
  export const getNotes = async (userId) => {
    // Replace this with your actual API call to fetch notes for the user
    // For now, we're just filtering the mock data for demonstration purposes
    return notesData.filter((note) => note.userId === userId);
  };
  
  export const addNote = async (userId, text) => {
    // Replace this with your actual API call to add a new note
    // For now, we're just creating a new note object with the provided text
    const newNote = { id: notesData.length + 1, userId, text };
    notesData.push(newNote);
    return newNote;
  };