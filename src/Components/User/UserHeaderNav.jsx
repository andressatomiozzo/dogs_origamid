import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  const [mobileMenu, setMobileMenu] = React.useState(false);
  
  const {pathname} = useLocation()

  React.useEffect(() => {
    setMobileMenu(false)
  }, [pathname])

  const navigate = useNavigate();
  const handleLogout = () => {
    userLogout();
    navigate("login");
  };
  return (
    <>
      {mobile && <button aria-label="Menu" className={`${styles.mobileButton} ${mobileMenu && styles.mobileMenuActive}`} onClick={() => setMobileMenu(!mobileMenu)}></button>}
      <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
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
    </>
  );
};

export default UserHeaderNav;
