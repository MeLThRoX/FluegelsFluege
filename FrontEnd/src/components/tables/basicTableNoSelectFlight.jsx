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
                {!data ? "none found" : data.map(function (user, key) {
                    if (user.tickets) return user.tickets.map((ticket, count) => {
                        return (
                            <tr key={user._id.toString() + count.toString()}>
                                <td><center>{ticket.flight_id}</center></td>
                                <td>{ticket.first_name}</td>
                                <td>{ticket.last_name}</td>
                            </tr>
                        )

                    })
                })}
            </tbody>
        </table>
    )
}

/*
<tr key = {user._id.toString() + count.toString()}>
                                <td><center>{ticket.flight_id}</center></td>
                                <td>{ticket.first_name}</td>
                                <td>{ticket.last_name}</td>
                            </tr>
*/