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

         this.handleChange = this.handleChange.bind(this);
         this.setNewPassword = this.setNewPassword.bind(this);

    }

    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value})
    }

    setNewPassword() {

        if (this.state.newPassword === this.state.newPasswordCheck) {

            //submit
            alert("Ihre eingegeben Passwörter stimmen nicht überein")

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
            <button onClick={() => this.setNewPassword()}>Neues Passwort setzen</button>
        </div>
         );
    }
}
 
export default resetInterface;
/*
style={{marginLeft: '20%',width: '60%'}} 
*/