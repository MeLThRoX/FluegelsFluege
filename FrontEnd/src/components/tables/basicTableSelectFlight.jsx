import React from 'react';

export default function BasicTableSelectFlight(props) {

    const data = props.data;

    return (
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col"><center>Buchen</center></th>
                    <th scope="col"><center>ID</center></th>
                    <th scope="col">Origin</th>
                    <th scope="col">Destination</th>
                    <th scope="col">Time</th>
                </tr>
            </thead>
            <tbody id="cursorPointer">
                {data.map(function(item, key) {
                    return (
                        <>
                        <tr key = {key}>
                            <td><center><button onClick={(e) => props.setFlightID(e, item._id)}> Buchen </button></center></td>
                            <td><center>{item._id}</center></td>
                            <td>{item.origin}</td>
                            <td>{item.destination}</td>
                            <td>{item.time}</td>
                        </tr>
                        </>
                    )
                })}
            </tbody>
        </table> 
    )
}