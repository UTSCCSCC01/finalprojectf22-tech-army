import Comments from "../Components/comments/Comments";
import "./Commentview.css";

const CommentSection = () => {
  return (
    <div>
      <h1>Hello monsterlessons</h1>
      <Comments
        commentsUrl="http://localhost:3004/comments"
        currentUserId="1"
      />
    </div>
  );
};

export default CommentSection;