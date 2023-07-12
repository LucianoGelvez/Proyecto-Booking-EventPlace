import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import "../styles/componentsStyles/card/cardAnimation/cardAnim.css"
import "../styles/componentsStyles/card/Card.scss";
import "../styles/componentsStyles/card/cardAnimation/cardAnim";
import "../styles/componentsStyles/admin/adminLocations/AdminLocations.css"
import { GlobalContext } from '../components/utils/GlobalContext';
const AdminLocations = () => {
  const { endpoint } = useContext(GlobalContext);
  const [CardEventPlace, setCardEventPlace] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [render, setRender] = useState(false);
  const [updated, setUpdated] = useState(false);


  const currentRole = localStorage.getItem("userType");
  let fetchedCategories = [];


  useEffect(() => {
    if(currentRole == "ADMIN")
    {
      fetch(`http://${endpoint}:8080/eventPlace`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
  
          setCardEventPlace(data)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    else
    {
      fetch(`http://${endpoint}:8080/eventPlace/findByOwner/` + localStorage.getItem("id"), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {

          setCardEventPlace(data)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [render]);


  useEffect(() => {
    fetch(`http://${endpoint}:8080/categories/allCategories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        data.map(item => (
          fetchedCategories.push({ value: item.title, label: item.title })
        ))
        setCategories(fetchedCategories)
      })
      .catch(error => {
        console.error('Error:', error);
      })
  }, []);

  const handleSendCategory = (eventId) => {
    const token = JSON.parse(localStorage.getItem("token"));

    fetch(`http://${endpoint}:8080/eventPlace/updateCategory/${eventId}/${selectedCategories}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          setUpdated(true);
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        } else {
          console.error('Error:', response.status);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };




  const handleDeleteCard = (eventId) => {

    const cardIndex = CardEventPlace.findIndex(place => place.id === eventId);

    if (cardIndex !== -1) {
      fetch(`http://${endpoint}:8080/eventPlace/deletePlaceById/${eventId}`, {

        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      })
        .then(response => {
          if (response.ok) {
            setRender(!render)
          }
          const updatedCardEventPlace = [...CardEventPlace];
          updatedCardEventPlace.splice(cardIndex, 1);
          setCardEventPlace(updatedCardEventPlace);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };


  let handleChange = (event) => {
    setSelectedCategories(event.target.value);
  }


  const customStyles = {
    container: (provided, state) => ({
      ...provided,

    }),
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "1px solid #EE5D1A" : "1px solid gray",
      borderRadius: 0,
      backgroundColor: "white"

    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#EE5D1A" : "white",
      color: state.isSelected ? "white" : "#EE5D1A"
    })
  };

  return (
    <div className='adminLocations'>
      <div className='adminLocations_arrow'>
        <Link to={"/"}>
          <FontAwesomeIcon icon={faArrowCircleLeft} style={{ color: "white" }} />
        </Link>
      </div>
      <h1 className='adminLocations_title'>Update and delete locations:</h1>
      {updated &&
        <div className='adminLocations_updated'>
          Place updated!
          <div>This place category was changed succesfully!</div>
          <button onClick={() => setUpdated(false)}>Ok!</button>
        </div>
      }
      <div className='adminLocations_container'>
        <div className='adminLocations_subContainer'>
          {CardEventPlace.map((place, index) => (
            <div>
              <button className='deletePage-button deleteAnim-button' onClick={() => handleDeleteCard(place.id)}>X</button>

              <div key={index} className='cardWrap'>
                <div className='card'>
                  <div className="cardBg" style={{ backgroundImage: `url(${place.listImages[0]?.url})` }}>

                    <div className='content cardInfo'>
                      <h3 className='cardTitle'>{place.name}</h3>

                      <h4 className='cardTitle'>Category: <b>{place.categories.title}</b></h4>
                      <p><b>Location:</b> {place.city.nameCity}, {place.city.state}, {place.city.country}</p>
                      <p><b>Rating:</b> {place.rating ? place.rating : "N/A"}</p>
                      <p><b>Capacity: </b>{place.maxCapacity} - {place.minCapacity}</p>
                      <p><b>Price per hour:</b> {place.pricePerHour}</p>

                    </div>

                  </div>
                </div>
                <div>

                    <div className='categories-select-delete'>
                      <select className='categories-select' onChange={handleChange}>
                       {(categories != [] && categories.length > 0) ? categories.map((category) => (
                          category.label != place.categories.title && (
                            <option key={category.value} value={category.value}>
                              {category.label}
                            </option>
                          )
                        )): <h2>No product add.</h2>}
                      </select>
                      <button className='deletePage__send-button deleteAnim-button sendDelBtn' onClick={() => handleSendCategory(place.id)}>Change category</button>
                    </div>
       
                </div>

              </div>
            </div>

          ))}

        </div>

      </div>


    </div>
  );
};
export default AdminLocations