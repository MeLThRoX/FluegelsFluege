import React, { Component } from 'react';

import '../../styles/Wrapper.css'

class Impressum extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
            <div style={{textAlign: 'left', width: 1000, margin: 10}}>
                <p>
                    Angaben gem. § 5 TMG:
                    <br/>
                    Name und Anschrift:
                </p>
                <p>
                    FluegelsFluege GmbH
                    <br/>
                    Beispielstraße 14
                    <br/>
                    68163 Mannheim
                </p>
                <p>
                    Kontaktaufnahme
                    <br/>
                    Email: service@fluegelsfluege.de
                </p>
                <p>
                Hier müssten jetzt noch Sachen wie Urheberrecht und Haftungsausschluss behandelt werden, davon habe ich aber keine Ahnung.
                Ich denke im Rahmen dieses Projektes ist eine Andeutung an dieser Stelle ausreichend.
                </p>
            </div>
            </>
         );
    }
}
 
export default Impressum;