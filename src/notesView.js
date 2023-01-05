class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainerEl = document.querySelector('#main-container');
    this.addNoteButton = document.querySelector('#add-note-button');

    this.addNoteButton.addEventListener('click', () => {
      const newNote = document.querySelector("#message-input").value;
      this.addNewNote(newNote);
      document.querySelector("#message-input").value = "";
    });


  }

  displayNotes = () =>{

    //Remove notes first
    document.querySelectorAll(".note").forEach(element => {
      element.remove();
    })
    const notes = this.model.getNotes();

    //Add notes back including new one
    notes.forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.textContent = note;
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);
    })
  }

  displayNotesFromAPI(){
    this.client.loadNotes(notes => {
      this.model.setNotes(notes);
      this.displayNotes();
    });

  }

  addNewNote = (newNote) => {
    this.model.addNote(newNote);
    this.displayNotes();
  }

}

module.exports = NotesView;
