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

     this.captcha = null;

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
  async handleSubmit(token) {
    const toSubmit = {
      "username": this.state.username,
      "password": this.state.password,
      "recaptcha": token
    }

    const response = await fetch('/api/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
    body: JSON.stringify(toSubmit)
    })

    let data = await response.text();

    if (response.status === 200) {
      
      alert("Erfolgreich eingeloggt!")

    } else {

      alert("Error: " + response.status + ". " + data )

    }
    this.props.setPage("", startScreen)
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
          <button style={{width:200}} onClick={() => this.captcha.execute()}>Einloggen</button>
          <button style={{width:200}} type="submit" onClick={this.loadPasswordReset}>Password vergessen</button>
          <br/>

          <Recaptcha
            ref={e => this.captcha = e}
            sitekey="6LeoFpcdAAAAAEOiHWSsJmnOxx5i-nKfo8SXccG3"
            size="invisible"
            verifyCallback={this.handleSubmit}
          />

      </div>
    );
  }
}
 
export default Login;

/*
<Recaptcha
  sitekey="6LeTBkkdAAAAADLu8NW6AZXaGF2CfhXMxgviRX0U"
  render="explicit"
  verifyCallback={this.verifiyCaptcha}
/>

<script src="https://www.google.com/recaptcha/api.js" async defer></script>
<form id='demo-form' action="?" method="POST">
  <button class="g-recaptcha" data-sitekey="6LeoFpcdAAAAAEOiHWSsJmnOxx5i-nKfo8SXccG3" data-callback='setToken'>Submit</button>
  <br/>
</form>



          <script src="https://www.google.com/recaptcha/api.js" async defer></script>


          <div class="g-recaptcha"
            data-sitekey="6LeoFpcdAAAAAEOiHWSsJmnOxx5i-nKfo8SXccG3"
            data-callback="setToken"
            data-size="invisible">
          </div>
*/

