import React from 'react';

export default function BasicTableNoSelectUser(props) {

    const data = props.data;

    return (
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col"><center>ID</center></th>
                    <th scope="col">Vorname</th>
                    <th scope="col">Nachname</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody id="cursorPointer">
                {data.map(function(item, key) {
                    return (
                        <tr key = {key}>
                            <td><center>{item._id}</center></td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table> 
    )
}