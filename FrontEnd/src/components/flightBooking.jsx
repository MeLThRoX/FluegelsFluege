import React, { Component } from 'react';
import "./Wrapper.css"
import startScreen from './startScreen';
import DatePicker from 'react-datepicker'

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
            dataToSubmit: [],
            passengersPushed:0,
            passengers:[]
         }

         this.onChange = this.onChange.bind(this);
         this.addState = this.addState.bind(this);
         this.submitBooking = this.submitBooking.bind(this);
         this.handleDate = this.handleDate.bind(this);
         this.test2 = this.test2.bind(this)
         
    }

    componentDidMount() {

        let inputVariables = {"first_name": "", "last_name": "", "birthdate": "", "citizenship": "", "gender": "", "numberPassport": "", "datePassport": ""}

        let passenger = Array.from({length: this.props.passengerCount}, (_,i) => i)

        let newState = passenger.map((_,j) =>  inputVariables)

        this.setState({passengers: newState})

    }

    async submitBooking() {

        if (this.state.passengersPushed < this.props.passengerCount ) {
            alert("Bitte geben Sie die Informationen für alle Passagiere ein")
        } else {
            /*
            const response = await fetch('http://localhost:5050/api/flights/search', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'charset':'utf-8'},
            body: JSON.stringify(dataToSubmit)
            })
    
            if (response.ok) {
                alert("Buchung erfolgreich!")
            } else {
                alert("Buchung nicht erfolgreich!")
            }
            */
           alert("Buchung wird durchgeführt")
           this.props.setPage("", startScreen);
        }
    }

    test2() {
        alert(JSON.stringify(this.state.passengers));
    }

    onChange(id ,e) {

        let newPass = {...this.state.passengers[id], [e.target.name]: e.target.value}

        let newSt = [
            ...this.state.passengers.slice(0,id),
            newPass,
            ...this.state.passengers.slice(id+1)
        ]

        this.setState({passengers: newSt})
    }

    handleDate(id, name, date) {

        let newPass = {...this.state.passengers[id], [name]: date}

        let newSt = [
            ...this.state.passengers.slice(0,id),
            newPass,
            ...this.state.passengers.slice(id+1)
        ]

        this.setState({passengers: newSt})

    }

    addState() {
        this.setState(prevState => {
            return {passengersPushed: prevState.passengersPushed}
         });
    }
    
    test() {

        return <div>
            {this.state.passengers.map((_,j,data) => {
                return (
                <div>
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
                            selected = {data.birthdate}
                            onChange={(date, e) => this.handleDate(j, "birthdate", date)}
                            placeholderText="Select a birthdate"
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
                            name="datePassport"
                            value = {data.datePassport}
                            onChange={(date, e) => this.handleDate(j, "datePassport", date)}
                            dateFormat="yyyy-M-dd"
                            placeholderText="Expirationdate of passport"
                        />         
                    </div>
                </div>
                )
                
            })}
        </div>

    }

    render() { 
        return(
    
        <div className="wrapper">
            <button onClick={this.test2}>Give State</button>
        
            {this.test(this.props.passengerCount)}
            
            <button onClick={this.pushToConst}>Personenbezogene Daten für Passagier hinterlegen</button>
            <button onClick={this.submitBooking}>Buchung durchführen</button>

        </div>
        
        )
    }
}
 
export default BookingOverview;

/*
<div>
    Sie haben bisher folgende Infos pro Passagier hinterlegt:
    {this.state.dataToSubmit.map((data, i) => {
        return (
            <div style={{border: "2px solid grey"}} >
                <p>Passagier {data.id + 1}</p>
                <p>Vorname: {data.first_name}</p>
                <p>Nachname: {data.last_name}</p>
                <p>Birthdate: {data.birthdate}</p>
                <p>Citizenship: {data.citizenship}</p>
                <p>Gender: {data.gender}</p>
                <p>NumberPassport: {data.numberPassport}</p>
                <p>DatePassport: {data.datePassport}</p>
            </div>
        )
    })}
</div>

pushToConst() {

    let temper = [...this.state.dataToSubmit]

    if ( this.state.passengersPushed < parseInt(this.props.passengerCount)) {
        temper.push({
            "id": this.state.passengersPushed,
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "birthdate": this.state.birthdate + "T00:00:00Z",
            "citizenship": this.state.citizenship,
            "gender": this.state.gender,
            "numberPassport": this.state.numberPassport,
            "datePassport": this.state.datePassport
        })

        this.setState(() => {
            return {dataToSubmit: temper}
        })
        this.setState(prevState => {
            return {passengersPushed: prevState.passengersPushed + 1}
            });
    } else {
        alert("Sie haben bereits alle benötigten Daten eingegeben! Führen Sie nun die Buchung durch.")
    }
}
*/