import UserHeaderNav from "./UserHeaderNav";
import styles from "./UserHeader.module.css";
import { useLocation } from "react-router-dom";

const UserHeader = () => {
  const location = useLocation();

  const titleMap = {
    "/conta/postar": "Poste sua Foto",
    "/conta/estatisticas": "Estatísticas",
  };

  const title = titleMap[location.pathname] || "Minha conta";

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
