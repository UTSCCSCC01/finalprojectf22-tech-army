import React from 'react';
import Navbar from '../Components/Navbar/Navbar';

const EditProfile = () => {
  return (
    <>
    <Navbar />
    <div
      style={{
        display: 'flex',
        justifyContent: 'Left',
        alignItems: 'Left',
        height: '100vh',
        paddingLeft: "300px"
      }}
    >
      <h1>Edit Profile</h1>
    </div>
    </>
  );
};
    
export default EditProfile;
