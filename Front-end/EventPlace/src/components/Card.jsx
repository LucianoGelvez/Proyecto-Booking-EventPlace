import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/componentsStyles/card/Card.scss";
import "../styles/componentsStyles/card/cardAnimation/cardAnim.css";
import "../styles/componentsStyles/card/cardAnimation/cardAnim";
import FavoriteComponent from "../components/FavoriteComponent"
import axios from "axios"
import { routes } from '../Routes';
import { GlobalContext } from './utils/GlobalContext';


const Card = ({ place, isFavorite, setIsFavorite }) => {
  const { endpoint } = useContext(GlobalContext);
  const [places, setPlaces] = useState([]);
  const cardWrapRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {

    const url = `http://${endpoint}:8080/eventPlace/`;
    axios
      .get(url)
      .then((res) => {
        setPlaces(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(() => {
    const element = cardWrapRef.current;

    const handleMouseMove = (event) => {
      const { offsetLeft, offsetTop, clientWidth, clientHeight } = element;
      const mouseX = event.pageX - offsetLeft - clientWidth / 2;
      const mouseY = event.pageY - offsetTop - clientHeight / 2;

      const angleX = (mouseX / clientWidth) * 30;
      const angleY = (mouseY / clientHeight) * -30;

      const card = cardRef.current;
      const cardBg = card.querySelector('.cardBg');
      const posX = (mouseX / clientWidth) * -40;
      const posY = (mouseY / clientHeight) * -40;

      card.style.transform = `rotateY(${angleX}deg) rotateX(${angleY}deg)`;
      cardBg.style.transform = `translateX(${posX}px) translateY(${posY}px)`;
    };

    const handleMouseOut = () => {
      const card = cardRef.current;
      const cardBg = card.querySelector('.cardBg');
      card.style.transform = 'rotateY(0deg) rotateX(0deg)';
      cardBg.style.transform = 'translateX(0px) translateY(0px)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseout', handleMouseOut);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (

    <div className="cardWrap" ref={cardWrapRef}>
      <FavoriteComponent place={place} />
      <Link to={`/details/${place.id}`}>
        <div className="card" ref={cardRef}>

          <button className='details-button'>
            <span className='details-link'>More Details</span>
          </button>
          <div className="cardBg" style={{ backgroundImage: `url(${place.listImages[0].url})`}}
          >

          </div>
          <div className="content cardInfo">

            <h3 className="cardTitle">{place.name}</h3>

            <p><b>Location:</b> {place.city.nameCity}, {place.city.state}, {place.city.country}</p>
            <p><b>Rating:</b> {place.rating ? place.rating : "N/A"}</p>
            <p><b>Capacity: </b>{place.maxCapacity} - {place.minCapacity}</p>
            <p><b>Price per hour:</b> {place.pricePerHour}</p>
      
        
       

          </div>
        </div>

      </Link>
      <Link to={`/details/${place.id}`}>
              <button className="rent-button"
              style={{ position: "relative"}}>
                <span>Rent</span>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button>
            </Link>
    </div>




  );
};

export default Card;