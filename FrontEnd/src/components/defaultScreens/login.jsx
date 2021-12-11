import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';

import startScreen from './startScreen';
import resetInterface from '../settings/ResetPassword';

import "../../styles/Wrapper.css"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: "",
      password: "",
      isVerified: false,
      isLoggedIn: false
     }

     this.handleSubmit = this.handleSubmit.bind(this);
     this.verifiyCaptcha = this.verifiyCaptcha.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.loadPasswordReset = this.loadPasswordReset.bind(this);
  }

  verifiyCaptcha() {
    this.setState({isVerified: !this.state.isVerified})
  }

  loadPasswordReset(){

    this.props.setPage("", resetInterface)

  }

  handleChange(e) {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }
  
  /*
  Funktion zum handlen des Login-Submit. Mit Login-Button verknüpft.
  Macht API call und übermittelt Eingabe vom User.
  Eingabeüberprüfung auf Seiten des Backend
  */
  async handleSubmit() {

    if (this.state.isVerified){
    
      const toSubmit = {
        "username": this.state.username,
        "password": this.state.password
      }

      const response = await fetch('/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
      body: JSON.stringify(toSubmit)
      })

      let data = await response.text();

      if (response.status === 200) {
        alert("Erfolgreich eingeloggt!")
        this.props.setPage("", startScreen)
      } else {

        alert("Error: " + response.status + ". " + data )

      }
    
    } else {
      alert("Bitte Captcha durchführen!")
    }
    
  }

  render() { 
    return ( 
      <div className="wrapper">
        <h1>Login</h1>
          <div>
            <input name="username" type="text" placeholder="Username" onChange={(e) => this.handleChange(e)}/>  
            <br/> 
            <input name="password" type="password" placeholder="Passwort" onChange={(e) => this.handleChange(e)}/>
          </div>
          <br/>
          <button type="submit" onClick={this.handleSubmit}>Einloggen</button>
          <button type="submit" onClick={this.loadPasswordReset}>Password vergessen</button>
          <br/>
          <Recaptcha
            sitekey="6LeTBkkdAAAAADLu8NW6AZXaGF2CfhXMxgviRX0U"
            render="explicit"
            verifyCallback={this.verifiyCaptcha}
          />
          
      </div>
    );
  }
}
 
export default Login;
