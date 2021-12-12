import React, { Component } from 'react';
import '../../styles/Wrapper.css'

class resetInterface extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            newPassword: "",
            newPasswordCheck: ""
         }

         this.captcha = null;

         this.handleChange = this.handleChange.bind(this);
         this.setNewPassword = this.setNewPassword.bind(this);

    }

    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value})
    }

    async setNewPassword(token) {

        if (this.state.newPassword === this.state.newPasswordCheck) {

            let toSubmit = {
                "email": this.state.email,
                "password": this.state.newPassword,
                "recaptcha": token
            }

            const response = await fetch('/api/reset_password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
            body: JSON.stringify(toSubmit)
            })
    
            let data = await response.text()
        
            if (response.status === 200) {
                alert("Bitte folgen Sie den Anweisungen in der Email, die Sie gleich erhalten werden.")
            } else {
                alert("Error Code: " + response.status + ". " + data)
            }

        } else {
            alert("Ihre eingegeben Passwörter stimmen nicht überein")
        }
    }

    render() { 
        return ( 
        <div className='wrapper'>

            Bitte geben Sie Ihre Email-Adresse und Ihr neues Passwort ein.
            <br/>
            Das Passwort wird erst übernommen, wenn Sie den Link in der Bestätigungs-Email klicken.

            <br/>
            <div>
                <input 
                    
                    type="text" 
                    placeholder="Email" 
                    name ='email'
                    value={this.state.email}
                    onChange={this.handleChange}
                />
            </div> 
            <div>
                <input 
                    
                    type="password" 
                    placeholder="Neues Password" 
                    name ='newPassword'
                    value={this.state.newPassword}
                    onChange={this.handleChange}
                />
            </div> 
            <div>
                <input 
                    
                    type="password" 
                    placeholder="Neues Password bestätigen" 
                    name ='newPasswordCheck'
                    value={this.state.newPasswordCheck}
                    onChange={this.handleChange}
                />
            </div> 
            <button onClick={() => this.captcha.execute()}>Neues Passwort setzen</button>

            <Recaptcha
                ref={e => this.captcha = e}
                sitekey="6LeoFpcdAAAAAEOiHWSsJmnOxx5i-nKfo8SXccG3"
                size="invisible"
                verifyCallback={this.setNewPassword}
            />

        </div>
         );
    }
}
 
export default resetInterface;
/*
style={{marginLeft: '20%',width: '60%'}} 
*/