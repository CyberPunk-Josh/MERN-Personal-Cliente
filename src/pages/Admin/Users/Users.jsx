import React, { useState, useEffect } from 'react'
import { getAcessToken } from '../../../api/auth';
import { getActiveUsersApi } from '../../../api/user';
import ListUsers from '../../../components/Admin/Users/ListUsers';

import "./Users.scss";

export default function Users() {

    const token = getAcessToken();

    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);


    useEffect(() => {
        getActiveUsersApi(token, true).then(response => {
            setUsersActive(response.users);
        });

        getActiveUsersApi(token, false).then(response => {
            setUsersInactive(response.users);
        });
    }, [token]);

    return(
        <div className="users">
            <ListUsers
                usersActive={usersActive}
                usersInactive={usersInactive}
            />
        </div>
    )
}