import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';

import startScreen from './startScreen';

import "../../styles/Wrapper.css"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: "",
      password: "",
      isVerified: false,
      isLoggedIn: false,
      countFalse: 0
     }

     this.handleSubmit = this.handleSubmit.bind(this);
     this.verifiyCaptcha = this.verifiyCaptcha.bind(this);
     this.handleChange = this.handleChange.bind(this);
  }

  verifiyCaptcha() {
    this.setState({isVerified: !this.state.isVerified})
  }

  handleChange(e) {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }
  
  /*
  Funktion zum handlen des Login-Submit. Mit Login-Button verknüpft.
  Macht API call und übermittelt Eingabe vom User.
  Eingabeüberprüfung auf Seiten des Backend
  */
  async handleSubmit(event) {

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

      if (response.status === 200) {
        alert("Erfolgreich eingeloggt!")
        this.props.setPage("", startScreen)
      } else {
        alert("Error: " + response.status)
        this.setState({countFalse: this.state.countFalse + 1})

        if (this.state.countFalse > 2) {
          this.props.setPage("",startScreen)
        }

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
          <button type="submit" onClick={this.handleSubmit}>Einloggen</button>

          <Recaptcha
            sitekey="6LeTBkkdAAAAADLu8NW6AZXaGF2CfhXMxgviRX0U"
            render="explicit"
            onloadCallback={this.captchaLoaded}
            verifyCallback={this.verifiyCaptcha}
          />
          
      </div>
    );
  }
}
 
export default Login;
