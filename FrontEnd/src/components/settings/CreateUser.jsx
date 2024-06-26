import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';

import '../../styles/Wrapper.css'
import startScreen from '../defaultScreens/startScreen';

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
            password_check: "",
            phone: "",
            credit_card: "",
            checked: false
         }

         this.captcha = null;

         this.handleChange = this.handleChange.bind(this);
         this.startRegistration = this.startRegistration.bind(this);
         this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    /*
    Funktion stellt API request zum registrieren des neuen Nutzers.
    Usereingaben aus State werden, wenn AGB aktzeptiert und Captcha durchgeführt, an API geschickt.
    Eingabevalidierung auf Seiten des Backend.
    */
    async startRegistration(token) {

        if (this.state.checked) {
            if (this.state.password === this.state.password_check) {
                const toSubmit = {
                    "first_name": this.state.first_name,
                    "last_name": this.state.last_name,
                    "username": this.state.username,
                    "email": this.state.email,
                    "password": this.state.password,
                    "phone": this.state.phone,
                    "credit_card": this.state.credit_card,
                    "recaptcha": token,
                    "agb": this.state.checked
                }
                
                const resp = await fetch('/api/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
                body: JSON.stringify(toSubmit)
                })

                let data = await resp.text();
                
                if( data === "Created"){
                    alert("Benutzer wurde erstellt")

                } else {
                    alert("Error: " + resp.status + ". " + data)
                }
            } else {
                alert("Ihre Passwörter stimmen nicht überein!")
            }
        } else {
            alert("Bitte AGB aktzeptieren!")
        }
        
        this.props.setPage("", startScreen)

    }

    /*
    Methode zum Erfassen, ob AGB aktzeptiert wurden
    */
    handleCheckbox() {
        this.setState({checked: !this.state.checked});
    }

    /*
    Primäre Handle-Funktion für Input Felder.
    Daten werden anhand von Event-Daten direkt in State gespeichert.
    Eingabevalidierung später auf Seiten des Backend
    */
    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value})
    }

    render() { 
        return ( 
        <div className="wrapper">
            <h1>Neuen Benutzer erstellen</h1>
            Anforderungen an das neue Passwort: mindestens 8 Zeichen lang, ein Groß/Kleinbuchstabe
            <form>
                <div>
                    <input
                        type="text"
                        name="first_name"            
                        value={this.state.first_name}           
                        onChange={this.handleChange}
                        placeholder="Vorname"
                    />
                </div>{" "}
                <div>                    
                    <input            
                        type="text"            
                        name="last_name"           
                        value={this.state.last_name}            
                        onChange={this.handleChange}  
                        placeholder="Nachname"        
                    />        
                </div>
                <div>                   
                    <input            
                        type="text"            
                        name="username"           
                        value={this.state.username}            
                        onChange={this.handleChange} 
                        placeholder="Username"         
                    />        
                </div>     
                <div>                
                    <input            
                        type="email"            
                        name="email"           
                        value={this.state.email}            
                        onChange={this.handleChange}     
                        placeholder="Email-Adresse"     
                    />        
                </div>     
                <div>               
                    <input            
                        type="password"            
                        name="password"           
                        value={this.state.password}            
                        onChange={this.handleChange}  
                        placeholder="Passwort"        
                    />        
                </div><div>                   
                    <input            
                        type="password"            
                        name="password_check"           
                        value={this.state.password_check}            
                        onChange={this.handleChange}   
                        placeholder="Passwort bestätigen"       
                    />        
                </div>
                <div>                    
                    <input            
                        type="text"            
                        name="phone"           
                        value={this.state.phone}            
                        onChange={this.handleChange}  
                        placeholder="Telefonnummer"       
                    />        
                </div>     
                <div>                
                    <input            
                        type="text"            
                        name="credit_card"           
                        value={this.state.credit_card}            
                        onChange={this.handleChange}        
                        placeholder="Kreditkartennummer"  
                    />        
                </div>      
            </form>
            
            <label>
                {"Ich habe die AGB gelesen und aktzeptiert  "}
                <input
                    type="checkbox"
                    checked={this.state.checked}
                    onChange={() => this.handleCheckbox()}
                />
            </label>

            <Recaptcha
                ref={e => this.captcha = e}
                sitekey="6LeoFpcdAAAAAEOiHWSsJmnOxx5i-nKfo8SXccG3"
                size="invisible"
                verifyCallback={this.startRegistration}
            />

            <button onClick={() => this.captcha.execute()}>Registrieren</button>
        </div> 
        );
            
    }
}
 
export default CreateUser;

