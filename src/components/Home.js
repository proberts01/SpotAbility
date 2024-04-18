import React, {useState} from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import './home.css';

function Home() {
  return (
    <div className="whereTo">
      <h1>Where To?</h1>
      <PlacesAutoComplete />
    </div>
  );
}

const PlacesAutoComplete = ({ setSelected }) =>{
  const{
    ready,
    value,
    setValue,
    suggestions: {status,data},
    clearSuggestions,
  } = usePlacesAutocomplete();
  
  return (
    <Command>
      <CommandInput
        value={value}
        onValueChange={setValue}
        disabled={!ready}
        placeholder="Search an address"
        className="combobox-input"
      />
      <CommandList>
        <CommandGroup>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <CommandItem
                key={place_id}
                value={description}
                onSelect={handleSelect}
              />
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default Home;
