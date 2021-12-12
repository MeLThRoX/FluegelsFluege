import React, { Component } from 'react';
import BasicTableNoSelectPassangers from '../tables/basicTableNoSelectFlight';
import BasicTableShowFlights from '../tables/basicTableShowFlights';

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
            booked_flights: [],

            numberChanged: false,

            flightIDtoSearch: "",
            flightsOverview: []
        }

        this.updateUserdata= this.updateUserdata.bind(this);
        this.getAndSetCurrentData = this.getAndSetCurrentData.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

/*
    Primäre-Handle Funktion für User-Input. 
    Wird von Eingabefeldern direkt in State gespeichert.
    */
    handleChange(e) {

        if(e.target.name === "credit_card"){
            this.setState({credit_card: true})
        }

        this.setState({...this.state, [e.target.name]: e.target.value})
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

        const data = await response.json()

        if (response.status === 200 || response.status === 304) {
            
            this.setState({first_name: data.first_name})
            this.setState({last_name: data.last_name})
            this.setState({username: data.username})
            this.setState({email: data.email})
            this.setState({phone: data.phone})
            this.setState({credit_card: data.credit_card})
            
            if (Object.keys(data).length > 7) {
                this.setState({booked_flights: data.tickets})
            }
        } else {

            alert("Error: " + response.status + ". " + JSON.stringify(data))

        }    
    }

    /*
    Sobald die Seite geladen wird müssen die Daten des Users und seine aktuellen Flüge geladen werden
    */
    componentDidMount() {

        this.getAndSetCurrentData()

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
                "phone": this.state.phone
                }

            if (this.state.numberChanged) toSubmit["credit_card"] = this.state.credit_card;
            if (this.state.password !== "") toSubmit["password"] = this.state.password;

            alert(JSON.stringify(toSubmit))

            const response = await fetch('/api/user', {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
                boby: JSON.stringify(toSubmit)
            })

            const data = await response.text();

            if (data === "OK") {
                alert("Daten erfolgreich geändert!")
            }else{
                alert("Error: " + response.status + ". " + data)
            }

        } else {
            alert("Ihre eingegebenen Passwörter stimmen nicht überein!")
        }
    }

    async createOverviewFlight() {

        if (this.state.flightIDtoSearch !== "") {

            const toSearch = {
                "_id": this.state.flightIDtoSearch
            }    

            const response = await fetch('/api/flights/read', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
            body: JSON.stringify(toSearch)
            })
        
            const data = await response.json()

            if ( response.status === 200) {
                this.setState({flightsOverview: data})
            } else {
                alert("Error: " + response.status + ". " + JSON.stringify(data))
            }
            
        } else {
            alert("Bitte geben Sie eine ID ein")
        }

    }

    render() { 
        return ( 
        <div className="wrapper">
            Daten anpassen. Feld leer lassen, wenn nichts angepasst werden soll.
            <div>
            <input
                type="text"
                name="first_name"            
                value={this.state.first_name}           
                onChange={(e) => this.handleChange(e)}
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
            <button onClick={() => this.updateUserdata()}>Daten updaten</button>     
            
            <div style={{margin: 15}}>
                Übersicht zu gebuchten Flügen:
                <BasicTableNoSelectPassangers data={this.state.booked_flights}/>
            </div>
            <div style={{margin: 15, textAlign:'center'}}>
                Übersicht zu Flügen pro ID. Wenn Sie eine ID eingeben, werden Daten zu diesem Flug angezeigt. Lassen Sie das Feld leer, werden alle Flüge angezeigt.
                <div>
                    <input 
                        style={{marginLeft: '20%',width: '60%'}} 
                        type="text" 
                        placeholder="ID des Flugs" 
                        name ='flightIDtoSearch'
                        value={this.state.flightIDtoSearch}
                        onChange={this.handleChange}
                    />
                </div>
                <button onClick={ () => this.createOverviewFlight()}> Flüge anzeigen </button>
                <BasicTableShowFlights data={this.state.flightsOverview}/>  
            </div>
        </div> 
        );
    }
}
 
export default SettingsUser;