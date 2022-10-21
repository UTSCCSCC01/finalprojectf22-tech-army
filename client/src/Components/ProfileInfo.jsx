import React from 'react'
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button'
import {
    getUser,
    getEmail,
    getCoverImg,
    getProfilePic,
} from '../Utils/Common'

const ProfileInfo = () => {
    
    const user = getUser();
    const email = getEmail();
    const profilePic = getProfilePic();
    const coverImg = getCoverImg();

    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate('/editProfile');
    }

    return (
        <>
            <div>
                welcome back {user}<pre></pre> your email: {email}
            </div>

            <div>
                <img src={coverImg} width={927} height={90} alt="cover" />
            </div>

            <div 
                style={{
                    backgroundColor: "#D3D3D3",
                    height:"134px",
                }}
            >
          
            <img src={profilePic} height={120} alt="profile-pic" />
                <Button variant = "outlined" size="medium" color = "primary" onClick={handleEditProfile}>edit profile</Button>
            </div>
        </>
    )
}

export default ProfileInfo
