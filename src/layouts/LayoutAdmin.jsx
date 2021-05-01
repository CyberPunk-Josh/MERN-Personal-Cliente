import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import { Layout } from 'antd';
import MenuTop from '../components/Admin/MenuTop';
import MenuSider from '../pages/Admin/MenuSider/MenuSider'

// SCSS:
import './LayoutAdmin.scss';

const LayoutAdmin = (props) => {
    const { routes } = props;
    const {Header, Content, Footer} = Layout;

    // cerrar y abrir el menu:
    const [menuCollapsed, setMenuCollapsed] = useState(false);

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