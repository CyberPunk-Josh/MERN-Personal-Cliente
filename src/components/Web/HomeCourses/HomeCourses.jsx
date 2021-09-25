import React from 'react';
import {Row, Col, Button, Card} from 'antd';
import {Link} from 'react-router-dom';
import reactJsHooks from '../../../assets/img/jpg/react-js-hooks.jpg';
import reactNative from '../../../assets/img/jpg/react-native.jpg';
import javaScript from '../../../assets/img/jpg/javascript-es6.jpg';
import wordPress from '../../../assets/img/jpg/wordpress.jpg';
import prestaShop from '../../../assets/img/jpg/prestashop-1-7.jpg';
import cssGrid from '../../../assets/img/jpg/css-grid.jpg';

import './HomeCourses.scss';

export default function HomeCourses() {
    return (
        <Row className="home-courses">
            <Col lg={24} className='home-courses__title'>
                <h2>Learn new technologies</h2>
            </Col>
            <Col lg={4} />
            <Col lg={16} >
                <Row className="row-courses">
                    <Col md={6}>
                        <CardCourse
                            image={reactJsHooks}
                            title="ReactJs"
                            subtitle="React Hooks"
                            link='#'
                        />
                    </Col>
                    <Col md={6}>
                        <CardCourse
                            image={reactNative}
                            title="React Native"
                            subtitle="React Native"
                            link='#'
                        />
                    </Col>
                    <Col md={6}>
                        <CardCourse
                            image={javaScript}
                            title="JavaScript"
                            subtitle="JS"
                            link='#'
                        />
                    </Col>
                    <Col md={6}>
                        <CardCourse
                            image={cssGrid}
                            title="CSS"
                            subtitle="CSS"
                            link='#'
                        />
                    </Col>
                </Row>
                <Row className="row-courses">
                    <Col md={6}>
                        <CardCourse
                            image={wordPress}
                            title="wordPress"
                            subtitle="wordPress"
                            link='#'
                        />
                    </Col>
                    <Col md={6}/>
                    <Col md={6}/>
                    <Col md={6}>
                        <CardCourse
                            image={prestaShop}
                            title="Prestashop"
                            subtitle="Prestashop"
                            link='#'
                        />
                    </Col>
                </Row>
            </Col>
            <Col lg={4} />
            <Col lg={24} className="home-courses__more">
                <Link to="/courses">
                    <Button>See more</Button>
                </Link>
            </Col>
        </Row>
    )
}

function CardCourse(props){
    const { image, title, subtitle, link } = props;
    const {Meta} = Card;

    return (
        <a href={link} target="_blank" rel="noopener norefer">
            <Card
                className="home-courses__card"
                cover={<img src={image} alt={title} />}
                actions={[<Button>Get Course</Button>]}
            >
                <Meta title={title} description={subtitle} />
            </Card>
        </a>
    )
}
