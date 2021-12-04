import React, { Component } from 'react';
import BasicTableNoSelectFlight from '../tables/basicTableNoSelectFlight';
import BasicTableNoSelectUser from '../tables/basicTableNoSelectUser';
import BasicTableShowFlights from '../tables/basicTableShowFlights';


class SettingsAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inputCreateOrigin: "",
            inputCreateDestination: "",
            inputCreateTime: "",
            inputCreateSeats: "",
            inputCreatePrice: "",

            inputEditID: "",
            inputEditOrigin: "",
            inputEditDestination: "",
            inputEditTime: "",
            inputEditSeats: "",

            inputDeleteID: "",

            inputSearchNameFirst: "",
            inputSearchNameLast: "",

            inputSearchFlightUID: "",

            inputSearchFlightID: "",

            userData: [],
            flightData: [],
            overviewFlights: [],

            foundUserID: "",
        }

         this.handleChange = this.handleChange.bind(this);
         this.createNewFlight = this.createNewFlight.bind(this);
         this.updateFlight = this.updateFlight.bind(this);
         this.deleteFlight = this.deleteFlight.bind(this);
         this.createOverviewUser = this.createOverviewUser.bind(this);
         this.getIdByName = this.getIdByName.bind(this);
         this.createOverviewFlight = this.createOverviewFlight.bind(this);

    }

    /*
    Primäre-Handle Funktion für User-Input. 
    Wird von Eingabefeldern direkt in State gespeichert.
    */
    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value})
    }

    /*
    Funktion zum Erstellen eines neuen Fluges in der Datenbank.
    Anhand von zuvor getätigten Usereingaben wird request an die API gestellt.
    Eingabevalidierung auf Seiten des Backend.
    */
    async createNewFlight() {

        const newFlightData={
            "orig": this.state.inputCreateOrigin,
            "dest": this.state.inputCreateDestination,
            "time": this.state.inputCreateTime,
            "seats": this.state.inputCreateSeats,
            "price": this.state.inputCreatePrice
        }

        const response = await fetch('/api/flights/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
        body: JSON.stringify(newFlightData)
        })

        let data = await response.text()
    
        if (data === "Created") {
            alert("Flight created!")
        } else {
            alert("Error-Code: " + response.status)
        }
    }

    /*
    Funktion zum Ändern von Flug bezogenen Daten in der Datenbank.
    Anhand von zuvor getätigten Usereingaben wird request an die API gestellt.
    Eingabevalidierung auf Seiten des Backend.
    */
    async updateFlight() {

        const editFlightDate={
            "find": {
                "_id": this.state.inputEditID
            },
            "update": {            
                "origin": this.state.inputCreateOrigin,
                "destination": this.state.inputCreateDestination,
                "time": this.state.inputCreateTime,
                "seats": this.state.inputCreateSeats
            }
        }

        const response = await fetch('/api/flights/update', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
        body: JSON.stringify(editFlightDate)
        })

        let data = await response.text()
    
        if (data === "OK") {
            alert("Flight updated!")
        } else {
            alert("Error Code: " + response.status)
        }
        
    }

    /*
    Funktion zum Löschen eines Fluges aus der Datenbank.
    Anhand von zuvor getätigten Usereingaben wird request an die API gestellt.
    Eingabevalidierung auf Seiten des Backend.
    */
    async deleteFlight() {
        
        const toDelete = {
            "_id": this.state.inputDeleteID
        }

        const response = await fetch('/api/flights/delete', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
        body: JSON.stringify(toDelete)
        })

        let data = await response.text()
    
        if (data === "OK") {
            alert("Flight deleted!")
        } else {
            alert("Error-Code: " + response.status)
        }
        
    }

    /*
    Erfassen von UserDaten anhand einer Eingabe des Admin.
    Eingabevalidierung auf Seiten des Backend.
    Nach erhalten der Response werden Daten in State gespeichert. Von dort aus in Tabelle dargestellt.
    */
    async getIdByName() {

        const toSearch ={
            "first_name": this.state.inputSearchNameFirst,
            "last_name": this.state.inputSearchNameLast
        }
        
        const response = await fetch('/api/user/read', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
        body: JSON.stringify(toSearch)
        })
    
        const data = await response.json()

        this.setState({userData: data});

    }

    /*
    Erstellen der Übersicht, welche Flüge bisher von einem Nutzer gebucht wurden.
    Anhand einer User ID wird Anfrage an Backend gestellt.
    Daten von Response werden in State gespeichert und dann in Tabelle dargestellt.
    Eingabevalidierung auf Seiten des Backend.
    */
    async createOverviewUser() {
    
        const toSearch = {
            "_id": this.state.inputSearchFlightUID
        }

        const response = await fetch('/api/user/read', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
        body: JSON.stringify(toSearch)
        })
    
        const data = await response.json()

        this.setState({flightData: data[0].tickets})
    }

    async createOverviewFlight() {
        
        
        if (this.state.inputSearchFlightID != "") {

            const toSearch = {
                "_id": this.state.inputSearchFlightID
            }    

            const response = await fetch('/api/flights/read', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
            body: JSON.stringify(toSearch)
            })
        
            const data = await response.json()
    
            this.setState({overviewFlights: data})

            alert(JSON.stringify(this.state.overviewFlights))

        } else {

            const response = await fetch('/api/flights/read', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
            body: JSON.stringify({})
            })
        
            const data = await response.json()
    
            this.setState({overviewFlights: data})
        }
    }

    render() { 
        return ( 
        <div>
            <div style={{border: "3px solid green", textAlign: 'center'}} >
                Neuen Flug erstellen
                <div>
                    <input 
                        style={{marginLeft: '20%',width: '60%'}} 
                        type="text" 
                        name='inputCreateOrigin'
                        placeholder="Origin" 
                        value={this.state.inputCreateOrigin}
                        onChange={this.handleChange}
                    />
                </div>  
                <div>
                    <input 
                        style={{marginLeft: '20%',width: '60%'}} 
                        type="text" 
                        placeholder="Destination" 
                        name ='inputCreateDestination'
                        value={this.state.inputCreateDestination}
                        onChange={this.handleChange}
                    />
                </div> 
                <div>
                    <input 
                        style={{marginLeft: '20%',width: '60%'}} 
                        type="text" 
                        placeholder="Time" 
                        name ='inputCreateTime'
                        value={this.state.inputCreateTime}
                        onChange={this.handleChange}
                    />
                </div> 
                <div>
                    <input 
                        style={{marginLeft: '20%',width: '60%'}} 
                        type="text" 
                        placeholder="Seats" 
                        name ='inputCreateSeats'
                        value={this.state.inputCreateSeats}
                        onChange={this.handleChange}
                    />
                </div> 
                <div>
                    <input 
                        style={{marginLeft: '20%',width: '60%'}} 
                        type="text" 
                        placeholder="Price" 
                        name ='inputCreatePrice'
                        value={this.state.inputCreatePrice}
                        onChange={this.handleChange}
                    />
                </div> 
                <button onClick={() => this.createNewFlight()}> Neuen Flug erstellen </button>
            </div>
            <div style={{border: "3px solid green", textAlign:'center'}}>
                Flug bearbeiten
                <div style={{margin: 10}}>
                    <input 
                        style={{marginLeft: '20%',width: '60%'}} 
                        type="text" 
                        placeholder="ID" 
                        name ='inputEditID'
                        value={this.state.inputEditID}
                        onChange={this.handleChange}
                    />
                </div> 
                <p>
                    Neue Daten
                </p> 
                (Felder leer lassen, wenn diese nicht geändert werden sollen)
                <div>
                    <input 
                        style={{marginLeft: '20%',width: '60%'}} 
                        type="text" 
                        placeholder="Origin" 
                        name ='inputEditOrigin'
                        value={this.state.inputEditOrigin}
                        onChange={this.handleChange}
                    />
                </div>  
                <div>
                    <input 
                        style={{marginLeft: '20%',width: '60%'}} 
                        type="text" 
                        placeholder="Destination" 
                        name ='inputEditDestination'
                        value={this.state.inputEditDestination}
                        onChange={this.handleChange}
                    />
                </div> 
                <div>
                    <input 
                        style={{marginLeft: '20%',width: '60%'}} 
                        type="text" 
                        placeholder="Time" 
                        name ='inputEditTime'
                        value={this.state.inputEditTime}
                        onChange={this.handleChange}
                    />
                </div> 
                <div>
                    <input 
                        style={{marginLeft: '20%',width: '60%'}} 
                        type="text" 
                        placeholder="Seats" 
                        name ='inputEditSeats'
                        value={this.state.inputEditSeats}
                        onChange={this.handleChange}
                    />
                </div> 
                <button onClick={() => this.updateFlight()}> Flug updaten </button>
            </div>
            <div style={{border: "3px solid green", textAlign:'center'}}>
                Flug löschen 
                <div>
                    <input 
                        style={{marginLeft: '20%',width: '60%'}} 
                        type="text" 
                        placeholder="ID to delete" 
                        name ='inputDeleteID'
                        value={this.state.inputDeleteID}
                        onChange={this.handleChange}
                    />
                </div> 
                <button onClick={ () => this.deleteFlight()}> Flug mit angegebener ID löschen </button> 
            </div>
            <div style={{border: "3px solid green", textAlign:'center'}}>
                Infos über User per Vorname und Nachname. Gibt ID zurück
                <div>
                    <input 
                        style={{marginLeft: '20%',width: '60%'}} 
                        type="text" 
                        placeholder="Search First-Name" 
                        name ='inputSearchNameFirst'
                        value={this.state.inputSearchNameFirst}
                        onChange={this.handleChange}
                    />
                </div> 
                <div>
                    <input 
                        style={{marginLeft: '20%',width: '60%'}} 
                        type="text" 
                        placeholder="Search Last-Name" 
                        name ='inputSearchNameLast'
                        value={this.state.inputSearchNameLast}
                        onChange={this.handleChange}
                    />
                </div> 
                <button onClick={ () => this.getIdByName()}> User ID finden </button> 
                <BasicTableNoSelectUser data={this.state.userData}/>
                
            </div>
            <div style={{border: "3px solid green", textAlign:'center'}}>
                Übersicht zu Flügen pro User (input user-id). Falls keine ID eingeben wird, werden alle Flüge ausgegeben.
                <div>
                    <input 
                        style={{marginLeft: '20%',width: '60%'}} 
                        type="text" 
                        placeholder="ID des User" 
                        name ='inputSearchFlightUID'
                        value={this.state.inputSearchFlightUID}
                        onChange={this.handleChange}
                    />
                </div>
                <button onClick={ () => this.createOverviewUser()}> Flüge anzeigen </button>
                <BasicTableNoSelectFlight data={this.state.flightData}/>  
            </div>
            <div style={{border: "3px solid green", textAlign:'center'}}>
                Übersicht zu Flügen pro ID. Wenn Sie eine ID eingeben, werden Daten zu diesem Flug angezeigt. Lassen Sie das Feld leer, werden alle Flüge angezeigt.
                <div>
                    <input 
                        style={{marginLeft: '20%',width: '60%'}} 
                        type="text" 
                        placeholder="ID des Flugs" 
                        name ='inputSearchFlightID'
                        value={this.state.inputSearchFlightID}
                        onChange={this.handleChange}
                    />
                </div>
                <button onClick={ () => this.createOverviewFlight()}> Flüge anzeigen </button>
                <BasicTableShowFlights data={this.state.overviewFlights}/>  
            </div>
        </div> );
    }
}
 
export default SettingsAdmin;



