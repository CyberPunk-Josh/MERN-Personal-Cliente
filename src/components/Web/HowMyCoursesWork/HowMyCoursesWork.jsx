import React from 'react';
import { Row, Col, Card } from 'antd';

import './HowMyCoursesWork.scss';

export default function HowMyCoursesWork() {
    return (
        <Row className="how-my-courses-work">
            <Col lg={24} className='how-my-courses-work__title' >
                <h2>How my courses work?</h2>
                <h3>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque aliquam deleniti hic.
                </h3>
            </Col>
            <Col lg={4}/>
            <Col lg={16}>
                <Row className='row-cards'>
                    <Col md={8}>
                        <CardInfo
                            title='Courses'
                            description='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque aliquam deleniti hic.'
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            title='Acces 24/7'
                            description='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque aliquam deleniti hic.'
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            title='Learn together'
                            description='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque aliquam deleniti hic.'
                        />
                    </Col>
                </Row>
                <Row className='row-cards'>
                    <Col md={8}>
                        <CardInfo
                            title='Courses'
                            description='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque aliquam deleniti hic.'
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            title='Acces 24/7'
                            description='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque aliquam deleniti hic.'
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            title='Learn together'
                            description='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque aliquam deleniti hic.'
                        />
                    </Col>
                </Row>
            </Col>
            <Col lg={4}/>
        </Row>
    )
}

function CardInfo(props){
    const {title, description} = props;
    const {Meta} = Card;

    return (
        <Card className='how-my-courses-work__card'>
            <Meta title={title} description={description}/>
        </Card>
    )
}
