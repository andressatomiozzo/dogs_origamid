import React from "react";
import Enviar from "../../assets/enviar.svg?react";
import useFetch from "../../Hooks/useFetch";
import { COMMENT_POST } from "../../api";
import Error from "../../Components/Helper/Error";
import styles from "./PhotoCommentsForm.module.css";

const PhotoCommentsForm = ({ id, setComments, single }) => {
  const [comment, setComment] = React.useState("");
  const { request, error } = useFetch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);
    if (response.ok) {
      setComments((comments) => [...comments, json]);
      setComment("");
    }
  };

  return (
    <form className={`${styles.form} ${single ? styles.single : ""}`} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="comment">Insira seu comentário:</label>
        <textarea className={styles.textarea} id="comment" name="comment" value={comment} onChange={({ target }) => setComment(target.value)} />
      </div>
      <button className={styles.button}>
        <Enviar />
      </button>
      {error && <Error error={error} />}
    </form>
  );
};

export default PhotoCommentsForm;
