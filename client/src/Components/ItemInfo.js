import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';
import { getToken} from '../Utils/Common'
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function ItemInfo(props) {
    
    const [Item, setItem] = useState({});
    const navigate = useNavigate();

    let axiosConfig = {
        headers: {
            'x-auth-token': getToken(),
        }
    };

    useEffect(() => {

        setItem(props.detail)

    }, [props.detail])

    const buyItemhandler = () => {
    }

    const deleteItemhandler = () => {
        props.deleteItem(props.detail._id)
        navigate("/events/array");
    }

    const saveItemhandler = () => {
        console.log(Item);
        Axios.put(`http://localhost:8000/api/postitem/${Item._id}`, {}, axiosConfig)
        .then(response =>{
            console.log(response);
        });
    }


    return (
        <div>
            <Descriptions title="Item Info">
                <Descriptions.Item label="Price"> {Item.price}</Descriptions.Item>
                <Descriptions.Item label="Description"> {Item.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                    onClick={buyItemhandler}
                >
                    Buy Item
                    </Button>
            </div>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                    onClick={saveItemhandler}
                >
                    Save Item
                    </Button>
            </div>
            <div style={{padding: '10px'}} >
                    <Button size="large" shape="round" type="danger"
                        onClick={deleteItemhandler}
                    >
                        Delete Item
                    </Button>
                </div>
        </div>
    )
}

export default ItemInfo