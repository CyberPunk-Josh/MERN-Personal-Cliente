import React, {useState} from 'react';
import {Form, Input, Button, notification} from 'antd';
import {MailOutlined} from '@ant-design/icons';
import {suscribreNewsletter} from '../../../api/newsletter';

import './NewsLetter.scss';

export default function NewsLetter() {

    const [email, setEmail] = useState("");

    const onSubmit = () => {
        const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const resultValidation = emailValid.test(email);
        if(!resultValidation){
            notification['error']({
                message: 'Invalid email'
            });
            return;
        } else {
            let newNewsletter = {
                "email": email,
            }

            suscribreNewsletter(newNewsletter).then(response => {
                if(response.message == 'Email already registered'){
                    notification['warning']({
                        message: response.message
                    })
                } else if (response.message == 'Server Error'){
                    notification['error']({
                        message: response.message
                    })
                } else if (response.message == 'Something went wrong'){
                    notification['error']({
                        message: response.message
                    })
                } else {
                    notification['success']({
                        message: response.message
                    })
                    setEmail("");
                }
            })
        }
    }

    return (
        <div className="newsLetter">
            <h3>NewsLetter</h3>
            <Form onFinish={onSubmit}>
                <Form.Item>
                    <Input
                        prefix={<MailOutlined style={{color: 'rgba(0,0,0,0.25)'}} />}
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType='submit'
                        className='login-form-button'
                    >
                        Suscribe
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
