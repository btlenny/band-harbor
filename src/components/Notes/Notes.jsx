const NotesList = ({ notes }) => {
    return (
      <div>
        <h2>My Notes</h2>
        {notes.length === 0 ? (
          <p>No Notes Yet!</p>
        ) : (
          <ul>
            {notes.map((note) => (
              <li key={note._id}>
                {note.text} - {new Date(note.createdAt).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default NotesList;