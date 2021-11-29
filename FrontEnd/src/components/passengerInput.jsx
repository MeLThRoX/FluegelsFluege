import React, { Component } from 'react';
import DatePicker from 'react-datepicker'

import './Wrapper.css'

class PassengerInput extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            first_name: "",
            last_name:"",
            birthdate: "",
            citizenship: "",
            gender: "",
            numberPassport: "",
            datePassport: ""
        }
    }


    render() { 
        return ( 
            <div className="wrapper">
            Geben Sie bitte die Daten für Passagier Nr. {this.props.number + 1} ein:
            <div>
                <input
                    type="text"
                    name="first_name"            
                    value={this.state.first_name}           
                    onChange={this.onChange}
                    placeholder="first_name"
                />
            </div>
            <div>                    
                <input            
                    type="text"            
                    name="last_name"           
                    value={this.state.last_name}            
                    onChange={this.onChange}  
                    placeholder="last_name"        
                />        
            </div>
            <div>                   
                <DatePicker
                    selected={this.state.birthdate}
                    onChange={(date) => this.handleBirthdate(date)}
                    dateFormat="yyyy-M-dd"
                    placeholderText="Select a birthdate"
                />       
            </div>     
            <div>                
                <input            
                    type="text"            
                    name="citizenship"           
                    value={this.state.citizenship}            
                    onChange={this.onChange}     
                    placeholder="citizenship"     
                />        
            </div>     
            <div>               
                <input            
                    type="text"            
                    name="gender"           
                    value={this.state.gender}            
                    onChange={this.onChange}  
                    placeholder="gender"        
                />        
            </div>
            <div>                
                <input            
                    type="text"            
                    name="numberPassport"           
                    value={this.state.numberPassport}            
                    onChange={this.onChange}     
                    placeholder="numberPassport"     
                />        
            </div>     
            <div>               
                <DatePicker
                    selected={this.state.datePassport}
                    onChange={(date) => this.handledatePassport(date)}
                    dateFormat="yyyy-M-dd"
                    placeholderText="Expirationdate of passport"
                />         
            </div>
            <div style={{margin: 15}}>
                <label>
                    {"Ich habe die AGB gelesen und aktzeptiert  "}
                    <input
                    type="checkbox"
                    onChange={() => this.handleCheckbox()}
                    />
                </label>
            </div>
            </div>
         );
    }
}
 
export default PassengerInput;