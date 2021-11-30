import React, { Component } from 'react';
import BasicTableNoSelectFlight from '../tables/basicTableNoSelectFlight';
import BasicTableNoSelectUser from '../tables/basicTableNoSelectUser';


class SettingsAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inputCreateOrigin: "",
            inputCreateDestination: "",
            inputCreateTime: "",
            inputCreateSeats: "",

            inputEditID: "",
            inputEditOrigin: "",
            inputEditDestination: "",
            inputEditTime: "",
            inputEditSeats: "",

            inputDeleteID: "",

            inputSearchNameFirst: "",
            inputSearchNameLast: "",

            inputSearchFlightUID: "",

            userData: [],
            flightData: [],

            foundUserID: "",
        }

         this.handleChange = this.handleChange.bind(this);
         this.createNewFlight = this.createNewFlight.bind(this);
         this.updateFlight = this.updateFlight.bind(this);
         this.deleteFlight = this.deleteFlight.bind(this);
         this.createOverview = this.createOverview.bind(this);
         this.getIdByName = this.getIdByName.bind(this);

    }

    /*
    Primäre-Handle Funktion für User-Input. 
    Wird von Eingabefeldern direkt in State gespeichert.
    */
    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value})
        //this.setState({pageToRender: BasicTableNoSelectUser})
    }

    /*
    Funktion zum Erstellen eines neuen Fluges in der Datenbank.
    Anhand von zuvor getätigten Usereingaben wird request an die API gestellt.
    Eingabevalidierung auf Seiten des Backend.
    */
    async createNewFlight() {

        const newFlightData={
            "origin": this.state.inputCreateOrigin,
            "destination": this.state.inputCreateDestination,
            "time": this.state.inputCreateTime,
            "seats": this.state.inputCreateSeats
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
        
        this.setState({userData: [{
            _id: data._id, 
            first_name: data.first_name,
            last_name: data.last_name
        }]});

    }

    /*
    Erstellen der Übersicht, welche Flüge bisher von einem Nutzer gebucht wurden.
    Anhand einer User ID wird Anfrage an Backend gestellt.
    Daten von Response werden in State gespeichert und dann in Tabelle dargestellt.
    Eingabevalidierung auf Seiten des Backend.
    */
    async createOverview() {
    
        const toSearch = {
            "_id": [this.state.inputSearchFlightUID]
        }

        const response = await fetch('/api/user/read', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
        body: JSON.stringify(toSearch)
        })
    
        const data = await response.json()
         
        //TODO - request gibt keine flight id zurück
        alert(JSON.stringify(data))
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
                <button onClick={ () => this.createOverview()}> Flüge anzeigen </button>
                <BasicTableNoSelectFlight data={this.state.flightData}/>  
            </div>
        </div> );
    }
}
 
export default SettingsAdmin;



