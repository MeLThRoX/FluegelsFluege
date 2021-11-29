import React from 'react';

export default function BasicTableNoSelectFlight(props) {

    const data = props.data;

    return (
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col"><center>ID</center></th>
                    <th scope="col">Origin</th>
                    <th scope="col">Destination</th>
                    <th scope="col">Time</th>
                    <th scope="col">Passagiere</th>
                </tr>
            </thead>
            <tbody id="cursorPointer">
                {/*Rendering data*/}
                {data.map(function(item, key) {
                    return (
                        <>
                        <tr key = {key}>
                            <td><center>{item._id}</center></td>
                            <td>{item.origin}</td>
                            <td>{item.destination}</td>
                            <td>{item.time}</td>
                            <td>{JSON.stringify(item.passengers)}</td>
                        </tr>
                        </>
                    )
                })}
            </tbody>
        </table> 
    )
}