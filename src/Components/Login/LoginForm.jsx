import React from "react";
import { Link } from "react-router-dom";
import Input from "../Form/Input";
import Button from "../Form/Button";
import useForm from "../../Hooks/useForm";
import UserContext from "../../createContext/UserContext";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const {userLogin} = React.useContext(UserContext)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
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
