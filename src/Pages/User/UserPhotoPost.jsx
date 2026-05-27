import React from "react";
import styles from "./UserPhotoPost.module.css";
import Input from "../../Components/Form/Input";
import Button from "../../Components/Form/Button";
import Error from "../../Components/Helper/Error";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_POST } from "../../api";
import { useNavigate } from "react-router-dom";
import Head from "../../Components/Helper/Head";

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm("number");
  const idade = useForm("number");
  const [img, setImg] = React.useState({})
  const {data, error, loading, request} = useFetch()
  const navigate = useNavigate()

  React.useEffect(() => {
    if(data) navigate("/conta")
  }, [data, navigate])

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData;
    formData.append("img", img.raw)
    formData.append("nome", nome.value)
    formData.append("peso", peso.value)
    formData.append("idade", idade.value)

    const token = window.localStorage.getItem("token")
    const{url, options} = PHOTO_POST(formData, token)
    request(url, options)
  };

  const handleImgChange = ({target}) => {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0]
    })
  };

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Postar foto"/>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" id="nome" {...nome} />
        <Input label="Peso" type="number" id="peso" {...peso} />
        <Input label="Idade" type="number" id="idade" {...idade} />
        <input type="file" id="img" name="img" className={styles.file} onChange={handleImgChange} />
        {loading ? <Button disabled>Carregando...</Button> : <Button>Enviar</Button>}
        <Error error={error}/>
      </form>
      <div>
        {img.preview && <div className={styles.preview} style={{backgroundImage:`url('${img.preview}')`}}></div>}
      </div>
    </section>
  );
};

export default UserPhotoPost;
