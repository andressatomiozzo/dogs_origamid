import { PHOTO_DELETE } from "../../api";
import useFetch from "../../Hooks/useFetch";
import styles from "./PhotoDelete.module.css";

const PhotoDelete = ({id}) => {
  const { loading, request } = useFetch();

  const handleDeleteCLick = async () => {
    const confirmation = window.confirm("Tem certeza que deseja excluir?");
    if (confirmation) {
      const { url, options } = PHOTO_DELETE(id);
      const { response } = await request(url, options);
      if (response.ok) window.location.reload();
    }
  };

  return (
    <>
      {loading ? (
        <button disabled className={styles.delete}>
          Deletanto...
        </button>
      ) : (
        <button onClick={handleDeleteCLick} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
