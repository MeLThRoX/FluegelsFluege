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
                    <th scope="col">Price p.P.</th>
                </tr>
            </thead>
            <tbody id="cursorPointer">
                {data.map(function(item, key) {
                    return (
                        <>
                        <tr key = {key}>
                            <td><center><button onClick={(e) => props.setFlightID(e, item)}> Buchen </button></center></td>
                            <td><center>{item._id}</center></td>
                            <td>{item.orig}</td>
                            <td>{item.dest}</td>
                            <td>{item.time}</td>
                            <td>{item.price}</td>
                        </tr>
                        </>
                    )
                })}
            </tbody>
        </table> 
    )
}