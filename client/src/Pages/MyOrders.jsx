import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar';
import ProfileInfo from '../Components/ProfileInfo';
import { getToken, getUserId } from '../Utils/Common'
import { Row, Col, Container, Card } from 'react-bootstrap';
import Axios from "axios";
import ImageSlider from '../Utils/ImageSlider';

const MyOrders = () => {
    const userId = getUserId();
    const [orders, setOrders] = useState([]);

    let axiosConfig = {
        headers: {
            'x-auth-token': getToken(),
        }
    };

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/postitem/${userId}`, axiosConfig)
        .then(response => {
            console.log(response.data);
            setOrders(response.data);
        });
    }, []);

    return (
        <>
        <Navbar />
        <div style={{paddingLeft: "300px"}}>
            <div>
                <ProfileInfo/>
            </div>
            <Container>
                <Row>
                    <Col>
                        <h2>Below are the orders you have placed:</h2>
                        {
                            orders.length === 0 ?
                                <h2>No orders placed...</h2>
                                :
                                orders.map((order, index) => {
                                    return (
                                        <Col lg={6} md={8} xs={24}>
                                            <Card>
                                                <Card.Title>
                                                    {order.title}
                                                </Card.Title>
                                                { <a href={`/market/${order._id}`}><ImageSlider images={order.images} /></a> }
                                                <Card.Text>
                                                    {order.description}
                                                </Card.Text>
                                            </Card>
                                        </Col>
                                    )
                                })
                        }
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default MyOrders