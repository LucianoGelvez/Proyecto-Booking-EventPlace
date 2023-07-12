import React, { useState, useEffect, useRef, useContext } from 'react';
import '../styles/componentsStyles/cities/Cities.css';
import close from '../images/close.svg'
import { GlobalContext } from '../components/utils/GlobalContext';
const Cities = () => {
  const { endpoint } = useContext(GlobalContext)
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityForm, setCityForm] = useState({ id: '', nameCity: '', state: '', country: '' });
  const [loading, setLoading] = useState(false)
  const [sureToDelete, setSureToDelete] = useState(false)
  const [idToDelete, setIdToDelete] = useState(0)
  const buttonRef = useRef(null);


  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        buttonRef.current !== event.target
      ) {
        setSureToDelete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      console.log(data)
      if (response.ok) {
        setCities(data);
      } else {
        setCities([]);
      }
    } catch (error) {
      setCities([]);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCityForm({ ...cityForm, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    const urlUpdate = `http://${endpoint}:8080/cities/updateCity`;
    const urlAdd = `http://${endpoint}:8080/cities/addCity`
    try {
      const endpoint = selectedCity ? urlUpdate : urlAdd;
      const requestOptions = {
        method: selectedCity ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        },
        body: JSON.stringify(cityForm),
      };
      if (selectedCity === 'PUT') {
        alert("sdasdsa")
        const h1 = document.querySelector(".city_h1")
        h1.innerHTML = `UPDATE`
      }
      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setCities(data);
        setLoading(false)
      } else {
        setCities([]);
        setLoading(false)
      }
    } catch (error) {
      setCities([]);
      setLoading(false)
    }
    setCityForm({ id: '', nameCity: '', state: '', country: '' });
    setSelectedCity(null);
  }


  const handleEdit = (city) => {
    setSelectedCity(city);
    setCityForm(city);
  };

  const token = JSON.parse(localStorage.getItem("token"));

  const handleDelete = async (id) => {
    setLoading(true);
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    try {
      const response = await fetch(`http://${endpoint}:8080/cities/${id}`, requestOptions)
      const data = await response.json();

      if (response.ok) {
        setCities(data);
        setLoading(false)
        setCityForm({ id: '', nameCity: '', state: '', country: '' })
        setSelectedCity(null);
      } else {
        setLoading(false)
        setCities([])
      }
    } catch (error) {
      setLoading(false)
      setCities([])
    }
    setSureToDelete(false)
    setSelectedCity(null)
    setCityForm( {id: '', nameCity: '', state: '', country: ''} )
  }

  return (
    <div className="city">

        <div className="city-component">
          {
            loading &&
            <div className='loading'>
              Loading
            </div>
          }
      <div className={sureToDelete ? "city__content" : ""}>
          <h1 className='city_h1'> Add new cities for different event place.</h1>

          <form onSubmit={handleSubmit} className="city-form">
            <input type="text" name="nameCity" placeholder="City Name" value={cityForm.nameCity} onChange={handleInputChange} required />
            <input type="text" name="state" placeholder="State" value={cityForm.state} onChange={handleInputChange} require />
            <input type="text" name="country" placeholder="Country" value={cityForm.country} onChange={handleInputChange} require />
            <button type="submit">{selectedCity ? 'Update' : 'Add'} City</button>
          </form>
          <div className="city-list" >
            <h4 style={{ marginBottom: "10px" }}>If you want to update any city, you must select one.</h4>
            {(cities != [] && cities.length > 0) ? cities.map((city) => (
              <div key={city.id} className="city-item" onClick={() => handleEdit(city)}>
                <div>
                  <h3>{city.nameCity}</h3>
                  <p>
                    {city.state}, {city.country}
                  </p>
                </div>
                <div className="city-actions">

                  <img className='city-actions_delete' src={close} alt="close" onClick={() => (setSureToDelete(true)) (setIdToDelete(city.id))} />
                </div>
              </div>
            )): <h2> no cities to show</h2>}
          </div>
        </div>
      </div>
            {sureToDelete &&
              <article ref={buttonRef} className='city_sure_to_delete'>
                <div>Are your sure you want to delete? All places related to this city will be deleted.</div>
                <button onClick={() => handleDelete(idToDelete)}>Delete</button>
              </article>
            }
    </div>

  );
};

export default Cities;
