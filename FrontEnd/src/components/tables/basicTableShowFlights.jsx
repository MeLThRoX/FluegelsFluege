import React from 'react';

export default function BasicTableShowFlights(props) {

    const data = props.data;

    return (
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col"><center>Flight-ID</center></th>
                    <th scope="col">Origin</th>
                    <th scope="col">Destination</th>
                    <th scope="col">Time</th>
                    <th scope="col">Absolute Seats</th>
                    <th scope="col">Remaining Seats</th>
                </tr>
            </thead>
            <tbody id="cursorPointer">
                {data.map(function(item, key) {
                    return (
                        <tr key = {key}>
                            <td><center>{item._id}</center></td>
                            <td>{item.orig}</td>
                            <td>{item.dest}</td>
                            <td>{item.time}</td>
                            <td>{item.seats}</td>
                            <td>{item.remainingSeats}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table> 
    )
}