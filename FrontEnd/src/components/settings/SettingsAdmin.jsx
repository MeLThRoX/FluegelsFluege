import React, { Component } from 'react';
import BasicTableNoSelectPassangers from '../tables/basicTableNoSelectFlight';
import BasicTableNoSelectUser from '../tables/basicTableNoSelectUser';
import BasicTableShowFlights from '../tables/basicTableShowFlights';
import DatePicker from 'react-datepicker';



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
            inputSearchNameUser: "",

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
            alert("Error Code: " + response.status + ". " + data)
        }
    }

    handleChangeStartDate(date) {
        this.setState({inputEditTime: date})
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
            "update": {}
        }

        if (this.state.inputEditOrigin != "") editFlightDate.update["orig"] = this.state.inputEditOrigin;
        if (this.state.inputEditDestination != "") editFlightDate.update["dest"] = this.state.inputEditDestination;
        if (this.state.inputEditTime != "") editFlightDate.update["time"] = this.state.inputEditTime;
        if (this.state.inputEditSeats != "") editFlightDate.update["seats"] = this.state.inputEditSeats;

        const response = await fetch('/api/flights/update', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
        body: JSON.stringify(editFlightDate)
        })

        let data = await response.text()
    
        if (data === "OK") {
            alert("Flight updated!")
        } else {
            alert("Error Code: " + response.status+ ". " + data)
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
            alert("Error Code: " + response.status + ". " + data)
        }
        
    }

    /*
    Erfassen von UserDaten anhand einer Eingabe des Admin.
    Eingabevalidierung auf Seiten des Backend.
    Nach erhalten der Response werden Daten in State gespeichert. Von dort aus in Tabelle dargestellt.
    */
    async getIdByName() {

        const toSearch ={}
        
        if (this.state.inputSearchNameFirst != "") toSearch["first_name"] = this.state.inputSearchNameFirst;
        if (this.state.inputSearchNameLast != "") toSearch["last_name"] = this.state.inputSearchNameLast;
        if (this.state.inputSearchNameUser != "") toSearch["username"] = this.state.inputSearchNameUser;

        const response = await fetch('/api/user/read', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
        body: JSON.stringify(toSearch)
        })

        if (response.status === 200) {
            const data = await response.json()
            this.setState({userData: data});
        } else {
            const data = await response.text()
            alert("Error: " + response.status + ". " + data)
        }
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
    
        if (response.status === 200) {
            const data = await response.json()
            if (Object.keys(data).length > 9) {
                this.setState({flightData: data[0].tickets})
            }
        } else {
            const data = await response.text()
            alert("Error: " + response.status + ". " + data)
        }
        
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
            
            if (response.status === 200) {
                this.setState({overviewFlights: data})
            } else {
                alert("Error: " + response.status + ". " + JSON.stringify(data))
            }
            

        } else {

            const response = await fetch('/api/flights/read', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
            body: JSON.stringify({})
            })
        
            const data = await response.json()
    
            if (response.status === 200) {
                this.setState({overviewFlights: data})
            } else {
                alert("Error: " + response.status + ". " + JSON.stringify(data))
            }
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
                        placeholder="Seats" 
                        name ='inputEditSeats'
                        value={this.state.inputEditSeats}
                        onChange={this.handleChange}
                    />
                </div>
                <DatePicker
                    style={{marginLeft: '20%',width: '60%'}} 
                    selected={this.state.inputEditTime}
                    onChange={(date) => this.handleChangeStartDate(date)}
                    showTimeSelect
                    timeFormat="hh:mm aa"
                    timeIntervals={20}
                    timeCaption="time"
                    dateFormat="yyyy-M-dd hh:mm aa"
                    placeholderText="New Time"
                    minDate={new Date()}
                /> 
                <br/>
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
                        placeholder="Search firstname" 
                        name ='inputSearchNameFirst'
                        value={this.state.inputSearchNameFirst}
                        onChange={this.handleChange}
                    />
                </div> 
                <div>
                    <input 
                        style={{marginLeft: '20%',width: '60%'}} 
                        type="text" 
                        placeholder="Search lastname" 
                        name ='inputSearchNameLast'
                        value={this.state.inputSearchNameLast}
                        onChange={this.handleChange}
                    />
                </div> 
                <div>
                    <input 
                        style={{marginLeft: '20%',width: '60%'}} 
                        type="text" 
                        placeholder="Search Username" 
                        name ='inputSearchNameUser'
                        value={this.state.inputSearchNameUser}
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
                <BasicTableNoSelectPassangers data={this.state.flightData}/>  
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


/*

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

*/
