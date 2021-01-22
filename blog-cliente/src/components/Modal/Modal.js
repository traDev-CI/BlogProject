import React from 'react';
import { Modal as Dialog } from 'antd';

export default function Modal(props) {
    const { children, title, isVisible, setIsVisible } = props;
    return (
        <Dialog
            title={title}
            centered
            visible={isVisible}
            onCancel={() => setIsVisible(false)}
            footer={false}
        >
            {children}
        </Dialog>
    )
}