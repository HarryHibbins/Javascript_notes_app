/**
 * @jest-environment jsdom
 */


const fs = require('fs');
const { default: JSDOMEnvironment } = require('jest-environment-jsdom');
const NotesView = require('./src/notesView'); 

describe(NotesView, () => {
  it('displays two notes', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    // 1. Setting up model and view
    const mockedModel = {
      addNote: (note) => {},
      getNotes: () => {
        return['A first note', 'Another one']
      }
    }
    const view = new NotesView(mockedModel);
    mockedModel.addNote('A first note');
    mockedModel.addNote('Another one');
    
    // 2. Display the notes on the page
    view.displayNotes();

    // 3. There should now be 2 div.note on the page
    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });
    it('Adds a new note', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    const mockedModel = {
      addNote: (note) => {
        expect(note).toEqual("mocked note")
      },
      getNotes: () => {
        return ['mocked note']
      }
    };

    const mockedClient = {
      createNote: (note) => {
        expect(note).toEqual({content: "mocked note"});
        const data = { name: "mocked note"};
      },      
    }
    const view = new NotesView(mockedModel, mockedClient);

    const messageInputEl = document.querySelector('#message-input');
    messageInputEl.value = "mocked note"

    const buttonEl = document.querySelector('#add-note-button');
    buttonEl.click();


    expect(document.querySelectorAll('div.note').length).toEqual(1);
    expect(document.querySelectorAll('div.note')[0].textContent).toEqual('mocked note');
  })
  it('Has the same amount of notes after displaying twice', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    const mockedModel = {
      addNote: (note) => {},
      getNotes: () => {
        return ['note 1', 'note 2']
      }
    }
    const view = new NotesView(mockedModel);
    mockedModel.addNote("note 1")
    mockedModel.addNote("note 2")

    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toEqual(2)
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toEqual(2)
  })
  it ("Passes the data from the client class to the model to the client class, and passes the response to the model", () =>{
    document.body.innerHTML = fs.readFileSync('./index.html');
  
  
      const mockedClient = {
        loadNotes: (callback) => callback(['mocked note 1', 'mocked note 2']),
        createNote: (note) => {}
      }
      const mockedModel = {
        addNote: (note) => {
          expect(note).toEqual(
            "Mocked input note"
          );
        },
        getNotes: () => {
          return ["Mocked input note"]
        }
      };
  
    const view = new NotesView(mockedModel, mockedClient);

    const messageInputEl = document.querySelector('#message-input');
    messageInputEl.value = "Mocked input note"

    const buttonEl = document.querySelector('#add-note-button');
    buttonEl.click();

  //   // view.displayNotesFromAPI()
  //   expect(mockedModel.getNotes()).toEqual(["mocked note 1" , "mocked note 2", "Mocked input note"])
  // })
  // xit ("posts a new note to the server" , () => {
    
  //   const messageInputEl = document.querySelector('#message-input');
  //   messageInputEl.value = "posted note"
    
  //   const mockedClient = new NotesClient()
  //   mockedClient.createNote("note").mockImplementation();
  //   expect(mockedClient.createNote).toHaveBeenCalledTimes(1);


  //   const model = new NotesModel();
  //   const view = new NotesView(model, mockedClient);
  //   view.addNewNote("posted note")
  //   expect(model.getNotes()).toEqual(["mocked note 1", "mocked note 2", "posted note"])



    
  })
  it("Passes user input to the client class, and passes the response to the model", () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const mockedClient = {
      loadNotes: (callback) => callback(['mocked note 1', 'mocked note 2']),
      createNote: (note) => {}
    }
    const mockedModel = {
      addNote: jest.fn(),
      getNotes: () => {
        return ["Mocked input note"]
      }
    };
    const view = new NotesView(mockedModel, mockedClient);

    const messageInputEl = document.querySelector('#message-input');
    messageInputEl.value = "Mocked input note"

    const buttonEl = document.querySelector('#add-note-button');
    buttonEl.click();
    expect(mockedModel.addNote).toHaveBeenCalledWith(
      "Mocked input note",
    );
    });
  });