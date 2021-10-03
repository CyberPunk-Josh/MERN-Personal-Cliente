import React from 'react';
import {Row, Col} from 'antd';
import { BookOutlined, CodeOutlined, DatabaseOutlined, CaretRightOutlined} from '@ant-design/icons';

import './NavFooter.scss';

export default function NavFooter() {
    return (
        <Row className="navigation-footer">
            <Col md={24}>
                <h3>Navigation</h3>
            </Col>
            <Col md={12}>
                <RenderListLeft/>
            </Col>
            <Col md={12}>
                <RenderListRigth/>
            </Col>
        </Row>
    )
}

function RenderListLeft(){
    return (
        <ul>
            <li>
                <a href="#" rel="noreferrer">
                    <BookOutlined /> Online Courses
                </a>
            </li>
            <li>
                <a href="#" rel="noreferrer">
                    <CodeOutlined /> Web Development
                </a>
            </li>
            <li>
                <a href="#" rel="noreferrer">
                    <DatabaseOutlined /> Databases
                </a>
            </li>
            <li>
                <a href="#" rel="noreferrer">
                    <CaretRightOutlined /> Privacy Policy
                </a>
            </li>
        </ul>
    )
}

function RenderListRigth(){
    return (
        <ul>
            <li>
                <a href="#" rel="noreferrer">
                    <BookOutlined /> Online Courses
                </a>
            </li>
            <li>
                <a href="#" rel="noreferrer">
                    <CodeOutlined /> Web Development
                </a>
            </li>
            <li>
                <a href="#" rel="noreferrer">
                    <DatabaseOutlined /> Databases
                </a>
            </li>
            <li>
                <a href="#" rel="noreferrer">
                    <CaretRightOutlined /> Privacy Policy
                </a>
            </li>
        </ul>
    )
}
