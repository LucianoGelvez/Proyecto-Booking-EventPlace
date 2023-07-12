import React, { useState, useEffect, useRef, useMemo, useContext } from "react";

import '../styles/componentsStyles/productDetail/ProductDetail.css'
import '../styles/componentsStyles/rating/rating.scss';
import axios from 'axios'
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { faCheck, faLocationDot, faTimes, faSwimmingPool, faArrowLeft, faSnowflake, faCar, faMicrophone, faWifi, faTree, faSuitcaseMedical, faHouseCircleCheck, faGlasses, faPortrait } from '@fortawesome/free-solid-svg-icons';
import GuestReviews from "../components/GuestReviews";
import FinalRating from "../components/FinalRating";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { routes } from "../Routes";
import { Link, Routes } from 'react-router-dom';
import share from '../images/share.svg'
import Twitter from '../images/twitter.svg';
import Facebook from '../images/facebook.svg';
import Whatsapp from '../images/whatsapp.svg';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import "../styles/componentsStyles/loader/Loader.scss"
import Loader from "../components/Loader";
import { subDays, addDays, eachDayOfInterval } from 'date-fns';
import { GlobalContext } from "../components/utils/GlobalContext";

const ProductDetail = () => {
  const { endpoint } = useContext(GlobalContext);
  const { id } = useParams();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "*"
  });

  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(null);
  const buttonRef3 = useRef(null);
  const modalImageContainerRef = useRef(null);
  const [showAllImages, setShowAllImages] = useState(false);
  const [product, setProduct] = useState([]);
  const [showOverview, setShowOverview] = useState(true);
  const [notAvailableDates, setNotAvailableDates] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [ratingNumber, setRatingNumber] = useState(null);
  let currentDate = new Date();
  const socialMediaRef = useRef(null);
  const [socialMedia, setSocialMedia] = useState(false)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [bookingOk, setBookingOk] = useState(false)


  useEffect(() => {
    const url = `http://${endpoint}:8080/booking/notAvailableDates/${id}`;
    const token = JSON.parse(localStorage.getItem("token"));

    fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(response => response.json())
      .then(data => {
        setNotAvailableDates(data);
      })
      .catch(error => {
        console.log(error);
      });

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setNotAvailableDates(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const url = `http://${endpoint}:8080/booking/findBookingByUser/` + localStorage.getItem("id") + "/" + id;
    fetch(url, {
      headers: {
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
      }
    })
      .then(response => response.json())
      .then(data => {
        setBookingList(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  const formatUTC = (dateString) => {
    let date = new Date(dateString)
    const offsetDate = new Date();
    offsetDate.setTime(date.getTime() + date.getTimezoneOffset() * 60000)
    return offsetDate
  }

  function configureNotAvailableDates() {
    let rangeDates = [];

    if (notAvailableDates != undefined && notAvailableDates != null && notAvailableDates != []) {
      notAvailableDates.map((date) => {
        rangeDates.push({ start: formatUTC(date.startDate), end: formatUTC(date.endDate) })
      })
    }

    return rangeDates;
  }

  function configureReservedDates() {
    let highlightedDates = [];

    if (bookingList != undefined && bookingList != null && bookingList != []) {
   
        bookingList.map((date) => {
          const start = subDays(new Date(date.startDate), -1);
          const end = subDays(new Date(date.endDate), -1);

          const datesInRange = eachDayOfInterval({ start, end });

          highlightedDates.push(...datesInRange);
        });

        return highlightedDates;
      
    }
  }



  useEffect(() => {
    configureReservedDates()
  }, [bookingList])

  const handleDocumentClick = (event) => {
    if (
      socialMediaRef.current &&
      !socialMediaRef.current.contains(event.target) &&
      !buttonRef3.current.contains(event.target)
    ) {
      setSocialMedia(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  function handleRatingNumber(totalRating) {
    setRatingNumber(Math.round(totalRating * 10) / 10)
  }


  useEffect(() => {
    const url = `http://${endpoint}:8080/eventPlace/${id}`;

    const fetchData = async () => {

      try {
        const response = await axios.get(url);
        setProduct(response.data);
        localStorage.setItem("description", response.data.description)
        localStorage.setItem("imageUrl", response.data.listImages[0].url)
        localStorage.setItem("lat", response.data.location.lat)
        localStorage.setItem("lng", response.data.location.lng)
  
        handleRatingNumber(response.data.totalrating)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [showOverview]);

  function textRating(ratingNumber) {
    if (ratingNumber > 4) {
      return "Very good";
    } else if (ratingNumber > 3 && ratingNumber <= 4) {
      return "Good";
    } else if (ratingNumber > 2 && ratingNumber <= 3) {
      return "Regular";
    } else if (ratingNumber > 0 && ratingNumber <= 2) {
      return "Review score";
    } else if (ratingNumber == 0) {
      return "New place"
    } else {
      return null
    }

  };


  useEffect(() => {
    const url = `http://${endpoint}:8080/EventPlace/rate`;
    const token = JSON.parse(localStorage.getItem("token"));
    fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setRating(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);




  const getFacilityIcon = (facility) => {
    switch (facility) {
      case "pool":
        return <FontAwesomeIcon icon={faSwimmingPool} className="facility-icon" style={{ marginLeft: "5px", fontSize: "18px" }} />;
      case "ac":
        return <FontAwesomeIcon icon={faSnowflake} className="facility-icon" style={{ marginLeft: "5px", fontSize: "18px" }} />;
      case "parkingLot":
        return <FontAwesomeIcon icon={faCar} className="facility-icon" style={{ marginLeft: "5px", fontSize: "18px" }} />;
      case "stage":
        return <FontAwesomeIcon icon={faMicrophone} className="facility-icon" style={{ marginLeft: "5px", fontSize: "18px" }} />;
      case "wifi":
        return <FontAwesomeIcon icon={faWifi} className="facility-icon" style={{ marginLeft: "5px", fontSize: "18px" }} />;
      case "outDoorAreas":
        return <FontAwesomeIcon icon={faTree} className="facility-icon" style={{ marginLeft: "5px", fontSize: "18px" }} />;
      default:
        return null;
    }
  };

  const handleViewAllImages = () => {
    setShowAllImages(true);
  };

  const handleCloseModal = () => {
    setShowAllImages(false);
  };


  const handleScrollUp = () => {
    if (modalImageContainerRef.current) {
      modalImageContainerRef.current.scrollTop -= 100;
    }
  };

  const handleScrollDown = () => {
    if (modalImageContainerRef.current) {
      modalImageContainerRef.current.scrollTop += 100;
    }
  };
  const handleTitleClick = () => {
    setShowOverview(!showOverview);
  };


  const handleShareButtonClick = () => {
    setSocialMedia((prevState) => !prevState);
  };


  const onChange = (dates) => {
    const [start, end] = dates;

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${year}-${month}-${day}`;
    };

    const formattedStartDate = start ? formatDate(start) : null;
    const formattedEndDate = end ? formatDate(end) : null;


    if (start && end) {
      setStartDate(start);
      setEndDate(end);
    } else if (start && !end) {
      if (startDate) {
        setStartDate(null);
        setEndDate(null);
      } else {
        setStartDate(start);
      }
    }

    localStorage.setItem("startDate2", formattedStartDate);
    localStorage.setItem("endDate2", formattedEndDate);
  };


  const handleChange = (event) => {
    setInputValue(event.target.value);
  };


  const handleButtonClick = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const url = `http://${endpoint}:8080/booking/addBooking`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        eventPlace_id: product.id,
        user_id: localStorage.getItem("id"),
        amountOfPeople: inputValue,
        startDate: localStorage.getItem("startDate2"),
        endDate: localStorage.getItem("endDate2")
      })
    })
      .then(response => {
        if (response.ok) {
          setBookingOk(true)
          setTimeout(() => {
            window.location.reload()
          }, 3000)
        } else {
          throw new Error('Request failed');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const CheckIn = () => {
      Swal.fire({
        title: 'You must register to make a reservation',
        text: "Would you like to register now?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EE5D1A',
        cancelButtonColor: '#1F1A1B',
        confirmButtonText: 'Yes, go!'
      }).then((result) => {
        if (result.isConfirmed) {
          location.replace("/login");
        }
      })

  }

  return (
    <>

      {showAllImages && (

        <div className="modalBackground" onClick={handleCloseModal}>

          <div className="modalContent">
            <button
              onClick={handleCloseModal}
              className="modalCloseButton"
            >
              X
            </button>
            <div className="modalImageContainer">
              {product.listImages.map((image) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt="Product"
                  className="modalImage"

                />
              ))}
            </div>
            <button className="scrollButton up" onClick={handleScrollUp}>
              &#9650;
            </button>
            <button className="scrollButton down" onClick={handleScrollDown}>
              &#9660;
            </button>
          </div>
        </div>
      )}



      <section className="productDetail" style={{ color: "black", }}>
        {product && product.length !== 0 ? (
          <>
            <div className="encabezado">
              <div className="product-name">
                <h1> {product.name} </h1>
                <Link to={routes.home}>
                  <FontAwesomeIcon icon={faArrowLeft} className="back" />
                </Link>

              </div>
              <div className="product-header">
                <div className="location-container">
                  <FontAwesomeIcon icon={faLocationDot} className="location-icon" />
                  <h2>Location: {product.city.nameCity}, {product.city.state}, {product.city.country}</h2>
                </div>
           
                <div className="rating-location-container"  >
                <div>
                  <div ref={buttonRef3} onClick={handleShareButtonClick} className='location-container_share'><img src={share} alt="share" /></div>
                  {socialMedia &&
                    <div ref={socialMediaRef} className="share"
                      
                    >
                      <FacebookShareButton
                        url={'http://eventplace-equipo4-bucket.s3-website.us-east-2.amazonaws.com/details/' + product.id}
                        quote={product.name + '\n' + product.description}
                        hashtag={"#EventPlace"}
                        image={'URL_DE_LA_IMAGEN'}
                      >
                        <img src={Facebook} alt="Facebook logo" />
                      </FacebookShareButton>

                      <WhatsappShareButton
                        url={'http://eventplace-equipo4-bucket.s3-website.us-east-2.amazonaws.com/details/' + product.id}
                        title={product.name + '\n' + product.description}
                        separator={'\n\n'}
                      >
                        <img src={Whatsapp} alt="Whatsapp logo"  />
                      </WhatsappShareButton>

                      <TwitterShareButton
                        url={'http://eventplace-equipo4-bucket.s3-website.us-east-2.amazonaws.com/details/' + product.id}
                        title={product.name + '\n' + product.description}
                        hashtags={["EventPlace", "PartyVenue"]}
                      >
                        <img src={Twitter} alt="Twitter logo"  />
                      </TwitterShareButton>
                    </div>
                  }


                </div>
                  <div className="stars-rating">
                    <div className="rating-text" >
                      {textRating(ratingNumber)}
                    </div>
                    <div className="rating-wrapper" >
                      <FinalRating rating={product.totalrating} />
                    </div>
                  </div>
                  <div className="numeric-rating" >
                    {ratingNumber}
                  </div>
                </div>
              </div>
            </div>
            <div className="detailImage" onClick={handleViewAllImages}>

              <img className="product-detail__main-image" src={product.listImages[0].url} />              <div className="smallImages1">
                <img src={product.listImages[1].url} />
                <img src={product.listImages[2].url} />

                <img src={product.listImages[3].url} />
                <img src={product.listImages[4].url} />
              </div>
              {!showAllImages && (
                <button style={{ top: "100px", backgroundColor: "red", position: "absolute" }} className="view-all-images" onClick={handleViewAllImages}>
                  View All Images
                </button>
              )}
            </div>



            <div className="detailMenuSelection" onClick={handleTitleClick} >
              <div className="detailMenuSelection__title">Overview</div>
              <p style={{ marginRight: "7px", marginLeft: "7px" }}> /</p>
              <div className="detailMenuSelection__title" > Guest Reviews
              </div>
            </div>

            {showOverview ? (

              <div >

                <div className="firstSection">
                  <div className="detailAndDates">
                    <div className="productOverviewBody" >
                      <h3 className="productOverviewBody__subtitle" >Overview</h3>
                      <div className="productOverviewBody__description" >
                        {product.description}
                      </div>
                      <div className="facilities">
                        <div className="top-facilities">
                          <h1>Top Facilites</h1>
                          <ul>
                            {Object.entries(product.characteristics).map(([key, value]) => (
                              key !== "id" && (
                                <li key={key} >
                                  {getFacilityIcon(key)}<span style={{ marginLeft: "5px" }}>{key}</span>
                                  <FontAwesomeIcon icon={value ? faCheck : faTimes} className="facility-icon" style={{ marginLeft: "5px", fontSize: "18px" }} />

                                </li>
                              )
                            ))}
                          </ul>
                        </div>
                        <div className="basic-services">
                          <h1 >Basic Services:</h1 >
                          <ul >

                            {product.basicServices.map(service => (
                              <li key={service.id}>
                                {service.name}: {service.price}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </div>
                    <div className="bookedDates">
                      
                      <DatePicker
                        className="calendario"
                        minDate={currentDate}
                        calendarType="month"
                        monthsShown={2}
                        excludeDateIntervals={configureNotAvailableDates()}
                        highlightDates={configureReservedDates()}
                        open={true}
                        inline={true}
                        disabled
                      />
                      <div>
                    <div className="dates">
                      <div className="dates-colors"><div className="not-available-dates"></div><h2>Not available dates</h2></div>
                      <div className="dates-colors"><div className="reserved-by-you"></div><h2>Days reserved by you</h2></div>
                    </div>
                  </div>

                      {bookingOk && (
                        <article className='detail_sure_to_delete'>
                          <div>
                            Booking saved successfully! You have a booking at {product.name} on:
                            <div style={{ color: "red" }}>{localStorage.getItem("startDate2")}</div>
                          </div>
                        </article>
                      )}
                      {parseInt(product.ownerId) !== parseInt(localStorage.getItem("id")) && localStorage.getItem("id") !== '' && localStorage.getItem("id") !== undefined && localStorage.getItem("id") !== null && (
                        <Link to={"/booking/" + product.id}>
                          <button className="startButtonButton">
                            Start booking
                          </button>
                        </Link>
                      )}

                      {product.ownerId !== localStorage.getItem("id") && localStorage.getItem("id") !== '' && localStorage.getItem("id") !== undefined && localStorage.getItem("id") !== null || (
                        // <Link to={routes.login}>
                          <button className="startButtonButton" onClick={() => CheckIn()}>
                            Start booking
                          </button>
                        // </Link>
                      )}
                    </div>
                  </div>
                </div>

                {isLoaded &&
                  < Map />
                }
                <div className="policyBlock">
                  <h1>What you need to know about this place before renting it</h1>
                  <div className="subtitlesBlock">
                    <div className="policySection">
                      <div className="policyTitle"><div><FontAwesomeIcon icon={faHouseCircleCheck} className="policy-icon" /></div>Rules of the place:</div>
                      <div className="policyInfo">{product.rulesOfThePlace}</div>
                    </div>
                    <div className="policySection">
                      <div className="policyTitle"> <div><FontAwesomeIcon icon={faSuitcaseMedical} className="policy-icon" /></div>Health and security</div>
                      <div className="policyInfo">{product.healthAndSecurity}</div>
                    </div>
                    <div className="policySection">
                      <div className="policyTitle"><div><FontAwesomeIcon icon={faGlasses} className="policy-icon" /></div>Cancellation policies:</div>
                      <div className="policyInfo">{product.cancelationPolicies}</div>
                      <div />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <GuestReviews product={product} setProduct={setProduct} handleTotalRatingChange={handleRatingNumber} />
            )}
          </>
        ) : (
          <div style={{ position: "absolute", zIndex: "3", marginTop: "20%", width: "100%", height: "100vh", backgroundColor: "white", }}><Loader /></div>
        )}

      </section>
    </>
  )
}

export default ProductDetail


function Map() {
  const center = useMemo(
    () => ({
      lat: JSON.parse(localStorage.getItem("lat")),
      lng: JSON.parse(localStorage.getItem("lng")),
    }),
    []
  );

  const mapContainerStyle = {
    width: window.innerWidth >= 480 ? "90%" : "100%",
    marginLeft: window.innerWidth >= 480 ? "5%" : "0px",
    marginRight: window.innerWidth >= 480 ? "5%" : "0px",
    height: window.innerWidth >= 480 && window.innerWidth <= 100 ? "40vh" : "30vh",
    height: window.innerWidth >= 110 && "50vh",
    position: "relative",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.5)",
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
    hovered: { transform: "scale(0.99)", transition: "transform 0.3s ease" }

  };

  return (
    <div>
      {localStorage.getItem("lat") != null
        && localStorage.getItem("lat") != [] &&
        <GoogleMap zoom={20} center={center} mapContainerStyle={mapContainerStyle}>
          <Marker position={center} />
        </GoogleMap>}
    </div>
  );
}