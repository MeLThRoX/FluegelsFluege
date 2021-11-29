import React, { Component } from 'react';

import BasicTableNoSelectFlight from './basicTableNoSelectFlight';

import './Wrapper.css'

class SettingsUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            new_first_name: "",
            new_last_name: "",
            new_username: "",
            new_email: "",
            new_password: "",
            new_password_check: "",
            new_phone: "",
            new_credit_card: "",
            booked_flights: []
        }

        this.updateUserdata= this.updateUserdata.bind(this);
    }

    async getCurrentFlights() {

        //Alle gebuchten Flüge per Nutzer_ID

    }

    componentDidMount() {

        //<getCurrentFlights />

    }

    async updateUserdata() {

        /*
        // TODO
        const response = await fetch('/api/user/read', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
            body: JSON.stringify(toSearch)
        })

        const data = await response.text();

        alert(data);
*/
    }

    render() { 
        return ( 
        <div className="wrapper">
            Daten anpassen. Feld leer lassen, wenn nichts angepasst werden soll.
            <div>
            <input
                type="text"
                name="new_first_name"            
                value={this.state.new_first_name}           
                onChange={this.handleChange}
                placeholder="Vorname"
            />
            </div>{" "}
            <div>                    
                <input            
                    type="text"            
                    name="new_last_name"           
                    value={this.state.new_last_name}            
                    onChange={this.handleChange}  
                    placeholder="Nachname"        
                />        
            </div>
            <div>                   
                <input            
                    type="text"            
                    name="new_username"           
                    value={this.state.new_username}            
                    onChange={this.handleChange} 
                    placeholder="Username"         
                />        
            </div>     
            <div>                
                <input            
                    type="email"            
                    name="new_email"           
                    value={this.state.new_email}            
                    onChange={this.handleChange}     
                    placeholder="Email-Adresse"     
                />        
            </div>     
            <div>               
                <input            
                    type="password"            
                    name="new_password"           
                    value={this.state.new_password}            
                    onChange={this.handleChange}  
                    placeholder="Passwort"        
                />        
            </div><div>                   
                <input            
                    type="password"            
                    name="new_password_check"           
                    value={this.state.new_password_check}            
                    onChange={this.handleChange}   
                    placeholder="Passwort bestätigen"       
                />        
            </div>
            <div>                    
                <input            
                    type="text"            
                    name="new_phone"           
                    value={this.state.new_phone}            
                    onChange={this.handleChange}  
                    placeholder="Telefonnummer"       
                />        
            </div>     
            <div>                
                <input            
                    type="text"            
                    name="new_credit_card"           
                    value={this.state.new_credit_card}            
                    onChange={this.handleChange}        
                    placeholder="Kreditkartennummer"  
                />        
            </div>  
            <button onClick={() => this.updateUserdata()}>Daten updaten</button>     
            
            <div style={{margin: 15}}>
                Übersicht zu gebuchten Flügen:
                <BasicTableNoSelectFlight data={this.state.booked_flights}/>
            </div>
        </div> 
        );
    }
}
 
export default SettingsUser;