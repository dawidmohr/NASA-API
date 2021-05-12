import { useState } from "react";

const NasaMap = ({ name, url }) => {
  const [loadingImage, setLoadingImage] = useState(true);

  return (
    <figure className="figure">
      <img
        src={url}
        className="figure-img img-fluid rounded"
        alt="Zdjęcie satelitarne"
        onLoad={() => {
          setLoadingImage(false);
        }}
      />
      {loadingImage ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" id="nasaImageLoader">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : null}

      <figcaption className="figure-caption text-end">
        Zdjęcie satelitarne {name}.
      </figcaption>
    </figure>
  );
};

export default NasaMap;
