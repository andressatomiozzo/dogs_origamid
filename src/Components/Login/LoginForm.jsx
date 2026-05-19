import React from "react";
import { Link } from "react-router-dom";
import Input from "../Form/Input";
import Button from "../Form/Button";
import useForm from "../../Hooks/useForm";
import { TOKEN_POST, USER_GET } from "../../api";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  
  const getUser = async (token) => {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
  };

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      getUser(token);
    }
  }, []);

  const sendData = async () => {
    const { url, options } = TOKEN_POST({ username: username.value, password: password.value });
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (!response.ok) {
        throw new Error("OPS, algo deu errado na API");
      }
      window.localStorage.setItem("token", json.token);
      getUser(json.token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.validate() && password.validate()) {
      sendData();
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" id="username" {...username} />
        <Input label="Senha" type="password" id="password" {...password} />
        <Button>Entrar</Button>
      </form>

      <Link to={"/login/perdeu"}>Perdeu a Senha?</Link>

      <h2>Cadastrar-se</h2>
      <p>Ainda não possui conta? Cadastre-se no site</p>
      <Link to={"/login/criar"}>Cadastro</Link>
    </section>
  );
};

export default LoginForm;
