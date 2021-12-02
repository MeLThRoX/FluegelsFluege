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
      flighIdtToBook: "",
      countPassengers: 1,
      isLoggedIn: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.onButtonClicked = this.onButtonClicked.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
    this.setFlightID = this.setFlightID.bind(this);
    this.setPassengerCount = this.setPassengerCount.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.logOut = this.logOut.bind(this);
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

  handleLogin() {

    this.setState({primePage: LoginScreen})

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
          clickHandlerLoggout = {this.logOut}
        />
        <div className="chosen-Page" style={{margin: 15}}>
          {React.createElement(
            this.state.primePage, {
              checkLogin: this.isLoggedIn,
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
          <button onClick = {() => this.props.clickHandlerLogin()}>Login</button>
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