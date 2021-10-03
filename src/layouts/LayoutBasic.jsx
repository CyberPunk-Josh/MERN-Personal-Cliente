import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { Row, Col } from 'antd';
import MenuTop from '../components/Web/MenuTop';
import FooterR from '../components/Web/Footer/Footer';

const LayoutBasic = (props) => {
    const {routes} = props;
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
            <FooterR/>
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