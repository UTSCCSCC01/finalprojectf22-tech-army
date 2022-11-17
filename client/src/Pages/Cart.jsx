import React from 'react'
import Navbar from '../Components/Navbar/Navbar';
import  { useEffect, useState } from 'react'
import { getToken, getUserId } from '../Utils/Common'
import { Row, Col, Container, Card } from 'react-bootstrap';
import Axios from "axios";
import ImageSlider from '../Utils/ImageSlider';

const Cart = () => {

    const [itemsInCart, setItemsInCart] = useState([]);
    const [totalCost, setTotalCost] = useState(" [loading...] ");
    const userId = getUserId();

    let axiosConfig = {
        headers: {
            'x-auth-token': getToken(),
        }
    };

    useEffect(() => {
        Axios.get('http://localhost:8000/api/postitem/getUserItems', axiosConfig)
        .then(response =>{
            const items = response.data.itemsInCart
            console.log(items);
            setItemsInCart(items);

            // Handle this once since React rerenders the JSX multiple times, causing too many rerenders even if setTotalCost is called once in the JSX
            let runningCost = 0;
            items.forEach((item, index) => {
                runningCost += item.price ?? 0;
            });
            setTotalCost(runningCost);
        }).catch((reason) => {
            console.error("Error getting user items on Cart page");
            console.error(reason);
            setTotalCost(0);
        });
        
    }, []);



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
      <h1> Welcome to cart page !</h1>
    
      <h3>Total cost: ${totalCost}</h3>
      {
       itemsInCart.length === 0 ?
            <h2>No items in cart...</h2>
        :
        itemsInCart.map((item, index) => {
            return (
                <Col lg={6} md={8} xs={24}>
                    <Card>
                        <Card.Title>
                            {item.title}
                        </Card.Title>
                        { <a href={`/market/${item._id}`}><ImageSlider images={item.images} /></a> }
                        <Card.Text>
                            {" Price: $"+item.price}
                        </Card.Text>
                    </Card>
                </Col>
            )
            })
        }

    </div>
    </>
  )
}

export default Cart
