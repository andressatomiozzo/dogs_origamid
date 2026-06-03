import React from "react";
import { useParams } from "react-router-dom";
import PhotoContent from "./PhotoContent";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import Head from "../Helper/Head";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_GET } from "../../api";

const Photo = () => {
  const { id } = useParams();
  const { loading, error, data, request } = useFetch();

  React.useEffect(() => {
    const { url } = PHOTO_GET(id);
    request(url);
  }, [request, id]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <section className="container mainContainer">
        <Head title={data.photo.title} />
        <PhotoContent data={data} single={true} />
      </section>
    );
  else return <></>;
};

export default Photo;
