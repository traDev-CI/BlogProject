import React, { useState, useCallback, Fragment, useEffect } from 'react';
import { notification } from 'antd';
import noAvatar from '../../../../assets/img/png/no-avatar.png';
import EditForm from './FormEdit';
import UploadAvatar from './UploadAvatar';
import { getAvatarApi, UploadAvatarApi, updateUserApi } from '../../../../API/user';
import { getAccessToken } from '../../../../API/auth.js'
import './EditUserForm.scss';

export default function EditUserForm(props) {
    const { user, setIsVisibleModal, setReloadUsers } = props;
    const [avatar, setAvatar] = useState(null);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        setUserData({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            rol: user.role,
            avatar: user.avatar
        })
    }, [user])

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            })
        } else {
            setAvatar(null);
        }
    }, [user]);

    useEffect(() => {
        if (avatar) {
            setUserData({ ...userData, avatar: avatar.file })
        }
    }, [avatar])

    const updateUser = (e) => {
        e.preventDefault();
        const token = getAccessToken();
        let userUpdate = userData;

        if (userUpdate.password || userUpdate.repeatPassword) {
            if (userUpdate.password !== userUpdate.repeatPassword) {
                notification["error"]({
                    message: "Passwords have to be the same"
                })
            }
            return;
        }
        if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
            notification["error"]({
                message: "Name, Last name and email are required"
            })
            return;
        }
        if (typeof userUpdate.avatar === "object") {
            UploadAvatarApi(token, userUpdate.avatar, user._id).then(response => {
                console.log(response);
                userUpdate.avatar = response.avatarName;
                updateUserApi(token, userUpdate, user._id).then(response => {
                    notification["success"]({
                        message: response.message
                    });
                    setIsVisibleModal(false);
                    setReloadUsers(true);
                });
            });
        } else {
            updateUserApi(token, userUpdate, user._id).then(response => {
                notification["success"]({
                    message: response.message
                });
                setIsVisibleModal(false);
                setReloadUsers(true);
            });
        }
    }

    return (
        <Fragment className="edit-user-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser} />
        </Fragment>
    );
}

