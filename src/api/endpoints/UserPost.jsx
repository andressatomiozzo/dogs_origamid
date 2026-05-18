import React from "react";

const UserPost = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const sendData = async (data) => {
    let response;
    let json;
    try {
      response = await fetch("https://dogsapi.origamid.dev/json/api/user", {
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
      console.log(data)
      console.log(json);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendData({ username, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" id="username" name="username" value={username} onChange={({ target }) => setUsername(target.value)} placeholder="username" />
      <input type="text" id="email" name="email" value={email} onChange={({ target }) => setEmail(target.value)} placeholder="email" />
      <input type="text" id="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)} placeholder="password" />
      <button>Enviar</button>
    </form>
  );
};

export default UserPost;
