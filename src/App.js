import React, { Component } from 'react';
import './App.css';

var para1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Vitae auctor eu augue ut lectus arcu. Suscipit tellus mauris a diam maecenas sed. Nunc scelerisque viverra mauris in aliquam sem. In hendrerit gravida rutrum quisque. Aliquam malesuada bibendum arcu vitae. Sed cras ornare arcu dui vivamus arcu felis. Eget lorem dolor sed viverra ipsum nunc. Ut pharetra sit amet aliquam id diam. Venenatis urna cursus eget nunc scelerisque. Quis auctor elit sed vulputate mi. Lobortis scelerisque fermentum dui faucibus in ornare. Et magnis dis parturient montes nascetur ridiculus mus mauris. Ut morbi tincidunt augue interdum. Viverra accumsan in nisl nisi scelerisque eu. Turpis egestas sed tempus urna et pharetra pharetra. Gravida arcu ac tortor dignissim convallis.';
var para2 = 'Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Viverra orci sagittis eu volutpat odio facilisis. Blandit cursus risus at ultrices mi tempus. Nunc mattis enim ut tellus elementum. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Augue eget arcu dictum varius duis at consectetur. Metus dictum at tempor commodo ullamcorper a. Nec feugiat in fermentum posuere urna nec tincidunt praesent. Arcu dictum varius duis at consectetur. Libero justo laoreet sit amet cursus. Libero justo laoreet sit amet cursus sit amet dictum.';
const notesList = [
  {
    info: para1,
      // <div>
      //   <p>Lobortis nibh lobortis diam, quis dui nostra sem pretium conubia.</p><p>Suscipit facilisis vitae nisi pulvinar sagittis risus dui curae; nulla.</p><p>Tempus augue, tellus volutpat aliquam curabitur tincidunt dis curabitur curabitur?</p><p>Justo suspendisse lacus leo parturient praesent gravida, mattis maecenas mollis.</p><p>Nascetur interdum urna risus lobortis himenaeos duis sociosqu augue vitae.</p>
      // </div>,
  },
  {
    info: para2,
      // <div>
      //   <p>Claydol simipour bisharp sewaddle hitmontop seismitoad. Cacturne gothitelle caterpie vigoroth pawniard munchlax tornadus scyther tynamo zapdos. Spinda cottonee lapras nincada igglybuff sewaddle. Kingler moltres ledian chinchou empoleon hitmonchan beartic lillipup machamp wingull turtwig zweilous. Starly mantine jirachi raikou; leafeon aipom vanillish nidorino dialga vibrava? Plusle karrablast voltorb emolga beldum snubbull gabite sneasel cottonee bronzor bulbasaur barboach. Piplup tirtouga eelektross gurdurr, blaziken lillipup. Donphan aron, trubbish elekid quilava gorebyss. Lileep kangaskhan corsola jellicent victini vigoroth riolu samurott entei. Gothitelle, bronzor flygon and. Golurk sceptile chikorita cottonee piloswine!</p><p>Bibarel reuniclus mantyke luxray spinarak clefairy garchomp anorith turtwig spheal sudowoodo. Banette darmanitan dwebble lucario aron regigigas fraxure dratini piloswine cherubi lickitung shinx. Aron dunsparce luvdisc landorus elgyem abomasnow snivy seel carnivine. Exeggutor zangoose goldeen onix rhydon granbull torchic sawk swadloon duskull probopass slowpoke. Metagross crobat, jolteon jolteon carnivine. Riolu pikachu frillish groudon victreebel noctowl rhyperior duskull hydreigon bayleef ambipom roserade. Sentret sawk, sunkern butterfree togekiss a regigigas?</p>
      // </div>,
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
    }

    this.onType = this.onType.bind(this);
    this.newButton = this.newButton.bind(this);
  }


  onType(event) {
    let list = this.state.notesList;

    if (this.state.firstType){
      let newNote = {};
      list.push(newNote);
      this.setState({firstType: false});
    }

    list[list.length-1].info = event.target.value;
    this.setState({ 
      textValue: event.target.value, 
      notesList: list ,
    });
  }

  newButton(){
    this.setState({
      textValue: '',
      firstType: true,
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
            <List list={this.state.notesList} />
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

const List = ({list}) => 
  <div className="notes d-flex flex-column">
    {list.map(item => 
      <div className="note mt-1 p-1 border rounded">
      {item.info}
      </div>
    )}
  </div>


export default App;
