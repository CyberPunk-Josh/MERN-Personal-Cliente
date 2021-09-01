import React, {useState} from 'react';
import { Form, Icon, Input, Select, Button, Row, Col, notification } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

import { signUpUserAdmin } from '../../../../api/user';
import { getAcessToken } from '../../../../api/auth';

import './AddUserForm.scss';

export default function AddUserForm(props) {
    const {setIsVisibleModal, setReloadUsers} = props;
    const [userData, setUserData] = useState({});

    const addUser = () => {
        if(!userData.name || !userData.lastName || !userData.email || !userData.password || !userData.repeatPassword) {
            notification['error']({
                message: 'All fields are required'
            })
        } else if (userData.password !== userData.repeatPassword) {
            notification['error']({
                message: 'Passwords must match'
            })
        } else {
            const token = getAcessToken();
            let newUser = userData;

            signUpUserAdmin(token, newUser).then(result => {
                notification['success']({
                    message: result.message
                });
                setIsVisibleModal(false);
                setReloadUsers(true);
            })
        }
    }

    return (
        <div className="add-user-form">
            <AddForm
                userData={userData}
                setUserData={setUserData}
                addUser={addUser}
            />
        </div>
    )
}

function AddForm(props) {
    const { userData, setUserData, addUser } = props;
    const { Option } = Select;

    return (
        <Form className='form-add' onFinish={addUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Name"
                            value={userData.name}
                            onChange={ e => setUserData({ ...userData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Lastname"
                            value={userData.lastName}
                            onChange={ e => setUserData({ ...userData, lastName: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="E-mail"
                            value={userData.email}
                            onChange={ e => setUserData({ ...userData, email: e.target.value })}
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
                            placeholder="Password"
                            onChange={e => setUserData({ ...userData, password: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Repeat password"
                            onChange={e => setUserData({ ...userData, repeatPassword: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type='primary' htmlType='submit' className='btn-submit'>
                    Create User
                </Button>
            </Form.Item>
        </Form>
    )
}