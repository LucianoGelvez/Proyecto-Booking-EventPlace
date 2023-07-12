import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { useState } from "react"
import '../styles/componentsStyles/addProduct/AddProduct.css';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { routes } from '../Routes';
import { GlobalContext } from '../components/utils/GlobalContext';


const EditEventPlace = () => {
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
  const [serviceError, setServiceError] = useState(false)
  const [emptyInputError, setEmptyInputError] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [services, setServices] = useState([])
  const [data, setData] = useState()
  const [files, setFiles] = useState([])
  const [filePreviews, setFilePreviews] = useState([]);
  const [categories, setCategories] = useState("");
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
    pricePerHour: '',
    maxCapacity: '',
    minCapacity: '',
    categories: categories,
    description: '',
    characteristics: specialties,
    location: {
      city: '',
      state: '',
      country: '',
      street: '',
      number: '',
      lat: sessionStorage.getItem("lat"),
      lng: sessionStorage.getItem("lng")
    },
    basicServices: services
  })

  const lat = parseFloat(sessionStorage.getItem("lat")) || 0;
  const lng = parseFloat(sessionStorage.getItem("lng")) || 0;
  const center = useMemo(() => ({ lat, lng }), [lat, lng]);

  const [markedLocation, setMarkedLocation] = useState(center);

  const handleMapClick = (event) => {
    const clickedLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setMarkedLocation(clickedLocation);
    sessionStorage.setItem('lat', JSON.stringify(event.latLng.lat()));
    sessionStorage.setItem('lng', JSON.stringify(event.latLng.lng()));

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

          const countryResult = addressComponents.find(component =>
            component.types.includes('country')
          );
          const cityResult = addressComponents.find(component =>
            component.types.includes('locality') || component.types.includes('postal_town')
          );
          const stateResult = addressComponents.find(component =>
            component.types.includes('administrative_area_level_1')
          );
          const streetNumberResult = addressComponents.find(component =>
            component.types.includes('street_number')
          );
          const routeResult = addressComponents.find(component =>
            component.types.includes('route')
          );

          if (countryResult) {
            setPlace(prevPlace => ({
              ...prevPlace,
              location: {
                ...prevPlace.location,
                country: countryResult.long_name
              }
            }));
            console.log(countryResult.long_name)
          }
          if (cityResult) {
            setPlace(prevPlace => ({
              ...prevPlace,
              location: {
                ...prevPlace.location,
                city: cityResult.long_name
              }
            }));
            console.log(cityResult.long_name)
          }
          if (stateResult) {
            setPlace(prevPlace => ({
              ...prevPlace,
              location: {
                ...prevPlace.location,
                state: stateResult.long_name
              }
            }));
          }
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

            console.log(routeResult.long_name);
          }

          console.log('Formatted Address:', formattedAddress);
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  };

  const handlePlaceChange = (newPlace) => {
    setPlace(newPlace);

    const { lat, lng } = newPlace.location;
    setMarkedLocation({ lat, lng });
  };

  const handlePlaceSelect = (place) => {
    console.log("se llamó a la funcion")
    const addressComponents = place.address_components;
    const formattedAddress = place.formatted_address;

    setMarkedLocation(place.geometry.location);

    const countryResult = addressComponents.find(component =>
      component.types.includes('country')
    );
    const cityResult = addressComponents.find(component =>
      component.types.includes('locality') || component.types.includes('postal_town')
    );
    const stateResult = addressComponents.find(component =>
      component.types.includes('administrative_area_level_1')
    );
    const streetNumberResult = addressComponents.find(component =>
      component.types.includes('street_number')
    );
    const routeResult = addressComponents.find(component =>
      component.types.includes('route')
    );

    if (countryResult) {
      setPlace(prevPlace => ({
        ...prevPlace,
        location: {
          ...prevPlace.location,
          country: countryResult.long_name
        }
      }));
      console.log(countryResult.long_name)
    }
    if (cityResult) {
      setPlace(prevPlace => ({
        ...prevPlace,
        location: {
          ...prevPlace.location,
          city: cityResult.long_name
        }
      }));
    }
    if (stateResult) {
      setPlace(prevPlace => ({
        ...prevPlace,
        location: {
          ...prevPlace.location,
          state: stateResult.long_name
        }
      }));
    }
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
      console.log(routeResult.long_name)
    }

    console.log('Formatted Address:', formattedAddress);
  };

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
      autocomplete.addListener('place_changed', () => {
        handlePlaceSelect(autocomplete.getPlace());
      });
    }
  }, [inputLoaded]);

  useEffect(() => {
    const { city, state, country, street, number } = place.location;
    const fullAddress = `${number} ${street}, ${city}, ${state}, ${country}`;

    if (window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: fullAddress }, (results, status) => {
        if (status === 'OK' && results.length > 0) {
          const location = results[0].geometry.location;
          setMarkedLocation({
            lat: location.lat(),
            lng: location.lng()
          });
        } else {
          console.log('Geocode was not successful for the following reason:', status);
        }
      });
    }
  }, [place]);



  useEffect(() => {
    const fetchEventPlace = async () => {
      try {
        const response = await fetch(`http://${endpoint}:8080/eventPlace/1`, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch event place');
        }

        const data = await response.json();
        setPlace(data);
        setServices(data.basicServices);
        setSpecialties(data.characteristics);
        localStorage.setItem("lat", data.location.lat);
        localStorage.setItem("lng", data.location.lng);
      } catch (error) {

        console.log(error);
      }
    };

    fetchEventPlace();
  }, []);


  const countries = [
    { code: 'AR', name: 'Argentina' },
    { code: 'BR', name: 'Brazil' },
    { code: 'CA', name: 'Canada' },
    { code: 'CL', name: 'Chile' },
    { code: 'CO', name: 'Colombia' },
    { code: 'MX', name: 'Mexico' },
    { code: 'PE', name: 'Peru' },
    { code: 'US', name: 'United States' },
    { code: 'AT', name: 'Austria' },
    { code: 'BE', name: 'Belgium' },
    { code: 'DE', name: 'Germany' },
    { code: 'ES', name: 'Spain' },
    { code: 'FR', name: 'France' },
    { code: 'IT', name: 'Italy' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'PT', name: 'Portugal' },
    { code: 'UK', name: 'United Kingdom' },
  ];



  const handleCategoriesChange = (e) => {
    setCategories(e.target.value);
  };

  useEffect(() => {
    if (parseInt(place.pricePerHour) < 0 || typeof place.pricePerHour != "number" && place.pricePerHour != '') {
      setPricePerHourError(true);
    }

    if (parseInt(place.pricePerHour) >= 0) {
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


  }, [place.pricePerHour, place.maxCapacity, place.minCapacity, services])

  useEffect(() => {
    setPlace((prevState) => ({
      ...prevState,
      characteristics: specialties,
      basicServices: services,
      categories: categories,
    }));
  }, [specialties, services, categories])


  useEffect(() => {
    if (files.length >= 5) {
      setImageError(false)
    }
  }, [files])


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

    console.log(specialties)
    console.log(services)
    console.log(categories)

    setPlace((prevState) => ({
      ...prevState,
      characteristics: specialties,
      basicServices: services,
      categories: categories,
    }));

    console.log(place.location.lat)

    if (serviceError == false && pricePerHourError == false && minCapacityError == false && maxCapacityError == false && descriptionError == false) {
      if ((place.name != '' && place.pricePerHour != '' && place.maxCapacity != '' && place.minCapacity != '' && place.location.city != '' && place.location.country != '' && place.location.number != '' && place.location.state != '' && place.location.street != '') || files.length < 5) {
        setEmptyInputError(false)
        if (files.length < 5) {
          setImageError(true)
        }

        console.log(place.SocialMedia)

        fetch(`http://${endpoint}:8080/eventPlace/1`, {
          method: 'POST',
          body: JSON.stringify(place),
          headers: {
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
    console.log(updatedServices)
  }

  function handleServiceValueChange(e, index) {
    const updatedServices = [...services];
    updatedServices[index].price = e.target.value;
    setServices(updatedServices);
    console.log(updatedServices)
    console.log(specialties)
  }

  function handleRemoveInput(index) {
    const updatedServices = [...services];
    updatedServices.splice(index, 1)
    setServices(updatedServices);
    console.log(updatedServices)
  }

  return (
    <div className="addProduct">
      {place.name != '' &&

        <>
          {console.log(place)}
          <section className="addProduct_firstForm">
            <Link to={"/"}>  <div style={{ backgroundColor: "#EE5D1A", position: "absolute", top: "140px", left: "12px", padding: "8px", borderRadius: "50%", fontSize: "35px" }}> <FontAwesomeIcon icon={faArrowCircleLeft} style={{ color: "white" }} /></div></Link>
            <div className="addProduct_title" style={{ fontSize: "45px", marginTop: "180px" }}>Update your EventPlace!</div>
            <div className="addProduct_firstForm_title">Event place</div>
            <div className="addProduct_firstForms">
              <form className="addProduct_firstForm_left">
                <label>Name your place</label>
                <input type="text" placeholder="" value={place.name} onChange={(e) => setPlace({ ...place, name: e.target.value })} />
                <label>City</label>
                <input type="text" placeholder="" value={place.location.city} onChange={(e) => setPlace({ ...place, location: { ...place.location, city: e.target.value } })} />

                <label>State</label>
                <input type="text" placeholder="" value={place.location.state} onChange={(e) => setPlace({ ...place, location: { ...place.location, state: e.target.value } })} />

                <label>Country (you can type the countries name)</label>
                <select value={place.location.country} onChange={(e) => setPlace({ ...place, location: { ...place.location, country: e.target.value } })}>
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.name}
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
                  <div className='addProduct_firstForm_right_error'>Warning! You can not provide contact info. Providing contact information is a reason of ban</div>}
                <label className="addProduct_firstForm_right">Add a description</label>
                <textarea type="text" placeholder="" value={place.description} onChange={(e) => setPlace({ ...place, description: e.target.value })} />
                {isLoaded &&
                  <article>
                    <label>Select a location in the map(optional)</label>
                    <div>
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Enter a location"
                      />
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
                  Place’s location
                </div>
                {pricePerHourError &&
                  <div className='addProduct_priceError'>The value of the price must be positive number</div>}
                <label>Price per hour</label>
                <input type="text" placeholder="" value={place.pricePerHour} onChange={(e) => setPlace({ ...place, pricePerHour: e.target.value })} />

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
                  <option value="wedding">Wedding</option>
                  <option value="bachelorParty">Bachelor-party</option>
                  <option value="fifteens">Fifteens</option>
                  <option value="corporateParty">Corporate party</option>
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
                  <input checked={place.characteristics.outDoorAreas} type="checkbox" onClick={() => setSpecialties((prevState) => ({ ...prevState, outdoor: !prevState.outdoor }))} />
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
                {imageError
                  &&
                  <div className='addProduct_thirdSection_forms_right_error'>You need to add at least 5 images to upload your place</div>}
                <label>Upload images(At least 5)</label>
                <input type="file" multiple onChange={handleFileInputChange} />
                <div className='images'>
                  {filePreviews.map((preview, index) => (
                    <img style={{ width: "12vw" }}
                      key={index}
                      src={preview}
                      alt={`Image ${index}`} />
                  ))}
                  <img src="http://3.135.182.10:8080/images/" alt="" />
                </div>
              </div>
            </div>
          </section><section className="addProduct_fourthSection">
            <div className="addProduct_fourthSection_title">
              Important information related to publishing your site on our website
            </div>
            <div className="addProduct_fourthSection_text">
              When you accept a booking request or receive a booking confirmation through the EventPlace Platform, you are entering into a contract directly with the User and are responsible for delivering the Host Service under the terms and at the price specified in your Listing.
              <div style={{ color: "#FF0000", fontWeight: "700" }}>It is important to note that sharing contact information is strictly prohibited on the EventPlace Platform. If you share any contact information, it may be considered a violation of our policies and could result in a ban from the platform.</div> Additionally, by accepting a booking, you agree to pay all applicable fees, including EventPlace's service fee and any applicable taxes, for each booking.
              Before proceeding, please ensure that you have thoroughly reviewed the Privacy Statement, as well as the Rules and Restrictions and Terms of Use, and acknowledge your acceptance of these terms by clicking the button below.
              <Link to={routes.termsAndConditions}>
                <div>Terms and conditions</div>
              </Link>
              {emptyInputError &&
                <div className='addProduct_fourthSection_text-error'>Please fill all inputs</div>}
              <button onClick={handleSubmit} className="addProduct_fourthSection_buttom">Save changes</button>
            </div>
          </section></>
      }



    </div>
  )
}

export default EditEventPlace
