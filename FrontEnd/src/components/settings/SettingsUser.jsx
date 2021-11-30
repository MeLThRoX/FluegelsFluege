import React, { Component } from 'react';
import BasicTableNoSelectFlight from '../tables/basicTableNoSelectFlight';

import '../../styles/Wrapper.css'

class SettingsUser extends Component {
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
            booked_flights: []
        }

        this.updateUserdata= this.updateUserdata.bind(this);
        this.getAndSetCurrentData = this.getAndSetCurrentData.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    async getCurrentFlights() {

        //Flugdaten zu ids ausgeben für tabelle

    }

    // TODO - gibt keine Flights zurück - wollen wir das so lassen?
    /*
    Daten des zur Zeit eingeloggten Users werden von Backend abgefragt, um diese dann in Input-Feld dazustellen.
    Response Daten werden in state gespeichert und von da aus dargestellt
    */
    async getAndSetCurrentData() {

        const response = await fetch('/api/user', {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
        })

        if (response.status === 200 || response.status === 304) {
            const data = await response.json()

            this.setState({first_name: data.first_name})
            this.setState({last_name: data.last_name})
            this.setState({username: data.username})
            this.setState({email: data.email})
            this.setState({phone: data.phone})
            this.setState({credit_card: data.credit_card})
        }
        
    }

    /*
    Sobald die Seite geladen wird müssen die Daten des Users und seine aktuellen Flüge geladen werden
    */
    componentDidMount() {

        this.getAndSetCurrentData()

        //<getCurrentFlights />
 
    }

    /*
    Usereingaben werden an das Backend übermittelt und in Datenbank gespeichert.
    Falls keine Änderungen vom User getroffen wurde, werden seine aktuellen Daten übermittelt.
    Damit der Request an die API geschickt wird, müssen die eingegebenen Passwörtet übereinstimmen.
    */
    async updateUserdata() {

        if (this.state.password === this.state.password_check) {
            const toSubmit = {
                "first_name": this.state.first_name,
                "last_name": this.state.last_name,
                "username": this.state.username,
                "email": this.state.email,
                "password": this.state.password,
                "phone": this.state.phone,
                "credit_card": this.state.credit_card
                }

            const response = await fetch('/api/user', {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
                boby: JSON.stringify(toSubmit)
            })

            const data = await response.text();

            if (data === "OK") {
                alert("Daten erfolgreich geändert!")
            }else{
                alert("Error: " + response.status)
            }

        } else {
            alert("Ihre eingegebenen Passwörter stimmen nicht überein!")
        }
    }

    render() { 
        return ( 
        <div className="wrapper">
            Daten anpassen. Feld leer lassen, wenn nichts angepasst werden soll.
            <div>
            <input
                type="text"
                name="new_first_name"            
                value={this.state.first_name}           
                onChange={this.handleChange}
                placeholder="Vorname"
            />
            </div>{" "}
            <div>                    
                <input            
                    type="text"            
                    name="new_last_name"           
                    value={this.state.last_name}            
                    onChange={this.handleChange}  
                    placeholder="Nachname"        
                />        
            </div>
            <div>                   
                <input            
                    type="text"            
                    name="new_username"           
                    value={this.state.username}            
                    onChange={this.handleChange} 
                    placeholder="Username"         
                />        
            </div>     
            <div>                
                <input            
                    type="email"            
                    name="new_email"           
                    value={this.state.email}            
                    onChange={this.handleChange}     
                    placeholder="Email-Adresse"     
                />        
            </div>     
            <div>               
                <input            
                    type="password"            
                    name="new_password"           
                    value={this.state.password}            
                    onChange={this.handleChange}  
                    placeholder="Passwort"        
                />        
            </div><div>                   
                <input            
                    type="password"            
                    name="new_password_check"           
                    value={this.state.password_check}            
                    onChange={this.handleChange}   
                    placeholder="Passwort bestätigen"       
                />        
            </div>
            <div>                    
                <input            
                    type="text"            
                    name="new_phone"           
                    value={this.state.phone}            
                    onChange={this.handleChange}  
                    placeholder="Telefonnummer"       
                />        
            </div>     
            <div>                
                <input            
                    type="text"            
                    name="new_credit_card"           
                    value={this.state.credit_card}            
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