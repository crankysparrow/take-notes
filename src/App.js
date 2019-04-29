import React, { Component } from 'react';
import './App.css';

var para1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Vitae auctor eu augue ut lectus arcu. Suscipit tellus mauris a diam maecenas sed. Nunc scelerisque viverra mauris in aliquam sem. In hendrerit gravida rutrum quisque. Aliquam malesuada bibendum arcu vitae. Sed cras ornare arcu dui vivamus arcu felis. Eget lorem dolor sed viverra ipsum nunc. Ut pharetra sit amet aliquam id diam. Venenatis urna cursus eget nunc scelerisque. Quis auctor elit sed vulputate mi. Lobortis scelerisque fermentum dui faucibus in ornare. Et magnis dis parturient montes nascetur ridiculus mus mauris. Ut morbi tincidunt augue interdum. Viverra accumsan in nisl nisi scelerisque eu. Turpis egestas sed tempus urna et pharetra pharetra. Gravida arcu ac tortor dignissim convallis.';
var para2 = 'Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Viverra orci sagittis eu volutpat odio facilisis. Blandit cursus risus at ultrices mi tempus. Nunc mattis enim ut tellus elementum. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Augue eget arcu dictum varius duis at consectetur. Metus dictum at tempor commodo ullamcorper a. Nec feugiat in fermentum posuere urna nec tincidunt praesent. Arcu dictum varius duis at consectetur. Libero justo laoreet sit amet cursus. Libero justo laoreet sit amet cursus sit amet dictum.';
var notesList = [
  {
    info: para1,
    id: 0,
  },
  {
    info: para2,
    id: 1,
  },
];

let firstType = true;


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notesList,
      firstType,
      textValue: '',
      currentID: -1,
    }

    this.onType = this.onType.bind(this);
    this.newButton = this.newButton.bind(this);
    this.displayNote = this.displayNote.bind(this);
  }


  onType(event) {
    let list = this.state.notesList;

    if (this.state.currentID === -1){
      let id = list.length;
      let newNote = {id: id,};
      list.push(newNote);
      this.setState({currentID: id});
    }

    for (let item of list) {
      if (item.id === this.state.currentID){
        item.info = event.target.value;
      }
    }

    this.setState({ 
      textValue: event.target.value, 
      notesList: list ,
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

  render() {
    return (
      <div className="app container py-3">

        <div className="row justify-content-end border-bottom">
            <div className="col-auto">
            <Button onClick={this.newButton} 
          children='New Note' />
          </div>
        </div>

        <div className="row">
          <div className="col-4 border-right">
            <div className="notes d-flex flex-column">
              {this.state.notesList.map(item => 
                <div className="note mt-1 p-1 border rounded"
                  onClick={() => this.displayNote(item)}>
                  {item.info}
                </div>
              )}
            </div>
          </div>
          
          <div className="col">
            <textarea className="text form-control" 
              value={this.state.textValue} 
              onChange={this.onType}>
            </textarea>
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

const List = ({list, onNoteClick}) => 
  <div className="notes d-flex flex-column">
    {list.map(item => 
      <div className="note mt-1 p-1 border rounded"
        onClick={() => onNoteClick(item)}>
      {item.info}
      </div>
    )}
  </div>


export default App;
