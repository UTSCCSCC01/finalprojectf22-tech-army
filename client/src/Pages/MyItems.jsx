import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar';
import ProfileInfo from '../Components/ProfileInfo';
import { getToken } from '../Utils/Common'
import { Row, Col, Container, Card } from 'react-bootstrap';
import Axios from "axios";
import ImageSlider from '../Utils/ImageSlider';

const MyItems = () => {
    const [itemsPosted, setItemsPosted] = useState([]);
    const [itemsBookmarked, setitemsBookmarked] = useState([]);

    let axiosConfig = {
        headers: {
            'x-auth-token': getToken(),
        }
    };
    
    useEffect(() => {
        Axios.get('http://localhost:8000/api/myitems/array', axiosConfig)
        .then(response =>{
            console.log(response);
        })
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
                        <h2>Below are the items you have for sale</h2>
                        {
                            itemsPosted.length === 0 ?
                                <h2>No items for sale...</h2>
                                :
                                itemsPosted.map((item, index) => {
                                    return (
                                        <Col lg={6} md={8} xs={24}>
                                            <Card>
                                                <Card.Title>
                                                    {item.title}
                                                </Card.Title>
                                                <a href={`/itemsposted/${item._id}`}><ImageSlider images={item.images} /></a>
                                                <Card.Text>
                                                    {item.description}
                                                </Card.Text>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                    </Col>

                    <Col>
                        <h2>Below are the items you have bookmarked</h2>
                        {
                            itemsBookmarked.length === 0 ?
                                <h2>No items bookmarked...</h2>
                                :
                                itemsBookmarked.map((item, index) => {
                                    return (
                                        <Col lg={6} md={8} xs={24}>
                                            <Card>
                                                <Card.Title>
                                                    {item.title}
                                                </Card.Title>
                                                <a href={`/itemsposted/${item._id}`}><ImageSlider images={item.images} /></a>
                                                <Card.Text>
                                                    {item.description}
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

export default MyItems;