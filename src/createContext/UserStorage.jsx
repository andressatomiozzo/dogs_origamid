import React from "react";
import UserContext from "./UserContext";
import { TOKEN_POST, USER_GET } from "../api";

const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const getUser = async (token) => {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
    console.log(json)
  };

  const userLogin = async (username, password) => {
    const { url, options } = TOKEN_POST({ username, password });
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (!response.ok) {
        throw new Error("OPS, algo deu errado na API");
      }
      window.localStorage.setItem("token", json.tokenk)
      getUser(json.token);
    } catch (err) {
      console.log(err);
    }
  };

  return <UserContext.Provider value={{ userLogin, data }}>{children}</UserContext.Provider>;
};

export default UserStorage;
