import React from "react";
import Head from "../../Components/Helper/Head";
import useFetch from "../../Hooks/useFetch";
import Loading from "../../Components/Helper/Loading";
import Error from "../../Components/Helper/Error";
import { STATS_GET } from "../../api";
const UserStatsGraphs = React.lazy(() => import("./UserStatsGraphs"))

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
      <React.Suspense fallback={<div></div>}>
        <Head title="Estatísticas" />
        <UserStatsGraphs data={data} />
      </React.Suspense>
    );
  else return null;
};

export default UserStats;
