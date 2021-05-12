import { useState } from "react";
import { NASAKEY } from "../../config";

const Page = () => {
  const [searchValue, setSearchValue] = useState("");
  const [options, setOption] = useState([]);
  const [nasaMaplink, setNasaMapLink] = useState("");

  return (
    <>
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

      {nasaMaplink ? (
        <>
          <img src={nasaMaplink.url} />
        </>
      ) : null}
    </>
  );

  function onChangeSearcher(e) {
    const value = e.target.value;
    const selectedItem = options.find((item) => item.display_name === value);

    if (selectedItem) {
      searchForNasaMap(selectedItem);
    } else {
      setSearchValue(value);
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
        setNasaMapLink(data);
      });
  }
};
export default Page;
