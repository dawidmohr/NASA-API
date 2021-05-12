import { useState } from "react";
import { NASAKEY } from "../../config";

const Page = () => {
  const [searchValue, setSearchValue] = useState("");
  const [options, setOption] = useState([]);
  const [nasaMaplink, setNasaMapLink] = useState("");
  const [isNasaImageLoader, setIsNasaImageLoader] = useState(true);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Twoje miasto na zdjęciach satelitarnych</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="searcherInput" className="form-label">
              Wyszukaj lokacje
            </label>
            <input
              className="form-control"
              name="searcher"
              list="datalistOptions"
              id="searcherInput"
              onChange={onChangeSearcher}
              value={searchValue}
              placeholder="Wyszukaj lokacje..."
            />
            <datalist id="datalistOptions">
              {options.map((item) => (
                <option key={item.place_id} value={item.display_name} />
              ))}
            </datalist>
          </div>
        </div>
        <div className="row p-2">
          <div className="col">
            <h2>Mapa NASA</h2>
            {nasaMaplink ? (
              <>
                <figure className="figure">
                  <img
                    src={nasaMaplink.url}
                    className="figure-img img-fluid rounded"
                    alt="Zdjęcie satelitarne"
                    onLoad={() => {
                      setIsNasaImageLoader(false);
                    }}
                  />
                  {isNasaImageLoader ? (
                    <div class="d-flex justify-content-center">
                      <div className="spinner-border" id="nasaImageLoader">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : null}

                  <figcaption className="figure-caption text-end">
                    Zdjęcie satelitarne {searchValue}.
                  </figcaption>
                </figure>
              </>
            ) : null}
          </div>
          <div className="col">
            <h2>Mapa google maps</h2>
          </div>
        </div>
      </div>
    </>
  );

  /**
   * @param {Object<Event>} e
   */
  function onChangeSearcher(e) {
    setNasaMapLink("");
    const value = e.target.value;
    const selectedItem = options.find((item) => item.display_name === value);
    setSearchValue(value);

    if (selectedItem) {
      searchForNasaMap(selectedItem);
    } else {
      searchLocations(value);
    }
  }

  /**
   * @param {String} cityName
   */
  function searchLocations(cityName) {
    fetch(
      `https://nominatim.openstreetmap.org/search?city=${cityName}&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        setOption(data);
      });
  }

  /**
   * @param {Object} sercherData
   */
  function searchForNasaMap(sercherData) {
    fetch(
      `https://api.nasa.gov/planetary/earth/assets?lon=${sercherData.lon}&lat=${sercherData.lat}&dim=0.20&api_key=${NASAKEY}`
    )
      .then((data) => data.json())
      .then((data) => {
        setIsNasaImageLoader(true);
        setNasaMapLink(data);
      });
  }
};
export default Page;
