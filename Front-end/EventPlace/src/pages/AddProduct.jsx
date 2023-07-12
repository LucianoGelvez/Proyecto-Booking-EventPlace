import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { useState } from "react"
import '../styles/componentsStyles/addProduct/AddProduct.scss';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { routes } from '../Routes';
import close from '../images/close.svg'
import { GlobalContext } from '../components/utils/GlobalContext';


const AddProduct = () => {
  const { endpoint } = useContext(GlobalContext);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "*",
    libraries: ["places"],
  });

  const inputRef = useRef(null);


  const [inputLoaded, setInputLoaded] = useState(false)
  const [maxCapacityError, setMaxCapacityError] = useState(false)
  const [minCapacityError, setMinCapacityError] = useState(false)
  const [pricePerHourError, setPricePerHourError] = useState(false)
  const [emptyDescription, setEmptyDescription] = useState(false)
  const [serviceError, setServiceError] = useState(false)
  const [emptyInputError, setEmptyInputError] = useState(false)
  const [emptyInputRules, setEmptyInputRules] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [notAvailableCity, setNotAvailableCity] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [mapClick, setMapClick] = useState(false)
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState([])
  const [possibleCategory, setPossibleCategory] = useState([])
  const [data, setData] = useState()
  const [files, setFiles] = useState([])
  const [filePreviews, setFilePreviews] = useState([]);
  const [categories, setCategories] = useState("");
  const [possibleCities, setPossibleCities] = useState([]);
  const [specialties, setSpecialties] = useState({
    pool: false,
    outDoorAreas: false,
    stage: false,
    parkingLot: false,
    ac: false,
    wifi: false
  });
  const [place, setPlace] = useState({
    name: '',
    pricePerDay: '',
    maxCapacity: '',
    minCapacity: '',
    category: categories,
    description: '',
    characteristics: specialties,
    healthAndSecurity: '',
    rulesOfThePlace: '',
    cancelationPolicies: '',
    location: {
      number: '',
      lat: sessionStorage.getItem("lat"),
      lng: sessionStorage.getItem("lng"),
      street: '',
    },
    city: {
      nameCity: "",
      state: '',
      country: '',
    },
    basicServices: services,
    ownerUser: { username: JSON.parse(localStorage.getItem("userName")) }
  })

  const lat = parseFloat(sessionStorage.getItem("lat")) || -34.6037;
  const lng = parseFloat(sessionStorage.getItem("lng")) || -58.3816;
  const center = useMemo(() => ({ lat, lng }), [lat, lng]);

  const [markedLocation, setMarkedLocation] = useState(center);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          setMarkedLocation({ lat: userLat, lng: userLng });
        },
        function (error) {
          console.log("Error al obtener la ubicación del usuario:", error);
        }
      );
    } else {
      console.log("La geolocalización no está disponible en este navegador.");
    }
  }, []);

  const initialLocation = userLocation || center;

  const handleMapClick = (event) => {
    setMapClick(true)

    const clickedLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };

    const geocoder = new window.google.maps.Geocoder();
    const geocodeOptions = {
      location: clickedLocation,
      language: 'en'
    };

    geocoder.geocode(geocodeOptions, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const addressComponents = results[0].address_components;
          const formattedAddress = results[0].formatted_address;
          const cityResult = addressComponents.find(component =>
            component.types.includes('locality') || component.types.includes('postal_town')
          );
          const stateResult = addressComponents.find(component =>
            component.types.includes('administrative_area_level_1')
          );
          const countryResult = addressComponents.find(component =>
            component.types.includes('country')
          );

          if (cityResult) {
            const cityName = cityResult.long_name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const cityExists = possibleCities.some(city =>
              city.nameCity.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === cityName
            );

            if (cityExists) {
              setMarkedLocation(clickedLocation);
              sessionStorage.setItem('lat', JSON.stringify(event.latLng.lat()));
              sessionStorage.setItem('lng', JSON.stringify(event.latLng.lng()));
              setPlace(prevPlace => ({
                ...prevPlace,
                city: {
                  ...prevPlace.city,
                  nameCity: cityResult.long_name,
                  state: stateResult ? stateResult.long_name : '',
                  country: countryResult ? countryResult.long_name : ''
                }
              }));
              if (addressComponents) {
                const streetNumberResult = addressComponents.find(component =>
                  component.types.includes('street_number')
                );
                const routeResult = addressComponents.find(component =>
                  component.types.includes('route')
                );

                if (streetNumberResult) {
                  setPlace(prevPlace => ({
                    ...prevPlace,
                    location: {
                      ...prevPlace.location,
                      number: streetNumberResult.long_name
                    }
                  }));
                }
                if (routeResult) {
                  setPlace(prevPlace => ({
                    ...prevPlace,
                    location: {
                      ...prevPlace.location,
                      street: routeResult.long_name
                    }
                  }));
                }
              }
            } else {
              setNotAvailableCity(true)
            }
          } else {
            console.log('No city found in the geocoding results');
          }
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  };

  useEffect(() => {
    if (!mapClick) {
      const { street, number } = place.location;
      const { nameCity, state, country } = place.city;
      const fullAddress = `${number} ${street}, ${nameCity}, ${state}, ${country}`;

      if (window.google && window.google.maps) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: fullAddress }, (results, status) => {
          if (status === 'OK' && results.length > 0) {
            const location = results[0].geometry.location;
            setMarkedLocation({
              lat: location.lat(),
              lng: location.lng()
            });
            sessionStorage.setItem("lat", location.lat());
            sessionStorage.setItem("lng", location.lng());
          } else {
            console.log('Geocode was not successful for the following reason:', status);
          }
        });
      }
    }
    setMapClick(false)
  }, [place.location.street, place.location.number, place.city.country, place.city.nameCity, place.city.state]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const url = `http://${endpoint}:8080/categories/allCategories`;

    fetch(url, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .then(data => {
        const titles = data.map(category => category.title);
        setPossibleCategory(titles);
      })
      .catch(error => {
        console.log(error);
      });

    const urlCities = `http://${endpoint}:8080/cities/allCities`;

    fetch(urlCities, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .then(data => {
        setPossibleCities(data);
      })
      .catch(error => {
        console.log(error);
      });

  }, []);


  const handleCategoriesChange = (e) => {
    setCategories(e.target.value);
  }
  const handleCityChange = (cityObj) => {
    setPlace((prevPlace) => ({
      ...prevPlace,
      city: {
        ...prevPlace.city,
        nameCity: cityObj.nameCity,
        state: cityObj.state,
        country: cityObj.country,
      },
    }));
  };

  useEffect(() => {
    if (parseInt(place.pricePerDay) < 0 || typeof place.pricePerDay != "number" && place.pricePerDay != '') {
      setPricePerHourError(true);
    }

    if (parseInt(place.pricePerDay) >= 0) {
      setPricePerHourError(false);
    }

    if (parseInt(place.maxCapacity) < 0 || typeof place.maxCapacity != "number" && place.maxCapacity != '') {
      setMaxCapacityError(true);
    }
    if (parseFloat(place.maxCapacity) >= 0) {
      setMaxCapacityError(false);
    }
    if (parseInt(place.minCapacity) < 0 || typeof place.minCapacity != "number" && place.minCapacity != '') {
      setMinCapacityError(true);
    }
    if (parseFloat(place.minCapacity) >= 0) {
      setMinCapacityError(false);
    }


    if (services.some(service => {
      const parsedPrice = parseFloat(service.price);
      return parsedPrice < 0 || (isNaN(parsedPrice) && service.price !== '');
    })) {
      setServiceError(true);
    } else {
      setServiceError(false);
    }

  }, [place.pricePerDay, place.maxCapacity, place.minCapacity, services])

  useEffect(() => {
    setPlace((prevState) => ({
      ...prevState,
      characteristics: specialties,
      basicServices: services,
      category: categories,
    }));
  }, [specialties, services, categories])


  useEffect(() => {
    if (files.length >= 5) {
      setImageError(false)
    }

    if (place.cancelationPolicies != '' && place.healthAndSecurity != '' && place.rulesOfThePlace != '' && place.description != '' && place.name != '' && place.category != '' && place.maxCapacity != '' && place.minCapacity != '' && place.pricePerDay != '') {
      setEmptyInputError(false)
      setEmptyInputRules(false)
    }
  }, [files, place])


  useEffect(() => {
    setPlace(prevPlace => ({
      ...prevPlace,
      location: {
        ...prevPlace.location,
        lat: sessionStorage.getItem("lat"),
        lng: sessionStorage.getItem("lng")
      }
    }));

  }, [specialties, services, categories, place.basicServices, place.name, place.minCapacity, place.maxCapacity, place.description, files])


  const handleSubmit = (event) => {

    event.preventDefault();

    setPlace((prevState) => ({
      ...prevState,
      characteristics: specialties,
      basicServices: services,
      category: categories,
    }));


    if (serviceError == false && pricePerHourError == false && minCapacityError == false && maxCapacityError == false && descriptionError == false) {
      if ((place.name != '' && place.pricePerDay != '' && place.maxCapacity != '' && place.minCapacity != '' && place.city.nameCity != '' && place.city.country != '' && place.location.number != '' && place.city.state != '' && place.location.street != '' && place.cancelationPolicies != '' && place.healthAndSecurity != '' && place.rulesOfThePlace != '' && place.description != '') && files.length >= 5) {
        setEmptyInputError(false)
        setEmptyInputRules(false)
        if (files.length < 5) {
          setImageError(true)
          setEmptyInputError(true)
        }
        if (place.cancelationPolicies == '' || place.healthAndSecurity == '' || place.rulesOfThePlace == '') {
          setEmptyInputRules(true)
        }

        setLoading(true)
        fetch(`http://${endpoint}:8080/eventPlace/addPlace`, {
          method: 'POST',
          body: JSON.stringify(place),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        })

          .then((response) => {
            if (response.ok) {
              console.log('Place registered!');
              response.json().then((data) => {
                setData((data));

                const formData = new FormData();
                formData.append("id", data);
                files.forEach((file, index) => {
                  formData.append('files', file);
                });

                fetch(`http://${endpoint}:8080/eventPlace/images`, {
                  method: 'POST',
                  body: formData,
                  headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                  }
                })
                  .then((response) => {
                    if (response.ok) {
                      console.log('Images uploaded successfully!');
                      sessionStorage.removeItem("lat")
                      sessionStorage.removeItem("lng")
                      window.location.reload();
                    } else {
                      console.error('Error');
                    }
                  })
                  .catch((error) => console.error('Error', error));
              });
            } else {
              console.error('Error');
            }
          })
          .catch((error) => console.error('Error', error));
      }

      else {
        setEmptyInputError(true)
        if (files.length < 5) {
          setImageError(true)
          setEmptyInputError(true)
        }

        if (place.cancelationPolicies == '' || place.healthAndSecurity == '' || place.rulesOfThePlace == '') {
          setEmptyInputRules(true)
        }
        if (place.description == '') {
          setEmptyDescription(true)
        }
      }

    }

  };


  const handleFileInputChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);

    const updatedPreviews = [];

    updatedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        updatedPreviews.push(e.target.result);
        if (updatedPreviews.length === updatedFiles.length) {
          setFilePreviews(updatedPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {

    if (/[.@]com|@gmail|@hotmail|\d{5}|@/.test(place.description)) {
      setDescriptionError(true);
    }

    else {
      setDescriptionError(false)
    }
    if (place.description != '') {
      setEmptyDescription(false)
    }

  }, [place.description])


  function handleAddInput() {
    const newService = { name: "", price: "" };
    const updatedServices = [...services];
    updatedServices.push(newService);
    setServices(updatedServices);
  }

  function handleServiceNameChange(e, index) {
    const updatedServices = [...services];
    updatedServices[index].name = e.target.value;
    setServices(updatedServices);
  }

  function handleServiceValueChange(e, index) {
    const updatedServices = [...services];
    updatedServices[index].price = e.target.value;
    setServices(updatedServices);
  }

  function handleRemoveInput(index) {
    const updatedServices = [...services];
    updatedServices.splice(index, 1)
    setServices(updatedServices);
  }

  const removeImage = (index) => {
    setFilePreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      newPreviews.splice(index, 1);
      return newPreviews;
    });
    setFiles((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  return (
    <div className="addProduct">
      <>
        <section className="addProduct_firstForm">
          <Link to={"/"}>  <div style={{ backgroundColor: "#EE5D1A", position: "absolute", top: "140px", left: "12px", padding: "8px", borderRadius: "50%", fontSize: "35px" }}> <FontAwesomeIcon icon={faArrowCircleLeft} style={{ color: "white" }} /></div></Link>
          <div className="addProduct_title" style={{ fontSize: "45px", marginTop: "180px" }}>Publish your place with us!</div>
          <div className="addProduct_firstForm_title">Event place</div>
          <div className="addProduct_firstForms">
            <form className="addProduct_firstForm_left">
              {notAvailableCity &&
                <div className='cityError'>
                  This city is not available in out application, you must change it for a registered one.
                  <div onClick={() => setNotAvailableCity(false)}>Ok</div>
                </div>
              }
              <label>Name your place</label>
              <input type="text" placeholder="" value={place.name} onChange={(e) => setPlace({ ...place, name: e.target.value })} />
              <label>City</label>
              <select
                id="city"
                onChange={(e) => {
                  const selectedCity = possibleCities.find(
                    (city) => city.nameCity === e.target.value
                  );
                  handleCityChange(selectedCity);
                }}
                key={place.city.nameCity}

                value={place.city.nameCity}
              >
                <option value="">{place.city.nameCity} {place.city.state} {place.city.country} </option>
                {possibleCities.map((city, index) => (
                  <option key={index} value={city.nameCity}>
                    {city.nameCity} {city.state} {city.country}
                  </option>
                ))}
              </select>
              <label>Street</label>
              <input type="text" placeholder="" value={place.location.street} onChange={(e) => setPlace({ ...place, location: { ...place.location, street: e.target.value } })} />

              <label>Number</label>
              <input type="text" placeholder="" value={place.location.number} onChange={(e) => setPlace({ ...place, location: { ...place.location, number: e.target.value } })} />
            </form>
            <form className="addProduct_firstForm_right">
              {descriptionError
                &&
                <div className='addProduct_firstForm_right_error'>Warning! You can not provide contact info. Providing contact information is a reason of ban</div>
              }
              {
                emptyDescription &&
                <div className='addProduct_firstForm_right_error'>Description can not be empty</div>
              }
              <label className="addProduct_firstForm_right_label">Add a description</label>
              <textarea type="text" placeholder="" value={place.description} onChange={(e) => setPlace({ ...place, description: e.target.value })} />
              {isLoaded &&
                <article>
                  <label>Map</label>
                  <div>
                    {inputLoaded == false && setInputLoaded(true)}
                    <GoogleMap
                      zoom={20}
                      center={markedLocation}
                      mapContainerClassName="map-container"
                      onClick={handleMapClick}
                    >
                      {markedLocation && <Marker position={markedLocation} />}
                    </GoogleMap>
                  </div>
                </article>}
            </form>
          </div>
        </section><section className="addProduct_secondSection">
          <div className="addProduct_secondSection_leftForm">
            <form>
              <div className="addProduct_secondSection_leftForm_title">
                Characteristics
              </div>
              {pricePerHourError &&
                <div className='addProduct_priceError'>The value of the price must be positive number</div>}
              <label>Price per day</label>
              <input type="text" placeholder="" value={place.pricePerDay} onChange={(e) => setPlace({ ...place, pricePerDay: e.target.value })} />

              {minCapacityError &&
                <div className='addProduct_priceError'>The value must be a positive number</div>}
              <label>Minimum capacity of people in this place</label>
              <input type="text" placeholder="number" value={place.minCapacity} onChange={(e) => setPlace({ ...place, minCapacity: e.target.value })} />

              {maxCapacityError &&
                <div className='addProduct_priceError'>The value must be a positive number</div>}
              <label>Maximum capacity of people in this place</label>
              <input type="text" placeholder="number" value={place.maxCapacity} onChange={(e) => setPlace({ ...place, maxCapacity: e.target.value })} />

              <label>Speciality of the place: </label>
              <select id="categories" onChange={handleCategoriesChange}>
                <option value="">Select one speciality</option>
                {possibleCategory.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>


            </form>
          </div>
          <div className="addProduct_secondSection_rightForm">
            <div className="addProduct_secondSection_right_title">
              The place includes...
            </div>
            <form className="addProduct_secondSection_rightForm_checkbox">
              <label>
                <input checked={place.characteristics.pool} type="checkbox" onClick={() => setSpecialties((prevState) => ({ ...prevState, pool: !prevState.pool }))} />
                Pool
              </label>
              <label>
                <input checked={place.characteristics.outDoorAreas} type="checkbox" onClick={() => setSpecialties((prevState) => ({ ...prevState, outDoorAreas: !prevState.outDoorAreas }))} />
                Outdoor
              </label>
              <label>
                <input checked={place.characteristics.stage} type="checkbox" onClick={() => setSpecialties((prevState) => ({ ...prevState, stage: !prevState.stage }))} />
                Stage
              </label>
              <label>
                <input type="checkbox" checked={place.characteristics.parkingLot} onChange={() => setSpecialties((prevState) => ({ ...prevState, parkingLot: !prevState.parkingLot }))} />
                Parking Lot
              </label>
              <label>
                <input checked={place.characteristics.ac} type="checkbox" onClick={() => setSpecialties((prevState) => ({ ...prevState, ac: !prevState.ac }))} />
                AC
              </label>
              <label>
                <input checked={place.characteristics.wifi} type="checkbox" onClick={() => setSpecialties((prevState) => ({ ...prevState, wifi: !prevState.wifi }))} />
                wifi
              </label>
            </form>

          </div>
        </section><section className="addProduct_thirdSection">
          <div className="addProduct_thirdSection_title">Add services</div>
          <div className="addProduct_thirdSection_forms">
            <div className="addProduct_thirdSection_forms_left">
              <div>Add service(optional)</div><button onClick={handleAddInput} className='add'>Add</button>
              {serviceError &&
                <div className='addProduct_priceError'>The value of the price must be a positive number</div>}
              <div>
                {services.map((service, index) => (
                  <p key={index} className='services'>
                    <input
                      className={`service_${index}`}
                      id={`service_name_${index}`}
                      type="text"
                      placeholder="Service name"
                      value={service.name}
                      onChange={(e) => handleServiceNameChange(e, index)} />

                    <input
                      className={`service_${index}`}
                      id={`service_value_${index}`}
                      type="text"
                      placeholder="Value"
                      value={service.price}
                      onChange={(e) => handleServiceValueChange(e, index)} />

                    <button
                      name={index}
                      className={`service_${index}`}
                      onClick={(e) => handleRemoveInput(index)}
                    >
                      X
                    </button>
                  </p>
                ))}
              </div>
            </div>

            <div className="addProduct_thirdSection_forms_right">
              {imageError && (
                <div className='addProduct_thirdSection_forms_right_error'>
                  You need to add at least 5 images to upload your place
                </div>
              )}
              <label>Upload images (At least 5)</label>
              <input type="file" multiple onChange={handleFileInputChange} />
              <div className='images'>
                {filePreviews.map((preview, index) => (
                  <div key={index} style={{ position: 'relative', display: 'inline-block', width: '50%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <img style={{ width: '100%' }} src={preview} alt={`Image ${index}`} />
                      </div>
                      <div>
                        <img src={close} alt="Close" style={{ cursor: 'pointer', width: '2vw' }} onClick={() => removeImage(index)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
        <section className="addProduct_fourthSection">
          <div className="addProduct_fourthSection_title">
            Add your place policies
          </div>
          <div className="addProduct_fourthSection_text">
            <label htmlFor="">Health and security</label>
            <input type="text" label="health And Security" value={place.healthAndSecurity} onChange={(event) => setPlace((prevPlace) => ({ ...prevPlace, healthAndSecurity: event.target.value }))} />
            <label htmlFor="">Rules of the place</label>
            <input type="text" label="rules Of The Place" value={place.rulesOfThePlace} onChange={(event) => setPlace((prevPlace) => ({ ...prevPlace, rulesOfThePlace: event.target.value }))} />
            <label htmlFor="">Cancelation policies</label>
            <input type="text" label="cancelation Policies" value={place.cancelationPolicies} onChange={(event) => setPlace((prevPlace) => ({ ...prevPlace, cancelationPolicies: event.target.value }))} />
            {emptyInputRules &&
              <div className='addProduct_fourthSection_text-error'>Policies can not be empty</div>}
          </div>
        </section>

        <section className="addProduct_fifthSection">
          <div className="addProduct_fifthSection_title">
            Important information related to publishing your site on our website
          </div>
          <div className="addProduct_fifthSection_text">
            When you accept a booking request or receive a booking confirmation through the EventPlace Platform, you are entering into a contract directly with the User and are responsible for delivering the Host Service under the terms and at the price specified in your Listing.
            <div style={{ color: "#FF0000", fontWeight: "700" }}>It is important to note that sharing contact information is strictly prohibited on the EventPlace Platform. If you share any contact information, it may be considered a violation of our policies and could result in a ban from the platform.</div> Additionally, by accepting a booking, you agree to pay all applicable fees, including EventPlace's service fee and any applicable taxes, for each booking.
            Before proceeding, please ensure that you have thoroughly reviewed the Privacy Statement, as well as the Rules and Restrictions and Terms of Use, and acknowledge your acceptance of these terms by clicking the button below.
            <Link to={routes.termsAndConditions}>
              <div>Terms and conditions</div>
            </Link>
            {emptyInputError &&
              <div className='addProduct_fifthSection_text-error'>Please fill all inputs</div>}
            <button onClick={handleSubmit} className="addProduct_fourthSection_buttom">Create EventPlace</button>
          </div>
          {
            loading &&
            <div className='loading'>
              Loading
            </div>
          }
        </section>

      </>


    </div>
  )
}

export default AddProduct
