const NotesClient = require("./notesClient")
const NotesModel = require("./notesModel")
const NotesView = require("./notesView")

console.log("The notes app is running")

const model = new NotesModel();
const client = new NotesClient();
const notesView =  new NotesView(model, client)

// model.addNote("This is an example note")
notesView.displayNotesFromAPI();
