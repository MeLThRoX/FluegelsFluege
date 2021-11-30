import React, { Component } from 'react';

class Impressum extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
            <div>
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
            </div>
            <div>
                Hier müssten jetzt noch Sachen wie Urheberrecht und Haftungsausschluss behandelt werden, davon habe ich aber keine Ahnung.
                Ich denke im Rahmen dieses Projektes ist eine Andeutung an dieser Stelle ausreichend.
            </div>


            </>
         );
    }
}
 
export default Impressum;