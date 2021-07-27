import React, { useState, useEffect } from 'react';
import Modal from '../../../Modal';
import { Switch, List, Avatar, Button, Icon } from 'antd';
import noAvatar from '../../../../assets/img/png/no-avatar.png';
import {EditOutlined, StopOutlined, DeleteOutlined, CheckSquareOutlined} from '@ant-design/icons';
import EditUserForm from '../EditUserForm';
import {getAvatarApi} from '../../../../api/user';

import "./ListUsers.scss";

export default function (props) {
    // desctructuring for users
    const { usersActive, usersInactive } = props;

    // state for switch
    const [viewUsersActive, setViewUsersActive] = useState(true);

    // state for modal:
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);

    return (
        <div className="list-users">
            <div className="list-users__switch">
                <Switch
                    defaultChecked
                    onChange={ () => setViewUsersActive(!viewUsersActive) }
                />
                <span>
                    {viewUsersActive ? "Active users" : "Inactive Users"}
                </span>
            </div>
            {viewUsersActive ? <UsersActive usersActive={usersActive} setIsVisibleModal={setIsVisibleModal} setModalTitle={setModalTitle} setModalContent={setModalContent} /> 
            : <UsersInactive usersInactive={usersInactive}/> }

            {/* MODAL */}
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    )
}

function UsersActive(props){

    const {usersActive, setIsVisibleModal, setModalContent, setModalTitle} = props;

    const editUsers = user => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.name ? user.name : '...'} ${user.lastName ? user.lastName : '...'}`);
        setModalContent(<EditUserForm user={user}/>);
    }

    return(
        <List
            className="users-active"
            itemLayout='horizontal'
            dataSource={usersActive}
            renderItem={ user => 
                <UserActive user={user} editUsers={editUsers} />
            }
        />
    )
}

function UserActive(props){
    const { user, editUsers } = props;
    const [ avatar, setAvatar ] = useState(null);

    useEffect(() => {
        if(user.avatar){
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            })
        } else {
            setAvatar(null);
        }
    }, [user]);

    return (
        <List.Item
            actions={[
                <Button
                    type='primary'
                    onClick={() => editUsers(user)}
                >
                    <EditOutlined />
                </Button>,
                <Button
                    type='danger'
                    onClick={() => console.log('Desactivate user')}
                >
                    <StopOutlined />
                </Button>,
                <Button
                    type='danger'
                    onClick={() => console.log('Delete user')}
                >
                    <DeleteOutlined />
                </Button>,
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar src={avatar ? avatar : noAvatar} />}
                title={`
                    ${user.name ? user.name : "..."}
                    ${user.lastName ? user.lastName : "..."}
                `}
                description={user.email}
            />
        </List.Item>
    )
}

function UsersInactive(props){

    const {usersInactive} = props;

    return(
        <List
            className="users-active"
            itemLayout='horizontal'
            dataSource={usersInactive}
            renderItem={ user => 
                <UserInactive user={user} />
            }
        />
    )
}

function UserInactive(props){
    const { user } = props;
    const [ avatar, setAvatar ] = useState(null);

    useEffect(() => {
        if(user.avatar){
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            })
        } else {
            setAvatar(null);
        }
    }, [user]);

    return (
        <List.Item
            actions={[
                <Button
                    type='primary'
                    onClick={() => console.log('Activate user')}
                >
                    <CheckSquareOutlined />
                </Button>,
                <Button
                    type='danger'
                    onClick={() => console.log('Delete user')}
                >
                    <DeleteOutlined />
                </Button>,
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar src={avatar ? avatar : noAvatar} />}
                title={`
                    ${user.name ? user.name : "..."}
                    ${user.lastName ? user.lastName : "..."}
                `}
                description={user.email}
            />
        </List.Item>
    )
}