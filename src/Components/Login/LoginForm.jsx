import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const sendData = async () => {
    let response;
    let json;
    try {
      response = await fetch(`https://dogsapi.origamid.dev/json/jwt-auth/v1/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      json = await response.json();
      if (!response.ok) {
        throw new Error("OPS, algo deu errado na API");
      }
    } catch (err) {
      console.log(err);
    } finally {
      console.log(response);
      console.log(json);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendData();
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuário</label>
        <input type="text" id="username" name="username" value={username} onChange={({ target }) => setUsername(target.value)} />
        <label htmlFor="password">Senha</label>
        <input type="text" id="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        <button>Entrar</button>
      </form>

      <Link to={"/login/perdeu"}>Perdeu a Senha?</Link>

      <h2>Cadastrar-se</h2>
      <p>Ainda não possui conta? Cadastre-se no site</p>
      <Link to={"/login/criar"}>Cadastro</Link>
    </section>
  );
};

export default LoginForm;
