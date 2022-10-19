import React from 'react';
import { useNavigate } from "react-router-dom";

const Events = () => {

  const navigate = useNavigate();

  const handlePost = () => {
    navigate('/events/postevent');
  }
  
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'Left',
        alignItems: 'Left',
        paddingLeft: "25%"
      }}
    >
      <h1>Welcome to Events Page!</h1>
      <input
        type="button"
        value={"Post Event"}
        onClick={handlePost}
      />
    </div>
  );
};
  
export default Events;