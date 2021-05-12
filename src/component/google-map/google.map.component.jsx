import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} from "react-google-maps";

const CustomGoogleMap = ({ lat, lon }) => {
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: Number(lat), lng: Number(lon) }}
    ></GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(CustomGoogleMap));
