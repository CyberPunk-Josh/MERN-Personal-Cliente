import React, {useState, useCallback, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import {Avatar, Form, Icon, Input, Select, Button, Row, Col, notification} from 'antd';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { getAvatarApi, uploadAvatarApi, updateUser } from '../../../../api/user';
import { getAcessToken } from '../../../../api/auth';

import "./EditUserForm.scss";

export default function EditUserForm(props){
    const {user} = props;
    const [avatar, setAvatar] = useState(null);
    const [userData, setUserData] = useState({ });

    useEffect(() => {
        setUserData({ 
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            avatar: user.avatar
        })
    }, [user])

    useEffect(() => {
        if(user.avatar){
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            })
        } else {
            setAvatar(null);
        }
    }, [user])

    useEffect(() => {
        if(avatar) {
            setUserData({...userData, avatar: avatar.file});
        }
    }, [avatar]);

    // function to update a user
    const updateUserData = e => {
        const token = getAcessToken();
        let userUpdate = userData;

        if(userUpdate.password || userUpdate.repeatPassword){
            if(userUpdate.password !== userUpdate.repeatPassword){
                notification['error']({
                    message: 'Passwords must match'
                })
                return;
            }
        }

        if(!userUpdate.name || !userUpdate.lastName || !userUpdate.email){
            notification['error']({
                message: 'Name, lastName & email are required'
            });
            return;
        }

        if( typeof userUpdate.avatar === 'object'){
            uploadAvatarApi(token, userUpdate.avatar, user._id).then( response => {
                userUpdate.avatar = response.avatarName;
                updateUser(token, userUpdate, user._id).then(result => {
                    notification['success']({
                        message: result.message
                    })
                })
            })
        } else {
            updateUser(token, userUpdate, user._id).then(result => {
                notification['success']({
                    message: result.message
                })
            })
        }
    }

    return(
        <div className="edit-user-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar}/>
            <EditForm userData={userData} setUserData={setUserData}  updateUserData={updateUserData}/>
        </div>
    )
}

// function to upload avatar using react dropzone
function UploadAvatar(props){
    const {avatar, setAvatar} = props;
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        if(avatar){
            if(avatar.preview){
                setAvatarUrl(avatar.preview);
            } else{
                setAvatarUrl(avatar);
            }
        } else{
            setAvatarUrl(null);
        }
    }, [avatar]);

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({ file, preview: URL.createObjectURL(file) });
        },
        [setAvatar]
    );

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    return (
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar} />
            ): (
                <Avatar size={150} src={ avatarUrl ? avatarUrl : NoAvatar } />
            )}
        </div>
    )
}

function EditForm(props) {
    const {userData, setUserData, updateUserData} = props;
    const {Option} = Select;

    return (
        <Form className="form-edit" onFinish={updateUserData}>
            <Row gutters={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Name"
                            value={userData.name}
                            onChange={e => setUserData({ ...userData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Lastname"
                            value={userData.lastName}
                            onChange={e => setUserData({ ...userData, lastName: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutters={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="email"
                            value={userData.email}
                            onChange={e => setUserData({ ...userData, email: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Select a role"
                            onChange={e => setUserData({ ...userData, role: e })}
                            value={userData.role}
                        >
                            <Option value="admin">Administrator</Option>
                            <Option value="editor">Editor</Option>
                            <Option value="reviewer">Reviewer</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutters={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="password"
                            onChange={e => setUserData({ ...userData, password: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="repeat password"
                            onChange={e => setUserData({ ...userData, repeatPassword: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type='primary' htmlType='submit' className='btn-submit'>
                    Update User
                </Button>
            </Form.Item>
        </Form>
    )
}