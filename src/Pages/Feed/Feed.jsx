import React from "react";
import PropTypes from "prop-types";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";
import FeedPhotosFilter from "./FeedPhotosFilter";
import FeedFilter from "./FeedFilter";

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);
  const [totalPhotos, setTotalPhotos] = React.useState([]);
  const [dataFilter, setDataFilter] = React.useState(null);

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
      
      <FeedFilter setDataFilter={setDataFilter} setTotalPhotos={setTotalPhotos} totalPhotos={totalPhotos}/>

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
