import FeedPhotosItem from "./FeedPhotosItem";

const FeedPhotosFilter = ({ dataFilter, setModalPhoto }) => {
  return (
      <ul className="feed">
      {dataFilter.map((photo) => (
        <FeedPhotosItem key={photo.id} photo={photo} setModalPhoto={setModalPhoto} />
      ))}
    </ul>
  );
};

export default FeedPhotosFilter;
