import React, { useState, useCallback, Fragment, useEffect } from 'react';
import { Avatar, Form, Icon, Input, Select, Button, Row, Col } from 'antd';
import noAvatar from '../../../../assets/img/png/no-avatar.png';
import { useDropzone } from 'react-dropzone';
import EditForm from './FormEdit';
import './EditUserForm.scss';

export default function UploadAvatar(props) {
    const { avatar, setAvatar } = props;
    const [avatarUrl, setAvatarUrl] = useState(null);
    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({ file, preview: URL.createObjectURL(file) });
        },
        [setAvatar]
    );



    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    useEffect(() => {
        if (avatar) {
            if (avatar.preview) {
                setAvatarUrl(avatar.preview);
            } else {
                setAvatarUrl(avatar);
            }
        } else {
            setAvatarUrl(null);
        }
    }, [avatar])


    return (
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={noAvatar} />
            ) : (
                    <Avatar size={150} src={avatarUrl ? avatarUrl : noAvatar} />
                )}

        </div>
    )
}

