import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { Layout } from 'antd';

const LayoutBasic = (props) => {
    const {routes} = props;
    const {Content, Footer} = Layout;
    // console.log(props)
    return ( 
        <Layout>
            <h2>menu sider</h2>
            <Layout>
                <Content>
                    <LoadRoutes  routes={routes} />
                </Content>
                <Footer>
                    Joshue Neyra
                </Footer>
            </Layout>
        </Layout>
     );
};

function LoadRoutes({routes}){

    return(
        <Switch>
            {routes.map((route, index) => (
                <Route 
                    key = {index}
                    path = {route.path}
                    component={route.component}
                    exact={route.exact}
                />
            ))}
        </Switch>
    )
}
 
export default LayoutBasic;