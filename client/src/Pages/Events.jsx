import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import axios from "axios";
import { Col, Card, Row } from 'antd';
import ImageSlider from '../Utils/ImageSlider';
import Button from '@mui/material/Button'

const Events = () => {

  const navigate = useNavigate();
  
  const handlePost =() => {
    navigate('/events/postevent');
  }
  
  const [Events, setevents] = useState([])

  const { Meta } = Card;

  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  
  // only when the PostSize is 8 then we show the load more button
  const [PostSize, setPostSize] = useState()



  useEffect( () => {

    const body = {
      skip: Skip,
      limit : Limit

    }

    axios.post('http://localhost:8000/api/events',body).then (response =>{
      if (response.data.success) {

            setevents([...response.data.event])     //check if the name is called Events

            setPostSize(response.data.PostSize)
            console.log()
      } else{
          alert('cant fetch data from db')
      }
    })

  }, [])




  const Loadfunc = () =>{
      let skip = Skip + Limit;

      const body = {
            skip: skip,
            limit : Limit

      }

          // need to update 
          axios.post('http://localhost:8000/api/events',body).then (response =>{
      if (response.data.success) {

            setevents([...response.data.event])     //check if the name is called Events

            setPostSize(response.data.PostSize)
            console.log()
      } else{
          alert('cant fetch data from db')
      }
    })


    setSkip(skip)

  }




  return (
    <>
       <div
          style={{
          display: 'flex',
          justifyContent: 'Left',
          alignItems: 'Left',
          //height: '100vh',
          paddingLeft: "45%"
        }}
       >
              <h1>Welcome to Events Page!</h1> 
      </div>

      <div
          style={{
          alignItems: 'Left',
          //height: '100vh',
          paddingLeft: "45%"
        }}
       >




          <Button variant="contained" size="large" color="secondary">create my own event</Button>

          {Events.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'Left', alignItems: 'Left' }}>
                    <h2>No events yet...</h2>
                </div> :

                                // render card part
                <div>
                    
                     <Row gutter={[16, 16]}></Row>
                        {Events.map((events,index) => {
                            return <Col lg={6} md={8} xs={24}>

                                    <Card
                                          hoverable={true}
                                          cover={
                                             <ImageSlider images={events.images} />}
                                    >

                                        <Meta
                                            title={events.title}
                                            description={events.description}
                                        />
                                   </Card>

                                  </Col>
                        }) }


                </div>
            }

            <br /><br />


            { PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'Left' }}>
                    <button onClick={Loadfunc}>Load More</button>
                </div>
            }
          
            

            
               










        </div>
   
    
    </>
    

    
  );
};
  
export default Events;