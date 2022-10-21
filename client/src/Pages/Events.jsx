import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import axios from "axios";
import { Col, Card, Row } from 'antd';
import ImageSlider from '../Utils/ImageSlider';
import Button from '@mui/material/Button'
import { getToken } from '../Utils/Common';
import { useNavigate } from "react-router-dom";

const Events = () => {

  const navigate = useNavigate();
  
  const handlePost =() => {
    navigate('/events/postevent');
  }
  
  const [Events, setevents] = useState([])

  const { Meta } = Card;




  useEffect( () => {

    const config = {
      headers : {
         // 'Content-Type' : 'multipart/form-data',
          'x-auth-token' : getToken()
      }
  }
    axios.post('/api/postevent/getEvents',null,config).then (response =>{
      if (response.data.success) {

            setevents([...response.data.events])     //check if the name is called Events

            console.log(response.data.events)

            
      } else{
          alert('cant fetch data from db')
      }
    })

  }, [])




  return (
    <>
    <Navbar />
    <div
      style={{
        display: 'block',
        justifyContent: 'Left',
        alignItems: 'Left',
        height: '100vh',
        paddingLeft: "300px"
      }}
    >
      <h1>Welcome to Events Page!</h1>

      <Button variant="contained" size="large" color="secondary" onClick={handlePost}>Post event</Button>

      {Events.length === 0 ?
        <div style={{ display: 'flex', height: '300px', justifyContent: 'Left', alignItems: 'Left' }}>
          <h2>No events yet...</h2>
        </div> 
          :
                        // render card part
        <div>
          <Row gutter={[16, 16]}></Row>
          {Events.map((events,index) => {
            return (
              <Col lg={6} md={8} xs={24}>
                <Card
                  hoverable={true}
                  cover={
                      <ImageSlider images={events.images} />
                    }
                >
                  <Meta
                      title={events.title}
                      description={events.description}
                  />
                </Card>
              </Col>
            )
          }) }
        </div>
      }

      <br /><br />
    </div>
    </>
  );
};
  
export default Events;