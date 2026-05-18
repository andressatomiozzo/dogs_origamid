import React from "react";

const TokenPost = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [token, setToken] = React.useState("");

  const sendData = async (data) => {
    let response;
    let json;
    try {
      response = await fetch("https://dogsapi.origamid.dev/json/jwt-auth/v1/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      json = await response.json();
      if (!response.ok) {
        throw new Error("OPS, algo deu errado");
      }
    } catch (err) {
      console.log(err);
    } finally {
      console.log(json);
      setToken(json.token);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendData({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" id="username" name="username" value={username} onChange={({ target }) => setUsername(target.value)} placeholder="username" />
      <input type="text" id="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)} placeholder="password" />
      <button>Enviar</button>
      <p style={{ wordBreak: "break-all" }}>{token}</p>
    </form>
  );
};

export default TokenPost;
