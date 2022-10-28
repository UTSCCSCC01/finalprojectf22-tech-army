import React, { useState } from "react";
import Navbar from '../Components/Navbar/Navbar';
import axios from "axios";
import { getToken } from "../Utils/Common";
import './show.css';
  
const Events = () => {

  const [events, setEvent] = useState(null);
  const [query, setQuery] = useState("");

  let axiosConfig = {
    headers:{'x-auth-token': getToken()}
  };

  React.useEffect(() => {
    axios.get('http://localhost:8000/api/events/', axiosConfig).then(res => {
    setEvent(res.data)
  });
  });

  if (!events) return null;

  return (
    <><Navbar /><div className="SearchBar"
      style={{    
        paddingLeft: "300px"
      }}
    >
      <input placeholder="Enter Event Name..." onChange={event => setQuery(event.target.value)} />
      {
        events.filter(eventss => {
          if (query === '') {
            return null;
          } else if (eventss.title.toLowerCase().includes(query.toLowerCase())) {
            return eventss;
          } else {
            return null
          }
        }).map((eventss) => (
          <div className="card" key={eventss.id}>
            <p>{eventss.title}</p>
          </div>
        ))
      }
    </div></>
  );
};
  
export default Events;