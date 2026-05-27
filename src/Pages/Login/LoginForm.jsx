import React from "react";
import { Link } from "react-router-dom";
import Input from "../../Components/Form/Input";
import Button from "../../Components/Form/Button";
import Error from "../../Components/Helper/Error";
import useForm from "../../Hooks/useForm";
import UserContext from "../../createContext/UserContext";
import styles from "./LoginForm.module.css";
import stylesBtn from "../../Components/Form/Button.module.css";
import Head from "../../Components/Helper/Head";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  };

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" id="username" {...username} />
        <Input label="Senha" type="password" id="password" {...password} />
        {loading ? <Button disabled>Carregando...</Button> : <Button>Entrar</Button>}
        <Error error={error} />
      </form>

      <Link to={"/login/perdeu"} className={styles.perdeu}>
        Perdeu a Senha?
      </Link>

      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastrar-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site</p>
        <Link to={"/login/criar"} className={stylesBtn.button}>
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
