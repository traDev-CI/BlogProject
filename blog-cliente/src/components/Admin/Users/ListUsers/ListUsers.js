import React, { useState, useEffect } from 'react';
import { Switch, List, Avatar, Button, Icon } from 'antd';
import noAvatar from '../../../../assets/img/png/no-avatar.png';
import Dialog from '../../../Modal';
import EditUserForm from '../EditUserForm';
import { getAvatarApi } from '../../../../API/user';
import './ListUsers.scss';

export default function ListUsers(props) {
    const { userActive, userInactive, setReloadUsers } = props;
    const [viewUsersActive, setViewUserActive] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    return (
        <div className="list-users">
            <div className="list-users__switch">
                <Switch
                    defaultChecked
                    onChange={() => setViewUserActive(!viewUsersActive)}
                />
                <span>
                    {viewUsersActive ? "Usuarios activos" : "Usuarios inactivos"}
                </span>
            </div>
            {viewUsersActive ?
                <UsersActive userActive={userActive}
                    setIsVisibleModal={setIsVisibleModal}
                    setModalTitle={setModalTitle}
                    setModalContent={setModalContent}
                    setReloadUsers={setReloadUsers}
                />
                : <UsersInactive userInactive={userInactive} />}

            <Dialog
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Dialog>
        </div >
    )
}



function UsersActive(props) {
    const { userActive, setIsVisibleModal, setModalTitle, setModalContent, setReloadUsers } = props;

    const editUser = (user) => {
        setIsVisibleModal(true);
        setModalContent(<EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />);
        setModalTitle(user.name ? `Edit ${user.name} ${user.lastname}` : `You need to provide your name and your lastname`)
    }

    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={userActive}
            renderItem={user => <UserActive user={user} editUser={editUser} />}
        />
    )

}

function UserActive(props) {
    const { user, editUser } = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            })
        } else {
            setAvatar(null);
        }
    }, [user])

    return (
        <List.Item
            actions={[
                <Button
                    type="primary"
                    onClick={() => editUser(user)}
                >
                    <Icon type="edit" />
                </Button>,
                <Button
                    type="warning"
                    onClick={() => console.log("To disable")}
                >
                    <Icon type="stop" />
                </Button>,
                <Button
                    type="danger"
                    onClick={() => console.log("To delete")}
                >
                    <Icon type="delete" />
                </Button>
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar src={avatar ? avatar : noAvatar} />}
                title={
                    `${user.name ? user.name : "You need to"}
                 ${user.lastname ? user.lastname : "provide your name"}
            `}
                description={user.email}
            />
        </List.Item>
    )
}


function UsersInactive(props) {
    const { userInactive } = props;
    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={userInactive}
            renderItem={user => <UserInactive user={user} />}
        />
    )
}

function UserInactive(props) {
    const { user } = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            })
        } else {
            setAvatar(null);
        }
    }, [user])
    return (
        <List.Item
            actions={[
                <Button
                    type="primary"
                    onClick={() => console.log("Enable user")
                    }
                >
                    <Icon type="check" />
                </Button>,
                <Button
                    type="danger"
                    onClick={() => console.log("Delete user")
                    }
                >
                    <Icon type="delete" />
                </Button>
            ]
            }
        >
            <List.Item.Meta
                avatar={<Avatar src={avatar ? avatar : noAvatar} />}
                title={`
                ${user.name ? user.name : "You need to"}
                ${user.lastname ? user.lastname : "provide your name"}
                `}
                description={user.email}
            />
        </List.Item>
    )
}