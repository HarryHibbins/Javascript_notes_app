class NotesClient{
  loadNotes = (callback) =>{
    fetch('http://localhost:3000/notes')
    .then(response => response.json())
    .then(data => {
      callback(data)
    });
  }

  createNote = (note) => {
    fetch('http://localhost:3000/notes', {
    method: 'POST', // or 'PUT'
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

}

module.exports = NotesClient;