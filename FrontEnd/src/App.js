import React, { Fragment } from 'react';

import BasicScreen from './components/defaultScreens/startScreen';
import LoginScreen from './components/defaultScreens/login';
import FlightOverview from "./components/flight/flightOverview";
import CreateUser from "./components/settings/CreateUser";
import SettingsAdmin from "./components/settings/SettingsAdmin";
import SettingsUser from "./components/settings/SettingsUser";
import AGB from "./components/defaultScreens/agb";
import Impressum from "./components/defaultScreens/impressum";

import './styles/App.css'
import startScreen from './components/defaultScreens/startScreen';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      primePage: BasicScreen,
      flightToBook: {},
      countPassengers: 1,
      isLoggedIn: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.onButtonClicked = this.onButtonClicked.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
    this.setFlight = this.setFlight.bind(this);
    this.setPassengerCount = this.setPassengerCount.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  handleChange(date) {
    this.setState({startDate: date})
  }

  setFlight(data) {

    this.setState({flightToBook: data})

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

    if (resp.status === 200){
      if ( data === "true") {
        this.setState({ primePage: SettingsAdmin })
      } else {
        this.setState({ primePage: SettingsUser })
      }
    } else {
      alert("Bitte loggen Sie sich ein!")
    }
    
  }

  onButtonClicked(e, toOpen){
    this.setState({ primePage: toOpen})
  }

  logOut() {

    document.cookie = "jwt="
    this.setState({primePage: startScreen})
    alert("Sie wurden ausgeloggt!")

  }

  render() { 
    return( 
      <>
      
        <title>FluegelsFluege</title>
        <div className="app-bar" style={{ font: 'bold'}}>
          <h1 className="app-bar-title">Flügels Flüge</h1>
          <h4 className="app-bar-title-low">Wir haltens simpel</h4>
        </div>
        <div className="app-section container">
          <Content 
            clickHandler = {this.onButtonClicked} 
            clickHandlerSettings = {this.handleSettings}
            clickHandlerLogin = {this.handleLogin}
            clickHandlerLoggout = {this.logOut}
          />
        </div>
 

        <div className="wrapper" style={{margin: 15}}>
          {React.createElement(
            this.state.primePage, {
              checkLogin: this.isLoggedIn,
              setPage: this.onButtonClicked, 
              setFlight: this.setFlight, 
              setPassengerCount: this.setPassengerCount,
              flightData: this.state.flightToBook,
              passengerCount: this.state.countPassengers
              })}
        </div>

    </>

  )}
}


class Content extends React.Component {
  render() { 
    return (
      <>
        <div class={"center"} style={{flex: 1, flexDirection: 'column'}}>
          <button onClick = {(e) => this.props.clickHandler(e, LoginScreen)}>Login</button>
        </div>
        <div class={"center"}>
          <button onClick = {() => this.props.clickHandlerLoggout()}>Logout</button>
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