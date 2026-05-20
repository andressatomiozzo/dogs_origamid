import React from "react";
import Input from "../Form/Input";
import Button from "../Form/Button";
import useForm from "../../Hooks/useForm";
import { USER_POST } from "../../api";
import UserContext from "../../createContext/UserContext";

const LoginCreate = () => {
  const username = useForm();
  const email = useForm("email");
  const password = useForm();

  const { userLogin } = React.useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const response = await fetch(url, options);
    if (response.ok) userLogin(username.value, password.value);
  };

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label={"Usuário"} type="text" id="username" {...username} />
        <Input label={"Email"} type="email" id="email" {...email} />
        <Input label={"Senha"} type="password" id="password" {...password} />
        <Button>Cadastrar</Button>
      </form>
    </section>
  );
};

export default LoginCreate;
