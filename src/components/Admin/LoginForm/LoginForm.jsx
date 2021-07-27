import React, { useState } from 'react'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants';
import {Form, Input, Button, notification} from 'antd';
import { MailOutlined, LockOutlined} from '@ant-design/icons';
import { singInApi } from '../../../api/user';

import './LoginForm.scss';

export default function LoginForm() {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    const changeForm = e => {
        setInputs({
            ...inputs,
            // next line its due to values in useState has the same name in the inputs
            [e.target.name]: e.target.value
        })
    }

    const logIn = async e => {
        const result = await singInApi(inputs);

        // checking if there is an error
        if(result.message){
            notification['error']({
                message: result.message
            });
        } else {
            const {accessToken, refreshToken} = result;
            // saving them in localStorage
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);

            notification['success']({
                message: "Login successfully"
            })

            // redirect to admin page:
            window.location.href = "/admin";
        }
    }

    return (
        <Form className="login-form" onChange={changeForm} onFinish={logIn}>
            <Form.Item>
                <Input 
                    prefix={<MailOutlined  style={{ color: 'rgba(0,0,0,.25)'}}/>}
                    type="email"
                    name="email"
                    placeholder="mail"
                    className="login-form__input"
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<LockOutlined  style={{ color: 'rgba(0,0,0,.25)'}}/>}
                    type="password"
                    name="password"
                    placeholder="password"
                    className="login-form__input"
                />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="login-form__button">
                    Entrar
                </Button>
            </Form.Item>
        </Form>
    )
}