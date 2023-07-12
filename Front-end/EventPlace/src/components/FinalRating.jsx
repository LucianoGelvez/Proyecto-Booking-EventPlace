import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'


const FinalRating = ({ rating }) => {
  const scaledRating = rating  
  const roundedRating = Math.floor(scaledRating); 

  const starIcons = [];

  for (let i = 1; i <= 5; i++) {

    if (rating == null){
      starIcons.push(<i key={i} style={{fontSize: "15px", position:"relative", padding:"0px", color:"#bfbfbf"}}><FontAwesomeIcon icon={faStarSolid} /></i>)
    }else if(i <= roundedRating) {
      starIcons.push(<i key={i} className="fas fa-star filled"></i>); 
    } else if (i === Math.ceil(scaledRating)) {
      starIcons.push(<i key={i} className="fas fa-star-half-alt half-filled"></i>); 
    } else {
      starIcons.push(<i key={i} className="fas fa-star-empty empty" style={{fontSize: "15px", position:"relative", padding:"0px", color:"#ffffff"}}><FontAwesomeIcon icon={faStarRegular} /></i>); // Render an empty star for other positions
    }
  }

  return <div className="rating-container">{starIcons}</div>;
};

export default FinalRating;

