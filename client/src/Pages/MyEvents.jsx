import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar/Navbar';
import ProfileInfo from '../Components/ProfileInfo';
import { getToken } from '../Utils/Common'

import Axios from "axios";

const MyEvents = () => {
    const navigate = useNavigate();
    console.log("This is the MyEvents page\n", getToken());

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'x-auth-token': getToken(),
        }
    };
    
    useEffect(() => {
        Axios.get('http://localhost:8000/api/events/array', {}, axiosConfig).then(response =>{
        console.log(response);
    },[]);

    })

    return (
        <>
        <Navbar />
        <div style={{paddingLeft: "300px"}}>
            <div>
                <ProfileInfo/>
            </div>
        </div>
        <h1>Hello World</h1>
        </>
    )
}

export default MyEvents;