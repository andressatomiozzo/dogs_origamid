import React from "react";

const PhotoPost = () => {
  const [token, setToken] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [peso, setPeso] = React.useState("");
  const [idade, setIdade] = React.useState("");
  const [img, setImg] = React.useState("");

  const sendData = async (data) => {
    let response;
    let json;
    try {
      response = await fetch("https://dogsapi.origamid.dev/json/api/photo", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: data,
      });
      json = await response.json();
      if (!response.ok) {
        throw new Error("OPS, algo deu errado");
      }
    } catch (err) {
      console.log(err);
    } finally {
      for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }
      console.log(json);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("peso", peso);
    formData.append("idade", idade);
    formData.append("img", img);

    sendData(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" id="token" name="token" value={token} onChange={({ target }) => setToken(target.value)} placeholder="token" />
      <input type="text" id="nome" name="nome" value={nome} onChange={({ target }) => setNome(target.value)} placeholder="nome" />
      <input type="text" id="peso" name="peso" value={peso} onChange={({ target }) => setPeso(target.value)} placeholder="peso" />
      <input type="text" id="idade" name="idade" value={idade} onChange={({ target }) => setIdade(target.value)} placeholder="idade" />
      <input type="file" onChange={({ target }) => setImg(target.files[0])} />

      <button>Enviar</button>
    </form>
  );
};

export default PhotoPost;
