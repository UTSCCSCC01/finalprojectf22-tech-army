import React from 'react';
import '../Styles/message.css';
import Navbar from '../Components/Navbar/Navbar';
  
const Message = () => {
  return (
    <>
    <Navbar />
    <div className='message'>
      <div className="chatMenu">
         <div className="chatMenuWrapper">
          <input type="Search for friends" />
         </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">box</div>
      </div>
    </div>
    </>
  );
};
  
export default Message;