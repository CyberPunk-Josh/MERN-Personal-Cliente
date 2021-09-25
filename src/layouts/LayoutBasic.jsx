import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import MenuTop from '../components/Web/MenuTop';

const LayoutBasic = (props) => {
    const {routes} = props;
    const {Footer} = Layout;
    // console.log(props)

    return (
        <>
            <Row>
                <Col lg={4} />
                <Col lg={16}>
                    <MenuTop />
                    
                </Col>
                <Col lg={4} />
            </Row>
            <LoadRoutes  routes={routes} />
            <Footer>
                Joshue Neyra
            </Footer>
        </>
    )
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