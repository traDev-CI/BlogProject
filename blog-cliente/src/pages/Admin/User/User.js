import React, { useState, useEffect } from 'react';
import { getAccessToken } from '../../../API/auth';
import { getUsersActiveApi } from '../../../API/user';
import ListenUsers from '../../../components/Admin/Users/ListUsers';
import './Users.scss';
import ListUsers from '../../../components/Admin/Users/ListUsers';

export default function Users() {
    const [userActive, setUserActive] = useState([]);
    const [userInactive, setUserInactive] = useState([]);
    const [reloadUsers, setReloadUsers] = useState(false);
    const token = getAccessToken();

    useEffect(() => {
        getUsersActiveApi(token, true).then(response => {
            setUserActive(response.users);
        });
        getUsersActiveApi(token, false).then(response => {
            setUserInactive(response.users);
        });
        setReloadUsers(false);
    }, [token, reloadUsers]);

    return (
        <div classNAme="users">
            <ListUsers userActive={userActive} userInactive={userInactive} setReloadUsers={setReloadUsers} />
        </div>
    )
}