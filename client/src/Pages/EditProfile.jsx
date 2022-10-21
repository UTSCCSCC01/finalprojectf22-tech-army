import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import {
  getToken,
  setUserData,
} from '../Utils/Common';
import Navbar from '../Components/Navbar/Navbar';
import axios from "axios";

const EditProfile = () => {

  const navigate = useNavigate();

  const saveChanges = () => {
    const body = {
      email: email,
      password: password,
      username: username,
    };

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'x-auth-token': getToken(),
      }
    };

    axios.post('/api/users', body, axiosConfig).then(response => {
      if (response.data.success) {
        // Succesfully changed account info on backend, update data on client
        setUserData(username, email);
        navigate('/dashboard');
      } else {
        const errorMsg = 'Error while saving changes';
        alert(errorMsg);
        console.error(errorMsg);
        console.error(response);
      }
    });
  }

  const cancelChanges = () => {
    navigate('/dashboard');
  }

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

      <Button variant="contained" size="large" color="secondary" onClick={saveChanges}>Save</Button>
      <Button variant="contained" size="large" color="secondary" onClick={cancelChanges}>Cancel</Button>
    </div>
    </>
  );
};
    
export default EditProfile;
