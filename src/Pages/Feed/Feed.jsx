import React from "react";
import PropTypes from "prop-types";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";
import FeedPhotosFilter from "./FeedPhotosFilter";
import styles from "./Feed.module.css";

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);
  const [filter, setFilter] = React.useState(false);
  const [totalPhotos, setTotalPhotos] = React.useState([]);
  const [dataFilter, setDataFilter] = React.useState(null);
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

  React.useEffect(() => {
    let wait = false;
    const infiniteScroll = () => {
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * 0.75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    };
    window.addEventListener("scroll", infiniteScroll);
    window.addEventListener("wheel", infiniteScroll);
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
      window.removeEventListener("wheel", infiniteScroll);
    };
  }, [infinite, totalPhotos]);

  return (
    <div>
      {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />}
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

      {dataFilter ? (
        <FeedPhotosFilter dataFilter={dataFilter} setModalPhoto={setModalPhoto} />
      ) : (
        pages.map((page) => (
          <FeedPhotos
            key={page}
            user={user}
            page={page}
            setInfinite={setInfinite}
            setModalPhoto={setModalPhoto}
            setTotalPhotos={setTotalPhotos}
          />
        ))
      )}
    </div>
  );
};

Feed.defaultProps = {
  user: 0,
};

Feed.propTypes = {
  user: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
};

export default Feed;
