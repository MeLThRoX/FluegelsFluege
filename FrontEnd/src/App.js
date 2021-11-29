import React, { Fragment } from 'react';

import BasicScreen from './components/startScreen';
import LoginScreen from './components/login';
import FlightOverview from "./components/flightOverview";
import CreateUser from "./components/CreateUser";
import SettingsAdmin from "./components/SettingsAdmin";
import SettingsUser from "./components/SettingsUser";
import AGB from "./components/agb";
import Impressum from "./components/impressum";

import './App.css'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      primePage: BasicScreen,
      flighIdtToBook: "",
      countPassengers: 1
    };

    this.handleChange = this.handleChange.bind(this);
    this.onButtonClicked = this.onButtonClicked.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
    this.setFlightID = this.setFlightID.bind(this);
    this.setPassengerCount = this.setPassengerCount.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  setFlightID(ID) {
    this.setState({flighIdtToBook: ID})
  }

  setPassengerCount(newCount) {
    this.setState({countPassengers: newCount})
  }

  async handleSettings(e) {

    const resp = await fetch('/api/user/isadmin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'charset':'utf-8'}
    })

    const data = await resp.text();

    if ( data === "true") {
      this.setState({ primePage: SettingsAdmin })
    } else {
      this.setState({ primePage: SettingsUser })
    }
  }

  onButtonClicked(e, toOpen){
    this.setState({ primePage: toOpen})
  }

  async handleLogin() {

    let resp = await fetch('/api/user', {
      method: 'GET',
      headers: {'Content-Type': 'application/json', 'charset':'utf-8'}
    })

    if(resp.status === 401) {
      this.setState({primePage: LoginScreen})
    } else if (resp.status === 200){
      alert("Error: " + resp.status + "\n Sie sind evtl. schon eingeloggt.")
    }
  }

  render() { 
    return( 
    <Fragment>
      <div className="app-bar" style={{ font: 'bold'}}>
        <h1 className="app-bar-title">Flügels Flüge</h1>
        <h4 className="app-bar-title-low">Wir haltens simpel</h4>
      </div>

      <section className="app-section container">
        <Content 
          clickHandler = {this.onButtonClicked} 
          clickHandlerSettings = {this.handleSettings}
          clickHandlerLogin = {this.handleLogin}
        />
        <div className="chosen-Page" style={{margin: 15}}>
          {React.createElement(
            this.state.primePage, {
              setPage: this.onButtonClicked, 
              setFlightID: this.setFlightID, 
              setPassengerCount: this.setPassengerCount, 
              flightID: this.state.flighIdtToBook,
              passengerCount: this.state.countPassengers
              })}
        </div>
      </section>
    </Fragment>

  )}
}


class Content extends React.Component {
  render() { 
    return (
      <>
        <div class={"center"} style={{flex: 1, flexDirection: 'column'}}>
          <button onClick = {() => this.props.clickHandlerLogin()}>Zum Login</button>
        </div>
        <div class={"center"}>
          <button onClick = {(e) => this.props.clickHandler(e, CreateUser)}>Benutzer Erstellen</button>
        </div>
        <div class={"center"}>
          <button onClick = {() => this.props.clickHandlerSettings()}>Einstellungen/Verwaltung</button>
        </div>
        <div class={"center"}>
          <button onClick = {(e) => this.props.clickHandler(e, FlightOverview)}>Zu den Flügen</button>
        </div>
        <div style={{margin:10}}></div>
        <div class={"center"}>
          <button onClick = {(e) => this.props.clickHandler(e, AGB)}>AGB</button>
        </div>
        <div class={"center"}>
          <button onClick = {(e) => this.props.clickHandler(e, Impressum)}>Impressum</button>
        </div>
      </>
    );
  }
}
 
export default App;