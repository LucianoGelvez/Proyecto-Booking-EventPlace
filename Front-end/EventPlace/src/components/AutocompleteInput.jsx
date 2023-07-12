
import '../styles/componentsStyles/main/searchBar/AutocompleteInput.scss'; 
import React, { useState, useRef } from 'react';
import cities from './cities.json'; 

const AutocompleteInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const filteredSuggestions = cities.filter((city) =>
      city.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions.slice(0, 10)); 
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.name);
    setSuggestions([]);
  };

  const handleMouseLeave = () => {
    setSuggestions([]);
  };

  return (
    <div className="autocomplete-input">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a city..."
      />
      {suggestions.length > 0 && (
        <ul className="suggestions" ref={suggestionsRef} onMouseLeave={handleMouseLeave}>
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;