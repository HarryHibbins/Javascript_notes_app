/**
 * @jest-environment jsdom
 */


const fs = require('fs');
const NotesModel = require('../src/notesModel');
const NotesView = require('../src/notesView'); 
const NotesClient = require('../src/notesClient');
jest.mock('../src/notesClient');

describe(NotesView, () => {
  beforeEach(() => {
    // Before each test, reset the mock
    // This helps starting each test case
    // with a "fresh" mocked class
    NotesClient.mockClear();
  });
  
  it('displays two notes', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    // 1. Setting up model and view
    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote('A first note');
    model.addNote('Another one');
    
    // 2. Display the notes on the page
    view.displayNotes();

    // 3. There should now be 2 div.note on the page
    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });
    it('Adds a new note', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    const model = new NotesModel();
    const view = new NotesView(model);

    const messageInputEl = document.querySelector('#message-input');
    messageInputEl.value = "Test note"

    const buttonEl = document.querySelector('#add-note-button');
    buttonEl.click();


    expect(document.querySelectorAll('div.note').length).toEqual(1);
    expect(document.querySelectorAll('div.note')[0].textContent).toEqual('Test note');
  })
  it('Has the same amount of notes after displaying twice', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote("note 1")
    model.addNote("note 2")

    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toEqual(2)
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toEqual(2)
  })
  it ("Loads notes from an api", () =>{
    const mockedClient = new NotesClient();

    // mockedClient.loadNotes.mockImplementation((callback) => {
    //   callback(['mocked note']);
    // });

    //mockedClient.loadNotes.mockImplementation(() => 'mocked note');


    const model = new NotesModel();
    const view = new NotesView(model, mockedClient);
    

    view.displayNotesFromAPI()
    expect(model.getNotes()).toEqual(["mocked note "])
  })
});