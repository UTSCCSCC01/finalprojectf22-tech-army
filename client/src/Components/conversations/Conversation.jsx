import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
import defaultProfilePic from'../../assets/profilepic1.png'
// export default function Conversation({ conversation, currentUserId }) {
//   const [user, setUser] = useState(null);
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

//   useEffect(() => {
//     const friendId = conversation.members.find((m) => m !== currentUserId);

//     const getUser = async () => {
//       try {
//         const res = await axios("/users?userId=" + friendId);
//         setUser(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getUser();
//   }, [currentUserId, conversation]);

//   return (
//     <div className="conversation">
//       <img
//         className="conversationImg"
//         src={
//           user?.profilePicture
//             ? PF + user.profilePicture
//             : PF + "person/noAvatar.png"
//         }
//         alt=""
//       />
//       <span className="conversationName">{user?.username}</span>
//     </div>
//   );
// }

export default function Conversation({ conversation, currentUserId }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUserId);
    console.log("Id is " + friendId)
    const getUser = async () => {
      try {
        const res = await axios("/api/users/" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUserId, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user?.profilePic ? user.profilePicture : defaultProfilePic}
        alt=""
      />
      <span className="conversationName">{user?.name}</span>
    </div>
  );
}