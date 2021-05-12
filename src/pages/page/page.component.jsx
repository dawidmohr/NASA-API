import { useState } from "react";

import { NASAKEY } from "../../config";
import CustomGoogleMap from "../../component/google-map/google.map.component";
import NasaMap from "../../component//nasa-map/nasa-map.component";

const Page = () => {
  const [searchValue, setSearchValue] = useState("");
  const [options, setOption] = useState([]);
  const [mapData, setMapData] = useState("");

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
            {mapData ? (
              <NasaMap name={searchValue} {...mapData} />
            ) : (
              <p>Wybierz lokację, by zobaczyć mapę</p>
            )}
          </div>
          <div className="col">
            <h2>Mapa google maps</h2>
            {mapData ? (
              <CustomGoogleMap
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                zoom="2"
                {...mapData}
              />
            ) : (
              <p>Wybierz lokację, by zobaczyć mapę</p>
            )}
          </div>
        </div>
      </div>
    </>
  );

  /**
   * @param {Object<Event>} e
   */
  function onChangeSearcher(e) {
    setMapData("");
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
        setMapData({ ...sercherData, ...data });
      });
  }
};
export default Page;
