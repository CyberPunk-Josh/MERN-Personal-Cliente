import React, {useEffect, useState} from 'react';
import {Button, notification} from 'antd';
import Modal from '../../../components/Modal';

import './Blog.scss';

export default function Blog() {

    const [isVisibleModal, setIsVisibleModal] = useState(true);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    return (
        <div className="blog">
            <div className="blog__add-post">
                <Button type="primary">New Post</Button>
            </div>
            <h1>post list</h1>
            <h2>pagination</h2>

            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
                width='75%'
            />
        </div>
    )
}
