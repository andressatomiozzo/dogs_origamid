import React from "react";
import UserContext from "../../createContext/UserContext";
import PhotoCommentsForm from "./PhotoCommentsForm";
import styles from "./PhotoComments.module.css"

const PhotoComments = (props) => {
  const [comments, setComments] = React.useState(() => props.comments);
  const commentsSection = React.useRef(null)
  const { login } = React.useContext(UserContext);

  React.useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments])
  return (
    <>
      <ul className={`${styles.comments} ${props.single ? styles.single : ""}`} ref={commentsSection}>
        {comments &&
          comments.map((comment) => (
            <li key={comment.comment_ID}>
              <strong>{comment.comment_author}:</strong>
              <span>{comment.comment_content}</span>
            </li>
          ))}
      </ul>
      {login && <PhotoCommentsForm id={props.id} setComments={setComments} single={props.single}/>}
    </>
  );
};

export default PhotoComments;
