
import '../styles/componentsStyles/rating/rating.scss';

const Rating = ({ rating, setRating, readOnly }) => {
  const handleRatingChange = newRating => {
    if (!readOnly) {
      setRating(newRating);
    }
  };

  return (
    <div className="rating-container">
      {[1.0, 2.0, 3.0, 4.0, 5.0].map((value, index) => (
        <span
          key={value}
          className={`star ${rating >= value ? 'filled' : ''} ${readOnly ? 'readOnly' : ''}`}
          onClick={() => handleRatingChange(value)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;




