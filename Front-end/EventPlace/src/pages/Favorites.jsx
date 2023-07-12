import React, { useState, useEffect, useContext } from 'react';
import Card from '../components/Card';
import '../styles/componentsStyles/main/favorites/FavoritesPage.scss';
import "../styles/componentsStyles/card/cardAnimation/cardAnim.css"
import "../styles/componentsStyles/card/Card.scss";
import "../styles/componentsStyles/card/cardAnimation/cardAnim";
import { GlobalContext } from '../components/utils/GlobalContext';

function Favorites() {
  const { endpoint } = useContext(GlobalContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`http://${endpoint}:8080/user/findAllFavorites/${userId}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
          console.log(data);
        } else {
          console.error('Error fetching favorites:', response.status);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();

    const handleClick = () => {
      setTimeout(() => {
        fetchFavorites();
      }, 100);
    };

    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, []);


  const handleDelete = async (favoriteId) => {
    const userId = localStorage.getItem("id")
    console.log(favoriteId)
    try {
      const response = await fetch(
        `http://${endpoint}:8080/user/removeFromFavorites/${favoriteId}/${userId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
          }

        }

      );
      if (response.ok) {
        const updatedFavorites = favorites.filter((favorite) => favorite.id !== favoriteId);
        setFavorites(updatedFavorites);
      } else {
        console.error('Error removing from favorites:', response.status);
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  console.log(favorites);

  return (
    <>
   <h1 className='favorites-title'>My Favorites:</h1>
    <div className="favorites-container">
   
      <div className="favorites-cards__container">
        {favorites.map((favorite) => (
          
            <Card place={favorite}/>
        ))}
      
      </div>
    </div>
    </>
  );
}

export default Favorites;
