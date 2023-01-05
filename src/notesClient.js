class NotesClient{
  loadNotes = (callback) =>{
    fetch('http://localhost:3000/notes')
    .then(response => response.json())
    .then(data => {
      callback(data)
    });
  }

  // createNote = (callback, data) => {
  //   fetch('http://localhost:3000/notes', {
  //   method: 'POST', // or 'PUT'
  //   headers: {
  //    'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log('Success:', data);
  //     callback(data)
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
  // }

}

module.exports = NotesClient;