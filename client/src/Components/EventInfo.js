import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';
import { useNavigate } from "react-router-dom";



function EventInfo(props) {

    const navigate = useNavigate();
    const [Event, setEvent] = useState({})
    const navigate = useNavigate();

    useEffect(() => {

        setEvent(props.detail)

    }, [props.detail])

    const joinEventhandler = () => {
        props.joinEvent(props.detail._id)
    }

    const deleteEventhandler = () => {
        props.deleteEvent(props.detail._id)
        navigate("/events/array");
    }

    const backToEvents = () => {
        navigate("/events")
    }


    return (
        <div>
            <Descriptions title="Event Info">
                <Descriptions.Item label="Description"> {Event.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <div >
                <Button size="large" shape="round" type="danger"
                    onClick={joinEventhandler}
                >
                    Join Event
                    </Button>
                <Button size="large" shape="round" type="danger"
                    onClick={backToEvents}
                >
                    Back to Events
                </Button>
            </div>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                    onClick={deleteEventhandler}
                >
                    Delete Event
                    </Button>
            </div>
        </div>
    )
}

export default EventInfo