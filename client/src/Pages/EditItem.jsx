import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import Axios from 'axios';
import { getToken } from '../Utils/Common';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"
import Navbar from '../Components/Navbar/Navbar';

const { Title } = Typography;
const { TextArea } = Input;

function EditItem() {
    const navigate = useNavigate();
    const { itemId } = useParams();
    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)

    //const [Images, setImages] = useState([])


    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    /*const updateImages = (newImages) => {
        setImages(newImages)
    }*/
    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !DescriptionValue || !PriceValue) {
            return alert('fill all the fields first!')
        }
        if(PriceValue < 0){
            return alert('please enter a positive number for price')
        }

        const body = {
            //writer : getUser(),
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            //images: Images,
        }

        const config = {
            headers : {
                'x-auth-token' : getToken()
            }
        }
        Axios.put(`/api/postitem/editItem/${itemId}`, body, config)
            .then(response => {
                alert('Item Successfully Updated')
                navigate("/market")
            }).catch(error => {
                console.log(error);
                alert(error.response.data.msg)
            });

    }

    return (
        <><Navbar />
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Title level={2}> Edit An Item</Title>
                </div>


                <Form onSubmit = {onSubmit}>

                    {/* DropZone */}

                    <br />
                    <br />
                    <label>Item Title</label>
                    <Input
                        onChange={onTitleChange}
                        value={TitleValue}
                    />
                    <br />
                    <br />
                    <label>Item Description</label>
                    <TextArea
                        onChange={onDescriptionChange}
                        value={DescriptionValue}
                    />
                    <br />
                    <br />
                    <label>Price($)</label>
                    <Input
                        onChange={onPriceChange}
                        value={PriceValue}
                        type="number"
                    />
                    <br />
                    <br />

                <Button
                    onClick={onSubmit}
                >
                    Update Item
                </Button>

                </Form>

            </div>
        </>
    )
}

export default EditItem;