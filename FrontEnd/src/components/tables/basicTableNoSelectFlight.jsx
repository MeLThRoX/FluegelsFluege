import React from 'react';

export default function BasicTableNoSelectPassangers(props) {

    let data = props.data;

    return (
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col"><center>Flight-ID</center></th>
                    <th scope="col">Vorname</th>
                    <th scope="col">Nachname</th>
                </tr>
            </thead>
            <tbody id="cursorPointer">
                
                { !data ? "none found" : data.map(function(item, key) {
                    return (
                        <tr key = {key}>
                            <td><center>{item.flight_id}</center></td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table> 
    )
}