import React, { useContext, useEffect, useState } from 'react';
import "../styles/componentsStyles/main/favorites/FavoriteButton.scss"
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { GlobalContext } from './utils/GlobalContext';

const FavoriteComponent = ({ place }) => {
  const { endpoint } = useContext(GlobalContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [change, setChange] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleFavoriteClick = async () => {
    
    const userType = localStorage.getItem("userType");

    if (userType) {
      if (userType === "ADMIN" || userType === "OWNER" || userType === "BASIC") {
        let favorite2 = false;
        favorite.map((fav) => {
          if (fav.id === place.id) {
            favorite2 = true;
          }
        });

        if (!favorite2) {
          setFavorite([...favorite, place]);

          try {
            const userId = localStorage.getItem("id");
            const response = await fetch(`http://${endpoint}:8080/user/addFavorite/${place.id}/${userId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
              },
            });

            if (response.ok) {
              const data = await response.json();
              console.log('Favorite added:', data);
            } else {
              console.log('Error adding favorite:', response.status);
            }
          } catch (error) {
            console.log('Error adding favorite:', error);
          }
          setChange(!change);
        } else {
          const updatedFavorites = favorite.filter(item => item.id !== place.id);
          setFavorite(updatedFavorites);
          try {
            const userId = localStorage.getItem("id");
            const response = await fetch(`http://${endpoint}:8080/user/removeFromFavorites/${place.id}/${userId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
              },
            });

            if (response.ok) {
              const data = await response.json();
              console.log('Favorite removed:', data);
            } else {
              console.log('Error removing favorite:', response.status);
            }
          } catch (error) {
            console.log('Error removing favorite:', error);
          }
        }
      } else {
        console.log('User type is not authorized to add favorites.');
      }
    } else {
      setShowModal(true);
    }
    setChange(!change);
  };

  useEffect(() => {
    const url = `http://${endpoint}:8080/user/findAllFavorites/` + localStorage.getItem("id");
    const token = JSON.parse(localStorage.getItem("token"));

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error de solicitud:', response.status);
        }
      })
      .then(data => {
        console.log(data);
        console.log(place);
        const filteredFavorites = data.filter(item => item.id === place.id);
        setFavorite(filteredFavorites);
      })
      .catch(error => {
        console.error(error);
      });
  }, [change]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="favorite favoritePage-icon" onClick={handleFavoriteClick}>
      {favorite.length > 0 ? (
        <div>
          {favorite.map((item) => (
            item.id === place.id ? (
              <AiFillHeart className="active" />
            ) : (
              <AiOutlineHeart key={item.id} />
            )
          ))}
        </div>
      ) : (
        <AiOutlineHeart />
      )}

    </div>
  );
};

export default FavoriteComponent;