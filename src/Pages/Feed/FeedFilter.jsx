import React from "react";
import styles from "./FeedFilter.module.css";

const FeedFilter = ({setDataFilter, setTotalPhotos, totalPhotos}) => {
  const [filter, setFilter] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState("");
  
  const handleFilterClick = (type) => {
    let orderedPhotos;
    if (type === "date") orderedPhotos = [...totalPhotos].sort((a, b) => b.date.localeCompare(a.date));
    if (type === "acessos") orderedPhotos = [...totalPhotos].sort((a, b) => b.acessos - a.acessos);
    if (type === "idade" || type === "peso") orderedPhotos = [...totalPhotos].sort((a, b) => a[type] - b[type]);
    if (type === "resetar") {
      orderedPhotos = null;
      setTotalPhotos([]);
    }
    setActiveFilter(type);
    setDataFilter(orderedPhotos);
  };

  return (
    <div className={styles.filterWrapper}>
      <button className={`${styles.filter} ${filter && styles.filterActive}`} onClick={() => setFilter(!filter)}>
        Filtrar
      </button>
      {filter && (
        <div className={`${styles.options} animeLeft`}>
          <button
            className={activeFilter === "date" ? styles.activeBtn : null}
            onClick={() => {
              handleFilterClick("date");
            }}
          >
            Mais recentes
          </button>
          <button
            className={activeFilter === "acessos" ? styles.activeBtn : null}
            onClick={() => {
              handleFilterClick("acessos");
            }}
          >
            Mais acessos
          </button>
          <button
            className={activeFilter === "peso" ? styles.activeBtn : null}
            onClick={() => {
              handleFilterClick("peso");
            }}
          >
            Mais leve
          </button>
          <button
            className={activeFilter === "idade" ? styles.activeBtn : null}
            onClick={() => {
              handleFilterClick("idade");
            }}
          >
            Mais jovem
          </button>
          <button
            onClick={() => {
              handleFilterClick("resetar");
            }}
          >
            Resetar
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedFilter;
