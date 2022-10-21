import React, { useState } from "react";
import Navbar from '../Components/Navbar/Navbar';
import { useNavigate } from "react-router-dom";
  
const Events = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/events/postevent');
  }

  return (
    <><Navbar />
    <div
      style={{
        display: 'flex',
        justifyContent: 'Left',
        alignItems: 'Left',
        height: '100vh',
        paddingLeft: "300px"
      }}
    >
      <h1>Welcome to Events Page!</h1>
      <input
        type="button"
        value={loading ? "Loading..." : "Create"}
        disabled={loading}
        onClick={handleCreate}
      />
    </div></>
  );
};
  
export default Events;