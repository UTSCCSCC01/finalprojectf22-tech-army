import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Form,
  Input
} from 'antd';
import {
  getEmail,
  getToken,
  getUser,
  setUserData,
} from '../Utils/Common';
import FileUpload from '../Utils/FileUpload'
import Navbar from '../Components/Navbar/Navbar';
import axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;


const EditProfile = () => {

  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState([]);
  const [username, setUsername] = useState(getUser());
  const [password, setPassword] = useState('');

  const updateProfilePicPreview = (newImages) => {
    // Use the most recently uploaded image as the sole image the user wants
    if (newImages?.length > 0) {
      setProfilePic([newImages[newImages.length - 1]])
    } else {
      setProfilePic([])
    }
  }

  const onUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const saveChanges = () => {
    const body = {
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
        setUserData(username, getEmail());
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
        paddingLeft: "300px",
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Edit Profile</Title>
      </div>
      
      <Form>
        
        <label>Profile Picture</label>
        <FileUpload refreshFunction={updateProfilePicPreview}/>
        <br />
        <br />

        <label>Username</label>
        <Input
          onChange={onUsernameChange}
          value={username}
        />
        <br />
        <br />

        <label>Password</label>
        <Input.Password
          onChange={onPasswordChange}
          value={password}
        />
        <br />
        <br />

        <div
          style={{
            display: 'flex',
          }}
        >
          <Button variant="contained" size="large" color="secondary" onClick={saveChanges} danger>Save</Button>
          <Button variant="contained" size="large" color="secondary" onClick={cancelChanges}>Cancel</Button>
        </div>
      </Form>
    </div>
    </>
  );
};
    
export default EditProfile;
