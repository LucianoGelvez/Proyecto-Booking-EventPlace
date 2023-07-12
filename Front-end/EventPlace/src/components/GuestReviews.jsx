import React, { useState, useEffect, useContext } from 'react';
import '../styles/componentsStyles/productDetail/guestReviews/guestReviews.scss';
import Rating from './Rating';
import { GlobalContext } from './utils/GlobalContext';

const GuestReviews = ({ product, setProduct, handleTotalRatingChange }) => {
  const { endpoint } = useContext(GlobalContext);
  const [place, setPlace] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0.0);
  const currentRole = localStorage.getItem("userType");


  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleRatingChange = newRating => {
    setRating(newRating);
  };



  const handleSubmit = (event) => {
    event.preventDefault();

    const user_email = JSON.parse(localStorage.getItem('userName'));

    const decimalRating = parseFloat(rating).toFixed(1);

    const newCommentObj = {
      comment: newComment,
      rate: decimalRating,
      eventPlace_id: product.id,
      user: user_email
    };

    const url = `http://${endpoint}:8080/eventPlace/rate`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      },
      body: JSON.stringify(newCommentObj),
    })
      .then(response => response.json())
      .then(data => {
        handleTotalRatingChange(data)
        fetchComments();
        setNewComment('');
        setRating(0.0);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    const url = `http://${endpoint}:8080/eventPlace/` + product.id;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setPlace(data);

      })
      .catch(error => {
        console.log(error);
      });
  };
  


  return (
    <div className="guest-reviews">
      <div className="comment-box">
        <h1 style={{ marginBottom: "25px" }}>Comments:</h1>
   
          <div key={place.id} className="comment">

            {place. listRates != undefined && place.listRates != [] &&place.listRates.map((rate) => (
              <div key={rate.id} className="comment-entry">

                <div className="comment-header">
                  <span className="comment-name">{rate.user} USER</span>
                  <span className="comment-name">{rate.rate}</span>
                </div>
                <p className="comment-text">{rate.comment}</p>
              </div>
            ))}
          </div>
      </div>
      {currentRole === "BASIC"  ? (
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write your comment"
          value={newComment}
          onChange={handleInputChange}
        />

        <div className="star-rating">
          <span className="rating-label">Please rate this place:</span>
          <Rating rating={rating} setRating={handleRatingChange} />
        </div>

        <button style={{ height: "69px" }} type="submit">Add Comment</button>


      </form>
      ):null}
    </div>
  );
};

export default GuestReviews;