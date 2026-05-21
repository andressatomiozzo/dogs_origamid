import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import DOGS from "../../assets/dogs.svg?react";
import UserContext from "../../createContext/UserContext";

const Header = () => {
  const { data } = React.useContext(UserContext);
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link to="/" className={styles.logo} aria-label="Dogs - Home">
          <DOGS />
        </Link>
        {data ? (
          <Link to="conta" className={styles.login}>
            {data.nome}
          </Link>
        ) : (
          <Link to="login" className={styles.login}>
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
