// import React from "react";
import Input from "../../Components/Form/Input";
import Button from "../../Components/Form/Button";
import Error from "../../Components/Helper/Error";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PASSWORD_LOST } from "../../api";
import Head from "../../Components/Helper/Head";

const LoginPasswordLost = () => {
  const login = useForm();
  const { loading, error, data, request } = useFetch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({ login: login.value, url: `${window.location.href.replace("perdeu", "resetar")}` });
      request(url, options);
    }
  };

  return (
    <section>
      <Head title="Perdeu a  senha?" />
      <h1 className="title">Perdeu a senha?</h1>
      {data ? (
        <p style={{ color: "#4c1" }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Usuário / Email" type="text" name="login" {...login} />
          {loading ? <Button disabled>Enviando...</Button> : <Button>Enviar Email</Button>}
          {error && <Error error={error} />}
        </form>
      )}
    </section>
  );
};

export default LoginPasswordLost;
