import React, { Component} from "react";
import format from "date-fns/format";
import DatePicker from 'react-datepicker';
import BasicTableSelectFlight from "../tables/basicTableSelectFlight";
import BookingOverview from "./flightBooking";

import "react-datepicker/dist/react-datepicker.css";
import "./../../styles/Wrapper.css"
import './../../styles/table.css'

/*
Filter, der vom DatePicker aufgerufen wird.
Dieser Filter sorgt dafür, dass kein Datum vor dem aktuellen ausgewählt wird.
*/
const filterPassedTime = (time) => {
  const currentDate = new Date();
  const selectedDate = new Date(time);

  return currentDate.getTime() < selectedDate.getTime();
};


class FlightOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      port_start: [],
      port_dest: [],
      numbers: [1,2,3,4,5,6,7,8],
      origin_cca2: "",
      origin_port: "",
      destination_cca2: "",
      destination_port: "",
      time: new Date(),
      anzahlReisende: 1,
      flights: []
    };


    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleBooking = this.handleBooking.bind(this);
    this.getCountries = this.getCountries.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleStuff = this.handleStuff.bind(this);
    this.updatePorts = this.updatePorts.bind(this);
 
  }

  /*
  Sobald die Seite geladen wird:
  Alle Länder cca2-Codes vom Backend lasen
  */
  componentDidMount() {
    
    this.getCountries()

  }

  /*
  Funktion macht API request an Backend und speichert response in state ab.
  Laden der Länder cca2-Codes, welche als Grundlage für den DropDown-Select für den Nutzer gelten.
  */
  async getCountries() {

    const response = await fetch('/api/airports/country', {
      method: 'GET',
      headers: {'Content-Type': 'application/json', 'charset':'utf-8'}
    })

    let data = await response.json()

    if (response.status === 200) {
      this.setState({countries: data})
      this.setState({origin_cca2: data[0]})
      this.updatePorts("origin_cca2", data[0])
      this.setState({destination_cca2: data[0]})
      this.updatePorts("destination_cca2", data[0])
    } else {

      alert("Error: " + response.status + ". " + JSON.stringify(data))

    }
  }

  /*
  Primärer handler für die DropDown Menüs.
  Wenn eine Auswahl für das Origin/Destination-Land getroffen wurde, werden die Flughäfen für dieses Land aktuallisiert.

  e: Auslösender Event
  name: name des State, in dem die Daten gespeichert werden sollen.
  */
  handleStuff(e, name) {
    if (name === "destination_cca2" || name === "origin_cca2") {
      this.updatePorts(name, e.target.value)
    }
    this.setState({...this.state, [name]: e.target.value})
  }

  /*
  Methode zum Aktualisieren der im Übergeben Land verfügbaren Flughäfen.
  Stellt request an API und speichert Response im state.

  name: Name des state, in dem die neuen Daten gespeichert werden sollen.
  cca2: Länder-Code zu dem die Abfrage gestellt werden soll.
  */
  async updatePorts(name, cca2) {

    let toSubmit = {
      "country":cca2
    }

    const response = await fetch('/api/airports/search', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
      body: JSON.stringify(toSubmit)
    })
    
    const data = await response.json()

    if (name === "destination_cca2") {
      this.setState({port_dest: data})
      this.setState({destination_port: data[0].iata})
    } else {
      this.setState({port_start: data})
      this.setState({origin_port: data[0].iata})
    }
  }

  /*
  Handle Funktion zum Setzen des Abflugdatum im State durch DatePicker.
  */
  handleChangeStartDate(date) {
    this.setState({time: date})
  }

  
  /*
  Funktion zum Erhalten der verfügbaren Flüge nach Eingabe des Users.
  Sendet Eingabe-Daten aus state an API. Response wird in State (flights) gespeichert. flights ist Datengrundlage für die darstellende Tabelle
  */  
  async handleSubmit() {

    const selectedData = {

      "orig": this.state.origin_port,
      "dest": this.state.destination_port,
      "time": format(this.state.time, "yyyy-M-dd'T'hh:mm:ss'Z'")
      
    }

    const response = await fetch('/api/flights/search', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
      body: JSON.stringify(selectedData)
    })

    const data = await response.json()

    if (response.status === 200) {
      this.setState({flights: data})
    } else {
      alert("Error: " + response.status + ". " + JSON.stringify(data))
    }
  }

  /*
  Methode setzt ändert durch prop-Methoden den state in App.js
  Auf die Daten kann dann von der neu geöffneten Child-Componente BookingOverview zugegriffen werden.
  */
  handleBooking(e, data) {
    
    this.props.setFlight(data)
    this.props.setPassengerCount(this.state.anzahlReisende)
    this.props.setPage(e, BookingOverview)

  }

  /*
  Im ersten Teil des Render werden zuerst die jeweiligen Listen für die DropDown Menüs generiert
  */
  render () {

    const { port_start } = this.state;

    const { port_dest } = this.state; 

    const { countries } = this.state;

    const { numbers } = this.state;

    let numbersList = numbers.map((item, i) => {
      return (
        <option key={i} value={item}>{item}</option>
      )
    }, this);

    let countriesList = countries.map((item, i) => {
      return (
        <option key={i} value={item}>{item}</option>
      )
    })

    let portListOrigin = (this.state.port_start.length > 0 &&
      port_start.map((item, i) => {
        if (item.iata !== "" && item.name !== ""){
          return (
            <option key={i} value={item.iata}>{item.name}</option>
          )
        }
    }))
    
    let portListDest = (this.state.port_dest.length > 0 &&
      port_dest.map((item, i) => {
        if (item.iata !== "" && item.name !== ""){
          return (
            <option key={i} value={item.iata}>{item.name}</option>
          )
        }
    }))
    

    return (
      <div className='wrapper' style={{textAlign: "center"}}>
        <div>
          <div>
            In welchem Land wollen Sie starten:
            <br/>
            <select value={this.state.origin_cca2} onChange={(e) => this.handleStuff(e, "origin_cca2")}>
              {countriesList}
            </select>
            <br/>
            Von welchem Flughafen aus wollen Sie starten:
            <br/>
            <select value={this.state.origin_port} onChange={(e) => this.handleStuff(e, "origin_port")}>
              {portListOrigin}
            </select>
          </div>
          <br/>
          <div>
            In welchem Land wollen Sie landen:
            <br/>
            <select value={this.state.destination_cca2} onChange={(e) => this.handleStuff(e, "destination_cca2")}>
              {countriesList}
            </select>
            <br/>
            Bei welchem Flughafen wollen Sie landen:
            <br/>
            <select value={this.state.destination_port} onChange={(e) => this.handleStuff(e, "destination_port")}>
              {portListDest}
            </select>
          </div>
          <br/>
          <div>
            Anzahl an Reisenden:
          </div>
          <div>
            <select value={this.state.anzahlReisende} onChange={(e) => this.handleStuff(e, "anzahlReisende")}>
              {numbersList}
            </select>
          </div>
          <br/>
          <div>
            Wann wollen soll der Flug starten:
          </div>
          <div> 
            <DatePicker
                selected={this.state.time}
                onChange={(date) => this.handleChangeStartDate(date)}
                showTimeSelect
                timeFormat="hh:mm aa"
                timeIntervals={20}
                timeCaption="time"
                dateFormat="yyyy-M-dd hh:mm aa"
                minDate={new Date()}
                filterTime={filterPassedTime}
            />
          </div>
        </div>
        <br/>
        {/* Keine Ausgabevalidierung nötig, da dies von React automatisch übernommen wird
        <div>
          <p>Ausgewähltes Start-Land: {this.state.origin_cca2}</p>
          <p>Ausgewähltes Start-Flughafen: {this.state.origin_port}</p>
          <p>Ausgewähltes Ziel-Land: {this.state.destination_cca2}</p>
          <p>Ausgewähltes Ziel-Flughafe: {this.state.destination_port}</p>
          <p>Anzahl Passagiere: {this.state.anzahlReisende}</p>
          <p>Ausgewähltes Datum: {format(this.state.time, "yyyy-M-dd'T'hh:mm:ss'Z'")}</p>
        </div>
        */}
      <button onClick={() => this.handleSubmit()}>Nach Flug suchen</button> 
      <div style={{margin: 15}}>
        <BasicTableSelectFlight data={this.state.flights} setFlightID={this.handleBooking}/>
      </div>
    </div>
    );
  }
}

export default FlightOverview;