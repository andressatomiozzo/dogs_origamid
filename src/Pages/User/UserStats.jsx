import React from "react";
import Head from "../../Components/Helper/Head";
import UserStatsGraphs from "./UserStatsGraphs";
import useFetch from "../../Hooks/useFetch";
import Loading from "../../Components/Helper/Loading";
import Error from "../../Components/Helper/Error";
import { STATS_GET } from "../../api";

const UserStats = () => {
  const { loading, error, data, request } = useFetch();

  React.useEffect(() => {
    const getData = async () => {
      const { url, options } = STATS_GET();
      request(url, options);
    };
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    return (
      <div>
        <Head title="Estatísticas" />
        <UserStatsGraphs data={data} />
      </div>
    );
  else return null;
};

export default UserStats;
