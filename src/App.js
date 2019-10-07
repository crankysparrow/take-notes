import React, { Component } from 'react';
import './App.css';

let firstNote = {id: 0,
                info: 'Welcome to the note app! Notes will be saved in your browser\'s local storage. :)' }

let notesList = JSON.parse(localStorage.getItem('list')) || [];
  if (!notesList.length){
    notesList.push(firstNote);
  }
  if (notesList.length === 1 && notesList[0].info === ''){
    notesList = [];
    notesList.push(firstNote);
  }
let textValue = notesList[0].info;
let firstType = true;
let currentID = notesList[0].id;

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

    this.text = React.createRef();
    this.onType = this.onType.bind(this);
    this.displayNote = this.displayNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.createNewNote = this.createNewNote.bind(this);
    this.newButton = this.newButton.bind(this);
  }

  componentDidMount() {
    this.text.current.focus();
  }

  componentDidUpdate(){
    this.text.current.focus();
  }

  onType(event) {
    let list = this.state.notesList;
    let current = this.state.currentID;

    for (let item of list) {
      if (item.id === current){
        item.info = event.target.value;
      }
    }

    localStorage.setItem('list', JSON.stringify(list));
    this.setState({ 
      notesList: list,
      textValue: event.target.value, 
    });
  }

  displayNote(item){
    this.setState({
      textValue: item.info,
      currentID: item.id,
    })
  }

  newButton(){
    let list = this.state.notesList;
    let IDList = this.state.IDList;
    return this.createNewNote(list, IDList);
  }

  deleteNote(){
    let list = this.state.notesList;
    let IDList = this.state.IDList;
    let id = this.state.currentID;

    list = list.filter(item => 
      item.id !== id);
    IDList = IDList.filter(num => num !== id);

    if (!list.length){
      return this.createNewNote(list, IDList);
    }

    localStorage.setItem('list', JSON.stringify(list));

    this.setState({
      IDList: IDList,
      notesList: list,
      currentID: list[0].id,
      textValue: list[0].info,
    })
  }

  createNewNote(list, IDList) {
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

    localStorage.setItem('list', JSON.stringify(list));
    this.setState({
      currentID: id,
      notesList: list,
      IDList: IDList,
      textValue: '',
    })
  }

  render() {
    console.log(this.state.notesList);
    return (
      <div className="container h-100 d-flex flex-column border-dark">

        <div className="row navbar bg-light navbar-light p-0">

          <div className="col h3 mb-0 align-self-stretch" style={{ backgroundColor: '#edf7fc'}}>
            <i className="far fa-sticky-note navbar-text"></i>  Take Notes
          </div>
          <div className="col-auto py-2 pl-5" style={{ backgroundColor: '#d5e0e6'}}>
            <Button onClick={this.newButton}
              children='New Note' 
              className='btn btn-info mx-3' />

            <Button onClick={this.deleteNote}
              children='Delete Current Note'
              className='btn btn-info' />
          </div>
        </div>

        <div className="row flex-grow-1">
          <NoteList onClick={this.displayNote}
            list={this.state.notesList}
            current={this.state.currentID} />

          <TextEntry value={this.state.textValue}
            onChange={this.onType}
            reference={this.text} />
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

const TextEntry = ({value, onChange, reference}) => 
  <div className="col bignote px-0">
    <textarea className='note-input form-control h-100 border-top-0 border-bottom-0 rounded-0'
      value={value}
      onChange={onChange}
      autoFocus={'autofocus'}
      ref={reference}>
    </textarea>
  </div>

const NoteList = ({list, onClick, current}) =>
  <div className = 'notes col-4 align-self-stretch flex-grow-1 pl-0'>
    {list.map(item => {

      let noteClass = item.id === current ? 
        "note p-1 border border-info shadow bg-white currentnote mb-1" 
      : "note p-1 border border-info border-2 bg-white shadow-sm mb-1";

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
