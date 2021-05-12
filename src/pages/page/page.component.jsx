import { useState } from "react";

const Page = () => {
  const [searchValue, setSearchValue] = useState("");
  const [options, setOption] = useState([
    { place_id: 1, display_name: "test" },
    { place_id: 2, display_name: "test22" },
    { place_id: 3, display_name: "test123123" },
    { place_id: 4, display_name: "xddd" },
  ]);

  return (
    <>
      <label for="searcherInput" className="form-label">
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
    </>
  );

  function onChangeSearcher(e) {
    setSearchValue(e.target.value);
    searchLocations(e.target.value);
  }

  function searchLocations(value) {
    fetch(
      `https://nominatim.openstreetmap.org/search?city=${value}&format=json`
    )
      .then((data) => data.json())
      .then((data) => {
        setOption(data);
      });
    console.log(value);
  }
};

export default Page;
