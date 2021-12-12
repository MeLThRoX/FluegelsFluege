import React, { Component } from 'react';

import '../../styles/Wrapper.css'

class AGB extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
            <div style={{textAlign: 'left', width: 1000, margin: 10}}>
                Hier sollen alle wichtigen Informationen bezüglich AGB und Datenschutz stehen. Ich bin aber leider kein Anwalt und Beispiele für
                so eine spezifische Anwendung zu finden ist nicht einfach. Ja, man könnte zu einer Seite wie booking.com gehen und da einfach die 
                AGB rauskopieren, das bringt aber auch nicht viel. Schließlich muss die AGB auf die Firma/Website angepasst werden.
            </div>
            <div style={{textAlign: 'left', width: 1000}}>
                In unseren AGB sollten unter anderem folgende Punkte abgedeckt sein:
                <ul>
                    <li>Welche Daten werden erfasst</li>
                    <li>Wofür werden die Daten erfasst</li>
                    <li>Weitergabe an Dritte (KredikartenAPI-Anbieter)</li>
                    <li>Standart AGB Zeug halt</li>
                    <li>Die AGB ließt doch eh keiner ;)</li>
                </ul>
                Dadurch dass ein Nutzer diese AGB aktzeptiert werden wir (hoffentlich, wie gesagt, kein Anwalt) der DSGVO gerecht. Diese Seite soll nur als 
                Andeutung fungieren und zeigen, dass wir uns mit dem Thema befasst haben.
            </div>
            </>
         );
    }
}
 
export default AGB;