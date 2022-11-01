import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar';
import ProfileInfo from '../Components/ProfileInfo';
import { getToken } from '../Utils/Common'
import { Row, Col, Container, Card } from 'react-bootstrap';


import Axios from "axios";
import ImageSlider from '../Utils/ImageSlider';

const MyEvents = () => {
    const [eventsPosted, setEventsPosted] = useState([]);
    const [eventsJoined, setEventsJoined] = useState([]);

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'x-auth-token': getToken(),
        }
    };
    
    useEffect(() => {
        Axios.get('http://localhost:8000/api/events/array', axiosConfig)
        .then(response =>{
            setEventsJoined(response.data.eventsJoined);
            setEventsPosted(response.data.eventPosted);
            console.log(response.data);
        })
    }, []);

    return (
        <>
        <Navbar />
        <div style={{paddingLeft: "300px"}}>
            <div>
                <ProfileInfo/>
            </div>
        </div>
        <Container>
            <Row>

                <Col>
                    <div>Below are the events that you created</div>
                    {
                        eventsPosted.length === 0 ?
                            <h2>No events yet...</h2>
                            :
                            eventsPosted.map((event, index) => {
                                return (
                                    <Col lg={6} md={8} xs={24}>
                                        <Card>
                                            <Card.Title>
                                                {event.title}
                                            </Card.Title>
                                            <a href={`/events/${event._id}`}><ImageSlider images={event.images} /></a>
                                            <Card.Text>
                                                {event.description}
                                            </Card.Text>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                </Col>

                <Col>
                    <div>Below are the events that you joined</div>
                    {
                        eventsJoined.length === 0 ?
                            <h2>No events yet...</h2>
                            :
                            eventsJoined.map((event, index) => {
                                return (
                                    <Col lg={6} md={8} xs={24}>
                                        <Card>
                                            <Card.Title>
                                                {event.title}
                                            </Card.Title>
                                            <a href={`/events/${event._id}`}><ImageSlider images={event.images} /></a>
                                            <Card.Text>
                                                {event.description}
                                            </Card.Text>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                </Col>

            </Row>
        </Container>


        <h1>Hello World</h1>
        </>
    )
}

export default MyEvents;