import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import "../Styles/messenger.css";
import Conversation from "../Components/conversations/Conversation";
import Message from "../Components/message/Message";
import ChatOnline from "../Components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { getUserId } from "../Utils/Common";
import axios from "axios";
import { io } from "socket.io-client";

// function Messenger() {
//   const [conversations, setConversations] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const socket = useRef();
//   //const { user } = useContext(AuthContext);
//   const scrollRef = useRef();
//   const userId = getUserId();

//   useEffect(() => {
//     socket.current = io("ws://localhost:8900");
//     socket.current.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

//   useEffect(() => {
//     arrivalMessage &&
//       currentChat?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChat]);

//   useEffect(() => {
//     socket.current.emit("addUser", userId);
//     socket.current.on("getUsers", users => {
//       setOnlineUsers(users);
//     });
//   }, [userId]);

//   useEffect(() => {
//     const getConversations = async () => {
//       try {
//         const res = await axios.get("/api/conversation/" + userId);
//         setConversations(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getConversations();
//   }, [userId]);

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get("/api/messages/" + currentChat?._id);
//         setMessages(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getMessages();
//   }, [currentChat]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const message = {
  //     sender: userId,
  //     text: newMessage,
  //     conversationId: currentChat._id,
  //   };

//     const receiverId = currentChat.members.find(
//       (member) => member !== userId
//     );

//     socket.current.emit("sendMessage", {
//       senderId: userId,
//       receiverId,
//       text: newMessage,
//     });

//     try {
//       const res = await axios.post("/messages", message);
//       setMessages([...messages, res.data]);
//       setNewMessage("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

//   return (
//     <>
//       <Navbar />
//       <div className="messenger">
//         <div className="chatMenu">
//           <div className="chatMenuWrapper">
//             <input placeholder="Search for friends" className="chatMenuInput" />
//             {conversations.map((c) => (
//               <div onClick={() => setCurrentChat(c)}>
//                 <Conversation conversation={c} currentUser={userId} />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="chatBox">
//           <div className="chatBoxWrapper">
//             {currentChat ? (
//               <>
//                 <div className="chatBoxTop">
//                   {messages.map((m) => (
//                     <div ref={scrollRef}>
//                       <Message message={m} own={m.sender === userId} />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="chatBoxBottom">
//                   <textarea
//                     className="chatMessageInput"
//                     placeholder="write something..."
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     value={newMessage}
//                   ></textarea>
//                   <button className="chatSubmitButton" onClick={handleSubmit}>
//                     Send
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <span className="noConversationText">
//                 Open a conversation to start a chat.
//               </span>
//             )}
//           </div>
//         </div>
//         <div className="chatOnline">
//           <div className="chatOnlineWrapper">
//             <ChatOnline
//               onlineUsers={onlineUsers}
//               currentId={userId}
//               setCurrentChat={setCurrentChat}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Messenger;

function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef("ws://localhost:8900");
  const scrollRef = useRef();

  const userId = getUserId();

 
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/api/conversation/" + userId);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        console.log(currentChat._id)
        const res = await axios.get("/api/message/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id,
    }

    try{
      const res = await axios.post("/api/message", message);
      setMessages([...messages, res.data])
    }catch(err){
      console.log(err)
    }
  };

  console.log(socket);

  // useEffect(() => {
  //   console.log("Socket")
  //   if (socket !== null){
  //     socket.on("welcome", message=>{
  //       console.log(message)
  //     })
  //   }
  // }, [socket])

  // useEffect(() => {
  //   socket.current.emit("addUser", userId);
  //   socket.current.on("getUsers", users=>{
  //     console.log(users)
  //   })
  // }, [userId])

  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map(c=>(
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUserId={userId}/>
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {
              currentChat ?
            <>
            <div className="chatBoxTop">
              {messages.map((m) => (
                <div ref={scrollRef}>
                  <Message message={m} own={m.senderId === userId}/>
                </div>
              ))}
            </div>
            <div className="chatBoxBottom">
              <textarea 
                className="chatMessageInput" 
                placeholder="write something ..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
              <button className="chatSubmitButton" onClick={handleSubmit}>
                Send
              </button>
            </div></> : <span className="noConversationText">Open a conversation to start a chat</span>}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  )
}

export default Messenger;