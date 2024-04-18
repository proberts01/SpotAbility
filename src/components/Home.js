import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import './home.css';
import bluePathLogo from '../img/bluePathLogo-modified.png';

const PlacesAutoComplete = ({ onPlaceSelected }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const [selectedInfo, setSelectedInfo] = useState(null);
  const ref = useOnclickOutside(() => clearSuggestions());
  const handleInput = (e) => setValue(e.target.value);

  const handleSelect = ({ description }) => async () => {
    setValue(description, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = getLatLng(results[0]);
      console.log("📍 Coordinates: ", { lat, lng });
      setSelectedInfo({ description, lat, lng });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleSubmit = () => {
    if (selectedInfo && onPlaceSelected) {
      onPlaceSelected(selectedInfo);
    }
  };

  const renderSuggestions = () => data.map(({ place_id, structured_formatting: { main_text, secondary_text } }) => (
    <li key={place_id} onClick={handleSelect({ description: main_text })}>
      <strong>{main_text}</strong> <small>{secondary_text}</small>
    </li>
  ));

  return (
    <div ref={ref} className="autocomplete-container">
      <input
        className="autocomplete-input"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
      />
      {status === "OK" && <ul className="autocomplete-results">{renderSuggestions()}</ul>}
      <button onClick={handleSubmit} disabled={!selectedInfo} className="submit-button">
        Submit
      </button>
    </div>
  );
};

function Home() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const navigate = useNavigate();
  const handlePlaceSelected = (place) => {
    navigate('/destination', { state: { place: place } });
  };
  return (
    <div className="media">
      <div className="whereTo">
        <img src={bluePathLogo} alt="My Image" className="smallLogo"/>
        <h1>Where To?</h1>
        <PlacesAutoComplete onPlaceSelected={handlePlaceSelected} />
      </div>
    </div>
  );
}

export default Home;
