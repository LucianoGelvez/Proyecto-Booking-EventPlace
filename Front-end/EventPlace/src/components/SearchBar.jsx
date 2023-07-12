import React, { useState, useEffect, useContext } from 'react';
import "../styles/componentsStyles/main/searchBar/SearchBar.css";
import "../styles/componentsStyles/main/searchBar/AutocompleteInput.scss";



const SearchBar = ({ onSearch, changeSelectedCity, setStartDate, setEndDate, searchBarFilter, handleSearchButtonClick, endpoint }) => {
 
  const [location, setLocation] = useState('');
  const [cityList, setCityList] = useState([]);
  const [startDate2, setStartDate2] = useState('');
  const [endDate2, setEndDate2] = useState('');
  const [filteredCityList, setFilteredCityList] = useState([]);
  const [showNoCityText, setShowNoCityText] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };

        const response = await fetch(`http://${endpoint}:8080/cities/allCities`, requestOptions);
        const data = await response.json();
        setCityList(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const handleLocationChange = (event) => {
    const { value } = event.target;
    setLocation(value);

    if (value) {
      const filteredCities = cityList.filter((city) =>
        city.nameCity && city.nameCity.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredCityList(filteredCities);
      setShowNoCityText(filteredCities.length === 0);
    } else {
      setFilteredCityList([]);
      changeSelectedCity({});
      setShowNoCityText(false);
    }
  };

  const handleCitySelect = (city) => {
    setLocation(city.nameCity + " " + city.state + "  " + city.country);
    setFilteredCityList([]);
    changeSelectedCity(city);
    setShowNoCityText(false);
  };

  const handleStartDateChange = (event) => {
    const { value } = event.target;
    const currentDate = new Date().toISOString().split('T')[0]; 
    localStorage.setItem("startDateSearch", value)
    if (value >= currentDate) {
      setStartDate(value);
      setStartDate2(value);
    } else {

    }
  };
  
  const handleEndDateChange = (event) => {
    const { value } = event.target;
    const currentDate = new Date().toISOString().split('T')[0];
    localStorage.setItem("endDateSearch", value)
    if (value >= currentDate) {
      setEndDate(value);
      setEndDate2(value);
    } else {
    }
  };

  const handleSearch = () => {
    const searchQuery = {
      location,
      startDate2,
      endDate2
    };
    onSearch(searchQuery);
    searchBarFilter();
  };

  return (
    <>
      <section className="SearchBarsBody">
        <div className='inputBOX'>
          <div className='input-container'>
            <input
              className="SearchBarsBody_location input-style"
              type="search"
              name="location"
              value={location}
              onChange={handleLocationChange}
              required
            />
            <label className="searchBar-input-label label-style">Choose location: </label>

            {showNoCityText && (
              <ul className="suggestions">
                <h2>We don't have your city yet</h2>
              </ul>
            )}
            {location && filteredCityList.length > 0 && (
              <ul className="suggestions">
                {filteredCityList.map((city) => (
                  <li key={city.id} onClick={() => handleCitySelect(city)}>
                    {city.nameCity + " " + city.state + "  " + city.country}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className='input-container'>
            <label className='searchBar-date-label'>Start date:</label>
            <input
              type="date"
              name="startDate"
              value={startDate2}
              onChange={handleStartDateChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className='input-style'
            />
          </div>
          <div className='input-container'>
            <label className='searchBar-date-label'>End date:</label>
            <input
              type="date"
              name="endDate"
              value={endDate2}
              onChange={handleEndDateChange}
              required
              min={startDate2} 
              className='input-style'
            />
          </div>
          <div className="searchBar-container_button">
            <button style={{ position: "relative" }} className='search-button_searchBar' onClick={() => { handleSearch(); handleSearchButtonClick(); }}>
              Search
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchBar;