import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../createContext/UserContext";
import MinhasFotos from "../../assets/feed.svg?react";
import Estatisticas from "../../assets/estatisticas.svg?react";
import AdicionarFoto from "../../assets/adicionar.svg?react";
import Sair from "../../assets/sair.svg?react";
import styles from "./UserHeaderNav.module.css";
import useMedia from "../../Hooks/useMedia";

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  const mobile = useMedia("(max-width: 40rem)");
  console.log(mobile)
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    navigate("login");
  };
  return (
    <nav className={styles.nav}>
      <NavLink to="/conta" end>
        <MinhasFotos />
        {mobile && "Minhas fotos"}
      </NavLink>
      <NavLink to="/conta/estatisticas">
        <Estatisticas />
        {mobile && "Estatísticas"}
      </NavLink>
      <NavLink to="/conta/postar">
        <AdicionarFoto />
        {mobile && "Adicionar foto"}
      </NavLink>
      <button onClick={handleLogout}>
        <Sair />
        {mobile && "Sair"}
      </button>
    </nav>
  );
};

export default UserHeaderNav;
