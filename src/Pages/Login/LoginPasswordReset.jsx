import Input from "../../Components/Form/Input";
import Button from "../../Components/Form/Button";
import Error from "../../Components/Helper/Error";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PASSWORD_RESET } from "../../api";
import { useNavigate } from "react-router-dom";
import Head from "../../Components/Helper/Head";

const LoginPasswordReset = () => {
  const params = new URLSearchParams(window.location.search);
  const login = params.get("login") || "";
  const key = params.get("key") || "";
  const password = useForm();
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({ login, key, password: password.value });
      const { response } = await request(url, options);
      if (response.ok) navigate("/login");
    }
  };

  return (
    <section className="animeLeft">
      <Head title="Resetar" />
      <h1 className="title">Resete a Senha</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Nova senha:" type="passwors" id="password" {...password} />
        {loading ? <Button disabled>Resetando...</Button> : <Button>Resetar</Button>}
      </form>
      <Error error={error} />
    </section>
  );
};

export default LoginPasswordReset;
