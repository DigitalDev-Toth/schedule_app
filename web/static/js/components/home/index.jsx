import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';

/**
 * Home component
 */
const Home = () => (
    <Grid fluid>
        <Row>
            <Col xs={12} sm={3} md={2} lg={1} />asd
            <Col xs={6} sm={6} md={8} lg={10} />asd
            <Col xs={6} sm={3} md={2} lg={1} />asd
        </Row>
        <Row>
            <Col xs={12} sm={3} md={2} lg={1} />asd
            <Col xs={12} sm={9} md={10} lg={11} />asd
        </Row>
        <Row>
            <Col xs={10} sm={6} md={8} lg={10} />asd
            <Col xs={2} sm={6} md={4} lg={2} />asd
        </Row>
    </Grid>
);

export default Home;
