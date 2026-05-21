import React from "react";
import UserContext from "./UserContext";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "../api";
import { useNavigate } from "react-router-dom";

const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const getUser = async (token) => {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  };

  const userLogin = async (username, password) => {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Erro: usuário ou senha inválidos");
      const json = await response.json();
      window.localStorage.setItem("token", json.token);
      await getUser(json.token);
      navigate("conta");
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    } 
  };

  const userLogout = React.useCallback(async () => {
    setData(null);
    setLogin(false);
    setLoading(false);
    setError(null);
    window.localStorage.removeItem("token");
  }, []);

  React.useEffect(() => {
    const autoLogin = async () => {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token inválido");
          setLogin(true);
          await getUser(token);
        } catch {
          userLogout();
        } finally {
          setLoading(false);
        } 
      } else {
        setLogin(false);
      }
    };

    autoLogin();
  }, [userLogout]);

  return <UserContext.Provider value={{ userLogin, userLogout, data, login, loading, error }}>{children}</UserContext.Provider>;
};

export default UserStorage;
