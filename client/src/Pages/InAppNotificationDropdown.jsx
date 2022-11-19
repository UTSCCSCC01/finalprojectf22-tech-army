import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { getToken } from '../Utils/Common';
import { useNavigate } from "react-router-dom";


export const InAppNotificationDropdown = () => {
    const [isFound, setIsFound] = useState(false);
    const [inAppNotificationData, setInAppNotificationData] = useState(null);
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'x-auth-token': getToken(),
        }
    };
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            await Axios.get('/api/notification', axiosConfig).then(response =>  {
                setInAppNotificationData(response.data);
                if (response.data != null) {
                    setIsFound(!isFound);
                }
                console.log(response.data);
            }).catch((error) => {
                const errorMsg = error.response.data.message;
                alert(errorMsg);
                console.error(errorMsg);
            })
        }
        fetchData();
    }, []);



    const onClickNotifHandler = (endpoint) => {
        navigate(endpoint);
    }

    const markAsAllReadHandler = () => {
        Axios.put('/api/notification', {}, axiosConfig).then(response => {
            setInAppNotificationData(response.data);
            setIsFound(!isFound);
            console.log(response.data);
        }).catch((error) => {
            const errorMsg = error.response.data.message;
            alert(errorMsg);
            console.error(errorMsg);
        })
    }

    let i = 0;
    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button"
            id="dropdownMenuButton1" data-bs-toggle="dropdown"
            aria-expanded="false">
                Notification
            </button>
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                { isFound ?
                    inAppNotificationData.messages.map((message) => {
                        i += 1;
                        return (
                            <li><button className="dropdown-item" type="button"
                            onClick={() => onClickNotifHandler(inAppNotificationData.endpoints[i - 1])}>
                                {message}</button></li>
                        )
                    })
                    :
                    <li><a className="dropdown-item" href="#"></a>No notifs</li>
                }
                <li><hr class="dropdown-divider"/></li>
                <li><button className="dropdown-item active" type="button" onClick={markAsAllReadHandler}>
                    Mark all as read</button></li>
            </ul>
        </div>
    )

}