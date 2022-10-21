import React from 'react';
import Navbar from '../Components/Navbar/Navbar';

  
const Market = () => {
  return (
    <><Navbar />
    <div
      style={{
        display: 'flex',
        justifyContent: 'Left',
        alignItems: 'Left',
        height: '100vh',
        paddingLeft: "300px",
      }}
    >
      <h1>Welcome to Market Page!</h1>
    </div></>
  );
};
  
export default Market;