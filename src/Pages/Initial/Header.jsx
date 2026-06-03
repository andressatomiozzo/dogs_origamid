import React from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import DOGS from "../../assets/dogs.svg?react";
import UserContext from "../../createContext/UserContext";
import Input from "../../Components/Form/Input";
import useForm from "../../Hooks/useForm";
import { PHOTOS_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import ThemeContext from "../../createContext/ThemeContext";

const Header = () => {
  const user = React.useContext(UserContext);
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const search = useForm();
  const { request } = useFetch();
  const navigate = useNavigate();

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const user = search.value;
    const { url, options } = PHOTOS_GET({ page: 1, total: 100, user: 0 });
    const { response, json } = await request(url, options);
    if (response.ok) {
      if (json.map((photo) => photo.author).includes(user)) {
        navigate(`/perfil/${user}`);
      } else {
        navigate(`/userNotFound`);
      }
    }
    search.setValue("");
  };

  return (
    <header className={`${styles.header} ${user.dark ? "dark" : null}`}>
      <nav className={`${styles.nav} container`}>
        <Link to="/" className={styles.logo} aria-label="Dogs - Home">
          <DOGS/>
        </Link>

        <form onSubmit={handleSearchSubmit} className={styles.search}>
          <Input id="search" type="text" {...search} />
          <button aria-label="Buscar"></button>
        </form>

        <div className={styles.userPreference}>
          {user.data ? (
            <Link to="conta" className={styles.login}>
              {user.data.nome}
            </Link>
          ) : (
            <Link to="login" className={styles.login}>
              Login / Criar
            </Link>
          )}

          <button onClick={toggleTheme} className={styles.btn}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
