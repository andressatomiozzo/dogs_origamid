import React from "react";
import styles from "./UserStatsGraphs.module.css";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";

const UserStatsGraphs = ({ data }) => {
  const graphData = data.map((item) => {
    return {
      x: item.title,
      y: Number(item.acessos),
    };
  });
  const graph = graphData;
  const total = data.map(({ acessos }) => acessos).reduce((acc, n) => acc + n, 0);

  React.useEffect(() => {}, [data]);
  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.graphItem} ${styles.total}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={styles.graphItem} >
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{ data: { fillOpacity: 0.9, stroke: "#fff", strokeWidth: 2 }, labels: { fontSize: 14, fill: "#333" } }}
        />
      </div>
      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar alignment="start" data={graph}></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserStatsGraphs;
