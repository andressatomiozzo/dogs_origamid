import Error from "../../Components/Helper/Error"

const UserError = () => {
  return (
    <section className="container mainSection">
      <Error error={"Usuário não encontrado ou sem foto no perfil"}/>
    </section>
  );
};

export default UserError;
