import React, { Component } from 'react';
import './App.css';

let notesList = JSON.parse(localStorage.getItem('list')) || [];

let firstType = true;

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
      textValue: '',
      IDList,
      currentID: -1,
    }

    this.onType = this.onType.bind(this);
    this.newButton = this.newButton.bind(this);
    this.displayNote = this.displayNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }


  onType(event) {
    let list = this.state.notesList;
    let IDList = this.state.IDList;
    let current = this.state.currentID;

    if (current === -1){
      let id = list.length;
      while (IDList.includes(id)){
        id++;
      }
      let newNote = {id: id,};
      IDList.push(id);
      list.push(newNote);
      current = id;
    }

    for (let item of list) {
      if (item.id === current){
        item.info = event.target.value;
      }
    }

    localStorage.setItem('list', JSON.stringify(list));
    console.log(localStorage);

    this.setState({ 
      notesList: list,
      currentID: current,
      IDList: IDList,
      textValue: event.target.value, 
    });
  }

  newButton(){
    this.setState({
      textValue: '',
      currentID: -1,
    })
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
    console.log(this.state.IDList);
    return (
      <div className="app container d-flex flex-column">
        
        <div className="row d-flex justify-content-end border-bottom py-2">
              <div className="col-auto">
                <Button onClick={this.newButton} 
                children='New Note' />
                <Button onClick={this.deleteNote}
                children='Delete Current Note' />
              </div>
        </div>

          <div className="row flex-grow-1">

            <div className="col-4 border-right px-0">
              <List onClick={this.displayNote}
                list={this.state.notesList} />
            </div>
            
            <div className="col">
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

const List = ({list, onClick}) =>
  <div className = 'notes d-flex flex-column px-0'>
    {list.map(item =>
      <div className="note mt-1 mx-0 px-1 border-bottom"
        onClick={() => onClick(item)}>
        {item.info}
      </div>
      )}
  </div>

export default App;
