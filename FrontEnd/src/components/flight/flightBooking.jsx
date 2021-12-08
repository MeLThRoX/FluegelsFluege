import React, { Component } from 'react';
import startScreen from '../defaultScreens/startScreen';
import DatePicker from 'react-datepicker';


import "../../styles/Wrapper.css"

class BookingOverview extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            first_name: "",
            last_name:"",
            birthdate: "",
            citizenship: "",
            gender: "",
            numberPassport: "",
            datePassport: "",
            passengers:[]
         }

         this.onChange = this.onChange.bind(this);
         this.submitBooking = this.submitBooking.bind(this);
         this.handleDate = this.handleDate.bind(this);

    }

    /*
    Aufruf wenn die Seite geladen wird.
    Dynamisches initialisieren des State-Arrays (passengers), je nachdem welche Anzahl an Reisenden von der vorherigen Komponente als prop übergeben wird.
    Innerhalb dieses State-Array (passengers) wird Input des Users gespeicher.
    */
    componentDidMount() {

        let inputVariables = {"first_name": "", "last_name": "", "birthdate": null, "citizenship": "", "gender": "", "numberPassport": "", "datePassport": null}

        let passenger = Array.from({length: this.props.passengerCount}, (_,i) => i)

        let newState = passenger.map((_,j) =>  inputVariables)

        this.setState({passengers: newState})

    }

    /*
    Funktion zum handlen des Buchungs-Submit. Mit Buchungs-Button verknüpft.
    Schickt User-Eingaben als Array mit Flight-ID an Backend.
    Eingabeüberprüfung auf Seiten des Backends
    */
    async submitBooking() {

        let toSubmit = {
            "flight_id": this.props.flightData._id,
            "passengers": this.state.passengers
        }


        const response = await fetch('/api/flights/book', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
        body: JSON.stringify(toSubmit)
        })

        let data = await response.text()

        if (data  === "OK") {
            alert("Buchung erfolgreich!")
        } else {
            alert("Error: " + data)
        }

        this.props.setPage("", startScreen);

    }

    
    /*
    Funtkion zum dynamischen handeln der Usereingaben vom DatePicker.
    Da hier die Eingaben leicht anders gehandelt werden müssen im vergleich zu den anderen Attributen, wird eine eigene Funktion benötigt.
    Logik ist gleich der Methode onChange().
    */
    handleDate(id, name, date) {

        let newPass = {...this.state.passengers[id], [name]: date }

        let newSt = [
            ...this.state.passengers.slice(0,id),
            newPass,
            ...this.state.passengers.slice(id+1)
        ]

        this.setState({passengers: newSt})

    }

    /*
    Funtkion zum dynamischen handeln der Usereingaben.
    Usereingaben werden in einem Array von JSON-Objecten gespeichert.
    Bei Eingabe wird das JSON-Objekt des aktuell geänderten Passagiers aus dem state genommen und durch die neue Eingabe ersetzt.
    */
    onChange(id ,e) {

        let newPass = {...this.state.passengers[id], [e.target.name]: e.target.value}

        let newSt = [
            ...this.state.passengers.slice(0,id),
            newPass,
            ...this.state.passengers.slice(id+1)
        ]

        this.setState({passengers: newSt})
    }

    /*
    Funktion zum dynamischen Erstellen von Input-Boxen.
    Map über zuvor erstellten Passenger-Array. Pro Element in dem Array wird ein Set von Input-Boxen erstellt.
    Eingaben in die Felder werden direkt im state hinterlegt.
    */
    passengerInput() {
        return (
        <div>
            {this.state.passengers.map((_,j,data) => {
                return (
                <div style={{margin: 15}}>
                    Bitte geben Sie die Daten für Passagier Nr. {j + 1} ein:
                    <div>
                        <input
                            type="text"
                            name="first_name"            
                            value={data.first_name}           
                            onChange={(e) => this.onChange(j, e)}
                            placeholder="first_name"
                        />
                    </div>
                    <div>                    
                        <input            
                            type="text"            
                            name="last_name"           
                            value={data.last_name}            
                            onChange={(e) => this.onChange(j, e)}  
                            placeholder="last_name"        
                        />        
                    </div>
                    <div>                   
                        <DatePicker
                            selected = {data[j].birthdate}
                            dateFormat = "yyyy-M-d"
                            onChange={(date, e) => this.handleDate(j, "birthdate", date)}
                            placeholderText="Select the birthdate"
                        />       
                    </div>     
                    <div>                
                        <input            
                            type="text"            
                            name="citizenship"           
                            value={data.citizenship}            
                            onChange={(e) => this.onChange(j, e)}     
                            placeholder="citizenship"     
                        />        
                    </div>     
                    <div>               
                        <input            
                            type="text"            
                            name="gender"           
                            value={data.gender}            
                            onChange={(e) => this.onChange(j, e)}  
                            placeholder="gender"        
                        />        
                    </div>
                    <div>                
                        <input            
                            type="text"            
                            name="numberPassport"           
                            value={data.numberPassport}            
                            onChange={(e) => this.onChange(j, e)}     
                            placeholder="numberPassport"     
                        />        
                    </div>     
                    <div>               
                        <DatePicker
                            selected = {data[j].datePassport}
                            dateFormat = "yyyy-M-d"
                            onChange={(date, e) => this.handleDate(j, "datePassport", date)}
                            placeholderText="Passport expiration date"
                        />         
                    </div>
                </div>
                )
            })}
        </div>
        )
    }

    render() { 
        return(
    
        <div className="wrapper">        
            {this.passengerInput(this.props.passengerCount)}

            <br/>

            Sobald Sie auf den Button buchen drücken wird Ihre Karte mit {this.props.flightData.price * this.props.passengerCount} Euro belastet.
            
            <button onClick={this.submitBooking}>Buchung durchführen</button>
        </div>
        
        )
    }
}
 
export default BookingOverview;