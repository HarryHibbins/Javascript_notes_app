const NotesModel = require("../src/notesModel")
describe('notesModel', () => {
  it ('Creates an empty notes list', () =>{
    const model = new NotesModel();
    expect(model.getNotes()).toEqual = []
  })
  it ('Adds notes to the list', () => {
    const model = new NotesModel();
    model.addNote("Buy milk")
    model.addNote("Go to the gym")
    expect(model.getNotes()).toEqual = ["Buy milk","Go to the gym"]
    })
    it ('Resets the list', () =>{
      const model = new NotesModel();
      model.addNote("Buy milk")
      model.addNote("Go to the gym")
      model.reset()
      expect(model.getNotes()).toEqual = []
    })
    it("Sets the notes", () =>{
      const model = new NotesModel();
      model.addNote("Buy milk")
      model.setNotes(["Set note 1" , "Set note 2"])
      expect(model.getNotes()).toEqual = ["Set note 1" , "Set note 2"]
    })
  })
