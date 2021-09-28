import React from 'react';
import {Row, Col, Card, Avatar} from 'antd';
import AvatarPersona from '../../../assets/img/png/no-avatar.png';

import './ReviewCourses.scss';

export default function ReviewCourses() {
    return (
        <Row className="reviews-courses">
            <Row>
                <Col lg={4} />
                <Col lg={16} className="reviews-courses__title">
                    <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nulla asperiores amet.</h2>
                </Col>
                <Col lg={4} />
            </Row>
            <Row>
                <Col lg={4} />
                <Col lg={16}>
                    <Row className='row-cards'>
                        <Col md={8}>
                            <CardReview
                                name='Josh'
                                subtitle='Udemy student'
                                avatar={AvatarPersona}
                                review='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nulla asperiores amet.'
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name='Josh'
                                subtitle='Udemy student'
                                avatar={AvatarPersona}
                                review='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nulla asperiores amet.'
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name='Josh'
                                subtitle='Udemy student'
                                avatar={AvatarPersona}
                                review='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nulla asperiores amet.'
                            />
                        </Col>
                    </Row>
                    <Row className='row-cards'>
                        <Col md={8}>
                            <CardReview
                                name='Josh'
                                subtitle='Udemy student'
                                avatar={AvatarPersona}
                                review='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nulla asperiores amet.'
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name='Josh'
                                subtitle='Udemy student'
                                avatar={AvatarPersona}
                                review='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nulla asperiores amet.'
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name='Josh'
                                subtitle='Udemy student'
                                avatar={AvatarPersona}
                                review='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nulla asperiores amet.'
                            />
                        </Col>
                    </Row>
                </Col>
                <Col lg={4} />
            </Row>
        </Row>
    )
};

function CardReview(props){
    const {name, subtitle, avatar, review} = props;
    const {Meta} = Card;

    return (
        <Card className='reviews-courses__card'>
            <p>{review}</p>
            <Meta
                avatar={<Avatar src={avatar} />}
                title={name}
                description={subtitle}
            />
        </Card>
    )
}
