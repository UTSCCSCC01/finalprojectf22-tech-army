import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Container, Row, Col, Card } from 'react-bootstrap';
import EventImage from '../Components/EventImage'
import EventInfo from '../Components/EventInfo'
import { useParams } from "react-router-dom"
import { getToken } from '../Utils/Common'
import '../Styles/eventdetail.css'


function DetailEvent() {
    
    const { eventId } = useParams();
    const [Event, setEvent] = useState([]);
    const [usersJoined, setUsersJoined] = useState([]);
    let axiosConfig = {
        headers: {
            'x-auth-token': getToken(),
        }
    };

    useEffect(() => {
        Axios.get(`/api/events/events_by_id?id=${eventId}&type=single`, axiosConfig)
        .then(response => {
            setEvent(response.data[0]);
            let axiosConfig2 = {
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8',
                  'x-auth-token': getToken(),
                },
                params: {"userIds": response.data[0].usersJoined}
              };
            Axios.get('http://localhost:8000/api/users/array', axiosConfig2).then(response => {
                console.log(response.data);
                setUsersJoined(response.data);
            });
        })
    }, []);

    console.log('Who are the users\n', usersJoined);

    const joinEvent = (eventId) => {
        const path = '/api/events/' + eventId;
        Axios.put(path, {}, axiosConfig).then(response => {
            const message = response.data.message
            console.log(message);
        }).catch((error) => {
            const errorMsg = error.response.data.message;
            alert(errorMsg);
            console.error(errorMsg);
            console.log(error);
        })
    }

    const deleteEvent = (eventId) => {
        if (getToken() === Event.creator){
            const path = '/api/events/' + eventId;
            Axios.delete(path, {}, axiosConfig).then(response => {
                const message = response.data.message
                console.log(message);
            }).catch((error) => {
                const errorMsg = error.response.data.message;
                alert(errorMsg);
                console.error(errorMsg);
                console.log(error);
            })
        }
        else{
            alert("You didn't create this post.")
        }
    }
      
    return (
        <div className="postEvent" style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Event.title}</h1>
            </div>

            <br />
            <Container>
                <Row>
                    <Col>
                        <EventImage detail={Event}/>
                    </Col>
                    <Col>
                        <EventInfo detail={Event} joinEvent = {joinEvent} deleteEvent = {deleteEvent}/>
                    </Col>
                </Row>
                <Row>
                    <h1>See who has joined this event.</h1>
                    {
                        usersJoined.length === 0 ?
                        <h2> No users yet...</h2>
                        :
                        usersJoined.map((user, index) => {
                            return (
                                <Col lg={6} md={8} xs={24}>
                                    <Card>
                                        <Card.Title>
                                            {user.name}
                                        </Card.Title>
                                        <img className="userPic"
                                            src={`http://localhost:8000/${user.profilePictureURL}`} alt="userImage" />
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </div>
    )
}

export default DetailEvent
