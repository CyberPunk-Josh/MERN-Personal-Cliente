import React, { useState } from 'react';
import "./RegisterForm.scss";
import { Form, Input, Button, Checkbox, notification} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

// functions from utils:
import {emailValidation, minLengthValidations} from '../../utils/formValidation';

// function to create a new user:
import { signUpApi } from '../../api/user';


const RegisterForm = () => {

    // state to save the form:
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false
    });

    // state for validation:
    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    })

    // function to save values of form:
    const changeForm = e => {
        // value of checked:
        if (e.target.name === 'privacyPolicy'){
            setInputs({
                // copy of the state:
                ...inputs,
                [e.target.name] : e.target.checked
            });
        } else {
            // value of inputs:
            setInputs({
                ...inputs,
                [e.target.name] : e.target.value
            })
        }
    }

    // function for submit form:
    const Register = async e => {

        const emailVal = inputs.email;
        const passwordVal = inputs.password;
        const repeatPasswordVal = inputs.repeatPassword;
        const privacyPolicyVal = inputs.privacyPolicy;

        // validation:
        if(!emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal){
            notification['error']({
                message: 'All fields are required'
            })
        } else if (passwordVal !== repeatPasswordVal){
            notification['error']({
                message: 'Passwords must be equal'
            })
        } else {
            // connection to the server to create a new user:
            const result = await signUpApi(inputs);
            // console.log(result);
            if (result.ok === false) {
                notification['error']({
                    message: result.message
                })
                resetForm();   
            } else {
                notification['success']({
                    message: result.message
                });
                // reset From:
                resetForm();   
            }
        }
    }

    const inputValidations = e => {
        const {type, name} = e.target;
        // email validation:
        if(type === 'email'){
            setFormValid({
                ...formValid,
                // using function for email validation from utils:
                [name] : emailValidation(e.target)
            });
        }
        // password validation:
        if(type === 'password'){
            setFormValid({
                ...formValid,
                // using function form password validation from utils:
                [name] : minLengthValidations(e.target, 6)
            })
        }
        // checkbox validation:
        if(type === 'checkbox'){
            setFormValid({
                ...formValid,
                [name] : e.target.checked
            })
        }
    }

    // reset form:
    const resetForm = () => {
        const inputs = document.getElementsByTagName('input');

        for (let i = 0; i < inputs.length; i++){
            inputs[i].classList.remove('success');
            inputs[i].classList.remove('error');
        }

        setInputs({
            email: "",
            password: "",
            repeatPassword: "",
            privacyPolicy: false
        });

        setFormValid({
            email: false,
            password: false,
            repeatPassword: false,
            privacyPolicy: false
        })
    }

    return ( 
        <Form className="register-form" onFinish={Register} onChange={changeForm} >
            <Form.Item>
                <Input 
                    prefix={<UserOutlined style={{ color: 'rgba(0,0,.25)'}} />}
                    type="email"
                    name="email"
                    placeholder="Correo"
                    className="register-form__input"
                    onChange={inputValidations}
                    value={inputs.email}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<LockOutlined  style={{ color: 'rgba(0,0,.25)'}} />}
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="register-form__input"
                    onChange={inputValidations}
                    value={inputs.password}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<LockOutlined  style={{ color: 'rgba(0,0,.25)'}} />}
                    type="password"
                    name="repeatPassword"
                    placeholder="Repeat Password"
                    className="register-form__input"
                    onChange={inputValidations}
                    value={inputs.repeatPassword}
                />
            </Form.Item>
            <Form.Item>
                <Checkbox 
                    name="privacyPolicy" 
                    onChange={inputValidations}
                    checked={inputs.privacyPolicy}
                >
                    Accept Privacy Policy
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="register-form__button">
                    Crear Cuenta
                </Button>
            </Form.Item>
        </Form>
     );
}
 
export default RegisterForm;