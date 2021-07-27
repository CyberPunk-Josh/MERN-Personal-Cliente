import React from 'react';
import {Layout, Tabs} from 'antd';
import {Redirect} from 'react-router-dom';
import Logo from '../../../assets/img/png/logo-white.png';
import RegisterForm from '../../../components/RegisterForm/RegisterForm';
import LoginForm from '../../../components/Admin/LoginForm';
import {getAcessToken} from '../../../api/auth';

// importing SASS file:
import "./SignIn.scss";

const SignIn = () => {
    
    const { Content} = Layout;
    const {TabPane} = Tabs;

    if(getAcessToken()){
        return <Redirect to="/admin" />
    }

    return ( 
        <Layout className="sign-in">
            <Content className="sign-in__content">
                <h1 className="sign-in__content-logo">
                    <img src={Logo} alt="agustin"/>
                </h1>

                <div className="sign-in__content-tabs">
                    <Tabs type='card'>
                        <TabPane tab={<span>Entrar</span>} key="1">
                            <LoginForm />
                        </TabPane>
                        <TabPane tab={<span>Nuevo Usuario</span>} key="2">
                            <RegisterForm />
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
     );
}
 
export default SignIn;