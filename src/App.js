import React, { Component } from 'react';
import './App.css';

let firstNote = {id: 0,
                info: 'Welcome to the note app! Notes will be saved in your browser\'s local storage. :)' }

let notesList = JSON.parse(localStorage.getItem('list')) || [];
if (!notesList.length){
  notesList.push(firstNote);
}
console.log(notesList);
let textValue = notesList[0].info;
let firstType = true;
let currentID = notesList[0] ? notesList[0].id : -1;

function getIDList(list) {
  let res = [];
  list.forEach(item => res.push(item.id));
  return res;
}

var IDList = getIDList(notesList);


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notesList,
      firstType,
      textValue,
      IDList,
      currentID,
    }

    this.onType = this.onType.bind(this);
    this.displayNote = this.displayNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.createNewNote = this.createNewNote.bind(this);
  }

  createNewNote() {
    let list = this.state.notesList;
    let IDList = this.state.IDList;

    let id = list.length;
    while (IDList.includes(id)) {
      id++;
    }
    let newNote = {
      id: id,
      info: '',
    };
    IDList.push(id);
    list.push(newNote);

    this.setState({
      currentID: id,
      notesList: list,
      IDList: IDList,
      textValue: '',
    })

  }

  onType(event) {
    let list = this.state.notesList;
    let IDList = this.state.IDList;
    let current = this.state.currentID;

    if (current === -1){
      return this.createNewNote();
    }

    for (let item of list) {
      if (item.id === current){
        item.info = event.target.value;
      }
    }

    localStorage.setItem('list', JSON.stringify(list));

    this.setState({ 
      notesList: list,
      currentID: current,
      IDList: IDList,
      textValue: event.target.value, 
    });
  }

  displayNote(item){
    this.setState({
      textValue: item.info,
      currentID: item.id,
    })
  }

  deleteNote(){
    let list = this.state.notesList;
    let IDList = this.state.IDList;
    let id = this.state.currentID;

    list = list.filter(item => 
      item.id !== id);
    
    IDList = IDList.filter(num => num !== id);

    localStorage.setItem('list', JSON.stringify(list));

    this.setState({
      IDList: IDList,
      notesList: list,
      textValue: '',
      currentID: -1,
    })
  }

  render() {
    console.log(this.state.currentID);
    return (
      <div className="app container d-flex flex-column">
        
        <div className="row d-flex justify-content-between align-items-center p-2 topbar">
              <div className="col">
                <h3><i className="far fa-sticky-note"></i>  Take Notes</h3>
              </div>
              <div className="col-auto">
                <Button onClick={this.createNewNote} 
                children='New Note' />
              </div>
              <div className="col-auto">
                <Button onClick={this.deleteNote}
                children='Delete Current Note' />
              </div>
        </div>

          <div className="row flex-grow-1">

            <div className="col-4 px-0">
              <NoteList onClick={this.displayNote}
                list={this.state.notesList} 
                current={this.state.currentID}/>
            </div>
            
            <div className="col bignote">
                <TextEntry value={this.state.textValue}
                  onChange={this.onType} />
            </div>
            
          </div>
        </div>

    );
  }
}

const Button = ({ onClick, className='', children }) => 
  <button type="button"
    onClick = {onClick}
    className={className}
    >
    {children}
    </button>

const TextEntry = ({value, onChange}) => 
  <textarea className='text form-control'
    value={value}
    onChange={onChange}>
    </textarea>

const NoteList = ({list, onClick, current}) =>
  <div className = 'notes d-flex flex-column px-0'>
    {list.map(item => {

      let noteClass = item.id === current ? 
        "note mx-0 p-1 border-bottom currentnote" 
      : "note mx-0 p-1 border-bottom";

      return (
        <div className={noteClass}
          onClick={() => onClick(item)}>
          {item.info}
        </div>
      )
    }
      )}
  </div>

export default App;
