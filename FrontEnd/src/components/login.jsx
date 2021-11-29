import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';

import startScreen from './startScreen';

import "./Wrapper.css"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: "",
      password: "",
      isVerified: false,
      isLoggedIn: false
     }

     this.setUserName = this.setUserName.bind(this);
     this.setPassword = this.setPassword.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.verifiyCaptcha = this.verifiyCaptcha.bind(this);
     this.captchaLoaded = this.captchaLoaded.bind(this);
  }

  verifiyCaptcha() {
    this.setState({isVerified: true})
  }

  captchaLoaded() {
      console.log("Captcha has loaded.")
  }

  setUserName(event) {
    this.setState({username: event.target.value});
  }

  setPassword(event) {
    this.setState({password: event.target.value});
  }

  async handleSubmit(event) {
    
    const toSubmit = {
      "username": this.state.username,
      "password": this.state.password
    }

    const response = await fetch('/api/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
    body: JSON.stringify(toSubmit)
    })

    if (response.ok) {
      alert("Erfolgreich eingeloggt!")
      this.props.setPage("", startScreen)
    } else {
      alert("Error: " + response.status)
    }
    
    
  }

  render() { 
    return ( 
      <div className="wrapper">
        <h1>Login</h1>
          <div>
            
            <input style={{marginLeft: '20%',width: '60%'}} type="text" placeholder="Username" onChange={this.setUserName}/>   
            <input style={{marginLeft: '20%',width: '60%'}} type="password" placeholder="Passwort" onChange={this.setPassword}/>

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
