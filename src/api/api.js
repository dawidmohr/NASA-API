import { NASAKEY } from "../config";

export function getLocations(cityName) {
  return fetch(
    `https://nominatim.openstreetmap.org/search?city=${cityName}&format=json`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function getNasaMap(sercherData) {
  return fetch(
    `https://api.nasa.gov/planetary/earth/assets?lon=${sercherData.lon}&lat=${sercherData.lat}&dim=0.20&api_key=${NASAKEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}
