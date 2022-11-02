import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col } from 'antd'
import ItemImage from '../Components/Image'
import ItemInfo from '../Components/ItemInfo'
import { useParams } from "react-router-dom"
import { getToken } from '../Utils/Common'
import Comments from "../Components/comments/Comments";
import "./Commentview.css";
import '../Pages/eventdetail.css'

function DetailItem() {
    
    const { itemId } = useParams();
    const [Item, setItem] = useState([])
    let axiosConfig = {
        headers: {
            'x-auth-token': getToken(),
        }
    };

    useEffect(() => {
        Axios.get(`/api/postitem/items_by_id?id=${itemId}&type=single`, axiosConfig)
        .then(response => {
            setItem(response.data[0])
        })
    }, [])

    return (
        <div className="postItem" style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Item.title}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24}>
                    <ItemImage detail={Item}/>
                </Col>
                <Col lg={12} xs={24}>
                    <ItemInfo detail={Item}/>
                </Col>
            </Row>
            <Comments
                commentsUrl="http://localhost:3004/comments"
                currentUserId="1"
            />
        </div>
    )
}

export default DetailItem
