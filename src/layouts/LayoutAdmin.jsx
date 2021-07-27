import React, {useState, Fragment} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import { Layout } from 'antd';
import useAuth from '../hooks/useAuth';
import MenuTop from '../components/Admin/MenuTop';
import MenuSider from '../pages/Admin/MenuSider/MenuSider';
import AdminSignIn from '../pages/Admin/SignIn/SignIn';

import { getAcessToken, getRefreshToken } from '../api/auth';

// SCSS:
import './LayoutAdmin.scss';

const LayoutAdmin = (props) => {
    const { routes } = props;
    const {Header, Content, Footer} = Layout;

    const {user, isLoading} = useAuth()

    // close and open menu:
    const [menuCollapsed, setMenuCollapsed] = useState(false);

    const accessToken = getAcessToken();
    const refreshToken = getRefreshToken();
    // console.log(user)

    if(!user && !isLoading){
        return(
            <Fragment>
                <Route path="/admin/login" component={AdminSignIn}/>
                <Redirect to="/admin/login" />
            </Fragment>
        )
    }

    if(user && !isLoading){
        return ( 
            <Layout>
                <MenuSider
                    menuCollapsed={menuCollapsed}
                />
                <Layout className='layout-admin' style={{ marginLeft: menuCollapsed ? '80px' : '200px'}}>
                    <Header className='layout-admin__header'>
                        <MenuTop
                            setMenuCollapsed={setMenuCollapsed}
                            menuCollapsed={menuCollapsed}
                        />
                    </Header>
                    <Content className='layout-admin__content'>
                        <LoadRoutes routes={routes} />
                    </Content>
                    <Footer className='layout-admin__footer'>Footer...</Footer>
                </Layout>
            </Layout>
         );
    }

    return null;
}

function LoadRoutes({routes}) {

    return(
        <Switch>
        {routes.map((route, index) =>(
            <Route 
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
            />
        ))}
        </Switch>
    )
};
 
export default LayoutAdmin;